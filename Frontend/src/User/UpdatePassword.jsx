import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  removeErrors,
  removeSuccess,
  updatePassword,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { error, success, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success, error]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password doesn't match", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gray-50 flex flex-col items-center
       py-12 sm:px-6 lg:px-8 pt-24"
      >
        <div className="sm:mx-auto sm-w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Update Password
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-6 py-10 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Old Password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter Old Password"
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm
                   placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  New Password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm
                   placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Confirm Password
                </label>
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Confirm Password"
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm
                   placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition-all"
                />
              </div>
              <div className="">
                <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl w-full px-4 py-3 text-xl font-semibold">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
