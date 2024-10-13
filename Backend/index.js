import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import userRouter from "./routes/user.route.js";
import session from "express-session";

// configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/SMC/auth", userRouter);


mongoose.connect(process.env.API_DB).then(() => {
  app.listen(PORT, () => {
    console.log(PORT);
    app.get("/", (req, res) => {
      res.send(PORT);
    });
  });
});
