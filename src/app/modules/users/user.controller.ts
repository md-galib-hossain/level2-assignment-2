import { Request, Response } from "express";
import { UserServices } from "./user.service";
import JoivalidationSchema, { Joivalidationforproduct } from "./user.validation";

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
      message: "User created successfully!",
      data: result,
    });
  } catch (err : any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
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
      // If the user is not found then will show message : not found
      return res.status(500).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
      
       res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result,
      });
  } catch (err) {
    console.log(err);
  }
};


//update single user
const updateSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const user = req.body
  try {
 //validating data using Joi
 const { error } = JoivalidationSchema.validate(user);
 if (error) {
    
     return res.status(500).json({
         success: false,
         message: "Validation error",
         error: error.details,
       });
 }

    const result = await UserServices.updateSingleUserFromDB(userId , user);

   if (!result) {
      // If the user is not found then will show message : not found
      return res.status(500).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
      
       res.status(200).json({
        success: true,
        message: "User Updated successfully!",
        data: result,
      });
  } catch (err) {
    console.log(err);
  }
}

//delete single user
const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const result = await UserServices.deleteSingleUserFromDB(userId);

   if (!result) {
      // If the user is not found then will show message : not found
      return res.status(500).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
      
       res.status(200).json({
        success: true,
        message: "User Updated successfully!",
        data: null,
      });
  } catch (err) {
    console.log(err);
  }

}


// adding product
const addSingleProduct = async (req: Request, res: Response) => {
  const { userId } = req.params
  const  product  = req.body
  try {
     //validating data using Joi
 const { error } = Joivalidationforproduct.validate(product);
 if (error) {
     return res.status(500).json({
         success: false,
         message: "Product structure is not valid",
         error: error.details,
       });
 }

    const result = await UserServices.addNewProductToDB(userId,product);

   if (!result) {
      return res.status(500).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
      
       res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
  } catch (err) {
    console.log(err);
  }
}


//get all orders from single user
const getAllOrdersForSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const result = await UserServices.getAllOrdersForSingleUserFromDB(userId);

   if (!result) {
      // If the user is not found then will show message : not found
      return res.status(500).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }
    });
    }
      
       res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
  } catch (err) {
    console.log(err);
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,deleteSingleUser,addSingleProduct,getAllOrdersForSingleUser
};
