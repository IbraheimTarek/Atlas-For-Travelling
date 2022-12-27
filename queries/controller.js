const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qqqq1111", //passwordchanges
  database: "mydb",
});

  module.exports.selectCities =
  "SELECT longitude,latitude,`name`,`history`,population,religion FROM place INNER JOIN city ON longitude = place_longitude AND latitude = place_latitude;", //, returns an object arrys

  module.exports.selectAllPlacesWithPhotos =  
  "select longitude,latitude,`name`,photoURL from place,city as c,placePhotos as p where longitude = c.place_longitude AND latitude = c.place_latitude and longitude = p.place_longitude AND latitude = p.place_latitude";

  module.exports.selectCitiesWithPhotos =  
  "select longitude,latitude,`name`,`history`,population,religion,photoURL from place,city as c,placePhotos as p where longitude = c.place_longitude AND latitude = c.place_latitude and longitude = p.place_longitude AND latitude = p.place_latitude";

  module.exports.insertPlace = (req, res, next) =>
  connection.query(
    "INSERT INTO place (longitude, latitude, `name`, country_name) VALUES (?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.name,
      req.body.country_name,
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
module.exports.insertCity =  (req, res, next) =>
  connection.query(
    "INSERT INTO city (place_longitude, place_latitude, religion, `history`, population) VALUES (?,?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.religion,
      req.body.history,
      req.body.population,
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(error);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
// module.exports.results = (error, results) => {
//     if (error) throw error;
//     console.log(error);
//     console.log(results); // results contains rows returned by server
//     //console.log(fields); // fields contains extra meta data about results,

//   }

module.exports.insertNatureReserve = (req, res, next) =>
  connection.query(
    "INSERT INTO natureReserve (place_longitude, place_latitude, religion, `history`, population) VALUES (?,?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.religion,
      req.body.history,
      req.body.population,
    ],
    async (error, results) => {
      if (error) throw error;
      console.log(error);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
module.exports.insertPlacePhoto = (req, res, next) =>
  connection.query(
    "INSERT INTO placePhotos (place_longitude, place_latitude, photoURL) VALUES (?,?,?)",
    [req.body.longitude, req.body.latitude, req.body.photoURL],
    async(error, results) => {
      if (error) throw error;
      console.log(error);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
