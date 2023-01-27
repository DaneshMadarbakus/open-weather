import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);

  jwt.verify(authHeader || "", accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
}
