document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('menu-nav');
    const navLinks = navbar.querySelectorAll('a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();  // prevent the default action
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetPosition = targetElement.offsetTop - navbar.offsetHeight;  // subtract the navbar height
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    });
  });
  

