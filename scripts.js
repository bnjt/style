const charInfo = {
  'Luke Skywalker':    'Born on Polis Massa, raised on Tatooine. Trained by Obi-Wan Kenobi and Yoda. Destroyed the first Death Star. Redeemed his father Darth Vader. Later founded the New Jedi Order.',
  'Yoda':              'Grand Master of the Jedi Order for centuries. Known for his mastery of the Force and inverted syntax. Survived Order 66 and lived in exile on Dagobah.',
  'Obi-Wan Kenobi':   'Apprentice to Qui-Gon Jinn, master to Anakin Skywalker. One of the most respected Jedi of his era. Went into exile on Tatooine to watch over Luke.',
  'Darth Vader':       "Born Anakin Skywalker, hailed as the Chosen One. Fell to the dark side and became Emperor Palpatine's enforcer. Ultimately redeemed by his son Luke.",
  'Emperor Palpatine': 'Darth Sidious in public disguise. Orchestrated the Clone Wars, destroyed the Jedi Order, and ruled the galaxy as Emperor. Struck down by Darth Vader.',
};

function showPopup(type, name) {
  if (type === 'char-info') {
    document.getElementById('popupTitle').textContent = name;
    document.getElementById('popupBody').textContent = charInfo[name] ?? 'No data on record.';
    document.getElementById('infoPopup').classList.add('active');
  } else if (type === 'add-jedi') {
    document.getElementById('addJediPopup').classList.add('active');
  } else if (type === 'add-sith') {
    document.getElementById('popupTitle').textContent = 'Add Sith';
    document.getElementById('popupBody').textContent = '(Add Sith form would go here.)';
    document.getElementById('infoPopup').classList.add('active');
  }
}

function closePopup(id) {
  document.getElementById(id).classList.remove('active');
}

function confirmDelete(name) {
  document.getElementById('deleteBody').textContent =
    `Are you sure you want to remove "${name}" from the Galactic Registry? This cannot be undone.`;
  document.getElementById('deleteConfirmBtn').onclick = () => closePopup('deletePopup');
  document.getElementById('deletePopup').classList.add('active');
}

document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? '' : 'light';
  themeBtn.textContent = isLight ? '☀️' : '🌙';
});
