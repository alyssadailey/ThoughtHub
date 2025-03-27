import { Request, Response } from 'express';
import { User } from '../models/index.js';


// GET /api/users - GETS ALL USERS
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
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
  