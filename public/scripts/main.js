
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

    if (!orderItems[itemId]) {
      orderItems[itemId] = {
        name: itemName,
        price: parseFloat(itemPrice.replace('RSD ', '')),
        count: 1,
        imageSrc: itemImageSrc
      };
      addItemToOrderDisplay(itemId);
      button.disabled = true;

      updateItemCount()

    }

  });
});

function addItemToOrderDisplay(itemId) {
  const item = orderItems[itemId];
  const orderDetailsContainer = document.querySelector('.order-details'); 

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
        <i class="fa fa-minus minus" aria-hidden="true"></i>
        <span class="count">${item.count}</span>
        <i class="fa fa-plus plus" aria-hidden="true"></i>
        <i class="fa fa-trash trash" aria-hidden="true"></i>
      </div>
    </div>
  `;

  orderDetailsContainer.insertAdjacentHTML('beforeend', orderItemHtml);
}


document.querySelector('.order-details').addEventListener('click', event => {
  // Find the closest parent .order-item element from the clicked target
  const orderItem = event.target.closest('.order-item');
  if (!orderItem) return; // Exit early if no order-item is found

  // Retrieve the item ID
  const itemId = orderItem.dataset.id;

  // Check if the plus button was clicked
  if (event.target.closest('.plus')) {
    // Find the .count element and increment the count
    let countElement = orderItem.querySelector('.count');
    let count = parseInt(countElement.textContent, 10);
    count += 1;
    countElement.textContent = count.toString();
    orderItems[itemId].count = count;
  }

  // Check if the minus button was clicked
  else if (event.target.closest('.minus')) {
    // Find the .count element and decrement the count, if greater than 1
    let countElement = orderItem.querySelector('.count');
    let count = parseInt(countElement.textContent, 10);
    if (count > 1) {
      count -= 1;
      countElement.textContent = count.toString();
      orderItems[itemId].count = count;
    }
  }

  // Check if the trash button was clicked
  else if (event.target.closest('.trash')) {
    // Remove the item element from the DOM
    orderItem.remove();
    
    // Remove the item from the orderItems object
    delete orderItems[itemId];

    const addButton = document.querySelector(`button[data-id="${itemId}"]`);
    if (addButton) {
      addButton.disabled = false;
    }

    // Update the total number of items displayed
    updateItemCount();
  }
});

// Function to update the total number of items
function updateItemCount() {
  const itemCountElement = document.querySelector('.number-icon');
  let totalItems = 0;
  for (const id in orderItems) {
    totalItems += orderItems[id].count;
  }
  itemCountElement.textContent = totalItems.toString(); 
}



// <<< DISPLAYING TOTAL ORDER >>> //
document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('.grid-item').forEach(gridItem => {
    const itemId = gridItem.dataset.id; // make sure each .grid-item has a data-id attribute
    const addButton = gridItem.querySelector('.add-item');
    if (addButton) {
      addButton.setAttribute('data-id', itemId); // Set the data-id attribute on the "Dodaj" button
    }
  });

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











