import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TOrders, TUser } from './userInterface';
import config from '../../config';

const OrderSchema = new Schema<TOrders>({
  productName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  orders: { type: [OrderSchema], default: [] },
});

//Pre Hook Implement
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});

//Post Hook Implement
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

const User = model<TUser>('User', userSchema);

export default User;
