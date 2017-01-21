var express    = require('express');
var app        = express();
var bodyParser = require("body-parser"); // to get form data (req.body.name)

app.use(bodyParser.urlencoded({extended: true}));
//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render below

app.get("/", function(req, res){
    res.render("landing.ejs");
});

// temp data:
var titles = [
    {
        name: "Everybody Wants Some!!",
        image: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2NDcyNDE5N15BMl5BanBnXkFtZTgwNDA0MzQ1NzE@._V1_UY1200_CR70,0,630,1200_AL_.jpg"
    }
];
// get rout retrieves data
app.get("/sonytitles", function(req, res){
    //         "path", {our name for data: data being passed to page}
    res.render("sonytitles.ejs", {titles: titles});
});

// CREATE - post route ADDS data
app.post("/sonytitles", function(req, res){
    // get data from ejs page:
    var name = req.body.name;
    var image = req.body.image;
    var newTitle = {name: name, image: image};

    titles.push(newTitle); // add to our array

    // redirect to sonytitles page:
    res.redirect("/sonytitles");
});

app.get("/sonytitles/new", function(req, res){
    res.render("new.ejs");
});














var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Server is started on port: " + port);
});
