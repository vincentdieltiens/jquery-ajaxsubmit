/**
 * jQuery ajaxsubmit plugin
 * This is a small plugin to easy submit form by ajax request
 * @name jquery.ajaxsubmit.js
 * @author Vincent Dieltiens - www.vincentdieltiens.be
 * @version DEV-0.1
 * @date February 05 2011
 * @category jQuery plugin
 * @copyright (c) 2011 Vincent Dieltiens (www.vincentdieltiens.com)
 * @license CC Attribution-No Derivative Works 2.5 Brazil - http://creativecommons.org/licenses/by-nd/2.5/br/deed.en_US
 */
(function($){
	/**
	 * @param options an object of options :
	 * 	- live : true|false (default: false)
	 *  - 
	 */
	$.fn.ajaxsubmit = function(options) {
		var options = $.extend({}, $.fn.ajaxsubmit.defaults, options);
		
		return this.each(function(){
			if( !$(this).is('form') ) {
				throw new Exception("ajaxsubmit() plugin must be call on <form> objects");
			}
			
			var $form = $(this);
			
			if( options.live ) {
				$form.live('submit', function(){
					ajax_submit($form, options);
					return false;
				});
			} else {
				$form.submit(function(){
					ajax_submit($form, options);
					return false;
				});
			}
		});
		
		function ajax_submit($form, options) {
			var addOptions = {
				url : $form.attr('action'),
				type : (options.type != null) ? options.type : $form.attr('method'),
				data :  (options.data != null) ? options.data : $form.serialize()
			}
			var optionsCopy = $.extend(options, addOptions);
			
			$.ajax(optionsCopy);
		}
	};
	
	$.fn.ajaxsubmit.defaults = {
		live: false,
		dataType: null,
		data: null,
		success: function() {},
		error: function() {}
	};
})(jQuery);