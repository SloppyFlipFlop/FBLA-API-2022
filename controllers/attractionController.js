const { StatusCodes } = require("http-status-codes");




const createAttraction = async (req, res) => {
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


