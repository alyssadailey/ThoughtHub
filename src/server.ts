import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

// connects to the DB
await db();

const PORT = process.env.PORT || 3001;
const app = express();


// Middlewear
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Use the routes
app.use(routes);


// Start the server and sends a message to the console
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
