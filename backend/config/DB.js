import mongoose from "mongoose";

/*mongoose
  .connect("process.env.DB_URL")
  .then((data) => {
    console.log("Mongodb connected with server:", data.connection.host);
  })
  .catch((err) => {
    console.log(err.message);
  });*/

export const connectDB = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log("Mongodb connected with server:", data.connection.host);
  });
  /*.catch((err) => {
      //=>eppa DB connect aagalana catch error varum
      console.log("DB.js:", err.message);
    });*/
  //We can handle this in server.js file using unhandledRejection
};
