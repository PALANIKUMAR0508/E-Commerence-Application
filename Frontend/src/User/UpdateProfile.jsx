import React from "react";
import Navbar from "../components/Navbar";

const updateProfile = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">
            Update Profile
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-6 shadow rounded-xl sm:px-10 border border-gray-100">
            <form encType="multipart-gray-100">
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 mb-4">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover border-4 border-indigo-100 shadow-lg"
                  />
                  <label className="block bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:bg-indigo-100 transition">
                    Change Photo
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 ml-1"
                >
                  Name
                </label>
                <div>
                  <input type="text" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default updateProfile;
