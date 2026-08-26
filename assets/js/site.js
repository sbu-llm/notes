(function () {
  var LANG_KEY = 'site-lang';
  var THEME_KEY = 'site-theme';

  function currentLang() {
    return localStorage.getItem(LANG_KEY) || 'fa';
  }
  function currentTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  function updateButtons() {
    var lang = document.documentElement.getAttribute('data-lang');
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    });
    var theme = document.documentElement.getAttribute('data-theme');
    var themeBtn = document.querySelector('[data-theme-btn]');
    if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateButtons();

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang-btn');
        localStorage.setItem(LANG_KEY, lang);
        applyLang(lang);
        updateButtons();
      });
    });

    var themeBtn = document.querySelector('[data-theme-btn]');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
        updateButtons();
      });
    }
  });
})();
