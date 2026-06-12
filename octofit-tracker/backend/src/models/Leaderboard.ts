import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  achievements: string[];
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    rank: {
      type: Number,
      required: true,
      default: 0
    },
    achievements: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
