import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";
import APIHelper from "../helper/apiHelper.js";

//create products/PRODUCT ADDING
export const addProducts = async (req, res) => {
  //console.log(req.body);
  req.body.user = req.user._id; //=>login panna cookie la iruthu encode panna id ethukula store pannitha
  //eppa product create pannunalum antha user product create pannuthu nu theriyum
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
  console.log("Products API hit");
};

//get all products
//http://localhost:8000/api/v1/products?keyword=Samsung
export const getAllProducts = async (req, res, next) => {
  try {
    console.log("API HIT"); // debug
    //const products = await Product.find();
    // console.log(req.query.keyword);
    const apihelper = new APIHelper(Product.find(), req.query)
      .search()
      .filter();
    //pagination =>na current page la enna products ah kanapadum nu decide pannudhu
    const resultPerPage = 12;
    const filteredquery = apihelper.query.clone();
    const productCount = await filteredquery.countDocuments();

    const totalPages = Math.ceil(productCount / resultPerPage);
    const page = Number(req.query.page) || 1;
    if (totalPages > 0 && page > totalPages) {
      return next(new HandleError("This page does not exist", 404));
    }
    apihelper.pagination(resultPerPage);
    //console.log(apihelper);
    const products = await apihelper.query;

    if (!products || products.length === 0) {
      return next(new HandleError("No Product Found", 404));
    }
    res.status(200).json({
      success: true,
      products, //All products can be write
      productCount,
      resultPerPage,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log("ERROR:", error); // 👈 IMPORTANT
    next(error);
  }
};

//update product
export const updateproduct = async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    // return res.status(500).json({ success: false, message: "Product not found" });
    return next(new HandleError("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true, //validators => name illana description kudukalana error varum
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//get single product by id
export const getSingleProduct = async (req, res, next) => {
  /*
  const singleProduct =await Product.findById(req.params.id);
  console.log(req.params.id);
  */
  const id = req.params.id;
  const singleProduct = await Product.findById(id);
  if (!singleProduct) {
    //return res.status(500).json({ success: false, message: "Product not found" });
    return next(new HandleError("Product not found", 404));
  }
  return res.status(200).json({ success: true, singleProduct });
};

//Delete Product
export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const deleteproduct = await Product.findById(id);
  if (!deleteproduct) {
    //return res.status(500).json({ success: false, message: "Product not found" });
    return next(new HandleError("Product not found", 404));
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

//User Access
//User Review

export const createProductReview = async (req, res, next) => {
  const { rating, Comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar.url,
    rating: Number(rating),
    Comment,
  };
  const product = await Product.findById(productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviewExists = product.reviews.find(
    (review) => review.user.toString() == req.user.id,
  ); //user id aa string ku convert pannrom
  if (reviewExists) {
    //Update Review
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id) {
        review.rating = rating;
        reviewExists.Comment = Comment;
      }
    });
  } else {
    //Add or Push Review
    product.reviews.push(review);
  }

  //Update Review Count
  product.num0fReviews =
    product.reviews.length; /*review la irukura length athuthu numOfReview la update pannrom
  Update Rating =>Each user rating to calculate total rating*/
  let sum = 0;
  product.reviews.forEach((review) => {
    sum = sum + review.rating;
  });
  product.ratings =
    product.reviews.length > 0 ? sum / product.reviews.length : 0;
  /*ratings = reviews length vanthu greater 0 va iruthutha sum /reviews length appadi illana rating=0*/
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product,
  });
};

//Admin can see the User Reviews

export const viewProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found"));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

//Admin View All Products

export const getAllProductByAdmin = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({ success: true, product });
};

//Admin Delete Reviews

export const adminDeleteReview = async (req, res, next) => {
  //Product ID:req.query.productID  &  Review ID:req.query.reviewID
  const product = await Product.findById(req.query.productId); //Product ID
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString(),
  );

  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const rating = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, rating, numOfReviews },
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .json({ success: true, message: "Review Deleted Successfully" });
};
