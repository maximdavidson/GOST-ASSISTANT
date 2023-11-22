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
   if (imgDebounce) {
      return
   }
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
   ChatMessege('Здравствуй, что тебе нужно утилизировать? Напиши мне материал или отправь мне фотографию, а я попробую определить, что это и помогу тебе с поиском мусорного бака, для данного типа мусора.').then(function (hello) {
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
   if (imgDebounce) {
      return
   }
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
   var answer = 'Отлично, что ты обращаешь внимание на экологию.';
   //переменные определения материала
   var glass = false;
   var plastic = false;
   var paper = false;

   //заполнение этих переменных
   if (FindMaterial(glassItems, inputValue))
      glass = true;
   if (((inputValue.includes('бутыл') && !inputValue.includes('стекл')) || FindMaterial(plasticItems, inputValue)) && !glass)
      plastic = true;
   if (FindMaterial(paperItems, inputValue) && !glass && !plastic)
      paper = true;
   if (!glass && !plastic && !paper) {
      ScrollDown(0);
      ChatMessege('Прости, мне не удается распознать данный материал, попробуй сфотографировать снова и я постараюсь понять из чего оно сделано (')
      ScrollDown(1500);
      return;
   }

   //заполнение ответа чата
   let randomNum = Math.floor(Math.random() * 3) + 1;


   if (plastic) {
      switch (randomNum) {
         case 1:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации пластика. А знали ли вы, что 40 % общих пластиковых отходов составляют пластиковые бутылки.';
            break;
         case 2:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации пластика. А знали ли вы, что 24 миллиона галлонов нефти необходимо для производства миллиарда пластиковых бутылок.';
            break;
         case 3:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации пластика. А знали ли вы, что всего 25 переработанных бутылок достаточно, чтобы произвести пиджак для взрослого человека.';
            break;
      }
   }


   if (paper) {
      switch (randomNum) {
         case 1:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации бумаги. А знали ли вы, что 60 кг сданной на переработку макулатуры заменяют одно дерево. А переработка тонны сокращает объем свалок на 7 кубометров.';
            break;
         case 2:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации бумаги. А знали ли вы, что каждая тонна бумаги из вторичного сырья помогает спасти около 17 деревьев.';
            break;
         case 3:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации бумаги. А знали ли вы, что один человек ежегодно расходует около 25 кг бумаги.';
            break;
      }
   }

   if (glass) {
      switch (randomNum) {
         case 1:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации стекла. А знали ли вы, что стекло может быть полностью переработано бесконечное количество раз, без потери качества.';
            break;
         case 2:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации стекла. А знали ли вы, что на каждую тонну переработанного стекла экономится более тонны природных ресурсов.';
            break;
         case 3:
            answer += 'На карте я показал, где неподалеку от тебя есть специализированные баки для утилизации стекла. А знали ли вы, что по сравнению со стеклом, произведенным из 100% первичного сырья, переработанное стекло является экологически чистым материалом, так как потребляет на 25% меньше энергии.';
            break;
      }
   }


   Math.random()

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

   if (imgDebounce) {
      return
   }

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

   img.onload = function () {
      console.log(img.width + ' ' + img.height);
      cameraoutput.style.width = 100 %
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
               inputElement.value = data.result;
               SendMessege();
            } else if (data.error) {
               alert(data.error);
            }
         });
   };

   img.src = url;
   cameraoutput.src = URL.createObjectURL(file);
});