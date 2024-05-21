import { Schema, Document } from 'mongoose';

export interface Task extends Document {
    name: string;
    userId: string;
    priority: number;
}

export const TaskSchema = new Schema<Task>({
    name: { type: String, required: true },
    userId: { type: String, required: true },
    priority: { type: Number, required: true },
});


TaskSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

TaskSchema.set('toJSON', {
    virtuals: true,
});