import { Request, Response } from "express";
import { UserServices } from "./user.service";
import JoivalidationSchema from "./user.validation";

//creating user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    //validating data using Joi
    const { error } = JoivalidationSchema.validate(user);

    //calling service function to send the user data from body

    if (error) {
       
        return res.status(500).json({
            success: false,
            message: "Validation error",
            error: error.details,
          });
    }
    const result = await UserServices.createUserIntoDB(user);


    //send response
    res.status(200).json({
      success: true,
      message: "User is created succesfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something wen wrong",
      error: err,
    });
  }
};

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: "Users are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

//get single user
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.getSingleUserFromDB(userId);

   if (!result) {
      // If the user is not found, respond with a 404 status code
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
      
       res.status(200).json({
        success: true,
        message: "User is retrieved successfully",
        data: result,
      });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
