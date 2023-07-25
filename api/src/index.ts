import { connect } from "mongoose";
import app from "./app.js";

connect("mongodb://127.0.0.1:27017/medorium")
  .then(() => {
    console.log("Connected to the local database");
  })
  .catch(() => {
    console.error("Database connection failed");
  });

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
