const mysql = require("mysql2");
const ExpressErrors = require("../utlis/ExpressErrors");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qqqq1111", //passwordchanges
  database: "mydb",
});

  module.exports.selectCities =
  "SELECT longitude,latitude,`name`,`history`,population,religion FROM place INNER JOIN city ON longitude = place_longitude AND latitude = place_latitude;", //, returns an object arrys

  module.exports.selectAllPlacesWithPhotos =  
  "select longitude,latitude,`name`, country_name,photoURL from place,placePhotos as p where longitude = p.place_longitude AND latitude = p.place_latitude;";

  module.exports.selectCitiesWithPhotos =  
  "select longitude,latitude,`name`,`history`,population,religion,photoURL from place,city as c,placePhotos as p where longitude = c.place_longitude AND latitude = c.place_latitude and longitude = p.place_longitude AND latitude = p.place_latitude;";
  
module.exports.selectTripsInsidePlace = (longitude,latitude) =>`select id, companyName, company_user_id, price ,tripType, description, numberOfday, \`date\`, noOfExpolorers, busId, agency, capacity from place,
(select companyName, trip.id, company_user_id,  bus.id as busId, agency, capacity, price ,tripType, description, numberOfday, \`date\`, noOfExpolorers, place_longitude, place_latitude from trip
inner join company on company_user_id = user_id inner join bus on bus.id = bus_id) as output 
where  place_longitude = ${longitude}  and place_latitude = ${latitude}`;

  module.exports.selectPlace = (longitude,latitude) =>(
  `SELECT * from (
    SELECT longitude,latitude, placeType,\`name\`, photoURL,\`history\`,population,religion,n.discription as reserveDiscription,t.discription as topoDiscription,reserveType,landType FROM place 
    left outer JOIN city as c ON longitude = c.place_longitude AND latitude = c.place_latitude 
    left outer JOIN natureReserve as n ON longitude = n.place_longitude AND latitude = n.place_latitude 
    left outer JOIN topography as t ON longitude = t.place_longitude AND latitude = t.place_latitude 
    left outer JOIN placePhotos as p ON longitude = p.place_longitude AND latitude = p.place_latitude) as ccc where ccc.longitude = ${longitude} AND ccc.latitude = ${latitude} ;`);//, returns an object arrys

  module.exports.insertPlace = (req, res, next) =>
  connection.query(
    "INSERT INTO place (longitude, latitude, `name`, country_name, placeType) VALUES (?,?,?,?,?);",
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
    "INSERT INTO city (place_longitude, place_latitude, religion, `history`, population) VALUES (?,?,?,?,?);",
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
    "INSERT INTO natureReserve (place_longitude, place_latitude, reserveType, discription) VALUES (?,?,?,?);",
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
    "INSERT INTO topography (place_longitude, place_latitude, landType, discription) VALUES (?,?,?,?);",
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
    "INSERT INTO placePhotos (place_longitude, place_latitude, photoURL) VALUES (?,?,?);",
    [req.body.longitude, req.body.latitude, req.body.photoURL],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );

  module.exports.insertEnroller = (req, res, next) =>
  connection.query(
    "INSERT INTO enroll (explorer_user_id, trip_id, trip_company_user_id) VALUES (?,?,?);",
    [req.session.user_id, req.params.id, req.params.company_user_id],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );

  module.exports.insertAdmin = (req, res, next) =>
  connection.query(
    "INSERT INTO user (userName,email, password,wallet,userType)  VALUES (?,?,?,?,?) ",
    [
      req.body.userName,
      req.body.email,
      req.body.password,
      0,
      3
    ]
  );
  module.exports.insertUserExplorer = (req, res, next) =>
  connection.query(
    "INSERT INTO user (userName,email, password,wallet,userType)  VALUES (?,?,?,?,?) ",
    [
      req.body.userName,
      req.body.email,
      req.body.password,
      0,
      0
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      connection.query(
        `select id from \`user\` where userName =\'${req.body.userName}\'`,

        async(error, results) => {
          if (error) throw error;
          console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results,
          connection.query(
            `INSERT INTO explorer (user_id,bio)  VALUES (${results[0].id},?) `,
            [
              req.body.bio
            ],
            async(error, results) => {
              if (error) throw error;
              console.log(results); // results contains rows returned by server
              //console.log(fields); // fields contains extra meta data about results,
              
            }
          );
        }
      );
    }
  );
  module.exports.insertUserCompany = (req, res, next) =>
  connection.query(
    "INSERT INTO user (userName,email, password,wallet,userType)  VALUES (?,?,?,?,?) ",
    [
      req.body.userName,
      req.body.email,
      req.body.password,
      0,
      1
    ],
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      connection.query(
        `select id from \`user\` where userName =\'${req.body.userName}\'`,
        async(error, results) => {
          if (error) throw error;
          console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results,
          connection.query(
            `INSERT INTO company (user_id, companyName,bio)  VALUES (${results[0].id},?,?) `,
            [
              req.body.companyName,
              req.body.bio
            ],
            async(error, results) => {
              if (error) throw new ExpressErrors(error.message,error.code);
              console.log(results); // results contains rows returned by server
              //console.log(fields); // fields contains extra meta data about results,
              
            }
          );
        }
      );
    }
  );
  module.exports.selectUserID = (name) => `select id from \`user\` where userName =\'${name}\';`;

  module.exports.insertBus = (req, res, next) =>
  connection.query(
    "INSERT INTO bus (id, agency,capacity)  VALUES (?,?,?) ;",
    [
      req.body.id,
      req.body.agency,
      req.body.capacity,
    ],
  );
  module.exports.insertTrip = (req, res, next) =>
  connection.query(
    `INSERT INTO trip  (id, price, tripType, numberOfDay, \`description\`, \`date\`, company_user_id, bus_id, place_longitude, place_latitude,noOfExpolorers)  
    VALUES (?,?,?,?,?,?,${req.session.user_id},?,?,?,?);`,
    [
      req.body.id,
      req.body.price,
      req.body.tripType,
      req.body.numberOfDay,
      req.body.description,
      req.body.date,
      req.body.bus_id,
      req.body.place_longitude,
      req.body.place_latitude,
      0
    ], async(error, results) => {
      if (error) throw (new ExpressErrors(error.message,error.statusCode)) ;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
    }
  );

 