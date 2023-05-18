const express = require("express");
const userRoute = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandle } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", userRoute);
app.use("/api/message", messageRoutes);
// app.use("/api/property", propertyRoutes);

app.use(notFound);
app.use(errorHandle);

app.listen(process.env.PORT, console.log("server started on 5000"));
