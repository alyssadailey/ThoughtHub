import express from 'express';
import userRoutes from './routes/userRoutes.js'
import thoughtRoutes from './routes/thoughtRoutes.js';
import db from './config/connection.js';

// connects to the DB
await db();

const PORT = process.env.PORT || 3001;
const app = express();


// Middlewear
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Use the routes
// Mounts the user routes and thought routes at the /api endpoint
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);


// Start the server and sends a message to the console
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
