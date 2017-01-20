var express = require('express');
var app     = express();


//app.set("view engine", "ejs"); // only needed to leave .ejs from res.render below

app.get("/", function(req, res){
    res.render("landing.ejs");
});



app.get("/sonytitles", function(req, res){

    //         "path", {our name for data: data being passed to page}
    res.render("sonytitles.ejs", {titles: titles});
});


















var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function() {
    console.log("Sever is started on port: " + port);
});
