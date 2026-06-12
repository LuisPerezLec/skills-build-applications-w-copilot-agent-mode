import mongoose, { Document } from 'mongoose';
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
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, {}> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Workout.d.ts.map