(function() {
'use strict';

	let myButton = document.getElementById('button');

	myButton.addEventListener('click', function(e) {
		e.preventDefault();
		let textInput = document.getElementById('input');
		alert('hello ' + textInput.value);

	});

})();