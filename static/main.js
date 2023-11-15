document.addEventListener('DOMContentLoaded', function () {
   let openButton = document.getElementById('open_pop_up');
   let closeButton = document.getElementById('pop-up-close');
   let popup = document.getElementById('pop-up');

   openButton.addEventListener('click', function () {
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';
   });

   closeButton.addEventListener('click', function () {
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
   });
});




let inputElement = document.getElementById("input");
let chat = document.getElementById("chat");

//Приветствие
function hello() {
   var newelement = document.createElement("div");
   newelement.innerHTML += '<div id="hello">Привет</div>';
   newelement.className = 'PersonMessege';
   newelement.style.left = '5%';
   chat.prepend(newelement);
}
setTimeout(hello, 1500);

function getValue() {
   //удаление приветсвия
   var hello = document.getElementById("hello");
   // hello.parentNode.remove(); - это фиксить
   //вывод сообщения пользователя
   var inputValue = inputElement.value;
   var newelement = document.createElement("div");
   newelement.innerHTML += '<div>' + inputValue + '</div>';
   newelement.className = 'PersonMessege';
   chat.prepend(newelement);
   inputElement.value = '';
   //обработка сообщения
}