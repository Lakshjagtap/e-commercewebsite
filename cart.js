document.addEventListener('DOMContentLoaded', () => {
    // Update cart count and display cart items on page load
    updateCartCount();
    displayCartItems();

    // Handle clear cart button click event
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            displayCartItems();
            updateCartCount();
        });
    }

    // Function to update cart count
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cartCountElement.textContent = cart.length;
            } catch (error) {
                console.error('Error updating cart count:', error);
                cartCountElement.textContent = '0'; // Fallback to 0 on error
            }
        } else {
            console.warn('Cart count element not found.');
        }
    }

    // Display items in the cart
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
                } else {
                    cartItemsContainer.innerHTML = '';
                    cart.forEach((item, index) => {
                        const itemElement = document.createElement('div');
                        itemElement.className = 'cart-item';
                        itemElement.innerHTML = `
                            <div class="cart-item-info">
                                <h3>${item.name}</h3>
                                <p>${item.price}</p>
                            </div>
                            <button class="remove-from-cart" data-index="${index}">Remove</button>
                        `;
                        cartItemsContainer.appendChild(itemElement);
                    });

                    // Event delegation for remove buttons
                    cartItemsContainer.addEventListener('click', (event) => {
                        if (event.target && event.target.classList.contains('remove-from-cart')) {
                            const index = event.target.getAttribute('data-index');
                            removeFromCart(index);
                        }
                    });
                }
            } catch (error) {
                console.error('Error displaying cart items:', error);
                cartItemsContainer.innerHTML = '<p>Error displaying cart items.</p>';
            }
        } else {
            console.warn('Cart items container not found.');
        }
    }

    // Remove an item from the cart
    function removeFromCart(index) {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }
});
