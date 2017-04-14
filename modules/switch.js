/*
 * name: switch.js
 * version: v0.1.0
 * update: add disabled/disabled()
 * date: 2017-04-14
 */
define('switch', function(require, exports, module) {
	"use strict";
	var $ = require('jquery'),
		def = {
			el: null,
			name: null,
			round: false,
			color: "default",
			disabled: false,
			size: null,
			onChange: null
		},
		template = '<label class="switch"><div class="track"><div class="handle"></div></div></label>',
		Switch = function(config) {
			var opt = $.extend({}, def, config || {}),
				$this = $(opt.el).eq(0),
				$switch,
				$syncInput,
				classTemp = [],
				set = function(value) {
					var status = $syncInput.prop('checked');
					if(opt.disabled){
						return null;
					}
					if (!!value !== status) {
						if (value) {
							$switch.addClass('switch-on');
						} else {
							$switch.removeClass('switch-on');
						}
						$syncInput.prop('checked', !!value);
						if (typeof opt.onChange === 'function') {
							opt.onChange(!!value);
						}
					}
				},
				disabled = function(flag, init){
					if(!init && (opt.disabled === !flag)){
						return null;
					}
					if(flag){
						$switch.removeClass('switch-disabled');
					}else{
						$switch.addClass('switch-disabled');
					}
					return opt.disabled = !flag;
				};
			if (!$this.length || $this.data('switch-init')) {
				return null;
			}

			$switch = $(template);
			if (opt.round) {
				classTemp.push('switch-round');
			}
			if (opt.color && opt.color.split) {
				classTemp.push('switch-' + opt.color);
			}
			switch (opt.size) {
				case "lg":
					classTemp.push('switch-lg');
					break;
				case "sm":
					classTemp.push('switch-sm');
					break;
			}

			if (opt.name && opt.name.split) {
				if ($('input[name="' + opt.name + '"]').length) {
					$syncInput = $('input[name="' + opt.name + '"]');
				} else {
					$syncInput = $('<input type="checkbox" name="' + opt.name + '" style="display:none">').appendTo($this);
				}
			} else {
				$syncInput = $('<input type="checkbox" >');
			}
			if ($syncInput.prop('checked')) {
				classTemp.push('switch-on');
			}
			
			disabled(!opt.disabled, true);

			$switch
				.addClass(classTemp.join(' '))
				.on('mouseup', '.handle', function(e) {
					e.preventDefault();
					var status = $syncInput.prop('checked');
					set(!status);
				});
			$this.data('switch-init', 1).append($switch);

			return {
				on: function() {
					set(true);
				},
				off: function() {
					set(false);
				},
				disabled: disabled
			};
		};

	$.fn.switch = function(config) {
		return Switch($.extend({
			el: this
		}, config || {}));
	};
	module.exports = Switch;
});