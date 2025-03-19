import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/users- CREATES NEW USER
// creates user, and sends user data as JSON response
// if error, sends error as JSON response
router.post('/', async (req, res) => {
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

export default router;