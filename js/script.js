// Maka Nana Shisanyama website JavaScript.
// Each part is kept small so it is easy to explain.

const cartKey = 'makaNanaCart';

const combos = [
    ['Beef, Wors & Salad Combo', 120, 'Beef meat with wors and salad COMBO.jpeg'],
    ['Chicken Drumstick & Chips Combo', 90, 'Chicken Drumstick with Chips (fries) COMBO.jpeg'],
    ['Drumstick, Cabbage & Bread Combo', 100, 'Chicken drumstick, cabbage and Baked Bread COMBO.jpeg'],
    ['Chicken, Cabbage & Bacon Combo', 110, 'Chicken with cabbage and baccon COMBO.jpeg'],
    ['Grilled Chicken Breast Combo', 130, 'Grilled Chicken Breast with.jpeg'],
    ['Grilled Meat, Bacon & Bread Combo', 150, 'Grilled meat withbaccon and bread.jpeg'],
    ['Mixed Feast Combo', 200, 'Mix of Chicken drumstick, cabbage, Baked Bread, tribe, and beef COMBO.jpeg'],
    ['Pap, Beef & Chakalaka Combo', 120, 'Pap wit Beef meat and chakalaka COMBO.jpeg'],
    ['Pap & Beef Combo', 100, 'Pap with Beef COMBO.jpeg'],
    ['Pap, Chicken, Wors & Chips Combo', 140, 'Pap with Chicken meat, wors and chips COMBO.jpeg'],
    ['Chicken, Broccoli & Sashimi Combo', 170, 'Steamed Broccoli with Grilled Chicken Breast and Sashimi (6 pcs).jpeg']
];

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll('.cart-count').forEach((count) => {
        count.textContent = totalItems;
    });
}

function showComboMeals() {
    const comboGrid = document.querySelector('#menu-grid');

    if (!comboGrid) return;

    comboGrid.innerHTML = combos.map((combo) => {
        const name = combo[0];
        const price = combo[1];
        const image = combo[2];

        return `<article class="menu-card">
            <img src="images/food-source/pictures/pictures/${encodeURIComponent(image)}" alt="${name}">
            <h3>${name}</h3>
            <p class="price">R${price}</p>
            <button class="add-to-cart" data-name="${name}" data-price="${price}">Add to cart</button>
        </article>`;
    }).join('');
}

function showCart() {
    const cartTable = document.querySelector('#cart-table');

    if (!cartTable) return;

    const cart = getCart();
    const tableBody = cartTable.querySelector('tbody');
    const emptyMessage = document.querySelector('#empty-cart-message');
    const checkoutButton = document.querySelector('#checkout-button');
    const totalText = document.querySelector('#cart-total');
    let total = 0;

    tableBody.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;

        return `<tr>
            <td>${item.name}</td>
            <td><button class="cart-change" data-index="${index}" data-change="-1">-</button> ${item.quantity} <button class="cart-change" data-index="${index}" data-change="1">+</button></td>
            <td>R${item.price * item.quantity}</td>
            <td><button class="cart-remove" data-index="${index}">Remove</button></td>
        </tr>`;
    }).join('');

    cartTable.hidden = cart.length === 0;
    emptyMessage.hidden = cart.length !== 0;
    checkoutButton.hidden = cart.length === 0;
    totalText.textContent = `Total: R${total}`;
}

// Add an item or change a cart item.
document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-to-cart');

    if (addButton) {
        let name = addButton.dataset.name;
        let price = Number(addButton.dataset.price);
        const sizeSelect = addButton.closest('tr')?.querySelector('select');

        // Medium is 80% more than small. Large is another 80% more.
        if (sizeSelect) {
            const sizeRates = [1, 1.8, 3.24];
            price = Math.round(price * sizeRates[sizeSelect.selectedIndex]);
            name += ` - ${sizeSelect.value}`;
        }

        const cart = getCart();
        const savedItem = cart.find((item) => item.name === name);

        if (savedItem) savedItem.quantity += 1;
        else cart.push({ name, price, quantity: 1 });

        saveCart(cart);
        updateCartCount();
        addButton.textContent = 'Added!';
        setTimeout(() => { addButton.textContent = 'Add to cart'; }, 800);
        return;
    }

    const cartButton = event.target.closest('.cart-change, .cart-remove');

    if (!cartButton) return;

    const cart = getCart();
    const index = Number(cartButton.dataset.index);

    if (cartButton.classList.contains('cart-remove')) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity += Number(cartButton.dataset.change);
        if (cart[index].quantity < 1) cart.splice(index, 1);
    }

    saveCart(cart);
    updateCartCount();
    showCart();
});

// Full size food photo popup.
const imagePreview = document.createElement('div');
imagePreview.className = 'image-preview';
imagePreview.innerHTML = '<button class="image-preview-close" aria-label="Close full image">&times;</button><img alt="">';
document.body.appendChild(imagePreview);

const previewImage = imagePreview.querySelector('img');

function closeImagePreview() {
    imagePreview.classList.remove('is-open');
    document.body.classList.remove('preview-open');
    previewImage.src = '';
}

document.addEventListener('click', (event) => {
    const foodImage = event.target.closest('main img');

    if (foodImage) {
        previewImage.src = foodImage.currentSrc || foodImage.src;
        previewImage.alt = foodImage.alt;
        imagePreview.classList.add('is-open');
        document.body.classList.add('preview-open');
    }

    if (event.target === imagePreview || event.target.closest('.image-preview-close')) {
        closeImagePreview();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeImagePreview();
});

// Put the same header features on every page.
const header = document.querySelector('.site-header');

if (header) {
    const logo = header.querySelector('.brand-logo img');
    const navigation = header.querySelector('.site-nav');
    const cartLink = header.querySelector('.cart-link');

    if (logo) {
        logo.src = 'images/maka-nana-logo.png';
        logo.alt = 'Maka Nana Shisanyama';
    }

    if (cartLink) cartLink.innerHTML = 'Cart <span class="cart-count">0</span>';

    if (navigation && !navigation.querySelector('[href="home.html"]')) {
        navigation.insertAdjacentHTML('afterbegin', '<a href="home.html">Home</a>');
    }

    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    header.prepend(menuButton);

    menuButton.addEventListener('click', () => {
        const menuIsOpen = header.classList.toggle('menu-open');
        menuButton.setAttribute('aria-expanded', String(menuIsOpen));
        menuButton.setAttribute('aria-label', menuIsOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
}

// Add left and right buttons to mobile food sliders.
function addSliderButtons(slider, label) {
    if (!slider) return;

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';
    controls.innerHTML = `<button type="button" class="carousel-arrow" data-direction="left" aria-label="Previous ${label}">&#8249;</button><span>Swipe for more</span><button type="button" class="carousel-arrow" data-direction="right" aria-label="Next ${label}">&#8250;</button>`;

    controls.addEventListener('click', (event) => {
        const arrow = event.target.closest('.carousel-arrow');
        if (!arrow) return;

        const direction = arrow.dataset.direction === 'right' ? 1 : -1;
        slider.scrollBy({ left: direction * slider.clientWidth * 0.86, behavior: 'smooth' });
    });

    slider.parentElement.appendChild(controls);
}

// Home page slider.
const popularDishes = document.querySelector('.cards');

if (popularDishes) {
    const dishCards = [...popularDishes.querySelectorAll(':scope > article')];

    if (dishCards.length) {
        const slider = document.createElement('div');
        slider.className = 'cards-carousel';
        dishCards[0].before(slider);
        dishCards.forEach((card) => slider.appendChild(card));
        addSliderButtons(slider, 'popular dishes');
    }
}

// Menu page sliders.
document.querySelectorAll('.static-meal-panel .panel-content').forEach((panel, index) => {
    addSliderButtons(panel, index === 0 ? 'single meals' : 'combo meals');
});

showComboMeals();
updateCartCount();
showCart();

// Part 3: search both the single meals and the combo meals.
const menuSearch = document.querySelector('#menu-search');

if (menuSearch) {
    const searchMessage = document.querySelector('#menu-search-message');

    menuSearch.addEventListener('input', () => {
        const searchWord = menuSearch.value.trim().toLowerCase();
        const meals = document.querySelectorAll('.single-meals tbody tr, .menu-card');
        let mealsShown = 0;

        meals.forEach((meal) => {
            const mealName = meal.textContent.toLowerCase();
            const shouldShow = mealName.includes(searchWord);

            meal.hidden = !shouldShow;
            if (shouldShow) mealsShown += 1;
        });

        searchMessage.hidden = mealsShown !== 0 || searchWord === '';
    });
}

// Show one simple error message under a form field.
function showFieldError(fieldId, message) {
    const error = document.querySelector(`#${fieldId}-error`);
    const field = document.querySelector(`#${fieldId}`);

    if (error) error.textContent = message;
    if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');

    return message === '';
}

function hasText(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    return showFieldError(fieldId, field.value.trim() ? '' : message);
}

function hasEmail(fieldId) {
    const field = document.querySelector(`#${fieldId}`);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    return showFieldError(fieldId, isEmail ? '' : 'Enter a valid email address.');
}

// Save an enquiry in this browser and show a clear success message.
const enquiryForm = document.querySelector('#enquiry-form');

if (enquiryForm) {
    const deliveryMethod = document.querySelector('#delivery-method');
    const locationField = document.querySelector('#location-field');

    deliveryMethod.addEventListener('change', () => {
        const needsAddress = deliveryMethod.value === 'Delivery';
        locationField.hidden = !needsAddress;
        document.querySelector('#location').required = needsAddress;
    });

    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const phone = document.querySelector('#enquiry-phone').value.replace(/\s/g, '');
        const delivery = deliveryMethod.value;
        const needsAddress = delivery === 'Delivery';
        const isPhone = /^[0-9+()-]{10,15}$/.test(phone);
        const isNameValid = hasText('enquiry-name', 'Enter your full name.');
        const isPhoneValid = showFieldError('enquiry-phone', isPhone ? '' : 'Enter a valid phone number.');
        const isEmailValid = hasEmail('enquiry-email');
        const isDeliveryValid = showFieldError('delivery-method', delivery ? '' : 'Choose delivery or collection.');
        const isAddressValid = !needsAddress || hasText('location', 'Enter your delivery address.');
        const isOrderValid = hasText('order-message', 'Tell us what you would like to order.');
        const result = document.querySelector('#enquiry-result');

        if (isNameValid && isPhoneValid && isEmailValid && isDeliveryValid && isAddressValid && isOrderValid) {
            const savedEnquiries = localStorage.getItem('makaNanaEnquiries');
            const enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : [];
            enquiries.push({ name: document.querySelector('#enquiry-name').value.trim(), delivery });
            localStorage.setItem('makaNanaEnquiries', JSON.stringify(enquiries));
            result.textContent = 'Thank you. This test enquiry was saved in this browser only. No message was sent to the business.';
            enquiryForm.reset();
            locationField.hidden = true;
        } else {
            result.textContent = 'Please fix the messages above before sending your enquiry.';
        }
    });
}

// Check a contact message and give the visitor an email link to open.
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const isNameValid = hasText('contact-name', 'Enter your full name.');
        const isEmailValid = hasEmail('contact-email');
        const isTypeValid = hasText('message-type', 'Choose a message type.');
        const message = document.querySelector('#message').value.trim();
        const isMessageValid = showFieldError('message', message.length >= 10 ? '' : 'Write at least 10 characters.');
        const result = document.querySelector('#contact-result');

        result.textContent = '';

        if (isNameValid && isEmailValid && isTypeValid && isMessageValid) {
            const subject = document.querySelector('#message-type').value + ' from Maka Nana website';
            const body = `Name: ${document.querySelector('#contact-name').value.trim()}\nEmail: ${document.querySelector('#contact-email').value.trim()}\n\nMessage:\n${message}`;
            const emailLink = document.createElement('a');

            emailLink.href = `mailto:info@makananashisanyama.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            emailLink.className = 'btn';
            emailLink.textContent = 'Open email app';
            result.textContent = 'Your message is ready. Click here to open your email app: ';
            result.appendChild(emailLink);
        } else {
            result.textContent = 'Please fix the messages above before sending your message.';
        }
    });
}
