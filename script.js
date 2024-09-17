document.addEventListener('DOMContentLoaded', () => {
    function main() {
        // Handle product card click event
        function handleProductCardClick(event) {
            if (event.target.tagName === 'A' && event.target.classList.contains('cta-button')) {
                const card = event.target.closest('.product-card');
                if (card) {
                    const productName = card.getAttribute('data-name');
                    const productPrice = card.getAttribute('data-price');
                    const productImage = card.querySelector('img') ? card.querySelector('img').src : '';

                    try {
                        localStorage.setItem('productDetails', JSON.stringify({
                            name: productName,
                            price: productPrice,
                            image: productImage
                        }));
                    } catch (error) {
                        console.error('Error saving product details to localStorage:', error);
                    }

                    // Navigate to the product details page
                    window.location.href = event.target.href;
                    event.preventDefault(); // Prevent the default link behavior
                }
            }
        }

        // Attach event listener to the product grid
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.addEventListener('click', handleProductCardClick);
        } else {
            console.warn('Product grid not found.');
        }

        // Handle sign-up button click
        const signUpButton = document.querySelector('.header-content a[href="#signup-form"]');
        const signupFormSection = document.getElementById('signup-form');

        if (signUpButton && signupFormSection) {
            signUpButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                signupFormSection.classList.toggle('visible');
                signupFormSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the form
            });
        } else {
            console.error('Sign Up button or Signup Form section not found.');
        }

        // Validate email address on form submission
        const signupForm = document.querySelector('.responsive-form form');
        if (signupForm) {
            signupForm.addEventListener('submit', (event) => {
                const emailInput = signupForm.querySelector('input[type="email"]');
                if (emailInput && !validateEmail(emailInput.value)) {
                    alert('Please enter a valid email address.');
                    event.preventDefault(); // Prevent form submission
                }
            });
        } else {
            console.warn('Sign-up form not found.');
        }

        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // Ensure the search form submits correctly
        const searchButton = document.getElementById('search-button');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    const query = searchInput.value.trim();
                    if (query) {
                        performSearch(query);
                    } else {
                        alert('Please enter a search query.');
                    }
                } else {
                    console.warn('Search input not found.');
                }
            });
        } else {
            console.warn('Search button not found.');
        }

        function performSearch(query) {
            // Implement the search logic here
            console.log(`Searching for: ${query}`);

            // Example: Filter products (assuming products are in local storage)
            try {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                );

                displaySearchResults(filteredProducts);
            } catch (error) {
                console.error('Error performing search:', error);
                alert('Failed to perform search.');
            }
        }

        function displaySearchResults(products) {
            const searchResultsContainer = document.getElementById('search-results');
            if (searchResultsContainer) {
                if (products.length === 0) {
                    searchResultsContainer.innerHTML = '<p>No results found.</p>';
                } else {
                    searchResultsContainer.innerHTML = '';
                    products.forEach(product => {
                        const resultElement = document.createElement('div');
                        resultElement.className = 'search-result-item';
                        resultElement.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" />
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                        `;
                        searchResultsContainer.appendChild(resultElement);
                    });
                }
            } else {
                console.warn('Search results container not found.');
            }
        }

        // Display cart items on cart page
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
                            const itemElement = createCartItemElement(item, index);
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
            }
        }

        function createCartItemElement(item, index) {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" />
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            return itemElement;
        }

        function updateCartCount() {
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                try {
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cartCountElement.textContent = cart.length;
                } catch (error) {
                    console.error('Error parsing cart data from localStorage:', error);
                    cartCountElement.textContent = '0';
                }
            } else {
                console.warn('Cart count element not found.');
            }
        }

        // Remove item from cart and update the display
        function removeFromCart(index) {
            try {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartCount(); // Update cart count after removing item
            } catch (error) {
                console.error('Error removing item from cart:', error);
                alert('Failed to remove item from cart.');
            }
        }

        // Check if we are on the cart page and display cart items
        if (window.location.pathname.includes('cart.html')) {
            displayCartItems();
            updateCartCount(); // Initialize cart count on page load
        } else {
            // Ensure cart count is updated on pages other than the cart page
            updateCartCount();
        }
    }

    // Initialize main functionality
    main();
});
