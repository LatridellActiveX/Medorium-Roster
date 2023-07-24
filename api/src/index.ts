import { connect } from "mongoose";
import app from "./app.js";

// block from listening until connection is established
await connect("mongodb://127.0.0.1:27017/medorium");

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
