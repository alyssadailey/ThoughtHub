import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';


// GET /api/users - GETS ALL USERS
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate({path: 'thoughts', populate: {path: 'reactions'}}).populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET /api/users/:userId - GETS A SINGLE USER BY ID
  export const getUserById = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        return res.json(user);
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    };

// POST /api/users - CREATES A NEW USER
export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //PUT /api/users/:userId - UPDATES A USER BY ID
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };

// DELETE /api/users/:userId - DELETES A USER BY ID

export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
  
      if (!user)
        return res.status(404).json({ message: 'No user with that ID' });
  
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
  
      return res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };

  //POST- /api/users/:userId/friends/:friendId- add friend

  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user)
         return res.status(404).json({ message: 'No user with that ID' });
      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
      return; 
    }
  };

  //DELETE- /api/users/:userId/friends/:friendId- remove a friend

  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user)
         return res.status(404).json({ message: 'No user with that ID' });
      return res.json(user);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };