const mongoose = require("mongoose");
const validator = require("validator");

const Envelopes = mongoose.model("Envelopes", {
  category: {
    type: String,
    trim: true,
    required: true,
  },
  expense: {
    type: Number,
    default: 0,
    required: true,
    validate(val) {
      if (val < 0) {
        throw new Error(`Expense must be a positive number`);
      }
    },
  },
  envelopeId: {
    type: String,
  },
});

module.exports = Envelopes;
