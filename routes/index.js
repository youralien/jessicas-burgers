var path = require('path');
var mongoose = require('mongoose');
var Ingredient = require(path.join(__dirname, '../models/ingredient'));
var Order = require(path.join(__dirname, '../models/order'));

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

var index = {}

index.stockIngredients = function(req, res) {
	
	Ingredient.count({}, function(err, count) {
		
		// Insert ingredients if there are none in the collection
		if (!count) {
			var ingredientData = require('./ingredientData');

			/**Batch Insertion. Note: Will bypass any Mongoose validation procedures
			and will access the Mongo drivers directly.
			http://stackoverflow.com/questions/16726330/mongoose-mongodb-batch-insert
			 */
			Ingredient.collection.insert(ingredientData, function(err, docs) {
				if (err) errorHandler();
				else {
					res.send(docs.length + 
						' ingredients have been stocked into the collection');
				}
			});
		}
		
		else {
			res.send('Ingredients already exist in the database.  Visit /ingredients ' +
				'to see their names and prices');
		}

	});

}

index.listIngredients = function(req, res) {
	
	// only list ingredients still in stock
	Ingredient.find({}, function(err, ingredients) {
		if (req.xhr) {
			res.send(ingredients);
		}
		else {
			res.render('ingredients',{'ingredients': ingredients})
		}
	});
};

index.toggleIngredients = function(req, res) {

	res.send('WIP: toggleIngredients');
};

/** To make an order, you must go to a form and add the ingredients you want
 on your burger.
 */
index.makeOrder = function(req, res) {
	res.render('order');
};

/** To submit an order, you add a newly created order (form) data to the
queue (database) of pending orders
 */
index.submitOrder = function(req, res) {
	res.render('order');
};

/** list the pending orders
 */
index.listOrders = function(req, res) {
	Orders.find({}, function(err, orders) {
		res.render('kitchen', {'orders': orders});
	});
};

/** To complete an order, you remove it from the collection of pending orders
 */
index.completeOrder = function(req, res) {
	res.render('order');
};

module.exports = index;
