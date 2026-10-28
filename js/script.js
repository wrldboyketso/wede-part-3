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

// Check the checkout form. This is a student demo, not a real payment system.
const enquiryForm = document.querySelector('#enquiry-form');

if (enquiryForm) {
    const deliveryMethod = document.querySelector('#delivery-method');
    const locationField = document.querySelector('#location-field');
    const orderMessage = document.querySelector('#order-message');
    const checkoutAccountMessage = document.querySelector('#checkout-account-message');

    function showDeliveryField() {
        const needsAddress = deliveryMethod.value === 'Delivery';
        locationField.hidden = !needsAddress;
        document.querySelector('#location').required = needsAddress;
    }

    function showCartMeals() {
        const cart = getCart();
        let total = 0;

        if (cart.length === 0) {
            orderMessage.value = 'Your cart is empty. Add meals from the menu first.';
            return;
        }

        orderMessage.value = '';

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            orderMessage.value += `${item.name} x ${item.quantity} - R${itemTotal}\n`;
        });

        orderMessage.value += `Total: R${total}`;
    }

    deliveryMethod.addEventListener('change', () => {
        showDeliveryField();
    });

    showCartMeals();

    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const phone = document.querySelector('#enquiry-phone').value.replace(/\s/g, '');
        const delivery = deliveryMethod.value;
        const needsAddress = delivery === 'Delivery';
        const cardNumber = document.querySelector('#card-number').value.replace(/\s/g, '');
        const cardExpiry = document.querySelector('#card-expiry').value.trim();
        const cardCvv = document.querySelector('#card-cvv').value.trim();
        const isPhone = /^[0-9+()-]{10,15}$/.test(phone);
        const isNameValid = hasText('enquiry-name', 'Enter your full name.');
        const isPhoneValid = showFieldError('enquiry-phone', isPhone ? '' : 'Enter a valid phone number.');
        const isEmailValid = hasEmail('enquiry-email');
        const isDeliveryValid = showFieldError('delivery-method', delivery ? '' : 'Choose delivery or collection.');
        const isAddressValid = !needsAddress || hasText('location', 'Enter your delivery address.');
        const isOrderValid = showFieldError('order-message', getCart().length > 0 ? '' : 'Add meals to your cart before checkout.');
        const isCardNameValid = hasText('card-name', 'Enter the name on the test card.');
        const isCardNumberValid = showFieldError('card-number', cardNumber === '1111222233334444' ? '' : 'Use 1111 2222 3333 4444 for the demo.');
        const isCardExpiryValid = showFieldError('card-expiry', /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry) ? '' : 'Use an expiry date like 12/28.');
        const isCardCvvValid = showFieldError('card-cvv', /^\d{3}$/.test(cardCvv) ? '' : 'Use a 3 digit test CVV.');
        const result = document.querySelector('#enquiry-result');

        if (isNameValid && isPhoneValid && isEmailValid && isDeliveryValid && isAddressValid && isOrderValid && isCardNameValid && isCardNumberValid && isCardExpiryValid && isCardCvvValid) {
            const savedEnquiries = localStorage.getItem('makaNanaEnquiries');
            const enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : [];
            enquiries.push({ name: document.querySelector('#enquiry-name').value.trim(), delivery, payment: 'Demo card payment' });
            localStorage.setItem('makaNanaEnquiries', JSON.stringify(enquiries));
            result.textContent = 'Demo checkout complete. No money was taken and no real order was sent.';
            enquiryForm.reset();
            locationField.hidden = true;
            saveCart([]);
            updateCartCount();
            showCart();
            showCartMeals();
        } else {
            result.textContent = 'Please fix the messages above before completing the demo checkout.';
        }
    });
}

// Demo accounts are saved in this browser only. They are not real secure accounts.
const accountKey = 'makaNanaDemoAccount';
const signedInKey = 'makaNanaSignedIn';

function getDemoAccount() {
    try {
        return JSON.parse(localStorage.getItem(accountKey));
    } catch {
        return null;
    }
}

function updateAccountLink() {
    const accountLink = document.querySelector('.account-link');
    const signedIn = localStorage.getItem(signedInKey);
    const account = getDemoAccount();

    if (accountLink && signedIn === 'true' && account) {
        accountLink.textContent = `Hi, ${account.name.split(' ')[0]}`;
        accountLink.href = 'signin.html';
    }
}

// Put saved account details into checkout when the user is signed in.
function fillCheckoutAccount() {
    const nameField = document.querySelector('#enquiry-name');
    const phoneField = document.querySelector('#enquiry-phone');
    const emailField = document.querySelector('#enquiry-email');
    const accountMessage = document.querySelector('#checkout-account-message');
    const account = getDemoAccount();
    const signedIn = localStorage.getItem(signedInKey) === 'true';

    if (nameField && phoneField && emailField && accountMessage && signedIn && account) {
        nameField.value = account.name;
        phoneField.value = account.phone || '';
        emailField.value = account.email;
        accountMessage.textContent = `You are signed in as ${account.name}. Your saved details are shown below.`;
    } else if (accountMessage) {
        accountMessage.textContent = 'Please sign in first so your saved details can be shown here.';
    }
}

const registerForm = document.querySelector('#register-form');

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const password = document.querySelector('#register-password').value;
        const confirmPassword = document.querySelector('#register-confirm-password').value;
        const phone = document.querySelector('#register-phone').value.replace(/\s/g, '');
        const isNameValid = hasText('register-name', 'Enter your full name.');
        const isPhoneValid = showFieldError('register-phone', /^[0-9+()-]{10,15}$/.test(phone) ? '' : 'Enter a valid phone number.');
        const isEmailValid = hasEmail('register-email');
        const isPasswordValid = showFieldError('register-password', password.length >= 6 ? '' : 'Use at least 6 characters.');
        const isConfirmPasswordValid = showFieldError('register-confirm-password', password === confirmPassword ? '' : 'Passwords do not match.');
        const result = document.querySelector('#register-result');

        if (isNameValid && isPhoneValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            const account = {
                name: document.querySelector('#register-name').value.trim(),
                phone: document.querySelector('#register-phone').value.trim(),
                email: document.querySelector('#register-email').value.trim(),
                password
            };

            localStorage.setItem(accountKey, JSON.stringify(account));
            localStorage.setItem(signedInKey, 'true');
            updateAccountLink();
            registerForm.reset();
            result.textContent = 'Demo account created. You are now signed in on this browser.';
        } else {
            result.textContent = 'Please fix the messages above before creating the account.';
        }
    });
}

const signinForm = document.querySelector('#signin-form');

if (signinForm) {
    const signoutButton = document.querySelector('#signout-button');
    const signedIn = localStorage.getItem(signedInKey) === 'true';

    if (signedIn) signoutButton.hidden = false;

    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const account = getDemoAccount();
        const email = document.querySelector('#signin-email').value.trim();
        const phone = document.querySelector('#signin-phone').value.replace(/\s/g, '');
        const password = document.querySelector('#signin-password').value;
        const isEmailValid = hasEmail('signin-email');
        const isPhoneValid = showFieldError('signin-phone', /^[0-9+()-]{10,15}$/.test(phone) ? '' : 'Enter a valid phone number.');
        const isPasswordValid = hasText('signin-password', 'Enter your demo password.');
        const result = document.querySelector('#signin-result');

        if (isEmailValid && isPhoneValid && isPasswordValid && account && account.email === email && account.password === password && (!account.phone || account.phone.replace(/\s/g, '') === phone)) {
            if (!account.phone) {
                account.phone = document.querySelector('#signin-phone').value.trim();
                localStorage.setItem(accountKey, JSON.stringify(account));
            }
            localStorage.setItem(signedInKey, 'true');
            updateAccountLink();
            signoutButton.hidden = false;
            signinForm.reset();
            result.textContent = `Welcome back, ${account.name}. You are signed in on this browser.`;
        } else if (isEmailValid && isPhoneValid && isPasswordValid) {
            result.textContent = 'Email, phone number, or password is not correct. Create a demo account first if needed.';
        } else {
            result.textContent = 'Please fix the messages above before signing in.';
        }
    });

    signoutButton.addEventListener('click', () => {
        localStorage.removeItem(signedInKey);
        signoutButton.hidden = true;
        document.querySelector('#signin-result').textContent = 'You are signed out from this browser.';
        const accountLink = document.querySelector('.account-link');
        accountLink.textContent = 'Sign in/up';
        accountLink.href = 'register.html';
    });
}

updateAccountLink();
fillCheckoutAccount();

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
