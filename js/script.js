// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Header Scroll Effect
const header = document.querySelector('header');
const scrollThreshold = 50;

function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
}

// Start auto slide if testimonial slider exists
if (testimonialSlides.length > 0) {
    startAutoSlide();
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Membership Plan Selection
const planBtns = document.querySelectorAll('.plan-btn');
const selectedPlanDropdown = document.getElementById('selectedPlan');

if (planBtns.length > 0 && selectedPlanDropdown) {
    planBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.getAttribute('data-plan');
            selectedPlanDropdown.value = planName;
            
            // Scroll to registration form
            document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Form Submission with Validation
const membershipForm = document.getElementById('membershipForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

// Form validation function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value.trim()) {
            const phonePattern = /^[0-9+\-\s()]{10,15}$/;
            if (!phonePattern.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Show success message
function showSuccessMessage(form, message) {
    // Remove any existing message
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and append success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    form.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(membershipForm)) {
            // In a real application, you would send the form data to a server
            showSuccessMessage(membershipForm, 'Thank you for your registration! We will contact you shortly.');
            membershipForm.reset();
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // In a real application, you would send the form data to a server
            showSuccessMessage(contactForm, 'Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(newsletterForm)) {
            // In a real application, you would send the form data to a server
            showSuccessMessage(newsletterForm, 'Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// Shop Category Filtering
const categoryTabs = document.querySelectorAll('.category-tab');
const productCards = document.querySelectorAll('.product-card');

if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Show/hide products based on category
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Product Search
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchInput && searchBtn) {
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', searchProducts);

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Shopping Cart
const cartContainer = document.getElementById('cartContainer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const headerCartIcon = document.getElementById('headerCartIcon');
const cartCount = document.getElementById('cartCount');

let cart = [];

// Load cart from localStorage if available
function loadCart() {
    const savedCart = localStorage.getItem('smatCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('smatCart', JSON.stringify(cart));
}

// Open/Close Cart
function toggleCart() {
    cartContainer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    // Prevent body scrolling when cart is open
    if (cartContainer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

if (headerCartIcon) {
    headerCartIcon.addEventListener('click', toggleCart);
}

if (closeCartBtn && cartOverlay) {
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
}

// Update Cart Count
function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Add bounce animation when adding items
        if (totalItems > 0) {
            headerCartIcon.classList.add('bounce');
            setTimeout(() => {
                headerCartIcon.classList.remove('bounce');
            }, 500);
        }
    }
}

// Add to Cart
if (addToCartBtns.length > 0) {
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productId = btn.getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace('₦', '').replace(',', '');
            const productUnit = productCard.querySelector('.unit').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: parseFloat(productPrice),
                    unit: productUnit,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Add animation to button
            btn.classList.add('added');
            setTimeout(() => {
                btn.classList.remove('added');
            }, 1000);
            
            updateCart();
            updateCartCount();
            saveCart();
            toggleCart();
        });
    });
}

// Update Cart
function updateCart() {
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            let cartHTML = '';
            let totalPrice = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                
                cartHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">₦${item.price.toLocaleString()} ${item.unit}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                                <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = cartHTML;
            
            // Add event listeners to quantity buttons
            const decreaseBtns = cartItems.querySelectorAll('.decrease-btn');
            const increaseBtns = cartItems.querySelectorAll('.increase-btn');
            const removeBtns = cartItems.querySelectorAll('.cart-item-remove');
            
            decreaseBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemId = btn.getAttribute('data-id');
                    const item = cart.find(item => item.id === itemId);
                    
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart = cart.filter(item => item.id !== itemId);
                    }
                    
                    updateCart();
                    updateCartCount();
                    saveCart();
                });
            });
            
            increaseBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemId = btn.getAttribute('data-id');
                    const item = cart.find(item => item.id === itemId);
                    item.quantity += 1;
                    updateCart();
                    updateCartCount();
                    saveCart();
                });
            });
            
            removeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const itemId = btn.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== itemId);
                    updateCart();
                    updateCartCount();
                    saveCart();
                });
            });
            
            if (cartTotal) {
                cartTotal.textContent = `₦${totalPrice.toLocaleString()}`;
            }
        }
    }
}

// Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
        } else {
            alert('Thank you for your order! We will process it shortly.');
            cart = [];
            updateCart();
            updateCartCount();
            saveCart();
            toggleCart();
        }
    });
}

// Product Quick View
const quickViewBtns = document.querySelectorAll('.btn-view');
const productModal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductUnit = document.getElementById('modalProductUnit');
const modalAddToCart = document.getElementById('modalAddToCart');
const productQuantity = document.getElementById('productQuantity');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');

let currentProduct = null;

if (quickViewBtns.length > 0) {
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productCard = btn.closest('.product-card');
            const productId = productCard.querySelector('.add-to-cart').getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productDesc = productCard.querySelector('.product-description').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productUnit = productCard.querySelector('.unit').textContent;
            const productImage = productCard.querySelector('img').src;
            
            currentProduct = {
                id: productId,
                name: productName,
                description: productDesc,
                price: productPrice,
                unit: productUnit,
                image: productImage
            };
            
            modalProductImage.src = productImage;
            modalProductTitle.textContent = productName;
            modalProductDescription.textContent = productDesc;
            modalProductPrice.textContent = productPrice;
            modalProductUnit.textContent = productUnit;
            productQuantity.value = 1;
            
            productModal.style.display = 'block';
        });
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });
}

if (decreaseQuantityBtn && increaseQuantityBtn) {
    decreaseQuantityBtn.addEventListener('click', () => {
        let quantity = parseInt(productQuantity.value);
        if (quantity > 1) {
            productQuantity.value = quantity - 1;
        }
    });

    increaseQuantityBtn.addEventListener('click', () => {
        let quantity = parseInt(productQuantity.value);
        productQuantity.value = quantity + 1;
    });
}

if (modalAddToCart) {
    modalAddToCart.addEventListener('click', () => {
        if (currentProduct) {
            const quantity = parseInt(productQuantity.value);
            const productId = currentProduct.id;
            const productPrice = currentProduct.price.replace('₦', '').replace(',', '');
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: currentProduct.name,
                    price: parseFloat(productPrice),
                    unit: currentProduct.unit,
                    image: currentProduct.image,
                    quantity: quantity
                });
            }
            
            updateCart();
            updateCartCount();
            saveCart();
            toggleCart();
            productModal.style.display = 'none';
        }
    });
}

// Animation on scroll
const animateElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('animate');
        }
    });
}

if (animateElements.length > 0) {
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
}

// Newsletter form validation
const newsletterInput = document.querySelector('.newsletter-form input[type="email"]');

if (newsletterInput) {
    newsletterInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailPattern.test(newsletterInput.value)) {
            newsletterInput.classList.remove('error');
            newsletterInput.classList.add('valid');
        } else {
            newsletterInput.classList.remove('valid');
            if (newsletterInput.value) {
                newsletterInput.classList.add('error');
            } else {
                newsletterInput.classList.remove('error');
            }
        }
    });
}

// Initialize the cart
loadCart();
updateCartCount();

// Add CSS for back to top button and form validation
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: -50px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: bottom 0.3s ease, background-color 0.3s ease;
        z-index: 99;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .back-to-top.active {
        bottom: 20px;
    }
    
    .back-to-top:hover {
        background-color: var(--primary-dark);
    }
    
    .form-control.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .success-message {
        background-color: var(--success-color);
        color: white;
        padding: 10px 15px;
        border-radius: var(--border-radius);
        margin-top: 15px;
        text-align: center;
    }
    
    .newsletter-form input.valid {
        border-color: var(--success-color);
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
    
    .newsletter-form input.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .animate-on-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .story-milestones {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .milestone {
        display: flex;
        align-items: flex-start;
        gap: 15px;
    }
    
    .milestone-year {
        background-color: var(--primary-color);
        color: white;
        padding: 5px 10px;
        border-radius: var(--border-radius);
        font-weight: 600;
        min-width: 60px;
        text-align: center;
    }
    
    .milestone-content h4 {
        margin-bottom: 5px;
        color: var(--secondary-color);
    }
    
    .milestone-content p {
        color: var(--text-light);
        margin-bottom: 0;
    }
    
    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-top: 50px;
    }
    
    .benefit-card {
        background-color: white;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--box-shadow);
        text-align: center;
        transition: var(--transition);
    }
    
    .benefit-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    .benefit-icon {
        width: 70px;
        height: 70px;
        background-color: var(--primary-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 30px;
    }
    
    .benefit-card h3 {
        margin-bottom: 15px;
        color: var(--secondary-color);
    }
    
    .benefit-card p {
        color: var(--text-light);
    }
    
    .mission-values-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 30px;
        margin-top: 50px;
    }
    
    .mission-card {
        background-color: white;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--box-shadow);
        height: 100%;
    }
    
    .mission-icon {
        width: 70px;
        height: 70px;
        background-color: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        color: white;
        font-size: 30px;
    }
    
    .mission-card h3 {
        margin-bottom: 15px;
        color: var(--secondary-color);
    }
    
    .mission-card p {
        color: var(--text-light);
        line-height: 1.8;
    }
    
    .values-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
    
    .value-card {
        background-color: white;
        border-radius: var(--border-radius);
        padding: 30px;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
    }
    
    .value-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    .value-icon {
        width: 60px;
        height: 60px;
        background-color: var(--primary-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        color: white;
        font-size: 24px;
    }
    
    .value-card h3 {
        margin-bottom: 15px;
        color: var(--secondary-color);
    }
    
    .value-card p {
        color: var(--text-light);
    }
    
    .newsletter {
        padding: 80px 0;
        background-color: var(--light-gray);
    }
    
    .newsletter-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }
    
    .newsletter-text {
        flex: 1;
    }
    
    .newsletter-text h2 {
        font-size: 2rem;
        margin-bottom: 15px;
        color: var(--secondary-color);
    }
    
    .newsletter-text p {
        color: var(--text-light);
        font-size: 1.1rem;
    }
    
    .newsletter-form {
        flex: 1;
        display: flex;
        gap: 10px;
    }
    
    .newsletter-form input {
        flex: 1;
        padding: 15px 20px;
        border: 1px solid var(--medium-gray);
        border-radius: 30px;
        font-size: 16px;
        transition: var(--transition);
    }
    
    .newsletter-form input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.2);
        outline: none;
    }
    
    .newsletter-form button {
        padding: 15px 30px;
        border-radius: 30px;
    }
    
    @media (max-width: 768px) {
        .newsletter-content {
            flex-direction: column;
            text-align: center;
        }
        
        .newsletter-form {
            width: 100%;
        }
        
        .mission-values-content {
            grid-template-columns: 1fr;
        }
        
        .values-grid {
            grid-template-columns: 1fr;
        }
    }

`;

document.head.appendChild(style);