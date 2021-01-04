import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../util/validateQuery";
import {
  loginRequestSchema,
  loginRequest,
  signupRequest,
  signupRequestSchema,
} from "./auth.schema";
import { signupUser, loginUser } from "./auth.service";

const router: Router = Router();

const handlePostSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const signupCreds = req.body as signupRequest;
    await signupUser(signupCreds);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const handlePostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body as loginRequest;
    const output = await loginUser(input);
    res.status(200).json({ success: true, ...output });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/auth/signup",
  validateQuery("body", signupRequestSchema),
  handlePostSignup
);
router.post(
  "/auth/login",
  validateQuery("body", loginRequestSchema),
  handlePostLogin
);

export default router;
