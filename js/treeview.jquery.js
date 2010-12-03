/*!
 * Simple treeview
 * https://github.com/hhaseli/treeview
 *
 * Copyright 2010, Hamid Haseli
 * Licensed under the GPL Version 3 licenses.
 *
 * Date: Fri Dec 03 21:00:00 2010 -8000
 */
(function( $ ){
$.fn.treeview = function(parameters) {
	options = {
		command: null
	};
	$.extend(options, parameters);
	
	function create(selector){
		// Making sure it doesn't have any old hitarea.
		destroyer(selector,'destroy')
		// Add treeview class to the element.
		selector.addClass('treeview treeviewGenerator');
		// The addFirstClass is a class name that add to all 'li ul' elements of the element.
		$(".treeviewGenerator li ul").addClass('addFirstClass');
		// Make all the collapsable/expandable elemnts activate.
		$(".treeviewGenerator .addFirstClass").parent().filter(':not(.expandable)').addClass('collapsable');
		// Remove the addFirstClass.
		$('.treeviewGenerator .addFirstClass').removeClass('addFirstClass');
		// Make expandable uls expanded.
		$('.treeviewGenerator .expandable ul:eq(0)').removeClass('collaped').addClass('expanded');
		// Insert hitarea html.
		$('<div class="hitarea"></div>').insertBefore('.treeviewGenerator .collapsable span,.treeviewGenerator .expandable span');
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
	function destroyer(selector,command){
		selector.addClass('treeviewDestroy')
		$('.treeviewDestroy').removeClass('treeview');
		if(command == 'destroy'){
			$(".treeviewDestroy li").removeClass('last');
		}
		else if(command == 'destroy all'){
			$(".treeviewDestroy li").removeClass('collapsable').removeClass('expandable').removeClass('last');
			$(".treeviewDestroy ul").removeClass('collaped').removeClass('expanded');
		}
		$(".treeviewDestroy .hitarea").remove();
		selector.removeClass('treeviewDestroy');
	}
	if(options.command == null || options.command == 'create'){
		create(this);
	}
	else if(options.command == 'destroy' ||options.command == 'destroy all' ){
		destroyer(this,options.command);
	}
	};
})( jQuery );