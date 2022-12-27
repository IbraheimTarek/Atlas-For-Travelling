const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bogo", //passwordchanges
  database: "mydb",
});

  module.exports.selectCities =
  "SELECT longitude,latitude,`name`,`history`,population,religion FROM place INNER JOIN city ON longitude = place_longitude AND latitude = place_latitude;", //, returns an object arrys

  module.exports.selectAllPlacesWithPhotos =  
  "select longitude,latitude,`name`, country_name,photoURL from place,placePhotos as p where longitude = p.place_longitude AND latitude = p.place_latitude";

  module.exports.selectCitiesWithPhotos =  
  "select longitude,latitude,`name`,`history`,population,religion,photoURL from place,city as c,placePhotos as p where longitude = c.place_longitude AND latitude = c.place_latitude and longitude = p.place_longitude AND latitude = p.place_latitude";
  
  module.exports.selectPlace = (longitude,latitude) =>
  `SELECT * from (
    SELECT longitude,latitude, placeType,\`name\`, photoURL,\`history\`,population,religion,n.discription as reserveDiscription,t.discription as topoDiscription,reserveType,landType FROM place 
    left outer JOIN city as c ON longitude = c.place_longitude AND latitude = c.place_latitude 
    left outer JOIN natureReserve as n ON longitude = n.place_longitude AND latitude = n.place_latitude 
    left outer JOIN topography as t ON longitude = t.place_longitude AND latitude = t.place_latitude 
    left outer JOIN placePhotos as p ON longitude = p.place_longitude AND latitude = p.place_latitude) as ccc where ccc.longitude = ${longitude} AND ccc.latitude = ${latitude} ;`;//, returns an object arrys

  module.exports.insertPlace = (req, res, next) =>
  connection.query(
    "INSERT INTO place (longitude, latitude, `name`, country_name, placeType) VALUES (?,?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.name,
      req.body.country_name,
      req.body.placeType
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
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
module.exports.insertNatureReserve = (req, res, next) =>
  connection.query(
    "INSERT INTO natureReserve (place_longitude, place_latitude, reserveType, discription) VALUES (?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.reserveType,
      req.body.discription
    ],
    async (error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
  module.exports.insertTopography = (req, res, next) =>
  connection.query(
    "INSERT INTO topography (place_longitude, place_latitude, landType, discription) VALUES (?,?,?,?)",
    [
      req.body.longitude,
      req.body.latitude,
      req.body.landType,
      req.body.discription
    ],
    async (error, results) => {
      if (error) throw error;
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
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );


  module.exports.insertUser = (req, res, next) =>
  connection.query(
    "INSERT INTO user (userName,email, password,wallet,userType)  VALUES (?,?,?,?,?) ",
    [
      req.body.userName,
      req.body.email,
      req.body.password,
      0,
      req.body.userType,
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
  module.exports.selectUserID = (name) => `select id from \`user\` where userName =\'${name}\'`;
  module.exports.insertExplorer = (req, id, res, next) =>
  connection.query(
    `INSERT INTO explorer (user_id,bio)  VALUES (${id},?) `,
    [
      req.body.bio
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
  module.exports.insertBus = (req, res, next) =>
  connection.query(
    "INSERT INTO bus  (id, agency,capacity)  VALUES (?,?,?) ",
    [
      req.body.id,
      req.body.agency,
      req.body.capacity,
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(error);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );
  

 