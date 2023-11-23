import { Request, Response } from "express";
import { UserServices } from "./user.service";
import Joi from "joi";

//creating user
const createUser = async (req: Request, res: Response) => {
  try {
    //joi schema validation
    const JoivalidationSchema = Joi.object({
      userId: Joi.number().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      fullName: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }).required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      isActive: Joi.boolean().required(),
      hobbies: Joi.array().items(Joi.string()).required(),
      address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
      }).required(),
      orders: Joi.array().items({
        productName: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
      }),
    });

    const user = req.body;
    //calling service function to send the user data from body
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
    //send response
    res.status(200).json({
      success: true,
      message: "User is retrieved succesfully",
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
