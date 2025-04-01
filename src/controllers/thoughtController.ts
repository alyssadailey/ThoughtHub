import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';


// get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // get a single thought
export const getThoughtById = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) 
        return res.status(404).json({ message: 'No thought with that ID' });
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };

  // post a new thought
export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
        
        

      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // update a thought
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) 
        return res.status(404).json({ message: 'No thought with that ID' });
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };

  // delete a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) 
        return res.status(404).json({ message: 'No thought with that ID' });
      return res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };
  
  // add a reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      console.log(thought);

      if (!thought)
         return res.status(404).json({ message: 'No thought with that ID' });
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };

  //delete reaction

  export const removeReaction = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: {reactionId: req.params.reactionId}}},
            { new: true }
        );
        console.log(thought);
if (!thought) 
    return res.status(404).json({ message: 'No thought found with that ID'})
return res.json(thought);
    } catch(err) {
        res.status(500).json(err)
        return
    }
  }