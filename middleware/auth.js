const jwt = require("jsonwebtoken");
const { UnauthError } = require("../errors");
require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthError("No token provided");
	}

	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userID: payload.userID, name: payload.name };

		next();
	} catch(error) {
		throw new UnauthError("Not authorized to access this route");
	}
};

module.exports = authenticationMiddleware;
