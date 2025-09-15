import express from "express";
import User from "../models/User";
import {UserFields} from "../types";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  const userData: Omit<UserFields, 'token'> = {
    username: req.body.username,
    password: req.body.password
  };

  try {
    const user = new User(userData);
    user.generateToken();

    await user.save();
    res.send(user);
  } catch(error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({error: error.message});
    }

    next(error);
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username not found!'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong!'});
  }

  user.generateToken();
  await user.save();

  res.send({message: 'Username and password correct!', user});
});

usersRouter.post('/secret', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  return res.send({message: 'Secret message', user});
});

export default usersRouter;