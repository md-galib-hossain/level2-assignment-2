import { Schema, model, connect } from "mongoose";
import { User, UserStaticModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<User, UserStaticModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true, trim: true },
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
    },
  ],
});

//creating a custom static method
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });

  return existingUser;
};
//pre save middleware
userSchema.pre("save",async function (next) {
  //hashing password and save ot db
  const user = this;
  user.password = await bcrypt.hash(user.password, 12);
  next()
});

// creating model with my schema
export const UserModel = model<User, UserStaticModel>("User", userSchema); //setting my schema & User type
