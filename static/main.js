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

imgDebounce = false;


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







var inputElement = document.getElementById("input");
var chat = document.getElementById("chat");

const glassItems = [
   "стек",
   "бока", "стака",
   "ламп", "зерк",
   "флак", "очк",
   "банк", "колб",
   "сахарниц",
];

const plasticItems = [
   "буты", "упаковк",
   "пласт", "контей",
   "пак", "игр",
   "тарел", "ложк",
   "вилк", "пак",
   "стаканч", "колп",
   "канистр", "корзин",
   "игр", "бутылк",
   "мешок",
];

const paperItems = [
   "бум", "тетрад",
   "журн", "газет",
   "короб", "карт",
   "книг", "лист",
   "блокн", "конвер",
   "открытк",
   "журн", "папк",
   "календ", "фот",
   "черте", "плак",
   "бил", "этикет",
   "запис", "отрыв", "инструк",
];

//Приветствие
function ChatMessege(text) {
	if (imgDebounce){
	return}
   return new Promise(function (resolve) {
      setTimeout(function () {
         var newelement = document.createElement("div");
         newelement.innerHTML += '<div>' + text + '</div>';
         newelement.className = 'Messege';
         newelement.style.transition = '1s';
         newelement.style.opacity = '1';
         newelement.style.left = '5%';
         newelement.style.background = 'rgba(217, 217, 217, 1)';
         chat.appendChild(newelement);
         resolve(newelement);
      }, 1500);
   });
}
function FindMaterial(mass1, targetString) {
   for (let i = 0; i < mass1.length; i++) {
      if (targetString.includes(mass1[i])) {
         return true;
      }
   }
   return false;
}
function ScrollDown(time) {
   setTimeout(function () {
      chat.scrollTo(0, chat.scrollHeight);
   }, time);
}
function Map() {
   setTimeout(function () {
      var newelement = document.createElement("div");
      newelement.innerHTML += '<iframe src="https://www.google.com/maps/d/u/0/embed?mid=14gDYNOX7oezlU4bgmP8MB1jCJ-b_XYg&ehbc=2E312F&noprof=1"style="width: 50%;height: 600px;left:5%;position:relative"></iframe>';
      newelement.style.left = '5%';
      newelement.style.padding = '0px';
      chat.appendChild(newelement);
   }, 1500);
}

function hello() {
   ChatMessege('Приветствую тебя! 🌱 Я здесь, чтобы помочь тебе с утилизацией мусора! Просто расскажи мне, что ты хочешь выкинуть, и я подскажу тебе, как правильно и экологически чисто избавиться от него. 🗑️🌍').then(function (hello) {
      hello.id = 'hello';
   });
}
setTimeout(hello, 1000);
inputElement.addEventListener("keyup", function (event) {
   // 13 - код клавиши   Enter
   if (event.keyCode === 13) {
      event.preventDefault();
      SendMessege();
   }
});	
	
function SendMessege() {
	if (imgDebounce){
	return}
   //удаление приветсвия
   var inputValue = inputElement.value;
   if (inputValue == '')
      return;
   var hello = document.getElementById("hello");
   if (hello != null) {
      // Удаление приветствия после завершения анимации
      hello.style.opacity = '0';
      setTimeout(function () {
         hello.remove();
      }, 1000);
   }
   //вывод сообщения пользователя
   var newelement = document.createElement("div");
   newelement.innerHTML += '<div>' + inputValue + '</div>';
   newelement.className = 'Messege';
   chat.appendChild(newelement);
   inputElement.value = '';
   //обработка сообщения
   inputValue = inputValue.toLowerCase();
   var answer = 'Отлично, что ты обращаешь внимание на переработку ';
   //переменные определения материала
   var glass = false;
   var plastic = false;
   var paper = false;

   //заполнение этих переменных
   if (FindMaterial(glassItems, inputValue))
      glass = true;
   if ((inputValue.includes('бутыл') && !inputValue.includes('стекл')) || FindMaterial(plasticItems, inputValue))
      plastic = true;
   if (FindMaterial(paperItems, inputValue))
      paper = true;
   if (!glass && !plastic && !paper) {
      ScrollDown(0);
      ChatMessege('К сожалению, мне не удается однозначно определить тип материала, о котором идет речь. Пожалуйста, предоставьте более подробную информацию или уточните, о каком виде материала идет речь, чтобы я мог предоставить точные рекомендации по его переработке. Благодарю за понимание.')
      ScrollDown(1500);
      return;
   }

   //заполнение ответа чата
   if (glass) answer += 'стекла';
   if (plastic) answer += ', пластика';
   if (paper) answer += ', бумаги';
   answer += '! 🌟 Для утилизации ';

   if (glass) answer += 'стекла';
   if (plastic) answer += ', пластика';
   if (paper) answer += ', бумаги';
   answer += '. Рекомендую использовать контейнеры для сбора соответсвующего мусора, которые обычно находятся в различных районах города. Также, не забывай проверять наличие пунктов приема в местных мусорных центрах или специализированных пунктах переработки.Это поможет уменьшить негативное воздействие на окружающую среду и способствовать устойчивому потреблению.🌍♻️';
   ScrollDown(0);
   ChatMessege(answer);
   ScrollDown(1500);
   Map();
   ScrollDown(3500);
}


let CameraCamlabel = document.getElementsByClassName("camera-input-label")[0]
let CameraInput = document.getElementById("camera-input")

CameraInput.addEventListener('change', function () {
	//now AI part
	
	if (imgDebounce){
	return}
	
	imgDebounce = true;
	var _URL = window.URL || window.webkitURL;
	let file = event.target.files[0]
	const formData = new FormData();
	formData.append('imageFile', file);
	var newelement = document.createElement("div");
	//newelement.innerHTML += 
	newelement.className = 'imgMessege';
	chat.appendChild(newelement);
	
	
	
	//обработка сообщения
	var cameraoutput = document.createElement("img");
	cameraoutput.id = 'camera-output';
	newelement.append(cameraoutput)
	
	var url = URL.createObjectURL(this.files[0]);
	var img = new Image;
	
	img.onload = function() {
		console.log(img.width + ' ' + img.height);
		cameraoutput.style.width = 100%
		//cameraoutput.style.height = 50%
		URL.revokeObjectURL(img.src);
		fetch('/processimage', {
		  method: 'POST',
	//    headers: {
	//       'Content-Type': 'application/json',
	//    },
		  body: formData
		})
		  .then(response => response.json())
		  .then(data => {
			  imgDebounce = false;
			 if (data) {
				ChatMessege(data.result);
			 } else if (data.error) {
				alert(data.error);
			 }
		  });
		};

	img.src = url;
	cameraoutput.src = URL.createObjectURL(file);
});