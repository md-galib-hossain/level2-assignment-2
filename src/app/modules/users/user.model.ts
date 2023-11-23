import { Schema, model, connect } from 'mongoose';
import { User } from './user.interface';


const userSchema = new Schema({
  userId: { type: Number, required: true , unique: true },
  username: { type: String, required: true, unique: true, trim:true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim:true },
    lastName: { type: String, required: true , trim:true},
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, trim:true},
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
    
  ]
});

// creating model with my schema
export const UserModel = model<User>('User',userSchema) //setting my schema & User type