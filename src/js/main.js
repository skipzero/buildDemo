/* jshint -W034 */
(() => {
'use strict';

	let myButton = document.getElementById('button');

	myButton.addEventListener('click', (e) => {
		e.preventDefault();

		let textInput = document.getElementById('input');
		alert('hello ' + textInput.value);

	});

})();
