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

    // دکمه پرینت
    var printBtn = document.querySelector('[data-print-btn]');
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
    }

    // =============================================
    // کنترل سایز فونت در حالت مطالعه
    // =============================================
    (function() {
      var readerControls = document.getElementById('reader-controls');
      var fontIncrease = document.getElementById('font-increase');
      var fontDecrease = document.getElementById('font-decrease');
      var fontReset = document.getElementById('font-reset');
      var fontSizeDisplay = document.getElementById('font-size-display');
      var readerBtn = document.getElementById('reader-mode-btn');
      var mainContent = document.getElementById('main-content');
      
      // اگر عناصر مورد نیاز وجود ندارند، اجرا نشود
      if (!readerControls || !readerBtn || !mainContent) return;
      
      // کلید ذخیره‌سازی
      var FONT_SIZE_KEY = 'reader-font-size';
      
      // سایزهای مجاز (درصد)
      var MIN_FONT = 60;
      var MAX_FONT = 160;
      var DEFAULT_FONT = 100;
      var FONT_STEP = 10;
      
      // سایز فعلی
      var currentFontSize = parseInt(localStorage.getItem(FONT_SIZE_KEY)) || DEFAULT_FONT;
      
      // تنظیم سایز فونت
      function setFontSize(percent) {
        // محدود کردن
        if (percent < MIN_FONT) percent = MIN_FONT;
        if (percent > MAX_FONT) percent = MAX_FONT;
        
        currentFontSize = percent;
        
        // اعمال به main-content
        mainContent.style.setProperty('--reader-font-size', percent + '%');
        mainContent.style.fontSize = percent + '%';
        
        // نمایش درصد
        if (fontSizeDisplay) {
          fontSizeDisplay.textContent = percent + '%';
        }
        
        // ذخیره در localStorage
        localStorage.setItem(FONT_SIZE_KEY, percent.toString());
      }
      
      // افزایش فونت
      function increaseFont() {
        setFontSize(currentFontSize + FONT_STEP);
      }
      
      // کاهش فونت
      function decreaseFont() {
        setFontSize(currentFontSize - FONT_STEP);
      }
      
      // بازنشانی به حالت پیش‌فرض
      function resetFont() {
        setFontSize(DEFAULT_FONT);
      }
      
      // نمایش/مخفی کردن کنترل‌ها
      function toggleReaderControls(show) {
        if (show) {
          readerControls.classList.add('visible');
        } else {
          readerControls.classList.remove('visible');
        }
      }
      
      // وقتی ماوس روی دکمه مطالعه می‌رود
      readerBtn.addEventListener('mouseenter', function() {
        if (document.body.classList.contains('reader-mode')) {
          toggleReaderControls(true);
        }
      });
      
      // وقتی ماوس از روی دکمه مطالعه خارج می‌شود
      readerBtn.addEventListener('mouseleave', function() {
        setTimeout(function() {
          if (!readerControls.matches(':hover')) {
            toggleReaderControls(false);
          }
        }, 300);
      });
      
      // وقتی ماوس روی کنترل‌ها می‌رود
      readerControls.addEventListener('mouseenter', function() {
        toggleReaderControls(true);
      });
      
      // وقتی ماوس از روی کنترل‌ها خارج می‌شود
      readerControls.addEventListener('mouseleave', function() {
        if (!readerBtn.matches(':hover')) {
          setTimeout(function() {
            if (!readerBtn.matches(':hover') && !readerControls.matches(':hover')) {
              toggleReaderControls(false);
            }
          }, 300);
        }
      });
      
      // وقتی حالت مطالعه فعال/غیرفعال می‌شود
      readerBtn.addEventListener('click', function() {
        setTimeout(function() {
          if (document.body.classList.contains('reader-mode')) {
            toggleReaderControls(true);
          } else {
            toggleReaderControls(false);
          }
        }, 200);
      });
      
      // اتصال دکمه‌ها
      if (fontIncrease) {
        fontIncrease.addEventListener('click', increaseFont);
      }
      
      if (fontDecrease) {
        fontDecrease.addEventListener('click', decreaseFont);
      }
      
      if (fontReset) {
        fontReset.addEventListener('click', resetFont);
      }
      
      // پشتیبانی از کیبورد (کلیدهای + و -)
      document.addEventListener('keydown', function(e) {
        if (!document.body.classList.contains('reader-mode')) return;
        if (!readerControls.classList.contains('visible')) return;
        
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          increaseFont();
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          decreaseFont();
        } else if (e.key === '0') {
          e.preventDefault();
          resetFont();
        }
      });
      
      // هنگام بارگذاری صفحه، سایز قبلی را اعمال کن
      var savedSize = parseInt(localStorage.getItem(FONT_SIZE_KEY));
      if (savedSize && savedSize >= MIN_FONT && savedSize <= MAX_FONT) {
        setFontSize(savedSize);
      } else {
        setFontSize(DEFAULT_FONT);
      }
      
      // اگر حالت مطالعه فعال باشد در ابتدا، کنترل‌ها را نمایش بده
      if (document.body.classList.contains('reader-mode')) {
        setTimeout(function() {
          toggleReaderControls(true);
        }, 500);
      }
    })();
  });
})();
