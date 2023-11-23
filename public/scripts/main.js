
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
let orderItems = {}; 

document.querySelectorAll('.add-item').forEach(button => {
  button.addEventListener('click', event => {
    const gridItem = button.closest('.grid-item');
    const itemId = gridItem.dataset.id;
    const itemName = gridItem.querySelector('h3').textContent;
    const itemPrice = gridItem.querySelector('.price').textContent;
    const itemImageSrc = gridItem.querySelector('img').src;

    // Add item to order if it hasn't been added yet
    if (!orderItems[itemId]) {
      orderItems[itemId] = {
        name: itemName,
        price: parseFloat(itemPrice.replace('RSD ', '')),
        count: 1,
        imageSrc: itemImageSrc
      };

      // Call function to update the order display
      addItemToOrderDisplay(itemId);
    }

    // Disable the "Dodaj" button for this item
    button.disabled = true;
  });
});

function addItemToOrderDisplay(itemId) {
  const item = orderItems[itemId];
  const orderDetailsContainer = document.querySelector('.order-details'); // The container where you want to add the item

  // Create the HTML for the order item
  const orderItemHtml = `
    <div class="order-item" data-id="${itemId}">
      <div class="left">
        <div><img class="img" src="${item.imageSrc}" alt="${item.name}"></div>
        <div class="name">
          <span>${item.name}</span>
          <span>RSD ${item.price.toFixed(2)}</span>
        </div>
      </div>
      <div class="right">
        <i class="fa fa-minus" aria-hidden="true"></i>
        <span>${item.count}</span>
        <i class="fa fa-plus" aria-hidden="true"></i>
        <i class="fa fa-trash" aria-hidden="true"></i>
      </div>
    </div>
  `;

  // Append the item to the order details container
  orderDetailsContainer.insertAdjacentHTML('beforeend', orderItemHtml);
}


// <<< DISPLAYING TOTAL ORDER >>> //
document.addEventListener('DOMContentLoaded', function() {

  function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  function enableBodyScroll() {
    document.body.style.overflow = '';
  }

  var viewOrder = document.querySelector('.view-order');
  var expandOrder = document.querySelector('.expand-order');
  var overlay = document.querySelector('.overlay');
  var exit = document.querySelector('.exit')
  
  viewOrder.addEventListener('click', function() {
    expandOrder.style.opacity = '1';
    expandOrder.style.visibility = 'visible';
    expandOrder.style.maxHeight = '96%'; 
    overlay.style.display = 'block';
    disableBodyScroll();
  });

  overlay.addEventListener('click', function() {
    expandOrder.style.opacity = '0';
    expandOrder.style.visibility = 'hidden';
    expandOrder.style.maxHeight = '0';
    overlay.style.display = 'none';
    viewOrder.style.display = 'flex'; 
    enableBodyScroll()
  });

  exit.addEventListener('click', function() {
    expandOrder.style.opacity = '0';
    expandOrder.style.visibility = 'hidden';
    expandOrder.style.maxHeight = '0';
    overlay.style.display = 'none';
    viewOrder.style.display = 'flex';
    enableBodyScroll()
  })
});











