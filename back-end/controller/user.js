import exp from "express";
import userModel from "../schema/user.model.js";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(401).json("all feild required");
    }

    const exitsUser = await userModel.findOne({ email });
    if (exitsUser) {
      return res.status(501).json("user is already exits");
    }
    let newUser = await userModel.create({
      username,
      email,
      password,
    });

    return res.status(201).json("user Register successfully ", newUser);
  } catch (error) {
    console.log("something went wrong");
    return res.status(404).json({
      message: "Register succuss",
      user: newUser,
    });
  }
};

const userDelete = async (req, res) => {
  try {
    const userExits = await userModel.find({ username: "lol" });
    // console.log(userExits);
    if (!userExits) {
      return res.status(501).json("user is not found in db");
    }

    const deleteUser = await userModel.findOneAndDelete(userExits);

    // console.log(userExits);
    console.log(deleteUser);
    return res.status(201).json({
      message: "delete the db",
      data: deleteUser,
    });

    // const user = userModel.findOneAndDelete({ name: "lol" });
    // if (!user) {
    //   return res.status(501).json("user not delete");
    // }
    // res.status(201).json({
    //   message: "user deleted successfully",
    //   deleteUser: user,
    // });
  } catch (error) {
    return res.status(404).json("something went wrong");
  }
};

const getAllUser = async (req, res) => {
  try {
    const checkUser = await userModel.find();
    if (!checkUser) {
      return res.status(501).status("user not found in db");
    }

    return res.status(201).json({
      message: "find all user",
      data: checkUser,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
      message: "something went wrong",
    });
  }
};
export { createUser, userDelete, getAllUser };
