/**
======== ingredients ========
 */

/**
 * @param {$('div.ingredient')} currentTarget
 * @return {None}
 */
function enterEditMode(currentTarget) {
	// Change the div to be in editing mode
  $(currentTarget).addClass('editing');

  // Reveal the Save and Out-of-Stock Buttons
  // $(currentTarget).children('button').prop('hidden', false);
  $(currentTarget).children('button').show();

}

/**
 * @param {$('div.ingredient')} currentTarget
 * @return {None}
 */
function exitEditMode(currentTarget) {

	// Change the div to exit editing mode
  currentTarget.removeClass('editing');

	// Hide the Save and Out-of Stock Buttons
  currentTarget.children('button').prop('hidden', true);

}

// Editing the elements in the Ingredients list
$('.ingredient').not('.editing').click(function (event) {
  enterEditMode(this);
});

// FIXME: does not trigger event when adding a new ingredient and saving that ingredient. 
$('.btn-save').click(function (event) {

	debugger;
	var ingredient = {};

	// the ingredient
	ingredient._id = $(this).parent().attr('id')
	ingredient.name = $(this).siblings('.name-input').val();
	ingredient.price = $(this).siblings('.price-input').val();
	ingredient.inStock = $(this).siblings('.inStock-input').prop('checked');

	exitEditMode($(this).parent());


	$.post('/ingredients', ingredient, function(){
		alert('success')
	})
		.done(function(){
			alert('second success');
		})
		.fail(function(){
			alert('fail');
		})
	
});

$('.btn-add').click(function(event) {
	var new_ingredient = $('.ingredient:last').clone();
	new_ingredient.removeAttr('id');

	$(this).before(new_ingredient);
	
	enterEditMode(new_ingredient);
});

/**
======== order ========
 */

// Calculate total order
$('.order-checkbox').change(function() {
	
	var total = 0;
	$('input:checked').each(function() {
		
		// navigating up and down the DOM tree because of particular formatting of elements
		total += Number($(this)
			.parent()
			.siblings('.price')
			.children('.price-input')
			.val());

	})
	$('#total-cost').val(total)
});

$orderForm = $('#order-form');
$('#btn-order').click(function() {
	
	var checked_inputs = $orderForm.find(':checked');
	var ids = []
	checked_inputs.parent().parent().each(function(i) {
		ids.push(String($(this).attr('id')));
	});

	$.post('/order', {'ids': ids.toString()}, function() {
		$('#result').html('Order was made');
	});
});

/**
======== kitchen ========
 */

$('.btn-order-completed').click(function(){
	
	order_item = $(this).parent().parent()
	var idToComplete = order_item.attr('id');
	$('#'+idToComplete).remove();
	$.post('/kitchen', {'idToComplete': idToComplete});

});
