import express, { Request, Response} from 'express';
import mongoose from 'mongoose';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

const router = express.Router();

// POST /api/thoughts- CREATES A NEW USER
router.post('/', async (req: Request, res: Response) => {
    try {
        const { username, thoughtText } = req.body;

        //check if the user exists before creating a thought
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Create thought
        const thought = await Thought.create({ thoughtText, username });

        // ✅ Explicitly cast _id to ObjectId before checking validity
        const thoughtId = new mongoose.Types.ObjectId(thought._id as string);

        // Ensure TypeScript knows _id is of type ObjectId
        if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
            return res.status(400).json({ message: 'Invalid thought ID' });
        }

        // Push the thought's ID into the user's thoughts array
        user.thoughts.push(thoughtId as unknown as mongoose.Schema.Types.ObjectId);
        await user.save();

        return res.status(201).json(thought);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        } else {
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});


// GET /api/thoughts - GET ALL THOUGHTS
router.get('/', async (_req: Request, res: Response) => {
    try{
        const thoughts = await Thought.find()
        // UNCOMMENT WHEN THOUGHT ROUTES ARE SET UP
        // .populate('thoughts')
        // .populate('friends');
        res.status(200).json(thoughts);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message});
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// GET /api/thoughts/:thoughtId - GET A SINGLE USER BY ID
router.get('/:thoughtId', async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findById(req.params.thoughtId)
        // UNCOMMENT WHEN THOUGHT ROUTES ARE SET UP
        // .populate('thoughts')
        // .populate('friends');
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
     } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// PUT /api/thoughts/:thoughtId - UPDATE A USER BY ID
router.put('/:thoughtId', async (req: Request, res: Response) => {
    try {
                const thought = await Thought.findByIdAndUpdate(
                    req.params.thoughtId,
                    req.body,
                    { new: true, runValidators: true }
                );

                if (!thought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                return res.status(200).json(thought);
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ message: err.message });
                } else {
                    return res.status(400).json({ message: 'An unknown error occurred' });
                }
            }
        });

// DELETE /api/thoughts/:thoughtId - DELETE A USER BY ID
router.delete('/:thoughtId', async (req: Request, res: Response) => {
    try {

        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        return res.status(200).json(thought);

     } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});



export default router;