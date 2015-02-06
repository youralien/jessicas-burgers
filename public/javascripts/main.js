// $.ajax({
// 	url: '/path/to/file',
// 	type: 'default GET (Other values: POST)',
// 	dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
// 	data: {param1: 'value1'},
// })
// .done(function() {
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });

// MY STUFF BELOW

/**
 * @param {$('div.ingredient')} currentTarget
 * @return {None}
 */
function enterEditMode(currentTarget) {
	// Change the div to be in editing mode
  $(currentTarget).addClass('editing');

  // Reveal the Save and Out-of-Stock Buttons
  $(currentTarget).children('button').prop('hidden', false);
}

/**
 * @param {$('div.ingredient')} currentTarget
 * @return {None}
 */
function exitEditMode(currentTarget) {
	// FIXME: these buttons are not hiding!
	
	// Change the div to exit editing mode
  $(currentTarget).removeClass('editing');

	// Hide the Save and Out-of Stock Buttons 
  $(currentTarget).children('button').prop('hidden', true);

	// $(currentTargetprop('hidden', true);
 //  $(this).siblings('button').prop('hidden', true);
  
 //  $(this).parent('.ingredient').removeClass('editing');
}

// Editing the elements in the Ingredients list
$('.ingredient').not('.editing').click(function (event) {
  enterEditMode(this);
});

$('.btn-save').click(function (event) {

	var ingredient = {}

	// the ingredient
	ingredient._id = $(this).parent().attr('id')
	ingredient.name = $(this).siblings('.name-input').val();
	ingredient.price = $(this).siblings('.price-input').val();
	ingredient.inStock = $(this).siblings('.inStock-input').prop('checked');

	debugger;

	$.post('/ingredients', ingredient, function(data) {
		debugger;
	});
	
	exitEditMode($(this).parent())
});

$('.btn-add').click(function(event) {
	var new_ingredient = $('.ingredient:last').clone();
	new_ingredient.attr('id', undefined);

	$(this).before(new_ingredient);
	
	enterEditMode(new_ingredient);
});
