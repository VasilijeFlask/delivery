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
      gridItem.style.borderColor = '#3ABCEE';
      gridItem.style.backgroundColor = '#EBF8FD'
      gridItem.style.borderWidth = '2px'
      

      updateItemCount()
      updateFinalPrice()

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
  const orderItem = event.target.closest('.order-item');
  if (!orderItem) return; 

  const itemId = orderItem.dataset.id;

  if (event.target.closest('.plus')) {
    let countElement = orderItem.querySelector('.count');
    let count = parseInt(countElement.textContent, 10);
    count += 1;
    countElement.textContent = count.toString();
    orderItems[itemId].count = count;
    updateFinalPrice()
  }

  else if (event.target.closest('.minus')) {
    let countElement = orderItem.querySelector('.count');
    let count = parseInt(countElement.textContent, 10);
    if (count > 1) {
      count -= 1;
      countElement.textContent = count.toString();
      orderItems[itemId].count = count;
    }
    updateFinalPrice()
  }

  else if (event.target.closest('.trash')) {
    orderItem.remove();
    delete orderItems[itemId];
  
    const addButton = document.querySelector(`button[data-id="${itemId}"]`);
    if (addButton) {
      addButton.disabled = false;
  
      const relatedGridItem = addButton.closest('.grid-item');
      if (relatedGridItem) {
        relatedGridItem.style.borderColor = '#D3D3D3';
        relatedGridItem.style.backgroundColor = 'white'
        relatedGridItem.style.borderWidth = '1px'
      }
    }
  
    updateItemCount();
    updateFinalPrice();
  }
  


});




function toggleEditOrderMode() {
  const expandOrder = document.querySelector('.expand-order');
  const orderDetails = expandOrder.querySelector('.order-details');
  const editButton = document.querySelector('.edit');
  const isEditMode = editButton.innerHTML === 'Gotovo';

  if (!isEditMode) {

    orderDetails.innerHTML = ''; 
    editButton.innerHTML = 'Gotovo';
    

    const editContainerHTML = `
      <div class="new-order-edit-container">
        <div class='listener-heading'>Dodajte komentar</div>
        <textarea class="edit-area" name="edit" id="edit" cols="39" rows="15"></textarea>
        <button class='area-button' >Dodaj</button>
      </div>`;

    orderDetails.insertAdjacentHTML('beforeend', editContainerHTML);
    expandOrder.style.display = 'flex'; 
    handleCommentSubmission();
  } else {
 
    editButton.innerHTML = 'Izmenite';

    orderDetails.innerHTML = '<h3>Vaša narudžbina</h3>';

    for (const id in orderItems) {
      const item = orderItems[id]; 
      const orderItemHtml = `
        <div class="order-item" data-id="${id}">
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
        </div>`;
    
      orderDetails.insertAdjacentHTML('beforeend', orderItemHtml);
    }

  }
}

document.querySelector('.edit').addEventListener('click', function() {
  toggleEditOrderMode();
});


function handleCommentSubmission() {
  const textArea = document.querySelector('.edit-area');
  const submitButton = document.querySelector('.area-button');
  const feedbackContainer = document.querySelector('.order-details');

  submitButton.addEventListener('click', function() {
    textArea.value = '';
    
    

    const feedbackElement = document.createElement('div');
    feedbackElement.textContent = 'Komentar dodat!';
    feedbackElement.className = 'feedback-animation';
    submitButton.style.display = 'none'

    feedbackContainer.appendChild(feedbackElement);

    setTimeout(() => {
      feedbackElement.remove();
    }, 3000); 
  });
}



function updateFinalPrice() {
  let totalPrice = 0

  for (const id in orderItems) {
    const item = orderItems[id];
    totalPrice += item.price * item.count;
  }

  const formattedPrice = totalPrice.toFixed(2);
  
  const finalPrice = document.querySelector('.final-price');
  finalPrice.textContent = `RSD ${formattedPrice}`
}

function updateItemCount() {
  const itemCountElement = document.querySelector('.number-icon');
  let totalUniqueItems = Object.keys(orderItems).length; 
  itemCountElement.textContent = totalUniqueItems.toString(); 
}


// <<< DISPLAYING TOTAL ORDER >>> //
document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('.grid-item').forEach(gridItem => {
    const itemId = gridItem.dataset.id; 
    const addButton = gridItem.querySelector('.add-item');
    if (addButton) {
      addButton.setAttribute('data-id', itemId); 
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
  let checkout = document.querySelector('.checkout')

  function handleViewClick() {
    expandOrder.style.opacity = '1';
    expandOrder.style.visibility = 'visible';
    expandOrder.style.maxHeight = '96%'; 
    overlay.style.display = 'block';
    disableBodyScroll();
  }
  viewOrder.addEventListener('click', handleViewClick)

  function handleOverlayClick() {
    expandOrder.style.opacity = '0';
    expandOrder.style.visibility = 'hidden';
    expandOrder.style.maxHeight = '0';
    overlay.style.display = 'none';
    viewOrder.style.display = 'flex';
    enableBodyScroll();
  }
  overlay.addEventListener('click', handleOverlayClick);

  function handleExitClick() {
    expandOrder.style.opacity = '0';
    expandOrder.style.visibility = 'hidden';
    expandOrder.style.maxHeight = '0';
    overlay.style.display = 'none';
    viewOrder.style.display = 'flex';
    enableBodyScroll();
  }
  exit.addEventListener('click', handleExitClick);

  checkout.addEventListener('click', function() {

    setTimeout(function() {
      let confirmOrder = document.querySelector('.confirm-order');
      confirmOrder.style.opacity = '1';
      confirmOrder.style.visibility = 'visible';
      confirmOrder.style.maxHeight = '96%'; 
    }, 0);
  })





  //ovo treba negde iskoristiti
  // var addComment = 'Dodajte komentar'
  // function removeListeners() {
  //   let element = document.querySelector('.listener-heading')
  //   if (element.innerHTML === addComment) {
  //     exit.removeEventListener('click', handleExitClick);
  //     overlay.removeEventListener('click', handleOverlayClick);
  //   }
  // }
  
});











