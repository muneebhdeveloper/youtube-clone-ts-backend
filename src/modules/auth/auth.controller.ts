import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { findUserByEmail } from "../user/user.service";
import { signJwt } from "./auth.utils";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // Find the user by email
  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const payload = user.toJSON();

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.156e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);

  // Check if user exists

  // Verify user password

  // Sign a JWT

  // Add a cookie to the response

  // Respond
}
