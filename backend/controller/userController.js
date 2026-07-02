import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js";
import { sendToken } from "../helper/jwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

// User Register controller function
export const registerUser = async (req, res, next) => {
  try {
    //console.log(req.body);
    // console.log("req.body:", req.body);
    // console.log("req.files:", req.files);
    const { name, email, password } = req.body;
    const file = req.files.avatar;

    if (!name) {
      return next(new HandleError("Name Cannot be empty", 400));
    }
    if (!email) {
      return next(new HandleError("Email Cannot be empty", 400));
    }
    if (!password) {
      return next(new HandleError("Password Cannot be empty", 400));
    }
    if (!req.files || !req.files.avatar) {
      return next(new HandleError("Please upload an avatar image", 400));
    }

    const myCloud = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.data.toString("base64")}`,
      {
        folder: "avatarImage",
        width: 150,
        crop: "scale",
      },
    );

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res); //=>jwtToken file la kuthuthathu
  } catch (error) {
    next(error);
  }
};
/*
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    token,
  });
  sendToken(user, 201, res); //=>jwtToken file la kuthuthathu
};*/

// User Login controller function
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Please enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isVaildPassword = await user.verifyPassword(password); //=>user model la kuthuthathu
  if (!isVaildPassword) {
    return next(new HandleError("Invalid email or password", 401));
  }
  sendToken(user, 200, res); //=>jwtToken file la kuthuthathu
};

// User Logout controller function
export const logoutUser = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, options);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// User Reset Password controller function =>text based send email
/*export const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not exist", 400));
  }
  let resetToken;
  try {
    resetToken = user.createPasswordResetToken();
    await user.save();
    console.log(resetToken);
  } catch (error) {
    console.log(error);
    return next(
      new HandleError("Could not save reset token,Try again later...", 500),
    );
  }
  const resetPasswordUrl = `${req.protocol}://${req.host}/reset/${resetToken}`;
  //console.log(resetPasswordUrl);
  const message = `Reset your password using the link below:\n${resetPasswordUrl}\n\n The link expires in 30 minutes.\n\n If this wasn't you,please ignore this message.`;
  try {
    sendEmail({
      email: user.email,
      subject: "password Reset Request",
      message,
    }); //sendEmail la kuthuthathu
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    //console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(
      new HandleError("Email Could not be sent Try again later...", 500),
    );
  }
};*/

// User Forget Password controller function =>html based send email
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    HandleError;
    return next(new HandleError("User does not exist", 400));
  }
  let resetToken;
  try {
    resetToken = user.createPasswordResetToken();
    await user.save();
    //console.log(resetToken);
  } catch (error) {
    //console.log(error);
    return next(
      new HandleError("Could not save reset token,Try again later...", 500),
    );
  }
  const resetPasswordUrl = `${req.protocol}://${req.host}/reset/${resetToken}`;
  //console.log(resetPasswordUrl);
  const message = `Reset your password using the link below:\n${resetPasswordUrl}\n\n The link expires in 30 minutes.\n\n If this wasn't you,please ignore this message.`;
  const messageHTML = `
     <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 6px;">
        
        <h2 style="color: #333;">Password Reset Request</h2>

        <p>Hello,</p>

        <p>
          You requested to reset your password. Click the button below to reset it.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${resetPasswordUrl}"
            style="
              background-color: #007bff;
              color: #ffffff;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 4px;
              display: inline-block;
            "
          >
            Reset Password
          </a>
        </div>

        <p>
          This link will expire in <strong>30 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, please ignore this email.
        </p>

        <hr />

        <p style="font-size: 12px; color: #777;">
          Thank you,<br />
          E-Commerce Support Team
        </p>
      </div>
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: "password Reset Request",
      message,
      htmlMessage: messageHTML,
    }); //sendEmail la kuthuthathu
    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    //console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email Could not be sent Try again later...", 500),
    );
  }
};

// user Reset Password controller function
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //gt=>greater than
  });
  if (!user) {
    return next(new HandleError("Invalid or reset code Expire", 400));
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 201, res);
};

// user profile controller function

export const profile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// Update user Password controller function

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isCorrect = await user.verifyPassword(oldPassword);
  if (!isCorrect) {
    return next(new HandleError("Old Password is incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(
      new HandleError("New Password and confirm Password does not match", 400),
    );
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
  // console.log(req.body);
  // console.log("newPassword:", newPassword);
  // console.log("confirmPassword:", confirmPassword);
};

// Update user Profile controller function

export const updateProfile = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const updateUserDetails = { name, email };

  if (avatar && avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }
    const myCloud = await cloudinary.uploader.upload(
      avatar,
      //`data:${file.mimetype};base64,${file.data.toString("base64")}`,
      {
        folder: "avatarImage",
        width: 150,
        crop: "scale",
      },
    );
    updateUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });
};

//Admin Access

//Admin Get All Users controller function

export const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

//Admin Get Single Users controller function

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

//Admin Update UsersRole controller function

export const updateUserRole = async (req, res, next) => {
  const { role } = req.body;
  const id = req.params.id;
  const updatedRole = { role };
  const user = await User.findByIdAndUpdate(id, updatedRole, { new: true });
  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

//Admin Delete Users controller function

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};
