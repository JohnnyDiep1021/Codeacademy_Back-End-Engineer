const jwt = require("jsonwebtoken");
const User = require("../db/model/user");

const auth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // Validate the header
    const decoded = await jwt.verify(token, "meothui2001");
    // Find the authenticated user
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error(`error: Please authenticate`);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    // console.log(error);
    error.status = 401;
    next(error);
  }
};
module.exports = auth;