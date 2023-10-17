// Add All business logic here

const Joi = require("joi");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{2,25}$/;
const lowercaseRegex = /[a-z]/;

const authController = {
  // Register
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

    return res.status(201).json({
      user: user,
    });
    // 7 -
  },

  // - Login
  async login() {},
};

// Export
module.exports = authController;
