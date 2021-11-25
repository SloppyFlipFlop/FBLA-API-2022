const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Attraction = require("../models/attraction");

const createAttraction = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const attraction = await Attraction.create(req.body);

  res.status(StatusCodes.CREATED).json({ attraction });
};

const deleteAttraction = async (req, res) => {
  const {
    params: { id: attractionID },
    user: { userID },
  } = req;

  const attraction = await Attraction.findByIdAndRemove({ _id: attractionID });

  if (!attraction) {
    throw new NotFoundError(`No attraction with id: ${attractionID} found.`);
  }

  res.status(StatusCodes.OK).json({ attraction });
};

const getAttraction = async (req, res) => {
  const {
    params: { id: attractionID },
  } = req;

  const attraction = await Attraction.findById(attractionID);

  if (!attraction) {
    throw new NotFoundError(`No attraction with the ID: ${attractionID}`);
  }

  res.status(StatusCodes.OK).json({ attraction });
};

const getAllAttraction = async (req, res) => {
  const attractions = await Attraction.find({}).sort("Created at");

  res.status(StatusCodes.OK).json({ attractions, length: attractions.length });
};

const updateAttraction = async (req, res) => {
  const {
    body: { name, type, description, location },
    user: { userID },
    params: { id: attractionID },
  } = req;

  if (!name || !type || !description || !location) {
    throw new BadRequestError(
      "Every attraction needs to have a name, type, description, and location. So please make sure they have all of them."
    );
  }

  const attraction = await Attraction.findByIdAndUpdate(
    { _id: attractionID }, // How we are finding the attraction
    req.body, // Whats changing in the attraction
    { new: true, runValidators: true } // options
  );

  if (!attraction) {
    throw new NotFoundError(`No attraction with id ${attractionID}`);
  }

  res.status(StatusCodes.OK).json({ attraction });
};

module.exports = {
  createAttraction,
  deleteAttraction,
  getAttraction,
  getAllAttraction,
  updateAttraction,
};
