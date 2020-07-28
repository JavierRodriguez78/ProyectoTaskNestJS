import * as mongoose from 'mongoose';
import *  as  bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true},
    password: String,
});

userSchema.methods.checkPassword = async(password)=> {
    let user = this;
    return await bcrypt.compare(password, user.password);
}
