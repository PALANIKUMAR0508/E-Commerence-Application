import express from "express";
import {
  deleteUser,
  forgetPassword,
  getSingleUser,
  getUsers,
  loginUser,
  logoutUser,
  profile,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controller/userController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();
//User Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser, profile);
router.route("/password/update").put(verifyUser, updatePassword);
router.route("/profile/update").put(verifyUser, updateProfile);
//Admin Routes
router
  .route("/admin/users")
  .get(verifyUser, roleBasedAccess("admin"), getUsers);
router
  .route("/admin/users/:id")
  .get(verifyUser, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUser, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUser, roleBasedAccess("admin"), deleteUser);
export default router;
