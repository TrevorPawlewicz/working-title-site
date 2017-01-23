var mongoose = require("mongoose");
//----------------------------------------------------------------------------

// SCHEMA SETUP
var titleSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


// compile schema into a model (adds methods to use with MongoDB)
module.exports = mongoose.model("Title", titleSchema);
