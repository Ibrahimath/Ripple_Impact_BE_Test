import { User } from "../models/users.js";
import { validateRegister } from "../validations/index.js";
import { hashPassword, comparePassword } from "../helpers/helpers.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    user: async (_, { email }) => {
      const findUser = await User.findOne({ email: email });

      return findUser;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const validateData = validateRegister(input);
        if (validateData.error) {
          throw new Error(validateData.error.details[0].message);
        }
        const { email, username, password } = input;
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          throw new Error("User already exists");
        }
        const { hash, salt } = await hashPassword(password);
        await User.create({
          email: email,
          username: username,
          passwordHash: hash,
          passwordSalt: salt,
        });

        const user = await User.findOne({ email: email });
        delete user.passwordHash;
        delete user.passwordSalt;
        delete user._id;
        return user;
      } catch (err) {
        console.log(err.message);
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      try {
        if (!email || !password) {
          throw new Error("All fields are required");
        }
        const user = await User.findOne({
          email: email,
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        const checkPasssword = await comparePassword(
          password,
          user.passwordHash
        );

        if (!checkPasssword) {
          throw new Error("Invalid credentials");
        }
        //generate token
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        const AuthPayload = {
          token: token,
          user: user,
        };

        return AuthPayload;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
