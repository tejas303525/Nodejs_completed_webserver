require("dotenv").config();


const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logevents");
const { errorHandler } = require("./middleware/errorHandler");
const verifyJWT = require("././middleware/verifyJWT");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const mongoose=require("mongoose")
const connectDB=require("./config/dbConn")



connectDB()

app.use(logger);
//cross orgin resourcw sharing
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// Staticpage
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/authController"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  }
);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Json page not found" });
  } else if (req.type("txt")) {
    res.send("TXT not found");
  }
});

app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`server on port: ${PORT}`));
})

