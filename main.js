(function() {
	'use strict';
	let button = document.getElementById('button');

	button.addEventListener('click', function(e) {
		e.preventDefault();
		let textInput = document.getElementById('input');
		alert('hello ' + textInput.value);

	})

})();