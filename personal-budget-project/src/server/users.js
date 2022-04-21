const usersRouter = require("express").Router();

const lodash = require("lodash");
const morgan = require("morgan");

usersRouter.use(morgan("dev"));

const auth = require("../middleware/auth");
const User = require("../db/model/user");
const {
  addToDatabase,
  deleteFromDatabaseById,
  updateInstanceInDatabase,
} = require("./utils");

// POST/CREATE a new user - SIGNUP
usersRouter.post("/signup", async (req, res, next) => {
  try {
    const newUser = await addToDatabase("users", req.body);
    console.log(`New user created!`, newUser);
    res.status(201).send(newUser);
  } catch (error) {
    error.status = error.status || 400;
    next(error);
  }
});

// LOGIN
usersRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();

    // METHOD-2
    res.send({ user, token });
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
    res.send();
  } catch (error) {
    next(error);
  }
});

// LOGOUT ALL users
usersRouter.post("/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
});

// GET/ READ user profile
usersRouter.get("/me", auth, async (req, res, next) => {
  try {
    res.send(req.user);
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
      return next(err);
    }
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
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
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
usersRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});
module.exports = usersRouter;
