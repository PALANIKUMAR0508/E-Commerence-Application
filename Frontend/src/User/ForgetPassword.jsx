import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPassword,
  removeErrors,
  removeSuccess,
} from "../features/user/userSlice";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, success, message } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success, error]);

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }));
    setEmail("");
  };
  return (
    <>
      <Navbar />
      <PageTitle title="Forget Your password" />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        <div className="sm-mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
            Forget Password
          </h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-20">
              <form className="space-y-3" onSubmit={forgetPasswordSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@gmail.com"
                    className="mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button className="  w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                  Send reset link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
