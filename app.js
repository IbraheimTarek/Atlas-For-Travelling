if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
} //env is local file

//icludeing the api's and libiraries
const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const method = require("method-override");
const mysql = require("mysql2");

app.engine("ejs", ejsMate); //to include the headers and the partial templates

//ejs setup and getting ejs files from the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// getting styles and js fronten files from the public dirctory
app.use(express.static(path.join(__dirname,'public')));   // i've edit this line hema to connect my css files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(method("_method"));

//database connection infromation
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'qqqq1111',//passwordchanges
  database: "mydb",
});
// connection.query("SELECT * FROM catsonhill ", function (err, results, fields) {
//   if (err) throw err;
//   console.log(results); // results contains rows returned by server
//   // console.log(fields); // fields contains extra meta data about results, if available
// });
// handling users http requests
app.use("/places/insertCity", async (req, res) => {
  res.render("pages/insertCity");
});
app.post("/places",async (req, res) => {
  console.log(req.body)
   connection.query('INSERT INTO place (longitude, latitude, name, country_name) VALUES (?,?,?,?)', [req.body.longitude, req.body.latitude, req.body.name, req.body.country_name],
   (error, results) => {
    if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
     });
   connection.query('INSERT INTO city (place_longitude, place_latitude, religion, history, population) VALUES (?,?,?,?,?)', [req.body.longitude, req.body.latitude, req.body.religion, req.body.history, req.body.population],
  (error, results) => {
    if (error) throw error;
      console.log(error)
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
     });
     res.redirect('/places');
 });

app.use("/", async (req, res) => {
  res.render("pages/home");
});

//to open the server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});


