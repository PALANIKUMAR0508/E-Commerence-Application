import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Footer from "../components/Footer";
import Product from "../components/Product";
import PageTitle from "../components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductDetails,
  removeErrors,
} from "../features/products/productSlice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const { products, productCount, loading, error } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("useEffect triggered");
    dispatch(getProduct({ keyword: "" }));
  }, [dispatch]); //dispatch=>API Call Panna Use Panrom

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
      <PageTitle title={"Home | E-Commerce"} />
      <Navbar />
      <ImageSlider />
      <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900">
        <h1 className="text-xl font-semibold mb-8 text-blue-700 text-center drop-shadow-sm">
          Latest Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((products, index) => (
            <Product key={index} products={products} /> //product=>can be declered as Product.jsx
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
