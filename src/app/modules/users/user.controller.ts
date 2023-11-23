import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userInfo } from "os";

const createUser = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    //calling service function to send the user data from body
    const result = await UserServices.createUserIntoDB(user);

    //send response
    res.status(200).json({
      success: true,
      message: "User is created succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req :Request , res : Response) =>{

    try{
const result = await UserServices.getAllUsersFromDB()

//send response
res.status(200).json({
    success: true,
    message: "Users are retrieved succesfully",
    data: result,
  });
    }catch(err){
        console.log(err)
    }
}

const getSingleUser = async (req :Request , res : Response) =>{
const {userId} = req.params;
    try{
const result = await UserServices.getSingleUserFromDB(userId)

//send response
res.status(200).json({
    success: true,
    message: "User are retrieved succesfully",
    data: result,
  });
    }catch(err){
        console.log(err)
    }
}

export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser

}