var mongoose = require("mongoose");
//----------------------------------------------------------------------------

// SCHEMA SETUP
var titleSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


// compile schema into a model (adds methods to use with MongoDB)
module.exports = mongoose.model("Title", titleSchema); // export
