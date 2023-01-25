import { Pool } from "pg";
import { Request, Response } from "express";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT as unknown as number,
});

const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
    if (err) {
      throw err;
    }
    res.send({ status: 200, results: results.rows });
  });
};

export default { getUsers };
