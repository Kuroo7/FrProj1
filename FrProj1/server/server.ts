import { app } from "./app";
const start = async () => {
  // console.log(process.env,process.env.JWT_KEY)
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    // await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!!!!!!!`);
  });
};

start();
