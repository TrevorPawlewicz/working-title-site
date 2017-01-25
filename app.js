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
//seedDB(); // to seed the database with starter info

// ROUTES - require the files, then app.use them below
var commentRoutes = require("./routes/comments.js"),
    titleRoutes   = require("./routes/titles.js"),
    indexRoutes   = require("./routes/index.js"); // AUTHENTICATION

mongoose.connect("mongodb://localhost/my_titles");
app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render

// __dirname is the directory the app.js lives in
app.use(express.static(__dirname + "/public")); //points Express to public folder
app.use(methodOverride("_method")); //action="/titles/<%= title._id %>?_method=PUT" method="POST"
app.use(flash()); // use connect-flash



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


// our MIDDLEWARE for ALL routes: ---------------------------------------------
app.use(function(req, res, next){
    // res.locals = available in ALL our ejs templates
    res.locals.currentUser = req.user;
    res.locals.errorMsg = req.flash("error"); // flash message KEY
    res.locals.successMsg = req.flash("success"); // flash message KEY
    next(); // needed to move out of MIDDLEWARE
});
//-----------------------------------------------------------------------------

// associate routes with Express: ---------------------------------------------
app.use(indexRoutes);
app.use("/titles", titleRoutes); //adds "/titles" prefix to routes (get, post)
app.use(commentRoutes);
//-----------------------------------------------------------------------------




//------------------------- SERVER --------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Server is started on port: " + port);
});
//=============================================================================
