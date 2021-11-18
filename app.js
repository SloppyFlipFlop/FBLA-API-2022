
// enviroment setup
require("dotenv").config();
require("express-async-errors");

// core app
const express = require("express");
const app = express();
const connectDB = require("./database/connect");

// middleware

// const notFound = require("./middleware/not-found");
// const errorHandlerMiddleware = require("./middleware/error-handler");
// const authenticationMiddleware = require("./middleware/auth");

// Routes
const userRouter = require("./routes/attraction-router");
const authRouter = require("./routes/auth-router");

// sercurity libraries
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

// swaggerUI
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
// const swaggerDocument = YAML.load("./swagger.yaml");

// variables
const minutes = 1000 * 60;
const limit = 15 * minutes;

const port = process.env.PORT || 3000;


const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app
      .set("trust proxy", 1) // 1 meaning true
      .use(
        rateLimiter({
          windowMs: limit,
          max: 100,
        })
      )
      .use([express.urlencoded({ extended: false }), express.json()])
      // safety blanket
      .use(helmet())
      // cors prevents CORS errors
      .use(cors())
      // xss (user sanitization) - cleans up user inputs to make sure they are safe.
      .use(xss())

      .get("/", (req, res) => {
        console.log(req)
        res.send('<h1>Job API</h1><a href="/api-docs">Documention</a>');
      })

      .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

      .use("/api/v1/auth", authRouter)
      .use("/api/v1/attraction", authenticationMiddleware, attractionRouter)

      // app.use(notFound);
      .use(errorHandlerMiddleware)

      .listen(port, () => {
        console.log(`LISTENING => ${port}`);
      });
  } catch (err) {
    console.error(err);
  }
};

startServer();