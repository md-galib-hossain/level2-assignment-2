import { Schema, model, connect } from 'mongoose';
import { User } from './user.interface';

const fullNameSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  });
  
  const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  });
  
  const orderSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  });
const userSchema = new Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema], default: [] }, 
});

// creating model with my schema
const UserModel = model<User>('Users',userSchema) //setting my schema & User type