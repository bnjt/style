// ─── Theme management ─────────────────────────────────────────────

const FALLBACK_THEMES = [
  { id: 'star-wars',        label: 'Star Wars' },
  { id: 'bauhaus', label: 'Bauhaus' },
];

const linkDark  = document.getElementById('theme-dark');
const linkLight = document.getElementById('theme-light');
const picker    = document.getElementById('themePicker');

function applyTheme(id) {
  linkDark.href  = `${id}-dark.css`;
  linkLight.href = `${id}-light.css`;
  localStorage.setItem('theme-id', id);
}

function buildPicker(themes) {
  const saved = localStorage.getItem('theme-id');
  themes.forEach(({ id, label }) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = label;
    if (id === saved) opt.selected = true;
    picker.appendChild(opt);
  });
  if (saved && themes.some(t => t.id === saved)) applyTheme(saved);
}

picker.addEventListener('change', () => applyTheme(picker.value));

fetch('themes.json')
  .then(r => r.json())
  .then(buildPicker)
  .catch(() => buildPicker(FALLBACK_THEMES));

// ─── Dark / light toggle ──────────────────────────────────────────

const themeBtn = document.getElementById('themeBtn');
const savedVariant = localStorage.getItem('theme-variant');
if (savedVariant === 'light') {
  document.body.dataset.theme = 'light';
  themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
  const isLight = document.body.dataset.theme === 'light';
  document.body.dataset.theme = isLight ? '' : 'light';
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme-variant', isLight ? '' : 'light');
});

// ─── Popups ───────────────────────────────────────────────────────

function showPopup(type, name) {
  if (type === 'char-info') {
    const infoEl = document.querySelector(`[data-char="${name}"] .info-content`);
    document.getElementById('popupTitle').textContent = name;
    document.getElementById('popupBody').textContent = infoEl ? infoEl.textContent : 'No data on record.';
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
