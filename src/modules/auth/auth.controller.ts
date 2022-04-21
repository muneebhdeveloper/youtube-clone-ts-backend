import { Request, Response } from "express";

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // Find the user by email

  // Check if user exists

  // Verify user password

  // Sign a JWT

  // Add a cookie to the response

  // Respond
}
