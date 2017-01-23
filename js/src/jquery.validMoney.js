(function ( $ ) {
	$.fn.validMoney = function () {

		var make = function () {
			var self = this;	// перепишем объект

			$(document).ready(function () {
				var def    = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','],

				    // клавиши, которые не влияют [ctrl, end, home, left, right, tab]
				    access = [17, 35, 36, 37, 39, 9];

				$(self).on('keypress', function ( e ) {
					// is  accessed keys
					if( access.indexOf(e.keyCode) >= 0 ) {
						return true;
					}

					// ctrl+A
					if( e.keyCode === 65 && e.ctrlKey ) {
						return true;
					}

					// backspace and del
					if( e.keyCode === 8 || e.keyCode === 46 ) {
						setTimeout(function () {
							$(self).val(format($(self).val()));
						}, 1);
						return true;
					}

					if( e.ctrlKey ) {
						setTimeout(function () {
							$(self).val(format($(self).val()));
						}, 1);
						return true;
					}

					if( def.indexOf(e.key) >= 0 ) {
						setTimeout(function () {
							$(self).val(format($(self).val()));
						}, 1);
						return true;
					}

					return false;
				});
			});

			self.oninput = function () {
				self.value = format(self.value);

				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
					// чтобы установить курсор в конец строки
					setTimeout(function () {
						$(self).val(self.value);
					}, 1);
				}
			};

			function format( val ) {
				var res,
				    int           = '',
				    fraction      = '',
				    has_separator = false;

				// точку меняем на запятую
				val = val.replace(/\./g, ',');

				// оставляем только цифры и запятую
				val = val.replace(/[^0-9,]/g, '');

				// разделим на целую и дробную части
				val = val.split(',');

				// форматирование целой части
				while ( val[0].length > 3 ) {
					int    = val[0].substr(val[0].length - 3) + ' ' + int;
					val[0] = val[0].substr(0, val[0].length - 3);
				}
				int = val[0] + ' ' + int;

				// Убираем последний пробел справа
				res = int.replace(/\s$/g, '');
				// и ноль слева
				res = res.replace(/^0/g, '');

				// форматирование дробной части, при наличии
				if( val.length > 1 ) {
					has_separator = true;
					while ( val[1].length > 3 ) {
						fraction += ' ' + val[1].substr(0, 3);
						val[1] = val[1].substr(3);
					}
					fraction = fraction + ' ' + val[1];

					// сначала удалим пробел
					fraction = fraction.replace(/^\s/g, '');
				}

				if( has_separator ) {
					res += ',';
				}

				if( fraction !== '' ) {
					res += fraction;
				}

				return res;
			}
		};

		return this.each(make);
	};
})(jQuery);