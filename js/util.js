var Util = Util || {};
(function() {
	function trim(str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}

	function hasClass(el, cn) {
		return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	}

	function addClass(el, cn) {
		if (!hasClass(el, cn)) {
			el.className = (el.className === '') ? cn : el.className + ' ' + cn;
		}
	}

	function removeClass(el, cn) {
		el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	}

	function addEvent(el, e, callback, capture) {
		if (!!window.addEventListener) {
			el.addEventListener(e, callback, !!capture);
		} else {
			el.attachEvent('on' + e, callback);
		}
	}

	function removeEvent(el, e, callback, capture) {
		if (!!window.addEventListener) {
			el.removeEventListener(e, callback, !!capture);
		} else {
			el.detachEvent('on' + e, callback);
		}
	}

	function getElementsByClassName(searchClass, el, tag) {
		var classElements = new Array();
		if (el == null)
			el = document;
		if (tag == null)
			tag = '*';
		var els = el.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}


	Util = {
		addClass: addClass,
		removeClass: removeClass,
		addEvent: addEvent,
		removeEvent: removeEvent,
		getElementsByClassName: getElementsByClassName
	}
})();