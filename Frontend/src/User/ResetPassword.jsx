import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/pageTitle";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  removeErrors,
  removeSuccess,
  resetPassword,
} from "../features/user/userSlice";

const ResetPassword = () => {
  const { error, loading, success, message } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); //token get panna

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Password Reset Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, error, success]);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const data = { password, confirmPassword };

    dispatch(resetPassword({ token, userDate: data }));
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Reset Password" />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg-px-8 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-2xl">
            Reset Password
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={resetPasswordSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Enter Your new password"
                    className="w-full px-4 py-3 rounded-xl border border-dashed focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmpassword"
                    placeholder="Enter Your confirm new password"
                    className="w-full px-4 py-3 rounded-xl border border-dashed focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <button className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 rounded-2xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] text-white">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
