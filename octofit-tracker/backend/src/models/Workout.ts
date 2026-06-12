import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  duration: number;
  intensity: string;
  calories: number;
  difficulty: string;
  targetedMuscles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    intensity: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high']
    },
    calories: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard']
    },
    targetedMuscles: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
