import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  cid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Role can be 'user' or 'supervisor'
});

const User = mongoose.model('User', userSchema);

export default User;