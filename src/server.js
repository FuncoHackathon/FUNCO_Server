import "./db.js";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import fundingRouter from "./routers/fundingRouter.js";

const app = express();
const PORT = 3000;

app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/fundings", fundingRouter);

app.listen(app.get("port"), () =>
  console.log(`✅ Listening on http://localhost:${PORT}`)
);
