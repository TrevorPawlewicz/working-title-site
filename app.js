var express    = require('express');
var app        = express();
var bodyParser = require("body-parser"); // to get form data (req.body.name)
var mongoose   = require("mongoose"); // object data mapper for MongoDB

var Title      = require("./models/titles.js"); // import model module
// var Comments   = require("./models/comments.js"); // import model module
// var Users      = require("./models/user.js"); // import model module

mongoose.connect("mongodb://localhost/my_titles");
app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render

app.get("/", function(req, res){
    res.render("landing.ejs");
});



//------------------------ ROUTES --------------------------------------------
// get rout retrieves data
app.get("/sonytitles", function(req, res){
    // get all titles from DB:
    Title.find({}, function(err, allTitles){
        if (err) {
            console.log(err);
        } else {
            //         "path", {our name for data: data being passed to page}
            res.render("sonytitles.ejs", {titles: allTitles});
        }
    });
});

// CREATE - POST route ADDS data ---------------------------------------------
app.post("/sonytitles", function(req, res){
    // get data from ejs page:
    var name = req.body.name;
    var image = req.body.image;
    var newTitle = {name: name, image: image};

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
    res.render("new.ejs");
});

// SHOW - find one title by ID -----------------------------------------------
app.get("/sonytitles/:id", function(req, res){

});










//------------------------- SERVER --------------------------------------------
var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Server is started on port: " + port);
});
//=============================================================================
