import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const verifyLegacyMd5 = (password: string, hash: string) => {
  const md5 = crypto.createHash("md5").update(password).digest("hex");
  return md5 === hash;
};

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtTtl });
};

export const signRefreshToken = (payload: object) => {
  return jwt.sign(payload, env.refreshSecret, { expiresIn: `${env.refreshTtlDays}d` });
};

export const verifyAccessToken = (token: string) => jwt.verify(token, env.jwtSecret);

export const verifyRefreshToken = (token: string) => jwt.verify(token, env.refreshSecret);
