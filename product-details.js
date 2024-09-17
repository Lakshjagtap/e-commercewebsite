document.addEventListener('DOMContentLoaded', () => {
    // Parse query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    // Define a list of products with their details
    const products = {
        'iphone_15_pro_max': {
            name: 'iPhone 15 Pro Max',
            image: 'images/iPhone-15-Pro.png',
            price: '₹1,00,999'
        },
        'samsung_s26': {
            name: 'Samsung S26',
            image: 'images/SamsungGalaxyS26.png',
            price: '₹120,999'
        },
        'oppo_reno_12_pro_max': {
            name: 'Oppo Reno 12 Pro Max',
            image: 'images/Oppo Reno 12 pro.png',
            price: '₹40,999'
        },
        'samsung_lcd': {
            name: 'Samsung LCD',
            image: 'images/Samsung LCD.png',
            price: '₹105,599'
        },
        'luxury_lipstick': {
            name: 'Luxury Lipstick',
            image: 'images/lipstick.png',
            price: '₹650'
        },
        'eye_liner_pencil': {
            name: 'Eye Liner Pencil',
            image: 'images/Eye linear.png',
            price: '₹450'
        },
        'himalaya_kajal': {
            name: 'Himalaya Kajal',
            image: 'images/himalya-kajal.png',
            price: '₹550'
        },
        'anti_aging_cream': {
            name: 'Anti-Aging Cream',
            image: 'images/Anti aging cream.png',
            price: '₹1,099'
        },
        'mens_tshirt1': {
            name: 'Men\'s T-Shirt 1',
            image: 'images/menstshirt1.png',
            price: '₹1,299'
        },
        'mens_tshirt2': {
            name: 'Men\'s T-Shirt 2',
            image: 'images/menstshirt2.png',
            price: '₹999'
        },
        'womens_dress1': {
            name: 'Women\'s Dress 1',
            image: 'images/Womendress1.png',
            price: '₹1,279'
        },
        'womens_dress2': {
            name: 'Women\'s Dress 2',
            image: 'images/Womendress2.png',
            price: '₹1,379'
        },
        'notebook': {
            name: 'Notebook',
            image: 'images/Notebooks.png',
            price: '₹459'
        },
        'colors': {
            name: 'Colors',
            image: 'images/colors.png',
            price: '₹819'
        },
        'color_pens': {
            name: 'Color Pens',
            image: 'images/colorpens.png',
            price: '₹719'
        },
        'pen_set': {
            name: 'Pen Set',
            image: 'images/PenSet.png',
            price: '₹429'
        }
    };

    // Get product details based on the productId
    const product = products[productId];

    // Select elements
    const productName = document.getElementById('product-name');
    const productImage = document.getElementById('product-image');
    const productPrice = document.getElementById('product-price');
    const addToCartButton = document.getElementById('add-to-cart-button');

    if (product) {
        // Update the page with the product details
        productName.textContent = product.name;
        productImage.src = product.image;
        productPrice.textContent = product.price;
    } else {
        // If the product is not found, display a message
        productName.textContent = 'Product not found';
        productImage.style.display = 'none';
        productPrice.textContent = 'Sorry, this product does not exist.';
        if (addToCartButton) addToCartButton.style.display = 'none';
    }

    // Function to update cart count
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

    // Add event listener for the "Add to Cart" button if it exists
    if (addToCartButton && product) {
        addToCartButton.addEventListener('click', () => {
            try {
                // Retrieve the current cart from localStorage
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                
                // Add the current product to the cart
                cart.push({
                    id: productId,
                    name: product.name,
                    image: product.image,
                    price: product.price
                });
                
                // Save the updated cart back to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Update cart count
                updateCartCount();
                
                alert(`${product.name} added to cart!`);
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        });
    }

    // Update cart count on page load
    updateCartCount();
});
