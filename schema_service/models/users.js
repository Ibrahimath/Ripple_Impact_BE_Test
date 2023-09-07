import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
  email: String,
  body: String,
  passwordSalt: String,
  passwordHash:String,
  date: { type: Date, default: Date.now },
});

export const User = mongoose.model('user', userSchema)