const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const properties = require("./routes/api/properties");
const tenants = require("./routes/api/tenants");
const units = require("./routes/api/units");
const leases = require("./routes/api/leases");
const payments = require("./routes/api/payments");

const app = express();

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/profile", profile);
app.use("/api/properties", properties);
app.use("/api/tenants", tenants);
app.use("/api/units", units);
app.use("/api/users", users);
app.use("/api/leases", leases);
app.use("/api/payments", payments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
