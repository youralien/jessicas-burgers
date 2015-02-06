var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	
	// ingredients, by their document _id
	ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]

});

module.exports = mongoose.model('Order', OrderSchema);