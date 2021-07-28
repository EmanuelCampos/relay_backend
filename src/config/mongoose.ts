import mongoose from "mongoose";

export const connectDatabase = () =>
  new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on("error", (error) => reject(error))
      // eslint-disable-next-line
      .on('close', () => console.log('Database connection closed.'))
      .once("open", () => resolve(mongoose.connections[0]));

    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });
