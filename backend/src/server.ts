import dotenv from "dotenv";
import app from "./app";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Listening for incomming connections on port ${process.env.PORT}`);
  });