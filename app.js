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
const session = require("express-session");
const { resolve } = require("path");
const { rejects } = require("assert");
const catchAsync = require("./utlis/catchAsync");
const { query } = require("express");
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

const sessionConfig = {
  secret: "nice secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

const isLoggedIn = (req, res, next) => {
  if(!req.session.user_id){
    return res.redirect("/login");
  }
  next();
};
const verifyAdmin = (req, res, next) => {
  if(!req.session.isAdmin){
    return res.redirect("/login");
  }
  next();
};
const verifyCompany= (req, res, next) => {
  if(req.session.userType == 1 || req.session.isAdmin){
  next();
  }
  return res.redirect("/login");
};

app.get("/places/insertCity", async (req, res) => {
  res.render("pages/insertCity");
});

app.get("/places/insertNatureReserve", async (req, res) => {
  res.render("pages/insertNatureReserve");
});
app.get("/places/insertTopography", async (req, res) => {
  res.render("pages/insertTopography");
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
      connection.query(
        controller.selectTripsInsidePlace(req.params.longitude, req.params.latitude),
        async (error, results) => {
          if (error) throw error;
          console.log(results); // results contains rows returned by server
          //console.log(fields); // fields contains extra meta data about results,
          const trips = results;
          
          res.render("pages/place", { place, trips });
        }
      );
    }
  );
});
app.get("/places",isLoggedIn, async (req, res) => {
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


app.post("/places", async (req, res) => {
  console.log(req.body);
  controller.insertPlace(req);
  if (req.body.placeType == 0) {
    controller.insertCity(req);
  } else if (req.body.placeType == 1) {
    controller.insertNatureReserve(req);
  } else if (req.body.placeType == 2){
    controller.insertTopography(req);
  }
  controller.insertPlacePhoto(req);
  res.redirect("/places");
});



app.post("/Bus",async (req, res, next) => {
  console.log(req.body);
  const qry = controller.insertBus(req);
    qry.on('error', function(err) {
      console.log("failed to insert data");
    })
    .on('fields', function(fields) {
      // the field packets for the rows to follow
    })
    .on('result', function(row) {
      console.log(row);
    })
    .on('end', function() {
      // all rows have been received
    });
  res.redirect("/Bus");
});


app.post("/register", async (req, res) => {
  console.log(req.body);
  if(req.body.userType == 0){
    controller.insertUserExplorer(req);
  }else if(req.body.userType == 1){
    controller.insertUserCompany(req)
  }
  res.redirect("/");
});

app.post("/login", async (req, res,next) => {
  connection.query(
    `select password from \`user\` where password =\'${req.body.password}\'`,
    async(error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      try{
        if(!results[0].password)  {
          res.redirect("/login");
        }else{
          connection.query(
            `select * from \`user\` where userName =\'${req.body.userName}\'`,
            async(error, results) => {
              if (error) throw error;
              console.log(results); // results contains rows returned by server
              req.session.user_id = results[0].id;
              req.session.userType = results[0].userType;
              if(results[0].userName.substr(0,2)== "999"){
                req.session.isAdmin = true;
              }
              else{
                req.session.isAdmin = false;
              }
              res.redirect("/");
            }
          );
        }
      }
      catch(error){
        next(error);
      }
      
    }
  );
  
});

app.post("/trip",isLoggedIn,verifyCompany, ( async(req, res,next) => {
  console.log(req.body);
  const qry =  controller.insertTrip(req);
  qry.on('error', function(err) {
  })
  .on('fields', function(fields) {
  })
  .on('result', function(row) {
    console.log(row);
  })
  .on('end', function() {
  });
  res.redirect("/places");
}));

app.get("/insertCreature", (req, res) => {
  res.render("pages/insertCreature");
});
app.get("/insertHotel", (req, res) => {
  res.render("pages/insertHotel");
});
app.get("/insertTrip", (req, res) => {
  res.render("pages/insertTrip");
});
app.get("/registerforexpolerers", (req, res) => {
  res.render("pages/registerExplorer");
});
app.get("/registerforcompany", (req, res) => {
  res.render("pages/registerCompany");
});
app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.get("/trips", (req, res) => {
  res.render("pages/Trips");
});
 app.get("/Profile", (req, res) => {
  res.render("pages/Profile");
});
 app.get("/CompanyProfile", (req, res) => {
  res.render("pages/CompanyProfile");
});
 app.get("/AdminProfile", (req, res) => {
  res.render("pages/AdminProfile");
});
app.get("/insertUser", (req, res) => {
  res.render("pages/insertUser");
});
app.get("/insertBus", (req, res) => {
  res.render("pages/insertBus");
});
app.use("/", (req, res) => {
  res.render("pages/home");
});

app.all("*", (req, res, next) => {
  next(new ExpressErrors("Page Not Found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Somthing went wrong" } = err;
  res.status(statusCode).render("error", { err });
});
//to open the server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});
