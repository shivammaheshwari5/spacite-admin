const express = require("express");
const userRoute = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandle } = require("./middleware/errorMiddleware");
const messageRoute = require("./routes/messageRoutes");
const countryRoute = require("./routes/countryRoutes");
const stateRoute = require("./routes/stateRoutes");
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
app.use("/api/message", messageRoute);
app.use("/api/allCountry", countryRoute);
app.use("/api/state", stateRoute);
// app.use("/api/property", propertyRoutes);

app.use(notFound);
app.use(errorHandle);

app.listen(process.env.PORT, console.log("server started on 5000"));
