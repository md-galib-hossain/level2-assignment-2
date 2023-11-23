import { userInfo } from "os";
import { User } from "./user.interface";
import { UserModel } from "./user.model";

 const createUserIntoDB = async (user : User)=>{

   const result = await UserModel.create(user) //notun data pathabe
  

   return result;

}

const getAllUsersFromDB = async () =>{
const result = await UserModel.find({}).select('-_id username fullName age email address')
return result
}
const getSingleUserFromDB = async (userId : string) =>{
const result = await UserModel.findOne({userId})
return result
}

export const UserServices = {
    createUserIntoDB,getAllUsersFromDB,getSingleUserFromDB
}