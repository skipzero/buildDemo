// const $hl = require('jquery');

(() => {
  // const $hl = require('');
  const myButton = document.getElementById('button');

  console.log($hl);

  myButton.addEventListener('click', (e) => {
    e.preventDefault();

    const textInput = document.getElementById('input');
    const hello = 'hello';
    console.log(hello + textInput.value);
  });
})();
