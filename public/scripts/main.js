
// <<< MENU PAGE SCROLL AND FOCUS >>> //
document.addEventListener('DOMContentLoaded', function() {

    const navbar = document.getElementById('menu-nav');
    const navLinks = navbar.querySelectorAll('a');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();  
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetPosition = targetElement.offsetTop - navbar.offsetHeight;  
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    });
  });
  
function updateActiveNav() {

  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  
  var navbarHeight = document.querySelector('.menu-nav').offsetHeight; 
  
  var sections = [
    { id: 'predjela', offset: getElementOffset(document.getElementById('predjela'), navbarHeight) },
    { id: 'glavna-jela', offset: getElementOffset(document.getElementById('glavna-jela'), navbarHeight) },
    { id: 'salate', offset: getElementOffset(document.getElementById('salate'), navbarHeight) },
    { id: 'prilozi', offset: getElementOffset(document.getElementById('prilozi'), navbarHeight) },
    { id: 'dezert', offset: getElementOffset(document.getElementById('dezert'), navbarHeight) },
  ];

  sections.forEach(function(section) {

    if (scrollPosition >= section.offset.top - navbarHeight && scrollPosition < section.offset.top + section.offset.height - navbarHeight) {
      document.querySelectorAll('.menu-nav a').forEach(a => a.classList.remove('active'));
      document.querySelector(`.menu-nav a[href="#${section.id}"]`).classList.add('active');
    }
  });
}


function getElementOffset(element, navbarHeight) {

  var rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset - navbarHeight,
    height: rect.height
  };
}

window.addEventListener('scroll', updateActiveNav);

// <<< ADDING ITEMS TO CART >>> //
let order = {
  itemCount: 0,
  totalCost: 0
};

viewOrder = document.querySelector('.view-order');

function updateOrderDisplay() {
  document.querySelector('.number-icon').textContent = order.itemCount;
  document.querySelector('.price').textContent = 'RSD ' + order.totalCost.toFixed(2);
}

document.querySelectorAll('.add-item').forEach(button => {
  button.addEventListener('click', (event) => {

    order.itemCount += 1;
    
    const itemPriceElement = button.parentElement.querySelector('.price');
    const itemPrice = parseFloat(itemPriceElement.textContent.replace('RSD ', ''));

    order.totalCost += itemPrice;

    updateOrderDisplay();
  });
});

// <<< DISPLAYING TOTAL ORDER >>> //
document.addEventListener('DOMContentLoaded', function() {
  var viewOrder = document.querySelector('.view-order');
  var expandOrder = document.querySelector('.expand-order');
  
  // Event listener to expand the order
  viewOrder.addEventListener('click', function() {
    viewOrder.style.display = 'none';
    expandOrder.style.display = 'block';
    expandOrder.style.maxHeight = expandOrder.scrollHeight + 'px';
  });

  // Event listener to collapse the order
  expandOrder.addEventListener('click', function() {
    expandOrder.style.display = 'none';
    expandOrder.style.maxHeight = '0';
    viewOrder.style.display = 'flex';
  });
});









