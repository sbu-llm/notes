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
    // اعمال تنظیمات ذخیره شده
    applyLang(currentLang());
    applyTheme(currentTheme());
    updateButtons();

    // دکمه‌های زبان
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang-btn');
        localStorage.setItem(LANG_KEY, lang);
        applyLang(lang);
        updateButtons();
      });
    });

    // دکمه تم
    var themeBtn = document.querySelector('[data-theme-btn]');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
        updateButtons();
      });
    }

    // دکمه پرینت - با استفاده از querySelector
    var printBtn = document.querySelector('[data-print-btn]'); // تغییر از getElementById به querySelector
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        var slideBtn = document.getElementById('slide-mode-btn');
        if (slideBtn && slideBtn.classList.contains('active')) {
          slideBtn.click();
          setTimeout(function () { window.print(); }, 50);
        } else {
          window.print();
        }
      });
    } else {
      console.log('دکمه پرینت پیدا نشد!');
    }
  });
})();
