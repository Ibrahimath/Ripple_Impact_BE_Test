 import {User} from "../models/users.js"
 import {validateRegister} from "../validations/index.js"
 import { hashPassword, comparePassword } from "../helpers/helpers.js";
 export const resolvers = {
    Query: {
      user: async (_, { id }) => {
        // Implement a resolver to fetch a user by ID from the database
        // You may use Mongoose or your preferred database library here
      },
    },
    Mutation: {
      signup: async (_, { input }) => {
        // Implement user registration logic
        const validateData = validateRegister(input);
    if (validateData.error) {

      throw new Error(validateData.error.details[0].message);
    }
    const { email, username, password } = input;
    //check if the user already exists
    const findUser = User.findOne({ email: email})
    console.log(findUser);
    // if(findUser){
    //   throw new Error("User already exists");
    // }
    const { hash, salt } = await hashPassword(password);
        await User.create({ email: email,
            username: username,
              passwordHash: hash,
            passwordSalt: salt });

              return "done"
      },
      login: async (_, { input }) => {
        const { email, password } = input;
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({
        email: email
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const checkPasssword = await comparePassword(
      password,
      user.dataValues.passwordHash
    );
    if (!checkPasssword) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    //generate token
    const token = jwt.sign(
      {
        email: user.dataValues.email,
        _id: uuidv4(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "50d" }
    );

    let login = {
        
            token: ";lui",
            user: "kuj"
          }

    return login
    ;
  } catch (err) {
    
  }
      },
    },
  };

