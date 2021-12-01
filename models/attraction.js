const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: [
    {
      type: String,
      required: true,
      enum: {
        values: [
          "hiking-trail",
          "biking-trail",
          "adult-only",
          "local-event",
          "family-friendly",
          "historic",
          "historic-landmark",
          "historic-museum",
          "museum",
          "shop",
          "food",
          "restaurant",
          "dining",
          "fishing",
          "hunting",
          "lake",
          "bar",
          "camp",
          "local-business",
          "business"
        ],
        message: `{Value} is not supported. Also make sure that there are: no spaces in your type string and every letter is lowercase`,
      },
    },
  ],
  website: {
    type: String,
    required: false,
    default: "",
  },
  number: {
    type: String,
    required: false,
    default: "",

    validate: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
  },
  hours: {
    opens: {
      type: String,
      required: false,
      default: "Opened All Day",
      match: [/([01][0123456789]|[2][123])[012345][0123456789]/],
    },
    closes: {
      type: String,
      required: false,
      default: "Opened All Day",
      match: [/([01][0123456789]|[2][123])[012345][0123456789]/],
    },
    daysOpened: [
      {
        type: String,
        required: false,
        default: "Opened All Week",
      },
    ],
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
    adult: {
      type: Number,
      default: 0,
    },
    child: {
      type: Number,
      default: 0,
    },
    specials: [
      {
        type: String,
        require: false,
        default: "",
      },
    ],
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attraction", attractionSchema);
