import { Model } from "mongoose";

type FullName = {
    firstName: string;
    lastName: string;
  };
  
  type Address = {
    street: string;
    city: string;
    country: string;
  };
  
  type Order = {
    productName: string;
    price: number;
    quantity: number;
  };
  
 export type User = {
    userId: number;
    username: string;
    password: string;
    fullName: FullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: Address;
    orders?: Order[]; 
  };

//for  creating static method
export interface UserStaticModel extends Model<User> {
  isUserExists(id : string): Promise<User | null>
}