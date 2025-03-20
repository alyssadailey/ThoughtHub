import express, { Request, Response} from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/users- CREATES NEW USER
// creates user, and sends user data as JSON response
// if error, sends error as JSON response
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
// returns all users as JSON
router.get('/', async (_req: Request, res: Response) => {
    try{
        const users = await User.find()
        .populate('thoughts')
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

//GET a single user by ID


export default router;