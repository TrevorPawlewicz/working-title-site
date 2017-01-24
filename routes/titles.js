// routes/titles.js
var express    = require("express");
var router     = express.Router(); // new instance of express Router
var Title      = require("../models/title.js"); // import model module
var middleware = require("../middleware/middleware.js"); // include our MIDDLEWARE
//var moment     = require("moment"); // for time & date display
//var multer     = require("multer"); // file image upload
//var imageUpload = multer({dest: "./public/images/uploads"});


// INDEX: show ALL bars
router.get("/", function(req, res){
    // get all titles from database:
    Title.find({}, function(err, allTitlesFound){
        if (err) {
            console.log(err);
        } else {
            //                       {name we give it: data passed in}
            res.render("sonytitles/index.ejs", { bars: allTitlesFound });
        }
    });
}); //-------------------------------------------------------------------------


// CREATE:
 router.post("/", middleware.isLoggedIn, function(req, res){
//router.post("/", middleware.isLoggedIn, upload.single("image") , function(req, res){
    // get data from FORM: req.body
    var name = req.body.name; // from new.ejs FORM "name"
    var image = req.body.image; // from new.ejs FORM "image"
    var desc = req.body.description; //from new.ejs FORM "description"
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //var creationDate = moment().format("MMMM Do YYYY, h:mm a");
    //var cost = req.body.cost;
    //var rating = ;

    var newTitle = {
        name: name,
        image: image,
        description: desc,
        author: author
        //cost: cost,
        //date: creationDate
    };

    // create a new bar and save to the database:
    Title.create(newTitle, function(err, newlyCreated){
        console.log("newlyCreated = " + newlyCreated);
        if (err) {
            console.log(err);
        } else {
            res.redirect("/sonytitles"); // to GET '/bars' route
        }
    });
}); //-------------------------------------------------------------------------


// NEW: show the form to create a new bar
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("sonytitles/new.ejs");
}); //-------------------------------------------------------------------------

// SHOW: info of bar by ID
router.get("/:id", function(req, res){
    // find bar witgh ID:
    Title.findById(req.params.id).populate("comments").exec(function(err, foundBar){
        if (err) {
            console.log(err);
        } else {
            // render show template with that bar data:
            res.render("sonytitles/show.ejs", {bar: foundBar});
        }
    });
}); //-------------------------------------------------------------------------


// EDIT by ID
router.get("/:id/edit", middleware.checkBarOwnership, function(req, res){
    // checkBarOwnership MIDDLEWARE is checked THEN:
    Title.findById(req.params.id, function(err, foundTitle){
        if (err) {
            req.flash('error', 'Cannot Find Specified Item!');
        } else {
            res.render("sonytitles/edit.ejs", { title: foundTitle });
        }
    });
}); //-------------------------------------------------------------------------

// UPDATE by ID
router.put("/:id", middleware.checkBarOwnership, function(req, res){
    Title.findByIdAndUpdate(req.params.id, req.body.bar, function(err, foundTitle){
        if (err) {
            console.log(err);
            res.redirect("/sonytitles");
        } else {
            req.flash("success", "Bar Updated!!");
            res.redirect("/sonytitles/" + req.params.id);
        }
    });
}); //-------------------------------------------------------------------------

// DESTROY by ID
router.delete("/:id", middleware.checkBarOwnership, function(req, res){
    Title.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("/sonytitles");
        } else {
            req.flash("success", "Title Deleted!");
            res.redirect("/sonytitles");
        }
    });
}); //-------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// export (return) our router for app.js import
module.exports = router;