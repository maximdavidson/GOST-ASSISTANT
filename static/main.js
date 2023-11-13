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