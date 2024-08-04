import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectToDatabase = async () => {
  if (
    mongoose.connection &&
    mongoose.connection.readyState &&
    mongoose.connection.readyState >= 1
  ) {
    return;
  }
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  } as mongoose.ConnectOptions);
};
