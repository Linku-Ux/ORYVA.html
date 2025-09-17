// script.js

function subscribe(e){
  e.preventDefault();
  const emailEl = document.getElementById('email');
  const consent = document.getElementById('consent');
  const status = document.getElementById('status');
  const email = emailEl.value.trim();

  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    status.textContent = 'Veuillez saisir un email valide.';
    status.style.color = '#ffb3b3';
    emailEl.focus();
    return;
  }
  if(!consent.checked){
    status.textContent = 'Veuillez accepter d’être contacté(e) pour l’ouverture du MVP.';
    status.style.color = '#ffb3b3';
    return;
  }

  status.textContent = 'Envoi...';
  status.style.color = 'var(--accent-2)';

  fetch('https://oryva-backend.onrender.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      status.textContent = 'C’est noté — vous serez prévenu(e) à l’ouverture du MVP.';
      status.style.color = 'var(--success)';
      e.target.reset();
    } else {
      status.textContent = data.error || 'Erreur serveur.';
      status.style.color = '#ffb3b3';
    }
  })
  .catch(err => {
    console.error(err);
    status.textContent = 'Erreur réseau, réessayez.';
    status.style.color = '#ffb3b3';
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('active');
  });
});
