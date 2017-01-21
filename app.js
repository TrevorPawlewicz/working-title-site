var express    = require('express');
var app        = express();
var bodyParser = require("body-parser"); // to get form data (req.body.name)
var mongoose   = require("mongoose"); // object data mapper for MongoDB

mongoose.connect("mongodb://localhost/my_titles");
app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render below

app.get("/", function(req, res){
    res.render("landing.ejs");
});

// SCHEMA SETUP
var titleSchema = new mongoose.Schema({
    name: String,
    image: String
});
// compile schema into a model (adds methods to use with MongoDB)
var Title = mongoose.model("Title", titleSchema);

// Title.create(
//     {
//         name: "Everybody Wants Some!!",
//         image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NDcyNDE5N15BMl5BanBnXkFtZTgwNDA0MzQ1NzE@._V1_UY1200_CR70,0,630,1200_AL_.jpg"
//     }, function (err, title){
//         if (err) {
//             console.log("---> here comes the error...");
//             console.log(err);
//         } else {
//             console.log("New Title created: ");
//             console.log(title);
//         }
// });

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

// CREATE - POST route ADDS data
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

app.get("/sonytitles/new", function(req, res){
    res.render("new.ejs");
});














var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Server is started on port: " + port);
});
