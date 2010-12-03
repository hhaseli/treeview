/*!
 * Simple treeview
 * https://github.com/hhaseli/treeview
 *
 * Copyright 2010, Hamid Haseli
 * Licensed under the GPL Version 3 licenses.
 *
 * Date: Fri Dec 03 15:53:20 2010 -0800
 */
(function( $ ){
$.fn.treeview = function(parameters) {
	options = {
		command: null
	};
	$.extend(options, parameters);
	
	if(options.command == null || options.command == 'create'){
		// Add treeview class to the element.
		this.addClass('treeview treeviewGenerator');
		// The addFirstClass is a class name that add to all 'li ul' elements of the element.
		$(".treeviewGenerator li ul").addClass('addFirstClass');
		// Make all the collapsable/expandable elemnts activate.
		$(".treeviewGenerator .addFirstClass").parent().filter(':not(.expandable)').addClass('collapsable');
		// Remove the addFirstClass.
		$('.treeviewGenerator .addFirstClass').removeClass('addFirstClass');
		// Make expandable uls expanded.
		$('.treeviewGenerator .expandable ul:eq(0)').removeClass('collaped').addClass('expanded');
		// Insert hitarea html.
		$('<div class="hitarea"></div>').insertBefore('.treeviewGenerator .collapsable span');
		// Add the "last" class to li elements that are the end li of ul elements.
		$(".treeviewGenerator :last-child:not(ul)").not(':not(li)').addClass('last');
	
		$('.treeviewGenerator .hitarea').bind('click',function(){
			if($(this).parent().hasClass('collapsable')){
				firstClassName = 'collapsable';
				secondClassName = 'expandable';
				thirdClassName = 'collaped';
				fourthClassName = 'expanded';
			}
			else{
				firstClassName = 'expandable';
				secondClassName = 'collapsable';
				thirdClassName = 'expanded';
				fourthClassName = 'collaped';
			}
			
			$(this).parent().addClass(secondClassName + ' hitParent').removeClass(firstClassName);
			$('.hitParent ul:eq(0)').removeClass(thirdClassName).addClass(fourthClassName);
			$('.hitParent').removeClass('hitParent');
			
		});
		$('.treeviewGenerator').removeClass('treeviewGenerator');
	}
	else if(options.command == 'destroy'){
		this.addClass('treeviewDestroy')
		$('.treeviewDestroy').removeClass('treeview');
		$(".treeviewDestroy li").removeClass('collapsable').removeClass('expandable').removeClass('last');
		$(".treeviewDestroy ul").removeClass('collaped').removeClass('expanded');
		$(".treeviewDestroy .hitarea").remove();
		this.removeClass('treeviewDestroy');
	}
	};
})( jQuery );