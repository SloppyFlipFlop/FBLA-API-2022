const express = require("express")

const { createAttraction, deleteAttraction, getAttraction, getAllAttraction, updateAttraction } = require("../controllers/attractionController");

const attractionRouter = express.Router();


/*
create attraction - post
delete attraction - delete
get attraction - get
get all attraction - get
update attraction - patch/put
*/

attractionRouter.post(createAttraction).delete(deleteAttraction).get(getAttraction).get(getAllAttraction).put(updateAttraction);

module.exports = attractionRouter;
