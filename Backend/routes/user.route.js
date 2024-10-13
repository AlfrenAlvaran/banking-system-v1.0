import express from "express";
import { SignUp, logout, signIn } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", SignUp);
userRouter.post('/logout', logout);
export default userRouter;
