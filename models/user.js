const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
    // unique: [true, "name must be unique"],
    minlength: [2, "must be more than 2 characters"],
    maxLength: [30, "must be less than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: [true, "email must be unique"],
    validate:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },

  password: {
    type: String,
    required: [true, "password must be provided"],
    minlength: [6, "password must be more than 5 characters"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
	next();
});

userSchema.methods.createJWT = function () {
	return JWT.sign(
		{ userID: this._id, name: this.name },
		process.env.JWT_SECRET,
		{
				expiresIn: process.env.JWT_LIFESPAN,
		}
);
}

userSchema.methods.comparePassword = async function (submittedPassword) {
	const isMatch = await bcrypt.compare(submittedPassword, this.password);
	return isMatch;
};



module.exports = mongoose.model("User", userSchema);
