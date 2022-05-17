const usersRouter = require("express").Router();

const { check, validationResult } = require("express-validator");
const lodash = require("lodash");

const auth = require("../middleware/auth");
const User = require("../db/model/user");
const {
  addToDatabase,
  deleteFromDatabaseById,
  updateInstanceInDatabase,
} = require("./utils");

// POST/CREATE a new user - SIGNUP
usersRouter.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("username").isLength({ min: 6 }),
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isStrongPassword(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        throw new Error(
          `Invalid inputs passed! Please, check your data and try again.`
        );
      }
      const user = await addToDatabase("users", req.body);
      // const token = user.toObject({ getters: true }).tokens[0];
      console.log(`Signing up successfully!`, user);
      res.status(201).json({
        user: user.data.toObject({ getters: true }),
        token: user.token,
      });
    } catch (error) {
      console.log(error);
      error.status = error.status || 400;
      next(error);
    }
  }
);

// LOGIN
usersRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();

    // METHOD-2
    res.json({
      user: user.toObject({ getters: true }),
      token,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// LOGOUT
usersRouter.post("/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.json({ message: "Logging out sucessfully!" });
  } catch (error) {
    next(error);
  }
});

// LOGOUT ALL users
usersRouter.post("/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: "Logging out all devices sucessfully!" });
  } catch (error) {
    next(error);
  }
});

// GET/ READ user profile
usersRouter.get("/me", auth, async (req, res, next) => {
  try {
    // console.log(typeof req.user);
    // console.log(typeof req.user._id);
    // console.log(typeof req.user.toObject({ getters: true }));
    // console.log(typeof req.user.toObject({ getters: true })._id);

    // get virtual property
    // const userEnvelopes = await User.findById("627b2db242d4786f67f49d0c");
    // await userEnvelopes.populate("envelopes");
    // console.log(userEnvelopes.envelopes);

    res.json({ user: req.user.toObject({ getters: true }) });
  } catch (error) {
    next(error);
  }
});

// UPDATE user profile
usersRouter.patch("/me", auth, async (req, res, next) => {
  try {
    const updatedUser = await updateInstanceInDatabase(
      "users",
      req.body,
      {
        _id: req.user._id,
      },
      undefined,
      req.user
    );
    if (updatedUser.error) {
      const err = new Error(updatedUser.error);
      err.status = 400;
      // return next(err);
      throw err;
    }
    res.json({ update: updatedUser });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
// DELETE user
usersRouter.delete("/me", auth, async (req, res, next) => {
  try {
    // METHOD-1
    // const user = await deleteFromDatabaseById({ _id: req.user._id }, "users");

    // METHOD-2
    await req.user.remove();
    res.json({ message: "Account deleted sucessfully!" });
  } catch (error) {
    next(error);
  }
});

usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

module.exports = usersRouter;
