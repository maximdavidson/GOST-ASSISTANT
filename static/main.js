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


document.querySelector('form').addEventListener('submit', function (event) {
   event.preventDefault();
   var username = document.getElementById('username').value;
   var phone = document.getElementById('phone').value;
   var password = document.getElementById('password').value;

   // Используется встроенная функция fetch для отправки HTTP-запроса
   fetch('/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, phone: phone, password: password }),
   })
      .then(response => response.json())
      .then(data => {
         if (data.username) {
            document.getElementById('open_pop_up').innerText = data.username;
            document.getElementById('pop-up').style.display = 'none';
         } else if (data.error) {
            alert(data.error);
         }
      });

});
