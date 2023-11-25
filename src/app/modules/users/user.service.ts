import { userInfo } from "os";
import { User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User) => {
  const userIdAsString: string = user.userId.toString();
  if (await UserModel.isUserExists(userIdAsString)) {
    throw new Error("User already exists!");
  }

  const result = await UserModel.create(user); //notun data pathabe
  // excluding the password from result
  const sanitizedResult = JSON.parse(JSON.stringify(result));
  delete sanitizedResult.password;

  return sanitizedResult;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}).select(
    "-_id -orders._id username fullName age email address"
  );
  return result;
};
//getSingleUserFromDB start
const getSingleUserFromDB = async (userId: string) => {
  try {
    if (await UserModel.isUserExists(userId)) {
      const result = await UserModel.findOne({ userId }).select("-password -_id -orders._id");
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//updating the user
const updateSingleUserFromDB = async (userId: string, user : User) => {
  try {
    if (await UserModel.isUserExists(userId)) {
      const result = await UserModel.findOneAndUpdate(
        { userId: userId },
        { $set: user },
        {new:true, projection: { password: 0 } }
      );
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteSingleUserFromDB = async (userId : string) =>{

  try {
    if (await UserModel.isUserExists(userId)) {
      const result = await UserModel.deleteOne({ userId: userId });

      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

// add new product
const addNewProductToDB = async (userId : string,product : User["orders"]) =>{

  try {
    if (await UserModel.isUserExists(userId)) {
      const result = await UserModel.updateOne(
        { userId: userId },
        {
          $push: {
            orders: product
          }
        }
      );
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

//get all orders for specific user
const getAllOrdersForSingleUserFromDB = async (userId: string) => {
  try {
    if (await UserModel.isUserExists(userId)) {
      const result = await UserModel.findOne({ userId }).select("orders -_id ");
      return result;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

//calculate all orders for singleUser
const calculateAllOrdersForSingleUserFromDB = async (userId: string) => {
  try {
    if (await UserModel.isUserExists(userId)) {
      const user = await UserModel.findOne({ userId });
      
      if (user) {
        const totalPrice = user.orders ? user.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0) : 0;
        
        return {"totalPrice": totalPrice};
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};


export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,addNewProductToDB,getAllOrdersForSingleUserFromDB,calculateAllOrdersForSingleUserFromDB
};
