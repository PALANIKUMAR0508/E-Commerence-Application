import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user); //user register panni iruthu tha hidden
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropDownOpen, setProfileDropDownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault(); //page referesh aagum atha prevent panna use pannuvom
    //search logic here
    console.log("search:", searchQuery);
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`); //encodeURIComponent vanthu any special character irutha remove pannum
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/*LOGO*/}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <ShoppingBag />
          <span>Shopping Hub</span>
          {/*Desktop Links*/}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/products"
          >
            Products
          </Link>
          <Link
            to="/About-US"
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            About US
          </Link>
          <Link
            to="/contant-US"
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            Contact US
          </Link>
        </div>

        {/*Right Section*/}
        <div className="flex items-center gap-4">
          <form
            className="hidden sm:flex items-center border border-slate-300 rounded overflow-hidden"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search Product"
              className="px-3 py-2 text-sm w-40 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 text-gray-500 hover:text-blue-600 transition-normal"
            >
              <Search size={18} />
            </button>
          </form>

          {/*Cart*/}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600 transition-normal"
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
              6
            </span>
          </Link>

          {/*Register*/}
          {!isAuthenticated ? ( //User register panni irutha hide aairum illana show aagum
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <User size={18} />
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button
                className="flex items-center"
                onClick={() => setProfileDropDownOpen(!profileDropDownOpen)}
              >
                <img
                  src={user?.avatar?.url}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-blue-600"
                />
              </button>

              {profileDropDownOpen && (
                <div className="absolute right-0 mt-2 bg-white border-gray-200 shadow-lg z-50">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropDownOpen(false)}
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/order"
                      onClick={() => setProfileDropDownOpen(false)}
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropDownOpen(false)}
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => {
                        handleLogout(); //logout function call panna use panrom
                        setProfileDropDownOpen(false);
                        // Add logout logic here
                      }}
                      className="block w-full text-left px-5 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/*Hamburger*/}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/*Mobile Reponsive nav*/}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[450px] opacity-100 translate-y-2" : "max-h-0 opacity-0 translate-y-2"}`}
      >
        <div className="flex flex-col p-4 gap-4">
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
            to="/products"
          >
            Products
          </Link>
          <Link
            to="/About-US"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            About US
          </Link>
          <Link
            to="/contant-US"
            onClick={() => setOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            Contact US
          </Link>
          {/*Mobile Register/Login/Logout*/}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <Link
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
                to="/login"
              >
                Login
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
                to="/register"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 mt-2">
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar?.url}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className=" py-1">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropDownOpen(false)}
                  className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/order"
                  onClick={() => setProfileDropDownOpen(false)}
                  className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileDropDownOpen(false)}
                  className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
              </div>
              <div className="border-t border-gray-100 py-1">
                <button
                  onClick={() => {
                    handleLogout(); //logout function call panna use panrom
                    setProfileDropDownOpen(false);
                    // Add logout logic here
                  }}
                  className="block w-full text-left px-5 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
