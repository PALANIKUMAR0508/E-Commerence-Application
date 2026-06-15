import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import HandleError from "../helper/handleError.js";

export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    orderStatus,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingAddress,
    orderItems,
    orderStatus,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
};

//Get Single Order Details
export const getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(new HandleError("Oder Not Found", 404));
  }
  res.status(200).json({ success: true, order });
};

//Get all Order Details

export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("Oder Not Found", 404));
  }
  res.status(200).json({ success: true, orders });
};

//Get all Order By Admin

export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  if (!orders) {
    return next(new HandleError("Oder Not Found", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).json({ success: true, orders, totalAmount });
};

//Admin Delete Orders

export const deleteOrderByAdmin = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new HandleError("Oder Not Found", 404));
  }
  if (order.orderStatus !== "Delivered") {
    return next(
      new HandleError(
        "This order is under processing and cannot be deleted",
        404,
      ),
    );
  } //Oder Delivered aaithuna admin atha delete panni kalam.
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    succes: true,
    message: "Order Deleted Successfully",
  });
};

//Admin Oder Update

export const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    return next(new HandleError("Oder Not Found", 404));
  }
  if (order.orderStatus === "Delivered") {
    //already status update la irutha
    return next(new HandleError("This order is already been Delivered", 404));
  }
  /* Update Stock*/
  await Promise.all(
    order.orderItems.map((item) => updateQuantity(item.product, item.quantity)),
  );

  order.orderStatus = req.body.status; //status=>admin status vathu delivered kudutha update aairum
  if (order.orderStatus === "Delivered") {
    order.deliverAt = Date.now(); //delivered aana date
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, order });

  async function updateQuantity(id, quantity) {
    const product = await Product.findById(id); //admin vanthu product id find panni stock manage pannalam
    if (!product) {
      throw next(new HandleError("Product Not Found"));
    }
    product.stock -= quantity; //totalStock-user kudu quantity = stock update aagum
    await product.save({ validateBeforeSave: false });
  }
};
