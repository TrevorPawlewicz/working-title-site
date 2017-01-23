var mongoose   = require("mongoose");
var Title      = require("./models/title.js");
var Comment    = require("./models/comment.js");

var data = [
    {
        name: "Dive Bar",
        image: "http://philadelphia.cities2night.com/public/article_images/129.jpg",
        description: "Constituam consectetuer nec te. Quas appetere pericula ea cum, ea vis rebum soleat omnesque."
    },
    {
        name: "Bigfoot Lodge",
        image: "http://www.imaginelifestyles.com/luxuryliving/wp-content/uploads/blog/files/u2/PetesSake.jpg",
        description: "Pri labitur nusquam no, usu ludus nobis utinam an. Vim id iudico temporibus, eum democritum moderatius id."
    },
    {
        name: "Paddy's Pub",
        image: "http://www.sitcomsonline.com/photopost/data/1315/its-always-sunny-in-philadelphia-paddy.jpg",
        description: "Constituam consectetuer nec te. Quas appetere pericula ea cum, ea vis rebum soleat omnesque.Pri labitur nusquam no, usu ludus nobis utinam an. Vim id iudico temporibus, eum democritum moderatius id."
    }
];

function seedDB() {
    // clear ALL data from DB
    Title.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("=====> Removed ALL Titles!");

        // add a few bars:
        data.forEach(function(seed){
            Title.create(seed, function(err, title){
                if (err) {
                    console.log(err);
                } else {
                    console.log("====> Added a Title!");

                    // add some comments:
                    Comment.create(
                        {
                            text: "You don't have to go home but you an't sleep here.",
                            author: "Yo Mama"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                title.comments.push(comment);
                                title.save();
                                console.log("====> Created new comment!");
                            }
                    });
                }
            });
        });
    });
};


// EXPORT module:
module.exports = seedDB;
