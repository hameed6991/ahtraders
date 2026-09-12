/**
 * AH TRADERS - MAIN JAVASCRIPT
 * Static Site Functionality: Sticky Header, Mobile Nav Drawer & WhatsApp Enquiry Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  highlightActiveNavLink();
  initContactForm();
  preselectProductFromUrl();
});

/**
 * Handle Sticky Header Shadow on Scroll
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!mobileToggle || !mobileNav) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Highlight Active Navigation Link based on current page
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Pre-select product dropdown if URL contains ?product=... parameter
 */
function preselectProductFromUrl() {
  const productSelect = document.getElementById('product');
  if (!productSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  const paramProduct = urlParams.get('product');

  if (paramProduct) {
    const matchingOption = Array.from(productSelect.options).find(
      opt => opt.value.toLowerCase() === paramProduct.toLowerCase() || opt.text.toLowerCase() === paramProduct.toLowerCase()
    );

    if (matchingOption) {
      productSelect.value = matchingOption.value;
    }
  }
}

/**
 * Contact Form WhatsApp Submission Handler
 */
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const companyName = document.getElementById('companyName')?.value.trim() || 'N/A';
    const phone = document.getElementById('phone')?.value.trim();
    const email = document.getElementById('email')?.value.trim() || 'N/A';
    const product = document.getElementById('product')?.value || 'General Sourcing Enquiry';
    const message = document.getElementById('message')?.value.trim() || 'No message details provided.';

    // Simple validation
    if (!fullName) {
      alert('Please enter your full name.');
      document.getElementById('fullName')?.focus();
      return;
    }

    if (!phone) {
      alert('Please enter your phone number.');
      document.getElementById('phone')?.focus();
      return;
    }

    // WhatsApp business number: 9944588923 -> Country code 91
    const targetWhatsAppNumber = '919944588923';

    // Format WhatsApp message text
    const textLines = [
      `*NEW INQUIRY - AH TRADERS WEBSITE*`,
      `----------------------------------`,
      `*Full Name:* ${fullName}`,
      `*Company Name:* ${companyName}`,
      `*Phone Number:* ${phone}`,
      `*Email Address:* ${email}`,
      `*Product Interested:* ${product}`,
      `----------------------------------`,
      `*Message:*`,
      `${message}`
    ];

    const encodedMessage = encodeURIComponent(textLines.join('\n'));
    const whatsappUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp URL in new tab
    window.open(whatsappUrl, '_blank');

    // Optional reset or feedback
    form.reset();
  });
}
