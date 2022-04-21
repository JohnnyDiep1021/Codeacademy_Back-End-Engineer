const mongoose = require("mongoose");
const validator = require("validator");

// Create schema for new model
const envelopesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
    },
    budget: {
      type: Number,
      default: 0,
      // required: true,
      validate(val) {
        if (val < 0) {
          throw new Error(`Budget must be a positive number`);
        }
      },
    },
    notes: [
      {
        note: {
          type: String,
          default: "",
          validate(val) {
            if (val.length > 65) {
              throw new Error(`Note contain only 65 characters`);
            }
          },
        },
      },
    ],
    envelopeId: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// create model methods
envelopesSchema.statics.getProperty = async function () {
  // console.log(Object.keys(this.db));
  return Object.keys(this.schema.obj);
};
const Envelopes = mongoose.model("Envelopes", envelopesSchema);

module.exports = Envelopes;
