const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false,
    default: "",
    minlength: [9, "must be more than 9 characters"],
  },
  number: {
    type: String,
    required: false,
    default: "",
    minlength: [10, "must be more than 10 characters"],
    validate: 
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  },
  hours: {
    opens: {
      type: Number,
      required: false,
      match:[/([01][0123456789]|[2][123])[012345][0123456789]/]
    },
    closes: {
      type: Number,
      required: false,
      match:[/([01][0123456789]|[2][123])[012345][0123456789]/]
    },
    daysOpened: [{
      type: String,
      required: false,
    }]
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cost: {
    adult:{
      type: Number,
      default: 0,
    },
    child:{
      type: Number,
      default: 0,
    }
  },
  timeStamp: {
		type: Date,
		default: Date.now,
	}
})

module.exports = mongoose.model('Attraction', attractionSchema);