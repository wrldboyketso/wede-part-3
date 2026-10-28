# Maka Nana Shisanyama Website

## Student details

- Name: Koketso Mayane
- Student number: ST10521965
- Module: WEDE5020 - Web Development (Introduction)
- Group: 06

## About this website

This website is for Maka Nana Shisanyama in Durban. It gives customers a place to see food, prices, contact details, and order choices. The old business page used TikTok and WhatsApp. This website makes the information easier to find.

## Pages

- Home (`home.html`): welcome message and popular meals
- About: story, mission, and vision
- Menu: single meals and combo meals
- Cart: shows items added by the customer
- Checkout: delivery or collection choice
- Sign up and sign in: account pages
- Contact: contact details, an enquiry button that opens the message form, and a message box

## Part 2: CSS and responsive design

Part 2 is complete. The work done in this part is:

- One external CSS file: `css/style.css`
- Same colours on all pages: cream, black, red, and gold
- Same header and footer on all pages
- Rounded food cards, clear buttons, forms, and tables
- Flexbox and CSS Grid for the page layout
- Tablet style at 768px and below
- Mobile style at 600px and below
- A three-line mobile menu
- Mobile food sliders. Users can swipe, or use the left and right arrows.
- Photos can be pressed to see the full photo.

## Part 3: JavaScript and website improvements

Part 3 has started. The code is kept simple so it is easy for a beginner to read.

- The menu has a search box. A customer can type a food name and see matching meals.
- The enquiry form checks the name, phone number, email address, order, and delivery choice.
- The delivery address only shows when the customer chooses delivery.
- A correct enquiry is saved in the browser for this student demo. It does not send a real order.
- The contact form checks all fields. It makes an email link after the message is correct.
- The email link uses `info@makananashisanyama.co.za` as a demo recipient. This must be changed if the business gives a different email address.
- The contact page has a Google map for the Durban Spar area.
- Main pages now have page titles, descriptions, keywords, useful image alt text, and a `robots.txt` file.
- A `sitemap.xml` file was added for the live website.
- The sign-up and sign-in pages now save a name, phone number, and email as a browser-only demo account. No real account is made.
- When an account is signed in, the account page hides the sign-in form and create-account link. It shows only the signed-in name and sign-out button.
- Checkout shows the saved account details and all meals in the cart.
- Checkout uses demo card payment only. It never takes real money or sends a real order.

## Live website

The Part 3 website is live on GitHub Pages:

<https://wrldboyketso.github.io/wede-part-3/>

## Part 3 testing

I tested the new Part 3 features in a browser.

- Menu search: typing `beef` shows Beef Steak Only.
- Enquiry form: empty fields show clear error messages. A correct form shows a success message.
- Contact form: empty fields show clear error messages. A correct form makes an email-app link.
- Map: the Durban Spar area map loads on the Contact page.
- Photo gallery: pressing a food photo opens the full-size photo.
- Tablet test: checked at 768px wide. There was no side-to-side page movement.
- Mobile test: checked at 390px wide. There was no side-to-side page movement.
- Demo account: created a browser-only account with name, phone number, and email, then signed in and signed out.
- Demo checkout: checked the saved account details, cart meal summary, and fixed test card details. No real payment was made.

## Before and after Part 2

| Before | After Part 2 |
| --- | --- |
| Plain header and red navigation bar | Clean white header with logo, Home link, account link, and cart |
| Basic page layout | Cream background, clear headings, spacing, and matching cards |
| Food shown as simple content | Food has clear cards, prices, and rounded photos |
| Desktop layout only | Desktop, tablet, and mobile layouts |
| Mobile page could be too long | Food can be swiped left and right on mobile |

## Feedback, mistakes, and fixes

| Feedback or mistake | Fix made |
| --- | --- |
| README was too short | Added clear project details, changes, screenshots, changelog, and references |
| References were missing | Added references at the bottom of this file |
| Mobile pages needed better sizing | Added tablet and mobile CSS rules and checked at phone size |
| Some photos were cut off | A photo can be pressed to see the full picture |
| Menu was too long on mobile | Added swipe cards and arrow buttons for single meals, combo meals, and popular meals |
| About page moved sideways | Fixed the broken cart text and stopped horizontal page movement |
| Meal names and prices needed changes | Added "Only" names, Tripe Only, sides, meats, and takeaway size prices |

## Responsive screenshots

I tested the website on a PC and on a real mobile phone. The mobile screenshots show the phone status bar and battery, which shows that the mobile test was done on a phone. I do not have a tablet device, so the tablet screenshots were captured at a 768px tablet-size browser view.

| Page | PC | Tablet (768px browser view) | Mobile phone |
| --- | --- | --- | --- |
| Home | [PC Home](evidence/PC%20Home.png) | [Tablet Home](screenshots/index-tablet.png) | [Mobile Home](evidence/Mobile%20Home.jpg) |
| About | [PC About](evidence/PC%20About.png) | [Tablet About](screenshots/about-tablet.png) | [Mobile About](evidence/Mobile%20About.jpg) |
| Menu | [PC Menu](evidence/PC%20Menu%20%282%29.png) | [Tablet Menu](screenshots/menu-tablet.png) | [Mobile Menu](evidence/Mobile%20Menu.jpg) |
| Cart | [PC Cart](evidence/PC%20Cart.png) | [Tablet Cart](screenshots/cart-tablet.png) | [Mobile Cart](evidence/Mobile%20Cart.jpg) |
| Contact | [PC Contact](evidence/PC%20Contact.png) | [Tablet Contact](screenshots/contact-tablet.png) | [Mobile Contact](evidence/Mobile%20Conctact.jpg) |
| Sign up | [PC Sign up](evidence/PC%20Sign%20Up.png) | [Tablet Sign up](screenshots/register-tablet.png) | [Mobile Sign up](evidence/Mobile%20Sign%20Up.jpg) |
| Sign in | [PC Sign in](evidence/PC%20Sign%20In.png) | [Tablet Sign in](screenshots/signin-tablet.png) | [Mobile Sign in](evidence/Mobile%20Sign%20In.jpg) |
| Checkout | [PC Checkout](evidence/PC%20Equiry.png) | [Tablet Checkout](screenshots/enquiry-tablet.png) | [Mobile Checkout](evidence/Mobile%20Equire%20.jpg) |

## Files

```text
index.html
home.html
about.html
menu.html
cart.html
enquiry.html
contact.html
register.html
signin.html
css/style.css
js/script.js
images/
screenshots/
evidence/
robots.txt
sitemap.xml
```

## Easy code notes

- HTML makes the page content.
- CSS makes the colours, spacing, sizes, cards, and responsive layout.
- JavaScript is in one file. It adds cart items, shows combo meals, opens photos, checks forms, and controls the mobile menu and sliders.
- The JavaScript uses simple `if/else` decisions, arrays, loops, and small functions.
- The form code reads input values, checks the values, stops a bad form, and shows short error messages next to the field.
- The comments use simple English so the code is easy to explain in class.

## Changelog

- Changed the Contact page so the Send a message form stays hidden until the customer presses Make an enquiry.

### Part 2 - 14 September 2026

- Updated the header with the new Maka Nana logo and Home link.
- Added the three-line mobile menu.
- Made mobile food sections swipeable with left and right buttons.
- Made combo meal cards match the rounded Popular Dishes cards.
- Fixed the About page moving sideways on phone.
- Fixed the cart link text on every page.
- Added more single meals: chips, chakalaka, salad, beef steak, lamb chops, chicken breast, bacon, and fish.
- Changed Tribe to Tripe and made single meal names end with "Only".
- Removed the two chip combo meals.
- Kept buttons in their normal colour when pressed or hovered.
- Updated this README in simple English.
- Replaced the old computer-made screenshots with my own PC and real mobile phone screenshots.

### Part 2 update - 17 September 2026

- Added tablet browser screenshots to the README testing evidence.
- Added hover animations for food photos, food cards, buttons, navigation links, and information paragraphs.
- Made the Maka Nana logo rotate when the mouse moves over it.

### Part 3 start - 21 October 2026

- Added a working menu search box for single meals and combo meals.
- Added a full order enquiry form with simple checks and clear error messages.
- Added delivery and collection choices. The address field only shows for delivery.
- Added a contact form with simple checks and an email-app link.
- Added a map to the contact page.
- Added SEO page titles, descriptions, keywords, and clearer image alt text on the main pages.
- Added `robots.txt`.
- Added `sitemap.xml` and the planned GitHub Pages website link.
- Tested the search, forms, map, photo gallery, tablet layout, and mobile layout.

### Part 3 deployment - 28 October 2026

- Published the Part 3 website on GitHub Pages from the `main` branch and the root folder.
- Checked that the live home page opens and the navigation links are available.

### Part 3 account and payment update - 28 October 2026

- Made the sign-up and sign-in pages work as a simple browser-only student demo.
- Added a sign-out button.
- Hid the sign-in form and create-account link while an account is signed in.
- Sent the user to the account view after a successful sign-in.
- Fixed the CSS hidden rule so the signed-in page shows only the sign-out button.
- Added saved account details and the cart meal summary to checkout.
- Changed checkout to demo card payment only.
- The demo card only accepts the fixed test number `1111 2222 3333 4444`.
- Added clear messages to show that no real money is taken and no real order is sent.

### Part 1 - 11 August 2026

- Made the main HTML pages.
- Made the project folders.
- Wrote the first project proposal.

## References

- Maka Nana Shisanyama, 2026. TikTok page and business photos. Available at: <https://www.tiktok.com/@makananashisanyama> [Accessed 14 September 2026].
- MDN Web Docs, 2026. CSS Flexible Box Layout. Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout> [Accessed 14 September 2026].
- MDN Web Docs, 2026. CSS Grid Layout. Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout> [Accessed 14 September 2026].
- MDN Web Docs, 2026. Responsive design. Available at: <https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design> [Accessed 14 September 2026].
- MDN Web Docs, 2026. Client-side form validation. Available at: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation> [Accessed 21 October 2026].
- Google Maps, 2026. Durban, KwaZulu-Natal map. Available at: <https://www.google.com/maps?q=Spar%20Durban%20KwaZulu-Natal> [Accessed 21 October 2026].
- Rosebank International, 2026. WEDE5020 Week 1 Slides. Class slides supplied by the lecturer.
- Rosebank International, 2026. WEDE5020 Week 5 Slides. Class slides supplied by the lecturer.
- Rosebank International, 2026. WEDE5020 Week 6 Slides. Class slides supplied by the lecturer.
- Rosebank International, 2026. WEDE5020 JavaScript Form Validation Notes. Class notes supplied by the lecturer.
- Rosebank International, 2026. WEDE5020 JavaScript Conditional Statements, Arrays and Functions. Class notes supplied by the lecturer.
- Rosebank International, 2026. Website Deployment on GitHub. Class guide supplied by the lecturer.
