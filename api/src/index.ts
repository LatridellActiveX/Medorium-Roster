import "dotenv/config";
import { connect } from "mongoose";
import app from "./app.js";
import User from "./models/user.js";

connect("mongodb://127.0.0.1:27017/medorium")
  .then(async () => {
    console.log("Connected to the local database");
    if (process.env.NODE_ENV !== "production") {
      const result = await User.register("username", "password", {
        admin: true,
      });

      if (result.ok) {
        console.log(
          `Created default admin account with the following credentials:\nusername:password`
        );
      }
    }
  })
  .catch(() => {
    console.error("Database connection failed");
  });

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
