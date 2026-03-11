/* ─── TERAPUSH SHARED JS ─── */


// Cursor
(function() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cursor.style.left=mx+'px'; cursor.style.top=my+'px';
  });
  function animRing() {
    rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a,button,input,select,textarea,.theme-toggle').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ ring.style.width='48px'; ring.style.height='48px'; ring.style.opacity='0.25'; });
    el.addEventListener('mouseleave',()=>{ ring.style.width='32px'; ring.style.height='32px'; ring.style.opacity='0.5'; });
  });
})();

// Nav scroll
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>20));

// Mobile drawer
(function() {
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('mobileDrawer');
  if (!hamburger || !drawer) return;
  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close on link click
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  // Close on resize to desktop
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeDrawer(); });
})();

// Theme
function syncThemePill(theme) {
  const pillDark  = document.getElementById('pillDark');
  const pillLight = document.getElementById('pillLight');
  if (!pillDark || !pillLight) return;
  pillDark.classList.toggle('active',  theme === 'dark');
  pillLight.classList.toggle('active', theme === 'light');
}
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.themeLabel').forEach(lbl => lbl.textContent = theme === 'dark' ? 'Dark' : 'Light');
  localStorage.setItem('tp-theme', theme);
  syncThemePill(theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
}
(function(){
  const saved = localStorage.getItem('tp-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.querySelectorAll('.themeLabel').forEach(lbl => lbl.textContent = saved === 'dark' ? 'Dark' : 'Light');
  // Sync pill after DOM ready
  window.addEventListener('DOMContentLoaded', () => syncThemePill(saved));
})();



