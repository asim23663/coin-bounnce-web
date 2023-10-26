// Add All business logic here

const Joi = require("joi");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const UserDTO = require("../dto/user");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{2,25}$/;
const lowercaseRegex = /[a-z]/;

// - authController

const authController = {
  // - Register
  async register(req, res, next) {
    // 1 - Validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(lowercaseRegex).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = userRegisterSchema.validate(req.body);

    // 2 - if error in validation -> return error via middleware (is a simlple function which works between request and response)

    if (error) {
      return next(error); // next through the next middleware and validate data
    }
    // 3 - if email or username is already registered -> return an error

    const { username, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const usernameIsInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email is already registered, user annothher email",
        };

        return next(error);
      }

      if (usernameIsInUse) {
        const error = {
          status: 409,
          message: "Username is not avaialble, choose another username",
        };

        return next(error);
      }
    } catch (error) {
      next(error);
    }

    // 4 - Password Enncrypted, hash

    const hashedPassword = await bcrypt.hash(password, 10);

    // 5 - Store user data in db

    const usertToRegister = new User({
      username: username,
      email: email,
      name: name,
      password: hashedPassword,
    });

    const user = await usertToRegister.save();

    // 6 - Response send

    const userDto = new UserDTO(user);

    return res.status(201).json({
      user: userDto,
    });
    // 7 -
  },

  // - Login

  async login(req, res, next) {
    // 1 - validate user input

    // we expect input Data to be in such shape
    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      // email: Joi.string().email().required(),
      password: Joi.string().pattern(lowercaseRegex).required(),
    });
    // 2 - if validation error, return error

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error); // next through the next middleware and validate data
    }

    // deStructure
    const { username, password } = req.body;

    // const username = req.body.usernname
    // const password = req.body.password

    // 3 - Match username and password

    let user;
    try {
      // match user name
      user = await User.findOne({ username });

      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username",
        };

        return next(error);
      }

      // match Password
      // req.body.password -> hash -> match
      const isValidPassword = bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };

        return next(error);
      }

      const userDto = new UserDTO(user);
      return res.status(200).json({ user: userDto });
    } catch (error) {}

    // 4 - Returnn response
  },
};

// Export
module.exports = authController;
