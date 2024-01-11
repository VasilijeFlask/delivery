// LOGIN
document.addEventListener('DOMContentLoaded', function() {

  var loginBefore = document.querySelector('.login-before')
  var loginAfter = document.querySelector('.login-after')
  var loginBtn = document.querySelector('.login-btn')
  var confirmLogin = document.querySelector('.confirm-login')

  loginBtn.addEventListener('click', function() {
    loginBefore.style.display = 'none'
    loginAfter.style.display = 'block'
  });

  confirmLogin.addEventListener('click', function() {
    event.preventDefault()
    window.location.href = '/public/index.html'
    console.log('here')
  })



  var overlay = document.querySelector('.overlay')
  var register = document.querySelector('.register-container')
  var registerBtnOne = document.querySelector('.register-one')

  registerBtnOne.addEventListener('click', function() {
    overlay.style.display = 'none'
    register.style.display = 'block'
  });

  var payment = document.querySelector('.payment-container')
  var registerBtnThree = document.querySelector('.register-three')
  var registerBtnTwo = document.querySelector('.register-two')

  registerBtnTwo.addEventListener('click', function() {
    register.style.display = 'none'
    payment.style.display = 'block'
  });

  

  registerBtnThree.addEventListener('click', function() {
    window.location.href = '/public/index.html'
  })

});
