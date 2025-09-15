/* =========================
   NAV MENU TOGGLE
========================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('show');
  hamburger.setAttribute(
    'aria-expanded',
    hamburger.classList.contains('open')
  );

  // Prevent background scroll
  if (navLinks.classList.contains('show')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('show') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleMenu();
  }
});

/* =========================
   FAQ TOGGLE
========================= */
document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

/* =========================
   WAITLIST MODAL
========================= */
const waitlistForm = document.getElementById('waitlist-form');
const closeBtn = document.querySelector('#waitlist-form .close-btn');

function openForm() {
  waitlistForm.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeForm() {
  waitlistForm.style.display = 'none';
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeForm);

// Close modal when clicking outside content
waitlistForm.addEventListener('click', (e) => {
  if (e.target === waitlistForm) {
    closeForm();
  }
});

/* =========================
   SCROLL PROGRESS BAR
========================= */
const progressBar = document.querySelector('#scroll-progress div');
const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';

  // Show/hide scroll-to-top button
  if (scrollTop > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

/* =========================
   SCROLL TO TOP
========================= */
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
