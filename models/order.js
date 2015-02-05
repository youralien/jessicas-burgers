var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	
	// ingredients, by their document _id
	ingredients: [String]
});

module.exports = mongoose.model('Order', OrderSchema);