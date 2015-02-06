/**
======== ingredients.handlebars ========
 */

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
  $(currentTarget).children('button').attr('hidden', true);

  debugger;
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


	$.post('/ingredients', ingredient, function(){
		exitEditMode($(this).parent())
	});
	
});

$('.btn-add').click(function(event) {
	var new_ingredient = $('.ingredient:last').clone();
	new_ingredient.attr('id', undefined);

	$(this).before(new_ingredient);
	
	enterEditMode(new_ingredient);
});

/**
======== order.handlebars ========
 */
