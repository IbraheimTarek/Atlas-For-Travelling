if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
} //env is local file

//icludeing the api's and libiraries
const express = require("express");
const ejsMate = require("ejs-mate");
const ExpressErrors = require("./utlis/ExpressErrors");
const app = express();
const path = require("path");
const method = require("method-override");
const mysql = require("mysql2");
const controller = require("./queries/controller");
const { render } = require("ejs");
app.engine("ejs", ejsMate); //to include the headers and the partial templates

//ejs setup and getting ejs files from the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// getting styles and js frontend files from the public dirctory
app.use(express.static(path.join(__dirname, "public")));
//app.use("/public", express.static(path.join(__dirname, "public")));  // i've edit this line hema to connect my css files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));

//database connection infromation
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'bogo',//passwordchanges
  database: "mydb",
});

app.get("/places/insertCity", async (req, res) => {
  res.render("pages/insertCity");
});

app.get("/places/insertNatureReserve", async (req, res) => {
  res.render("pages/insertNatureReserve");
});
app.get("/places/insertTopography", async (req, res) => {
  res.render("pages/insertTopography");
});
app.get("/places", async (req, res) => {
  //onsole.log(req.body)
  connection.query(
    controller.selectAllPlacesWithPhotos,
    async (error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      const places = results;
      res.render("pages/places", { places });
    }
  );
});

app.get("/places/:longitude&:latitude", async (req, res, next) => {
  console.log(req.params);
  connection.query(
    controller.selectPlace(req.params.longitude, req.params.latitude),
    async (error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      const place = results;
      res.render("pages/place", { place });
    }
  );
});
app.post("/places", async (req, res) => {
  console.log(req.body);
  controller.insertPlace(req);
  if (req.placeType == 0) {
    controller.insertCity(req);
  } else if (req.placeType == 1) {
    controller.insertNatureReserve(req);
  } else if (req.placeType == 2){
    controller.insertTopography(req);
  }
  controller.insertPlacePhoto(req);
  res.redirect("/places");
});



app.post("/Bus", async (req, res) => {
  console.log(req.body);
  controller.insertBus(req);
  res.redirect("/Bus");
});






app.get("/insertCreature", async (req, res) => {
  res.render("pages/insertCreature");
});
app.get("/insertHotel", async (req, res) => {
  res.render("pages/insertHotel");
});
app.get("/insertTrip", async (req, res) => {
  res.render("pages/insertTrip");
});
app.get("/register", async (req, res) => {
  res.render("pages/register");
});
app.get("/login", async (req, res) => {
  res.render("pages/login");
});
app.get("/trips", async (req, res) => {
  res.render("pages/Trips");
});
 app.get("/Profile", async (req, res) => {
  res.render("pages/Profile");
});
 app.get("/CompanyProfile", async (req, res) => {
  res.render("pages/CompanyProfile");
});
 app.get("/AdminProfile", async (req, res) => {
  res.render("pages/AdminProfile");
});
app.get("/insertUser", async (req, res) => {
  res.render("pages/insertUser");
});
app.get("/insertBus", async (req, res) => {
  res.render("pages/insertBus");
});
app.use("/", async (req, res) => {
  res.render("pages/home");
});

app.all("*", (req, res, next) => {
  next(new ExpressErrors("Page Not Found", 404));
});

//to open the server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
