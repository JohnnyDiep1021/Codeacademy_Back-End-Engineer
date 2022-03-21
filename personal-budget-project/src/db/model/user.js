const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Envelope = require("./envelope");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error(`Email is invalid. Try again!`);
        }
      },
    },
    password: {
      type: String,
      minLength: 6,
      trim: true,
      required: true,
      validate(val) {
        if (val.toLowerCase().includes("password"))
          throw new Error(`Password field cannot contain 'password'`);
      },
    },
    balance: {
      type: Number,
      default: 0,
      validate(val) {
        if (val < 0) throw new Error(`Balance must be positive`);
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Set up virtual property
userSchema.virtual("envelopes", {
  ref: "Envelopes",
  localField: "_id",
  foreignField: "owner",
});
// define instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "meothui2001");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;

  // get the actual user object in database which can be modified directly
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// define model method
userSchema.statics.findByCredentials = async function ({
  password,
  email,
  username = undefined,
} = {}) {
  try {
    if ((!email && !username) || !password) {
      throw Error(`Email/username and password are required to login!`);
    }
    let user;
    if (email) user = await User.findOne({ email });
    if (username) user = await User.findOne({ username });
    if (!user) {
      throw Error(`Invalid email/username or password`);
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw Error(`Invalid email/username or password`);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getProperty = async function () {
  // console.log(Object.keys(this.db));
  return Object.keys(this.schema.obj);
};
// define a middleware (called instance method) running before the a user data is saved
userSchema.pre("save", async function (next) {
  const user = this;
  // console.log(user);
  // only create hashedPassword if new users are created or existing password is updated)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;