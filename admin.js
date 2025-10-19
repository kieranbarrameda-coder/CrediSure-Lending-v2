
// Admin panel logic with refresh & sign out
let currentUser = null;

function escapeHtml(s){ if(!s) return ''; return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

async function renderContacts(){
  const tbody = document.querySelector('#contactsTable tbody');
  tbody.innerHTML = '';
  try{
    const snapshot = await window.credisure.db.collection('contacts').orderBy('createdAt','desc').get();
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement('tr');
      const dt = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleString() : '-';
      tr.innerHTML = `<td>${dt}</td><td>${escapeHtml(data.name||'')}</td><td>${escapeHtml(data.email||'')}</td><td>${escapeHtml(data.message||'')}</td>`;
      tbody.appendChild(tr);
    });
  }catch(err){
    console.error('Error fetching contacts', err);
    const tbody = document.querySelector('#contactsTable tbody');
    tbody.innerHTML = '<tr><td colspan="4">Failed to load contacts.</td></tr>';
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('loginForm');
  const authStatus = document.getElementById('authStatus');
  const panel = document.getElementById('panel');
  const authArea = document.getElementById('authArea');

  loginForm?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('adminEmail').value.trim();
    const pw = document.getElementById('adminPassword').value;
    authStatus.textContent = 'Signing in...';
    try{
      const res = await window.credisure.auth.signInWithEmailAndPassword(email,pw);
      currentUser = res.user;
      authStatus.textContent = '';
      authArea.style.display = 'none';
      panel.style.display = '';
      await renderContacts();
    }catch(err){
      console.error(err);
      authStatus.textContent = 'Sign in failed: '+err.message;
    }
  });

  document.getElementById('signOutBtn')?.addEventListener('click', async ()=>{
    try{
      await window.credisure.auth.signOut();
      currentUser = null;
      document.getElementById('panel').style.display='none';
      document.getElementById('authArea').style.display='block';
    }catch(err){console.error('Sign out error',err)}
  });

  document.getElementById('refreshBtn')?.addEventListener('click', renderContacts);

  window.credisure.auth.onAuthStateChanged(async user =>{
    if(user){
      currentUser = user;
      document.getElementById('authArea').style.display='none';
      document.getElementById('panel').style.display='';
      await renderContacts();
    }
  });
});
