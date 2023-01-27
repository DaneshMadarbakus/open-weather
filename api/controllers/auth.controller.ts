import { Pool } from "pg";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT as unknown as number,
});

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

type User = {
  username: string;
};

let refreshTokensStorage: string[] = []; //this should be stored ideally in a database or redis cache

function generateAccessToken(user: User, secret: string) {
  return jwt.sign(user, secret, {
    expiresIn: "1d",
  });
}

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO users (username, email, passwordHash) VALUES ($1, $2, $3)",
      [username, email, passwordHash],
      (err, results) => {
        if (err) {
          throw err;
        }

        const accessToken = generateAccessToken(
          { username },
          accessTokenSecret
        );
        const refreshToken = generateAccessToken(
          { username },
          refreshTokenSecret
        );

        refreshTokensStorage.push(refreshToken);

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

    const accessToken = generateAccessToken({ username }, accessTokenSecret);
    const refreshToken = generateAccessToken({ username }, refreshTokenSecret);

    refreshTokensStorage.push(refreshToken);

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

  try {
    if (refreshToken == null) return res.sendStatus(401);
    // if (!refreshTokensStorage.includes(refreshToken))
    //   return res.sendStatus(403);

    // jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    //   if (err) return res.sendStatus(403);
    //   const accessToken = generateAccessToken({ username });
    //   res.json({ accessToken });
    // });
  } catch {
    res.sendStatus(500);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

export default { createUser, loginUser, logoutUser, refreshToken };
