document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init();

  // Cart variables
  let cart = [];
  let cartCount = 0;
  let cartTotal = 0.0;

  // Elements
  const cartIcon = document.getElementById('cart-icon');
  const cartCountElement = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const closeCartBtn = document.querySelector('.close-cart-btn');

  // Open cart modal
  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartModal();
  });

  // Close cart modal
  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  // Add event listeners to all buy buttons
  const buyButtons = document.querySelectorAll('.product .buttons button');
  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productElement = e.target.closest('.product');
      const productName = productElement.querySelector('h4').textContent + ' ' + productElement.querySelector('h3').textContent;
      const productPrice = parseFloat(button.textContent.replace('₱', ''));
      addToCart(productName, productPrice);
    });
  });

  // Function to add item to cart
  function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    cartCount += 1;
    cartTotal += productPrice;
    updateCartIcon();
  }

  // Function to update cart icon
  function updateCartIcon() {
    cartCountElement.textContent = cartCount;
  }

  // Function to update cart modal
  function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">x${item.quantity}</span>
        <span class="item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    cartTotalElement.textContent = `₱${cartTotal.toFixed(2)}`;
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target == cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // Add event listener to checkout button
  const checkoutButton = document.querySelector('.checkout');
  checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
      alert(`Checkout successful! Total amount: ₱${cartTotal.toFixed(2)}`);
      clearCart();
      cartModal.style.display = 'none';
    } else {
      alert('Your cart is empty!');
    }
  });

  // Function to clear cart
  function clearCart() {
    cart = [];
    cartCount = 0;
    cartTotal = 0.0;
    updateCartIcon();
  }
});

