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
  

// Function to update the active class on the navbar links
function updateActiveNav() {
  // Get the current scroll position
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
  // Get the navbar's height
  var navbarHeight = document.querySelector('.menu-nav').offsetHeight; // Replace with your actual navbar's class or ID
  
  // Define your sections with the respective ids and the heights (offset) at which you want to activate the navbar link
  var sections = [
    { id: 'predjela', offset: getElementOffset(document.getElementById('predjela'), navbarHeight) },
    { id: 'glavna-jela', offset: getElementOffset(document.getElementById('glavna-jela'), navbarHeight) },
    { id: 'salate', offset: getElementOffset(document.getElementById('salate'), navbarHeight) },
    { id: 'prilozi', offset: getElementOffset(document.getElementById('prilozi'), navbarHeight) },
    { id: 'dezert', offset: getElementOffset(document.getElementById('dezert'), navbarHeight) },
    // More sections as needed
  ];

  // Loop through the sections
  sections.forEach(function(section) {
    // Check if the scroll position is within the section
    // Subtract the navbar's height to adjust for a sticky navbar
    if (scrollPosition >= section.offset.top - navbarHeight && scrollPosition < section.offset.top + section.offset.height - navbarHeight) {
      // Deactivate all the navbar links
      document.querySelectorAll('.menu-nav a').forEach(a => a.classList.remove('active'));
      // Activate the corresponding navbar link
      document.querySelector(`.menu-nav a[href="#${section.id}"]`).classList.add('active');
    }
  });
}

// Helper function to get the offset (top and height) of an element
// Accepts an element and the navbar's height as arguments
function getElementOffset(element, navbarHeight) {
  var rect = element.getBoundingClientRect();
  // Adjust the top offset by adding the current scroll position and subtracting the navbar's height
  return {
    top: rect.top + window.pageYOffset - navbarHeight,
    height: rect.height
  };
}

// Attach the scroll event listener
window.addEventListener('scroll', updateActiveNav);

