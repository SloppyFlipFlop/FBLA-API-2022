const { StatusCodes } = require("http-status-codes");

const Attraction = require("../models/attraction");


const createAttraction = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  // const attraction = await Attraction.create(req.body);

  // res.status(StatusCodes.CREATED).json({ attraction });
  res.status(StatusCodes.OK).json({ msg: 'createAttraction' })
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
  res.status(StatusCodes.OK).json({ msg: 'updateAttraction' })
}

module.exports = { createAttraction, deleteAttraction, getAttraction, getAllAttraction, updateAttraction }


