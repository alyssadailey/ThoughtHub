import { Schema, model, type Document } from 'mongoose';

interface IReaction {
    reactionBody: string;
    username: string;
    createdAt: Schema.Types.Date;
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Schema.Types.Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toISOString(),
    },
    },
    {
        _id: false,
        // Ensure getters are included when converting to JSON
        toJSON: { getters: true },
    }
);

interface IThought extends Document {
    thoughtText: string;
    username: string;
    createdAt: Schema.Types.Date;
    reactions: IReaction[];
}


const thoughtSchema = new Schema<IThought>(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toISOString(),
    },
    reactions: {
        type: [reactionSchema],
        default:[],
    },
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true
    }
);

// Create a virtual called `reactionCount`
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length; // Return the length of the `reactions` array
});

// Creates the Thought model using the thoughtSchema
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
