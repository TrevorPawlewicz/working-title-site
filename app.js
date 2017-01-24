var express    = require('express');
var app        = express();
var bodyParser = require("body-parser"); // to get form data (req.body.name)
var mongoose   = require("mongoose"); // object data mapper for MongoDB
var flash          = require("connect-flash"); // messages
var passport       = require("passport"); // authentication
var LocalStrategy  = require("passport-local"); // authentication
var methodOverride = require("method-override"); //for routes
var moment         = require("moment"); // date & time

//  SCHEMAS              ./ = current directory
var Title     = require("./models/title.js"); // import model module
var Comment   = require("./models/comment.js"); // import model module
var User      = require("./models/user.js"); // import model module

var seedDB = require("./seeds.js");
seedDB();

// ROUTES - require the files, then app.use them below
var commentRoutes = require("./routes/comments.js"),
    titleRoutes   = require("./routes/titles.js"),
    indexRoutes   = require("./routes/index.js"); // AUTHENTICATION

mongoose.connect("mongodb://localhost/my_titles");
app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render
// __dirname is the directory the app.js lives in
app.use(express.static(__dirname + "/public")); //points Express to public folder
app.use(methodOverride("_method"));
app.use(flash());



// PASSPORT Config: -----------------------------------------------------------
app.use(require("express-session")({
    secret: "Dream another dream!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport-local-mongoose
passport.serializeUser(User.serializeUser());         //passport-local-mongoose
passport.deserializeUser(User.deserializeUser());     //passport-local-mongoose
//-----------------------------------------------------------------------------


// our MIDDLEWARE for ALL routes:
app.use(function(req, res, next){
    // res.locals = available in ALL our ejs templates
    res.locals.currentUser = req.user;
    //res.locals.errorMsg = req.flash("error"); // flash message KEY
    //res.locals.successMsg = req.flash("success"); // flash message KEY
    next(); // needed to move out of MIDDLEWARE
});

// associate routes with Express:
app.use(indexRoutes);
app.use("/titles", titleRoutes); //adds "/sonytitles" prefix to routes (get, post)
app.use(commentRoutes);
//-----------------------------------------------------------------------------

/*
//------------------------ ROUTES --------------------------------------------
app.get("/", function(req, res){
    res.render("landing.ejs");
});

// get route retrieves data
app.get("/sonytitles", function(req, res){
    console.log(req.user);
    // get all titles from DB:
    Title.find({}, function(err, allTitles){
        if (err) {
            console.log(err);
        } else {
            //         "path", {our name for data: data being passed to page}
            res.render("titles/index.ejs", {
                titles: allTitles,
                currentUser: req.user // req.user is made by PASSPORT
            });
        }
    });
});

// CREATE - POST route ADDS data ---------------------------------------------
app.post("/sonytitles", function(req, res){
    // get data from ejs page:
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newTitle = {name: name, image: image, description: desc};

    // create a new title and save to DB:
    Title.create(newTitle, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/sonytitles");
        }
    });
});

// NEW - show form to create a new title -------------------------------------
app.get("/sonytitles/new", function(req, res){
    res.render("titles/new.ejs");
});

// SHOW - find one title by ID -----------------------------------------------
app.get("/sonytitles/:id", function(req, res){
    Title.findById(req.params.id).populate("titles").exec(function(err, foundTitle){
        if (err) {
            console.log(err);
        } else {
            console.log(foundTitle);
            res.render("titles/show.ejs", {title: foundTitle});
        }
    });
});


// AUTHENTICATION routes ======================================================

// MIDDLEWARE function
isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //  flash( key,      value) to be passed
    //req.flash("error", "You Need To Be Logged In To Do That!");
    res.redirect("/login");
}; //--------------------------------------------------------------------------

// SHOW (GET) the form
app.get('/register', function(req, res){
    res.render('register.ejs');
}); //-------------------------------------------------------------------------

// handle (POST) Sign Up logic:
app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username}); // username from FORM
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register.ejs");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/sonytitles");
        })
    });
}); //-------------------------------------------------------------------------

// SHOW (GET) Login form:
app.get("/login", function(req, res){
    res.render("login.ejs");
}); //-------------------------------------------------------------------------

// handle (POST) Login with "passport-local-mongoose" MIDDLEWARE:
app.post("/login", passport.authenticate("local",
    {   // user is assumed to exist
        successRedirect: "/sonytitles",
        failureRedirect: "/login",
        failureFlash: true
    }),
    function(req, res){
        // not really needed
        console.log("something really went wrong :(");
    }
); //------------------------------------------------------------------------


// (GET) Logout logic
app.get("/logout", function(req, res){
    req.logout();
    //req.flash("success", "Logged You Out!");
    //res.redirect("/");
    res.redirect("/sonytitles");
}); //------------------------------------------------------------------------

//=============================================================================

*/


//------------------------- SERVER --------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Server is started on port: " + port);
});
//=============================================================================
