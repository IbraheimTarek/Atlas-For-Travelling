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
  password: 'qqqq1111',//passwordchanges
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
app.use((req, res, next) => {
  res.locals.user_id = req.session.user_id;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.userType = req.session.userType;
  res.locals.userName = req.session.userName;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  next();
});

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
const verifyExplorer= (req, res, next) => {
  if(req.session.userType == 0 || req.session.isAdmin){
  next();
  }
  throw (new ExpressErrors("You should be an explorer"));
};


app.get("/places/:longitude&:latitude&:id&:company_user_id",verifyExplorer,(req, res, next) => {
  console.log(req.params);
  controller.insertEnroller(req);
  res.redirect(`/places`);
});
app.get("/places/:longitude&:latitude&:id&:company_user_id/addreview",verifyExplorer,(req, res, next) => {
  res.render(`pages/addreview`,{req});
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
          
          connection.query(
            controller.selectPlaceHotels(req.params.longitude, req.params.latitude),
            async (error, results) => {
              if (error) throw error;
              console.log(results); // results contains rows returned by server
              //console.log(fields); // fields contains extra meta data about results,
              const hotels = results;


              connection.query(
                controller.selectPlaceCreatures(req.params.longitude, req.params.latitude),
                async (error, results) => {
                  if (error) throw error;
                  console.log(results); // results contains rows returned by server
                  //console.log(fields); // fields contains extra meta data about results,
                  const creatures = results;

                  connection.query(
                    controller.selectPlaceReviews(req.params.longitude, req.params.latitude),
                    async (error, results) => {
                      if (error) throw error;
                      console.log(results); // results contains rows returned by server
                      //console.log(fields); // fields contains extra meta data about results,
                      const reviews = results;
                      
                      res.render("pages/place", { place, trips, hotels, creatures, reviews});
                    }
                  );
                }
              );
            }
          );
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
      if (error) throw new ExpressErrors(error.message,error.statusCode);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      const places = results;
      res.render("pages/places", { places });
    }
  );
});




app.get("/places/:longitude&:latitude/addcreature",async(req, res, next)=>{
  connection.query(
    controller.selectCreatures,
    async (error, results) => {
      if (error) throw error;
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      const creatures = results;
      res.render("pages/chooseCreature",{creatures , req});
    }
  );

});
app.post("/places/:longitude&:latitude&:id&:company_user_id/addreview",verifyExplorer,(req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  controller.insertReview(req);
  res.redirect(`/places/${req.params.longitude}&${req.params.latitude}`);
});
app.post("/places/:longitude&:latitude/addcreature",async(req, res, next)=>{
  console.log(req.body);
  console.log(req.params);
  controller.insertCreatureHasPlace(req);
  res.redirect(`/places/${req.params.longitude}&${req.params.latitude}`);
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
      next(err);
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
    res.redirect("/")
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
      if (error) throw new ExpressErrors(error.message,error.statusCode);
      console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results,
      try{
        if(!results[0].password)  {
          res.redirect("/login");
        }else{
          connection.query(
            `select * from \`user\` where userName =\'${req.body.userName}\'`,
            async(error, results) => {
              if (error) throw new ExpressErrors(error.message,error.statusCode);
              console.log(results); // results contains rows returned by server
              req.session.user_id = results[0].id;
              req.session.userType = results[0].userType;
              req.session.userName = results[0].userName;
              if(results[0].userName.substr(0,2)== "999" || results[0].userType > 2){
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
      
    }
  );
  

app.post("/creature", async (req, res,next) => {
  if(req.body.endangered == null){
    req.body.endangered = false;
  }else{
    req.body.endangered = true;
  }
  try{
    controller.insertCreature(req);
    res.redirect("/places")
  }catch(e){
    next(e);
  }
});
app.post("/hotel", async (req, res,next) => {
  console.log(req.body);
  try{
    controller.insertHotel(req);
    res.redirect("/places")
  }catch(e){
    next(e);
  }
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

app.post("/insertAdmin",verifyAdmin,(req, res) => {
  controller.insertAdmin(req);
  res.redirect("/");
});
////////////////////////// app.put //////////////////////////


app.put("/Bus",async (req, res, next) => {
  console.log(req.body);
  const qry = controller.updateBus(req);
    res.redirect("/")
});
app.put("/places",async (req, res, next) => {
  console.log(req.body);
  const qry = controller.updateHotel(req);
    res.redirect("/")
});

app.put("/User", async (req, res) => {
  console.log(req.body);
  if(req.body.userType == 0){
    controller.updateUserExplorer(req);
  }else if(req.body.userType == 1){
    controller.updateUserCompany(req)
  }
  res.redirect("/");
});

app.put("/User", async (req, res) => {
  console.log(req.body);
  controller.updateUser(req);
  res.redirect("/");
});
app.put("/User", async (req, res) => {
  console.log(req.body);
  controller.updateCompany(req);
  res.redirect("/");
});

















////////////////////////// app.get //////////////////////////


app.get("/insertAdmin",verifyAdmin,(req, res) => {
  res.render("pages/registerAdmin");
});

// insert
app.get("/places/insertCity", async (req, res) => {
  res.render("pages/insertCity");
});

app.get("/places/insertNatureReserve", async (req, res) => {
  res.render("pages/insertNatureReserve");
});
app.get("/places/insertTopography", async (req, res) => {
  res.render("pages/insertTopography");
});
app.get("/insertBus", (req, res) => {
  res.render("pages/insertBus");
});
app.get("/insertUser", (req, res) => {
  res.render("pages/insertUser");
});
app.get("/insertCreature", (req, res) => {
  res.render("pages/insertCreature");
});
app.get("/insertHotel", (req, res) => {
  res.render("pages/insertHotel");
});
app.get("/insertTrip", (req, res) => {
  res.render("pages/insertTrip");
});

// update

app.get("/places/updateCity", async (req, res) => {
  res.render("pages/updateCity");
});

app.get("/places/updateNatureReserve", async (req, res) => {
  res.render("pages/updateNatureReserve");
});
app.get("/places/updateTopography", async (req, res) => {
  res.render("pages/updateTopography");
});
app.get("/updateBus", (req, res) => {
  res.render("pages/updateBus");
});
app.get("/updateExplorer", (req, res) => {
  res.render("pages/updateExplorer");
});
app.get("/updateUser", (req, res) => {
  res.render("pages/updateUser");
});
app.get("/updateCompany", (req, res) => {
  res.render("pages/updateCompany");
});
app.get("/updateCreature", (req, res) => {
  res.render("pages/updateCreature");
});
app.get("/updateHotel", (req, res) => {
  res.render("pages/updateHotel");
});
app.get("/updateTrip", (req, res) => {
  res.render("pages/updateTrip");
});


app.get("/registerforexplorer", (req, res) => {
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
app.get("/logout",(req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.get("/register", (req, res) => {
  res.render("pages/register");
});
app.get("/profile", (req, res,next) => {
  if(req.session.userType == 0){
    res.render("pages/Profile");
  }
  else if(req.session.userType == 1 ){
    res.render("pages/CompanyProfile");
  }
  else if(req.session.isAdmin){
  res.render("pages/AdminProfile");
  }else
  {
    next();
  }
});
app.get("/", (req, res) => {
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
