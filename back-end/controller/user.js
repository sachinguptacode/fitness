import exp from "express";
import userModel from "../schema/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
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
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    let newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    // jwt token generate

    const token = jwt.sign({ email, username }, process.env.RefreshToken, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "Register successfully",
      token: token,
      data: newUser,
    });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(404).json({
      message: "Register not succuss",
      error: error,
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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(501).json({ message: "all field requered" });
    }

    const userExits = await userModel.findOne({ username });
    if (!userExits) {
      return res.status(501).json({ message: "user is not find in db" });
    }

    const vailidPassword = bcrypt.compareSync(password, userExits.password);
    if (!vailidPassword) {
      res.status(501).json({
        message: "your password is not match please check the password",
      });
    }

    return res.status(201).json({
      message: "login successfull",
      data: userExits,
    });
  } catch (error) {
    console.log("user is not login ", error);
    return res.status(401).json("something went wrong");
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

const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const id = req.params.id;
  console.log(id);

  try {
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      updateData.password = hashPassword;
    }
    if (!username && !email && !password) {
      return res.status(501).json({ message: "minimum one field required" });
    }
    const update = await userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(201).json({
      message: "user is update",
      data: update,
    });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(401).json("something went wrong");
  }
};
export { createUser, userDelete, getAllUser, loginUser, updateUser };
