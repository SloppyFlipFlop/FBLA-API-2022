const User = require("../models/user");
const { BadRequestError, CustomAPIError, UnauthError } = require("../errors");
require("dotenv").config();
const JWT = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  // Hashing - hashing a string through a formula to get back a completely different string.
  // salting - adding a random string of numbers to the start of the string to make it harder to guess.
  // peppering - adding a random letter [a-zA-Z] to the end of a string to make it harder to guess.
  
	const newUser = await User.create(req.body);
	const token = newUser.createJWT()
  res.status(StatusCodes.CREATED).json({ newUser }).json({ user: newUser.name, userID: newUser._id, token });
};

const login = async (req, res) => {
  
	const {email, password} = req.body;

	if(!email || !password) {
		throw new BadRequestError("fields cannot be left blank");
	}

	const userLogin = await User.findOne({email});

	if(!userLogin) {
		throw new UnauthError("Invaild Credentials");
	}

	const isPasswordCorrect = await userLogin.comparePassword(password);
	if(!isPasswordCorrect) {
		throw new BadRequestError("Invaild Credentials");
	}

	const token = userLogin.createJWT();

	res.status(StatusCodes.OK).json({user: {name: userLogin.name}, token});
};

module.exports = {
  register,
  login,
};
