import { Pool } from "pg";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as Redis from "redis";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT as unknown as number,
});

const redisClient = async () => {
  const client = Redis.createClient();
  await client.connect();

  return client;
};

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

type User = {
  username: string;
};

async function generateAccessToken(
  user: User,
  secret: string,
  type: "refresh" | "access"
) {
  const redisClientInstance = await redisClient();
  let expirationTime = "24h";

  if (type === "refresh") {
    expirationTime = "48h";
  }

  const jwtToken = jwt.sign(user, secret, {
    expiresIn: expirationTime,
  });

  if (type === "refresh") {
    redisClientInstance.setEx(
      `weatherAppRefreshToken:${user.username}`,
      3600,
      jwtToken
    );
  }

  return jwtToken;
}

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO users (username, email, passwordHash) VALUES ($1, $2, $3)",
      [username, email, passwordHash],
      async (err, results) => {
        if (err) {
          throw err;
        }

        const accessToken = await generateAccessToken(
          { username },
          accessTokenSecret,
          "access"
        );
        const refreshToken = await generateAccessToken(
          { username },
          refreshTokenSecret,
          "refresh"
        );

        res.send({
          status: 201,
          messsage: `User added with ID: ${results}`,
          user: { username },
          accessToken,
          refreshToken,
        });
      }
    );
  } catch {
    res.sendStatus(500);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const dbResponse = await pool.query(
      `SELECT passwordHash FROM users WHERE username = '${username}'`
    );
    const match = bcrypt.compare(password, dbResponse.rows[0].passwordhash);

    if (!match) {
      res.send({ status: 500, message: "bad password" });
      return;
    }

    const accessToken = await generateAccessToken(
      { username },
      accessTokenSecret,
      "access"
    );

    const refreshToken = await generateAccessToken(
      { username },
      refreshTokenSecret,
      "refresh"
    );

    res.send({
      status: 201,
      user: { username },
      accessToken,
      refreshToken,
    });
  } catch {
    res.sendStatus(500);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  const { username, token } = req.body;
  const redisClientInstance = await redisClient();

  try {
    const userRefreshToken = await redisClientInstance.get(
      `weatherAppRefreshToken:${username}`
    );

    if (token == null) return res.sendStatus(401);
    if (!userRefreshToken) return res.sendStatus(403);

    jwt.verify(token, refreshTokenSecret, async (err: any, user: any) => {
      if (err || user.username !== username) return res.sendStatus(403);

      const accessToken = await generateAccessToken(
        { username },
        accessTokenSecret,
        "access"
      );

      res.send({ status: 201, accessToken });
    });
  } catch {
    res.sendStatus(500);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const redisClientInstance = await redisClient();

  redisClientInstance.del(`weatherAppRefreshToken:${username}`);

  res.send({ status: 204 });
};

export default { createUser, loginUser, logoutUser, refreshToken };
