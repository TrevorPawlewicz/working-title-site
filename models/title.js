var mongoose = require("mongoose");
//----------------------------------------------------------------------------

// SCHEMA SETUP
var titleSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {   // associate comments with a Title
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    date: String,
    cost: String,
    rating: String
});

// compile into a model:
var Title = mongoose.model("Title", titleSchema);

// compile schema into a model (adds methods to use with MongoDB)
module.exports = mongoose.model("Title", titleSchema); // export
