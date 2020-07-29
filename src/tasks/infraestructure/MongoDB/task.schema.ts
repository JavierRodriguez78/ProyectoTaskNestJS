import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';


export const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    user: { type: Schema.Types.ObjectId, ref:"User"}
})