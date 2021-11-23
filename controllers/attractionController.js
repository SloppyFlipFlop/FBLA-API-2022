const { StatusCodes } = require("http-status-codes");

const Attraction = require("../models/attraction");


const createAttraction = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const attraction = await Attraction.create(req.body);

  res.status(StatusCodes.CREATED).json({ attraction });
}

const deleteAttraction = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'deleteAttraction' })
}

const getAttraction = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'getAttraction' })
}

const getAllAttraction = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'getAllAttraction' })
}

const updateAttraction = async (req, res) => {
  const {
    // body: { name, type, description, location },
    
    user: { userID },
    params: { id: attractionID },
  } = req;

  if (!req.body.name || !req.body.type || !req.body.description || !req.body.location) {
    throw new BadRequestError("Every attraction needs to have a name, type, description, and location. So please make sure they have all of them.");
  }

  const attraction = await Attraction.findByIdAndUpdate(
    { _id: userID }, // , createdBy: userID 
    {...req.body, cost: req.body.cost},
    { new: true, runValidators: true }
  );

  if (!attraction) {
    throw new BadRequestError(`No job with id ${attractionID}`);
  }

  res.status(StatusCodes.OK).json({ attraction });
  // res.status(StatusCodes.OK).json({ msg: 'updateAttraction' })
}

module.exports = { createAttraction, deleteAttraction, getAttraction, getAllAttraction, updateAttraction }


// Object.assign(
//   {
//     a: 1,
//     b: 2,
//     c: 3
//   },
//   {
//     b: 4,
//   }
// )