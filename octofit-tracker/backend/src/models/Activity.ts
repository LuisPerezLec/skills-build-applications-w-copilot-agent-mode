import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  date: Date;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Walking', 'Gym', 'Yoga', 'Other']
    },
    distance: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
