import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

// import { creationMail } from "../mail/creationMail.js";

//mail
// export const createController = async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     const user = await userModel.create({
//       name,
//       email,
//     });
//     await creationMail({ name, email });

//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// };
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bbf7538ea1cc1e",
    pass: "ee5c566fb7273d",
  },
});

//----------Register------------
export const registerController = async (req, res) => {
  //register
  try {
    const { name, email, password, phone, address, gender } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phoneis required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!gender) {
      return res.send({ message: "Gender is required" });
    }
    // if (!answer) {
    //   return res.send({ message: "answer is required" });
    // }
    //check existing user
    const existinguser = await userModel.findOne({ email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }

    //register user
    const hashedpassword = await hashpassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
      gender,
      // answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};
// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid passwords",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//forgot
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashpassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(`error in forgot password${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrongg",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(`error in test,${error}`);
    res.send({ error });
  }
};

// update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and more thean 6 character",
      });
    }
    const hashedpassword = password ? await hashpassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || useAuth.email,
        password: hashedpassword || user.hashedpassword,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

export const postOrderController = async (req, res) => {
  try {
    const { cart, paymentStatus } = req.body;

    // Create a new order in the database
    const order = new orderModel({
      paymentStatus,
      buyer: req.user._id,
      products: cart,
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get-Order-Controller
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while geting order",
    });
  }
};

//get all orders -admin
export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while geting order",
    });
  }
};

//order status--orderStatusController
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while geting order status",
      error,
    });
  }
};
//delete deleteAllOrderControlle
export const deleteAllOrderController = async (req, res) => {
  try {
    await orderModel.deleteMany();
    res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

//delete user side orders
export const deleteOrderController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.orderId);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
//----------mail-trap-- forgot password---------

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "emailll..");

    const oldUser = await userModel.findOne(
      { email: email },
      { _id: 1, password: 1 }
    );

    if (!oldUser) {
      return res.status(400).send({
        status: false,
        message: "User Not Found",
      });
    }

    // const secret = process.env.JWT_SECRET + oldUser .password;
    const secret = process.env.JWT_SECRET;
    const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });

    const link = `http://localhost:8081/api/v1/auth/reset-password/${oldUser._id}/${token}`;
    const textHtml = `Please click <a href=${link}> here </a>to reset Password`;

    var mainOptions = {
      from: "ranasheetal721@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
      html: textHtml,
    };

    transport.sendMail(mainOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          status: false,
          message: "Error occurred while sending email.",
        });
      } else {
        console.log(info);
        return res.status(200).send({
          status: true,
          message: "Password reset link has been sent to your email.",
        });
      }
    });
    console.log(oldUser);
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};

export const resetPassWordToken = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await userModel.findOne({ _id: id }, { email: 1 });
  var userEmail;
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  } else {
    userEmail = oldUser.email;
  }

  // const secret = process.env.JWT_SECRET + oldUser .password;
  const secret = process.env.JWT_SECRET;
  try {
    const verify = JWT.verify(token, secret);
    // res.send("Verified")
    res.render("index", { email: userEmail });
    // res.json({ email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};

//----------reset password updated--------
export const resetPassWordUpdate = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  var userEmail;
  console.log(password, "pasd");
  if (!password) {
    return res.json({ status: "Password is required!!" });
  }

  const oldUser = await userModel.findOne({ _id: id }, { email: 1 });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  } else {
    userEmail = oldUser.email;
  }
  // const secret = process.env.JWT_SECRET + oldUser .password;
  const secret = process.env.JWT_SECRET;
  try {
    const verify = JWT.verify(token, secret);
    console.log("New password:", password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("passwordSuccess", { email: verify.email });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
};
