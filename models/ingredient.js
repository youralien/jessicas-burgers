var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
	name: String,
	price: Number,
	inStock: Boolean
});

module.exports = mongoose.model('Ingredient', IngredientSchema);