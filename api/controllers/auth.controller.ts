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

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

type User = {
  username: string;
};

function generateAccessToken(user: User) {
  return jwt.sign(user, accessTokenSecret, {
    expiresIn: "1d",
  });
}

export const createUser = async (req: Request, res: Response) => {
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

        const accessToken = generateAccessToken({ username });

        res.send({
          status: 201,
          messsage: `User added with ID: ${results}`,
          accessToken,
        });
      }
    );
  } catch {
    res.sendStatus(500);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log("Danesh /login", req.body);
  const { username, password } = req.body;

  try {
    console.log("DNAESH HELLO");
    const dbResponse = await pool.query(
      `SELECT passwordHash FROM users WHERE username = '${username}'`
    );

    const match = bcrypt.compare(password, dbResponse.rows[0].passwordhash);

    if (!match) {
      res.send({ status: 500, message: "bad password" });
      return;
    }

    const accessToken = generateAccessToken({ username });
    // const refreshToken = jwt.sign(user, refreshTokenSecret);

    res.send({
      status: 201,
      accessToken,
      // refreshToken
    });
  } catch {
    res.sendStatus(500);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
