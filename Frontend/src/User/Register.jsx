import React from "react";
import PageTitle from "../components/pageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/user/userSlice";
import { useEffect } from "react";
import { removeErrors, removeSuccess } from "../features/user/userSlice.js";

const Register = () => {
  const [preview, setPreview] = useState(
    "https://ui-avatars.com/api/?name=User&Background=random",
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const { name, email, password } = user;

  const handleChange = (e) => {
    if (e.target.name == "avatar") {
      {
        /*e.target.name=>na input la antha field link pannrom mo athula assign aagum*/
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          {
            /* user ku image preview panna */
          }
          setAvatar(e.target.files[0]);
          {
            /* DB la store panna */
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.user);

  const registerNow = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill out the required fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (!avatar) {
      toast.error("Please select a profile image");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.append("avatar", avatar);

    // console.log(myForm.entries());
    // for (let pair of myForm.entries()) {
    //   console.log(pair[0] + ":" + pair[1]);
    // }

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
      {
        /*error msg irutha error remove panna use panrom*/
      }
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Registration successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      {
        /*success msg irutha success remove panna use panrom*/
      }
      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <>
      <PageTitle title={"Register | E-commerce"} />

      <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <form
            encType="multipart/form-data"//Image file upload panna
            className="space-y-6"
            onSubmit={registerNow}
          >
            {/* encType=>  ethu pothala na image pass panna mudiyathu */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Create Your Account
              </h2>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-sm text-gray-700 ml-1 block">
                Username
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="jhondoe"
                value={name}
                className="w-full px-4 py-3  rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-sm text-gray-700 ml-1 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="jhondoe@gmail.com"
                value={email}
                className="w-full px-4 py-3  rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-sm text-gray-700 ml-1 block">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                value={password}
                className="w-full px-4 py-3  rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center space-x-5">
              <div className="shrink-0">
                {/* chinna tha aagathu */}
                <img
                  id="preview"
                  src={preview}
                  alt=""
                  className="w-12 h-12 object-cover rounded-sm bg-gray-100"
                />
              </div>
              <label className="block">
                <span className="sr-only">
                  {/* sr-only=>Screen readers-ku mattum visible — user-ku visible illa*/}
                  Choose Profile Image
                </span>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:p-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </label>
            </div>

            <button
              disabled={loading}
              className="w-full bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 text-white font-semibold hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
