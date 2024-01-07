// LOGIN
console.log('function')
document.addEventListener('DOMContentLoaded', function() {

  var overlay = document.querySelector('.overlay')
  var register = document.querySelector('.register-container')
  var registerBtn = document.querySelector('.ghost')


  registerBtn.addEventListener('click', function() {
    overlay.style.display = 'none'
    register.style.display = 'block'
  });

});
