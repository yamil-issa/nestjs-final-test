
import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
},{ collection: 'users' });
