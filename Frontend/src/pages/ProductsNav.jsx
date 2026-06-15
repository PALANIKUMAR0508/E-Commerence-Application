import React, { useEffect, useState } from "react";
import PageTitle from "../components/pageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeErrors } from "../features/products/productSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ProductsNav = () => {
  const { products, productCount, loading, error, resultPerPage } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams(); //navbar la irukura search field la products search panna use pannarom
  const navigate = useNavigate();
  const location = useLocation();

  const keyword = searchParams.get("keyword") || ""; //keyword=>entha keyword tha productslice la params aa pass pannuvom
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const category = searchParams.get("category") || "";
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const totalPages = Math.ceil(productCount / (resultPerPage || 8));

  const handlePageChange = (pageNumber) => {
    //url la page no change panna entha condition use panrom
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      const newSearchParams = new URLSearchParams(location.search);
      if (pageNumber === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", pageNumber);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };

  const handleCategory = (categ) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", categ); //cat=>user kuthukura category vanthu category la set aagum
    newSearchParams.delete("page"); //search pannum pothu first page tha varum vara page irutha delete aairum
    if (categ === "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categ);
    }
    navigate(`?${newSearchParams.toString()}`);
    console.log(newSearchParams.toString());
  };

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]); //dispatch=>API Call Panna Use Panrom

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error);
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <PageTitle title={"Products | E-commerce"} />
        <Navbar />
        <main className="grow container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b border-slate-200 pb-2">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {[
                    "All",
                    "Electronics",
                    "Mobile Phones",
                    "Laptops",
                    "Cameras",
                    "Audio",
                    "Televisions",
                    "Watches",
                    "Footwear",
                    "Clothing",
                    "Ethnic Wear",
                    "Furniture",
                    "Home Appliances",
                    "Kitchen & Dining",
                    "Beauty & Skincare",
                    "Makeup",
                    "Hair Care",
                    "Health & Wellness",
                    "Sports & Fitness",
                    "Sports Equipment",
                    "Books",
                    "Toys & Games",
                    "Grocery & Dry Fruits",
                    "Jewellery",
                    "Bags & Luggage",
                    "Home & Garden",
                    "Mobile Accessories",
                    "Computer Peripherals",
                    "Office Equipment",
                    "Stationery",
                  ].map((categ) => (
                    <li key={categ}>
                      <button
                        onClick={() => handleCategory(categ)}
                        className="text-gray-600 hover:text-blue-600 transition-colors font-semibold"
                      >
                        {categ}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <section className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Our Products
                </h3>
                <span className="text-gray-500 text-sm">
                  {products?.length || 0} items found
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} products={product} />
                  ))}
              </div>

              {/*No Products */}
              {products?.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">{`No Products found`}</p>
                </div>
              )}
            </section>
          </div>
          {/*Pagination Section */}
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductsNav;
