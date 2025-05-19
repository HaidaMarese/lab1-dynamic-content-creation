// DOM elements
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

// Update total price on screen
function updateTotalPriceDisplay() {
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to recalculate total from all cart items
function recalculateTotalPrice() {
  totalPrice = 0;
  const items = cart.querySelectorAll('li');
  items.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').value) || 1;
    totalPrice += price * quantity;
  });
  updateTotalPriceDisplay();
}

// Remove item from cart
function removeItem(event) {
  const item = event.target.closest('li');
  item.remove();
  recalculateTotalPrice();
}

// Add product to cart
addProductButton.addEventListener('click', () => {
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  if (name === '' || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and price.');
    return;
  }

  const item = document.createElement('li');
  item.className = 'list-group-item';
  item.dataset.price = price;

  item.innerHTML = `
  <div class="flex-grow-1">
    ${name} - $${price.toFixed(2)}
  </div>
  <div class="d-flex align-items-center">
    <label class="me-2 mb-0">
      Qty:
      <input type="number" class="form-control form-control-sm quantity quantity-input d-inline-block" value="1" min="1" />
    </label>
    <button class="btn btn-danger btn-sm remove">Remove</button>
  </div>
`;


  // Quantity change handler
  const quantityInput = item.querySelector('.quantity');
  quantityInput.addEventListener('input', () => {
    const value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
      quantityInput.value = 1;
    }
    recalculateTotalPrice();
  });

  // Remove button handler
  item.querySelector('.remove').addEventListener('click', removeItem);

  cart.appendChild(item);
  productNameInput.value = '';
  productPriceInput.value = '';
  recalculateTotalPrice();
});
