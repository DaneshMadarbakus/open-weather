import { Pool } from "pg";
import { Request, Response } from "express";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT as unknown as number,
});

export const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (err, results) => {
    if (err) {
      throw err;
    }
    res.send({ status: 200, results: results.rows });
  });
};

// next();
// bcrypt.compare(req.body.password, passwordHash)

// export const getUserById = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// const updateUser = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, email } = req.body;

//   pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3",
//     [name, email, id],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };

// export const deleteUser = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("DELETE FROM users WHERE id = $1", [id], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).send(`User deleted with ID: ${id}`);
//   });
// };
