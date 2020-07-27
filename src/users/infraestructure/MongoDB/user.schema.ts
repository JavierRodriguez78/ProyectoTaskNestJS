import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true},
    password: String,
})