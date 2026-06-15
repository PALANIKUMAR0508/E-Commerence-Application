import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
      maxlength: [25, "Name cannot exceed 25 characters"],
      minlength: [3, "Name should have more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true, //oru email id la oru user mattum create pannanum athuku tha unqiue
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please Enter your password"],
      minlength: [8, "Password should have more than 8 characters"],
      select: false, //password return panna koodathu
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);
//To encrypt password before saving user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; ////////=>
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//To generte JWT token for user authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//To compare user password for login
userSchema.methods.verifyPassword = async function (userpassword) {
  return await bcrypt.compare(userpassword, this.password);
};
//To generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("User", userSchema);
