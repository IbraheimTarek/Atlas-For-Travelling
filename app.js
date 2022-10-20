const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const method = require("method-override");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));

app.use("/", async (req, res) => {
  res.render("pages/home");
});
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
