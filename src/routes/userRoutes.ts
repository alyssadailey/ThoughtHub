import express, { Request, Response} from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/users- CREATES A NEW USER
router.post('/', async (req: Request, res: Response) => {
try {
    const user = await User.create(req.body);
    res.status(201).json(user);
} catch (err) {
    if (err instanceof Error) {
    res.status(400).json({ message: err.message });
} else {
    res.status(400).json({ message: 'An unknown error occurred' });
  }
}
});

// GET /api/users - Get all users
router.get('/', async (_req: Request, res: Response) => {
    try{
        const users = await User.find()
        // UNCOMMENT WHEN THOUGHT ROUTES ARE SET UP
        // .populate('thoughts')
        .populate('friends');
        res.status(200).json(users);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message});
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// GET /api/users/:userId - Get a single user by ID
router.get('/:userId', async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.params.userId)
        // UNCOMMENT WHEN THOUGHT ROUTES ARE SET UP
        // .populate('thoughts')
        .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
     } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

export default router;