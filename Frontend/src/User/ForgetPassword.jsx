import React from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/pageTitle";

const ForgetPassword = () => {
  return (
    <>
      <Navbar />
      <PageTitle title="Forget Your password" />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        Enter Your Email
      </div>
    </>
  );
};

export default ForgetPassword;
