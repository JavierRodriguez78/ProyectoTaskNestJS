import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
})