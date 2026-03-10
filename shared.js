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

// Theme
function toggleTheme() {
  const html=document.documentElement;
  const next=html.getAttribute('data-theme')==='light'?'dark':'light';
  html.setAttribute('data-theme',next);
  const lbl=document.getElementById('themeLabel');
  if(lbl) lbl.textContent=next==='dark'?'Dark':'Light';
  localStorage.setItem('tp-theme',next);
}
(function(){
  const saved=localStorage.getItem('tp-theme');
  if(saved){ document.documentElement.setAttribute('data-theme',saved); const lbl=document.getElementById('themeLabel'); if(lbl) lbl.textContent=saved==='dark'?'Dark':'Light'; }
})();

// Scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
