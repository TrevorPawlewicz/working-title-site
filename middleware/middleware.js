// our MIDDLEWARE functions ---------------------------------------------------
var Title            = require("../models/title.js");
var Comment          = require("../models/comment.js");
var middlewareObject = {};


middlewareObject.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //  flash( key,      value) to be passed
    req.flash("error", "You Need To Be Logged In To Do That!");
    res.redirect("/login");
}; //--------------------------------------------------------------------------


middlewareObject.checkTitleOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Title.findById(req.params.id, function(err, foundTitle){
            if (err) {
                console.log(err);
                req.flash("error", "Whaaaaa? Title not Found!");
                res.redirect("back"); // previous page
            } else {
                // does user own bar post? compare:
                console.log("foundTitle.author.id = " + foundTitle.author.id); // mongoose object
                console.log("req.user._id = " + req.user._id); // string

                if (foundTitle.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Do Not Have Permission To Do That, Son!");
                    res.redirect("back"); // previous page
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In To Do That!");
        res.redirect("back"); // previous page
    }
}; //--------------------------------------------------------------------------


middlewareObject.checkCommentOwnership = function(req, res, next) {
    // is user logged in?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                console.log(err);
                req.flash("error", "Whaaaaa? Comment not Found!");
                res.redirect("back"); // previous page
            } else {
                // does user own title post? compare:
                console.log(foundComment.author.id); // mongoose object
                console.log(req.user._id); // string

                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You Do Not Have Permission To Do That, Son!");
                    res.redirect("back"); // previous page
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In To Do That!");
        res.redirect("back"); // previous page
    }
}; //--------------------------------------------------------------------------


// export the middleware function object:
module.exports = middlewareObject;
//-----------------------------------------------------------------------------
