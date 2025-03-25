// import mongoose, { Types } from 'mongoose';
// import User from '../models/User';
// import Thought from '../models/Thought';

// const seedDatabase = async () => {
//   try {
    // Clear existing data in the collections
    // await User.deleteMany({});
    // await Thought.deleteMany({});

    // // Create sample users
    // const user1 = new User({ username: 'john_doe', email: 'john@example.com' });
    // const user2 = new User({ username: 'jane_doe', email: 'jane@example.com' });

    // Save users to database
    // await user1.save();
    // await user2.save();

    // Create thoughts for the users
//     const thought1 = new Thought({ thoughtText: 'This is John\'s first thought.', username: 'john_doe' });
//     const thought2 = new Thought({ thoughtText: 'This is Jane\'s first thought.', username: 'jane_doe' });
//     const thought3 = new Thought({ thoughtText: 'Another thought from John.', username: 'john_doe' });

//     // Save thoughts to database
//     await thought1.save();
//     await thought2.save();
//     await thought3.save();

//     // Associate thoughts with users
//     user1.thoughts.push(thought1._id as Types.ObjectId, thought3._id as Types.ObjectId); // Add thoughts to user1
//     user2.thoughts.push(thought2._id as Types.ObjectId); // Add thought to user2

//     // Save the updated user documents
//     await user1.save();
//     await user2.save();

//     console.log('Seeding completed successfully!');
//   } catch (err) {
//     console.error('Error seeding database:', err);
//   }
// };

// Connect to the database and run the seeding function
// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to the database');
//     seedDatabase();
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   });
