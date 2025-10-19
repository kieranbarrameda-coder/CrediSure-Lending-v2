// Main site interactions
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
 // nav toggle for small screens
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('show');
    toggle.textContent = isOpen ? '✕' : '☰'; // switch between hamburger and X
  });

  // Close nav when a link is clicked (optional but recommended)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('show');
      toggle.textContent = '☰';
    });
  });
}

  // gallery modal
  const gallery = document.getElementById('galleryGrid');
  gallery?.addEventListener('click', (e)=>{
    if(e.target.tagName === 'IMG'){
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.inset=0;overlay.style.background='rgba(0,0,0,0.6)';overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex=9999;
      const img = document.createElement('img');img.src=e.target.src;img.style.maxWidth='90%';img.style.maxHeight='90%';img.style.borderRadius='8px';overlay.appendChild(img);
      overlay.addEventListener('click', ()=>overlay.remove());
      document.body.appendChild(overlay);
    }
  });

  // contact form submit to Firestore
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('contactStatus');
    status.textContent = 'Sending...';

    try{
      await window.credisure.db.collection('contacts').add({
        name, email, message, createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      status.textContent = 'Thank you — your message was sent.';
      form.reset();
    }catch(err){
      console.error(err);
      status.textContent = 'Sorry, something went wrong. Please try again later.';
    }
  });
});
