import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, removeErrors, removeSuccess } from "../features/user/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); //login userSlice kullathu
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
      toast.success("Login successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      {
        /*success msg irutha success remove panna use panrom*/
      }
      navigate("/");
    }
  }, [dispatch, success]);

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <form onSubmit={loginSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">
              Please enter your details to sign in
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-sm text-gray-700 ml-1 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jhondoe@gmail.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3  rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button className="w-full bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 text-white font-semibold hover:bg-indigo-700 transition-all active:scale-[0.98]">
            Sign In
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account ?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
