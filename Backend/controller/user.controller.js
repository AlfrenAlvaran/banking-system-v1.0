import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "../utils/index.js";
import validator from "validator";
const SignUp = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    state,
    postal,
    BOD,
    SSN,
    address,
  } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: true, message: "Please enter a valid email" });
    }

    if (!password || password.length <= 8) {
      return res.status(400).json({
        error: true,
        message: "Password must contain at least 8 characters",
      });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email,
      firstName,
      lastName,
      state,
      postal,
      BOD,
      SSN,
      password: hashedPassword,
      address,
    });

    if (user) {
      const token = createToken(user._id);
      return res.status(201).json({
        _id: user._id,
        email: user.email,
        token,
      });
    }
  } catch (error) {
    console.error(error?.message);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};

// const signIn = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       res.status(400).json({ error: true, message: "user doesn't exist" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ error: true, message: "Wrong Credentials" });
//     }
//     const token = createToken(user._id);
//     req.session.user = {
//       _id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//     };
//     // res.status(201).json({
//     //   error: false,
//     //   token,
//     //   user: {
//     //     _id: user._id,
//     //     email: user.email,
//     //     firstName: user.firstName,
//     //     lastName: user.lastName,
//     //   },
//     // });

//     res.status(201).json({
//       error: false,
//       token,
//       user: req.session.user,
//     });
//   } catch (error) {
//     console.error(error?.message);
//     return res.status(500).json({ error: true, message: "Server error" });
//   }
// };
const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
      const user = await UserModel.findOne({ email });
      
      // Check if the user exists
      if (!user) {
          return res.status(400).json({ error: true, message: "User doesn't exist" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      // Check if the password matches
      if (!isMatch) {
          return res.status(400).json({ error: true, message: "Wrong Credentials" });
      }

      const token = createToken(user._id);
      req.session.user = {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
      };

      res.status(200).json({
          error: false,
          token,
          user: req.session.user,
      });
  } catch (error) {
      console.error(error?.message);
      return res.status(500).json({ error: true, message: "Server error" });
  }
};


const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
  }

  res.clearCookie('connect.sid'); // This clears the session cookie
  return res.status(200).json({ error: false, message: "Logged out successfully" }); 
  })
}
export { signIn, SignUp, logout };
