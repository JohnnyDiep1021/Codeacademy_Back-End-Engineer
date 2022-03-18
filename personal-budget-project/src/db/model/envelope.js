const mongoose = require("mongoose");
const validator = require("validator");

// Create schema for new model
const envelopesSchema = mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
    required: true,
    validate(val) {
      if (val < 0) {
        throw new Error(`Budget must be a positive number`);
      }
    },
  },
  envelopeId: {
    type: String,
  },
});

// create model methods
envelopesSchema.statics.getProperty = async function () {
  // console.log(Object.keys(this.db));
  return Object.keys(this.schema.obj);
};
const Envelopes = mongoose.model("Envelopes", envelopesSchema);

module.exports = Envelopes;
