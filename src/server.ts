import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  switch (err.type) {
    case "auth": {
      res.status(401);
      res.json({ message: "unauthorized" });
      break;
    }
    case "input":
      res.status(400).json({ message: "Invalid inputs" });
      break;
    default: {
      res.status(500).json({ message: "Internal Server Error" });
      break;
    }
  }
});

export default app;
