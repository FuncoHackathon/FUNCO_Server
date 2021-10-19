import express from "express";
import userRouter from "./routers/userRouter";
import fundingRouter from "./routers/fundingRouter";

const app = express();
const PORT = 3000;

app.use("/users", userRouter);
app.use("/fundings", fundingRouter);

const handleListening = () =>
  console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
