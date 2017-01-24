var express    = require("express");
var router     = express.Router({mergeParams: true}); //titles + comments get merged
var Title      = require("../models/title.js"); // import model module
var Comment    = require("../models/comment.js"); // include the model schema
var middleware = require("../middleware/middleware.js"); // include our MIDDLEWARE
//var moment     = require("moment"); // for time & date display

// ============================================================================
// COMMENT ROUTES
//---------------
// NEW (GET)                                  MIDDLEWARE
router.get("/sonytitles/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Bar.findById(req.params.id, function(err, title){
        if (err) {
            console.log(err);
        } else {
            //             pass data to the form -v-
            res.render("comments/new.ejs", {title: title});
        }
    });
}); //-------------------------------------------------------------------------


// CREATE (POST) comment                    MIDDLEWARE
router.post("/sonytitles/:id/comments", middleware.isLoggedIn, function(req, res){
    Title.findById(req.params.id, function(err, title){
        if (err) {
            console.log(err);
            res.redirect("/sonytitles");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {

                    console.log(err);
                } else {
                    // date created (with moment.js):
                    var commentDate = moment().format("MMMM Do YYYY, h:mm a");
                    comment.date = commentDate;

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    title.comments.push(comment);
                    title.save();
                    console.log("---> comment = " + comment);
                    res.redirect("/sonytitles/" + title._id);
                }
            });
        }
    });
}); //-------------------------------------------------------------------------


// EDIT comment by Id
router.get("/sonytitles/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {title_id: req.params.id, comment: foundComment});
        }
    });
}); //-------------------------------------------------------------------------


// UPDATE comment
router.put("/sonytitles/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            //req.flash("success", "Comment Updated!");
            res.redirect("/sonytitles/" + req.params.id);
        }
    });
}); //-------------------------------------------------------------------------


// DELETE comment
router.delete("/sonytitles/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
            //req.flash("success", "Comment Deleted!");
            res.redirect("/sonytitles/" + req.params.id);
        }
    });
}); //-------------------------------------------------------------------------



//-----------------------------------------------------------------------------
// export (return) our router for app.js import
module.exports = router;
