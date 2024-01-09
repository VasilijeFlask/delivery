// LOGIN
console.log('function')
document.addEventListener('DOMContentLoaded', function() {

  var overlay = document.querySelector('.overlay')
  var register = document.querySelector('.register-container')
  var registerBtn = document.querySelector('.ghost')

  var loginBefore = document.querySelector('.login-before')
  var loginAfter = document.querySelector('.login-after')
  var loginBtn = document.querySelector('.login-btn')

  registerBtn.addEventListener('click', function() {
    overlay.style.display = 'none'
    register.style.display = 'block'
  });

  loginBtn.addEventListener('click', function() {
    loginBefore.style.display = 'none'
    loginAfter.style.display = 'block'
  });

});
