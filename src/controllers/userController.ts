// import { ObjectId } from "mongodb";
// import  Thought  from "../models/Thought";
/// REAL COMMENT!!!!!!!!!!!!!!!!!!
// import  User  from "../models/User";


// export const thoughtCount = async () => {
//     const numberOfThoughts = await Thought.aggregate()
//         .count('thoughtCount');
//     return numberOfThoughts;
// }

// REAL COMMENT!!!!!!!!!!!!!!!!!!!!!
// Aggregate function for getting the thought

// export const thought = async (thoughtId: string) =>
//     Thought.aggregate([


        // REAL COMMENT!!!!!!!!!!!!!!!!!!
        // only include the given thought by using $match



    //     { $match: { _id: new ObjectId(thoughtId) } },
    //     {
    //         $unwind: '$reactions',
    //     },
    //     {
    //         $group: {
    //             _id: new ObjectId(thoughtId), totalReactions: { $sum: 1}
    //         },
    //     },
    // ]);