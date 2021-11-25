const express = require("express");

const {
  createAttraction,
  deleteAttraction,
  getAttraction,
  getAllAttraction,
  updateAttraction,
} = require("../controllers/attractionController");

const attractionRouter = express.Router();

attractionRouter.route("/").post(createAttraction);
attractionRouter.route("/").get(getAllAttraction);

attractionRouter.route("/:id").delete(deleteAttraction);
attractionRouter.route("/:id").get(getAttraction);
attractionRouter.route("/:id").put(updateAttraction);

module.exports = attractionRouter;
