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
				if (err) errorHandler(err,req,res);
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

index.getIngredients = function(req, res) {
	
	Ingredient.find({}, function(err, ingredients) {
		if (req.xhr) {
			res.send(ingredients);
		}
		else {
			res.render('ingredients',{'ingredients': ingredients})
		}
	});
};

index.postIngredients = function(req, res) {

	var ingredientObj = req.body;

	// Already has an _id, so is already in the database
	if (ingredientObj._id) {
		Ingredient.update(
			{_id: ingredientObj._id},
			ingredientObj,
			function(err, numAffected) {
				if (err) errorHandler(err,req,res);
				if (numAffected != 1) errorHandler(err,req,res);
			}
		);
	}

	// Add a new ingredient
	else {
		ingredient = new Ingredient({
			name: ingredientObj.name,
			price: ingredientObj.price,
			inStock: true
		});
		ingredient.save(function(err) {
			if (err) errorHandler(err,req,res);
		});
	}

};

/** To make an order, you must go to a form and add the ingredients you want
 on your burger.
 */
index.makeOrder = function(req, res) {
	Ingredient.find({inStock:true}, function(err, ingredients) {
		if (err) errorHandler(err, req, res);
		else {
			res.render('order', {'ingredients':ingredients});
		}
	});
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
