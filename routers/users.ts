import express from "express";
import User from "../models/User";
import {UserFields} from "../types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  const userData: UserFields = {
    username: req.body.username,
    password: req.body.password,
    token: randomUUID()
  };

  try {
    const user = new User(userData);

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

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Password is wrong!'});
  }

  user.token = randomUUID();
  await user.save();

  res.send({message: 'Username and password correct!', user});
});

// users/secret
usersRouter.post('/secret', async (req, res) => {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }

  return res.send({message: 'Secret message', user});
});

export default usersRouter;