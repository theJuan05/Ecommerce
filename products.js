document.addEventListener('DOMContentLoaded', function () {
  // Handling Add to Cart functionality
  const addToCartBtn = document.getElementById('add-to-cart');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      // Get product data from the button's data attributes
      const product = {
        name: addToCartBtn.dataset.name,
        price: parseFloat(addToCartBtn.dataset.price.replace(/[^0-9.-]+/g, "")), // Ensure price is stored as a number
        image: addToCartBtn.dataset.image,
        brand: addToCartBtn.dataset.brand
      };

      // Retrieve the existing cart from localStorage or initialize an empty array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Add the new product to the cart
      cart.push(product);

      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Alert the user
      alert(`${product.name} added to cart!`);
    });
  }

  // Function to load the cart items
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
      // Show empty cart message if the cart is empty
      emptyCartMessage.style.display = 'block';
    } else {
      // Hide empty cart message if the cart has items
      emptyCartMessage.style.display = 'none';

      let total = 0;
      cartItems.forEach(item => {
        total += item.price; // Now it is a number, no need for parseFloat here

        const itemElem = document.createElement('div');
        itemElem.className = 'card mb-2 p-2 d-flex flex-row align-items-center';

        itemElem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover;" class="me-3">
          <div>
            <h6>${item.name}</h6>
            <p><strong>Price:</strong> ${item.price.toLocaleString()} PHP</p> <!-- Display price with PHP -->
          </div>
        `;

        cartContainer.appendChild(itemElem);
      });

      totalPriceElem.textContent = `${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} PHP`;
    }
  }

  // Function to clear the cart
  function clearCart() {
    localStorage.removeItem('cart');
    loadCart(); // Reload the cart after clearing
  }

  // Function to place the order
  function orderNow() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before ordering.");
    } else {
      alert("✅ Thank you for your order! We'll contact you shortly.");
      localStorage.removeItem('cart');
      loadCart(); // Reload cart after the order is placed
    }
  }

  // Load the cart when the page is ready
  loadCart();
});
