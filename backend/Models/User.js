import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: String, 
  password: String,
});

const UserModel = mongoose.model('users', UserSchema);

export { UserModel };
