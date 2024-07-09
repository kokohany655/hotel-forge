import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_MONGO_URI as string)
    .then((con) => {
      console.log(`database connecting ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(`database error ${err}`);
      process.exit(1);
    });
};
