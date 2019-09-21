const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const apartments = require("./routes/api/apartments");
const properties = require("./routes/api/properties");
const buildings = require("./routes/api/buildings");
const tenants = require("./routes/api/tenants");

const app = express();

// var corsOptions = {
//   origin: "*"
// };
app.use(cors());
// app.options("*", cors(corsOptionsDelegate));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/apartments", apartments);
app.use("/api/buildings", buildings);
app.use("/api/profile", profile);
app.use("/api/properties", properties);
app.use("/api/tenants", tenants);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
