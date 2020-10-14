const mongoose = require("mongoose");
const mongooseAutoPopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    bussiness_name: { type: String },
    bussiness_description: { type: String },
    events: { type: String },
    categories: { type: String }
});

categorySchema.plugin(mongooseAutoPopulate);

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
