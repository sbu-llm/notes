(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('slide-mode-btn');
    var contentEl = document.getElementById('note-content');
    if (!btn || !contentEl) return;

    var originalHTML = contentEl.innerHTML;
    var active = false;
    var currentIndex = 0;
    var slideCount = 0;
    var container = null;
    var counterEl = null;

    function splitIntoGroups() {
      var temp = document.createElement('div');
      temp.innerHTML = originalHTML;
      var children = Array.prototype.slice.call(temp.children);
      var groups = [];
      var current = [];
      children.forEach(function (node) {
        var tag = node.tagName ? node.tagName.toLowerCase() : '';
        if ((tag === 'h2' || tag === 'hr') && current.length) {
          groups.push(current);
          current = [];
          if (tag === 'hr') return;
        }
        current.push(node);
      });
      if (current.length) groups.push(current);
      if (!groups.length) groups = [children];
      return groups;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(slideCount - 1, i));
      currentIndex = i;
      var slides = container.querySelectorAll('.slide');
      slides.forEach(function (s, idx) {
        s.style.display = idx === i ? 'flex' : 'none';
      });
      if (counterEl) counterEl.textContent = (i + 1) + ' / ' + slideCount;
      
      // ============================================
      // پردازش مجدد فرمول‌های MathJax در اسلاید جدید
      // ============================================
      if (window.MathJax && window.MathJax.typesetPromise) {
        try {
          // فقط اسلاید فعلی را پردازش کن
          var currentSlide = slides[i];
          MathJax.typesetPromise([currentSlide]).catch(function(err) {
            console.warn('MathJax error:', err);
          });
        } catch(e) {
          console.warn('MathJax typeset failed:', e);
        }
      }
      // ============================================
    }

    function enterSlideMode() {
      var groups = splitIntoGroups();
      slideCount = groups.length;

      container = document.createElement('div');
      container.className = 'slides-container';
      groups.forEach(function (group) {
        var slide = document.createElement('div');
        slide.className = 'slide';
        group.forEach(function (node) { slide.appendChild(node); });
        container.appendChild(slide);
      });

      var nav = document.createElement('div');
      nav.className = 'slide-nav chrome';
      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'slide-prev';
      prevBtn.textContent = '‹';
      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'slide-next';
      nextBtn.textContent = '›';
      counterEl = document.createElement('span');
      counterEl.className = 'slide-counter';
      var exitBtn = document.createElement('button');
      exitBtn.type = 'button';
      exitBtn.className = 'slide-exit';
      exitBtn.textContent = '✕';

      nav.appendChild(prevBtn);
      nav.appendChild(counterEl);
      nav.appendChild(nextBtn);
      nav.appendChild(exitBtn);

      contentEl.innerHTML = '';
      contentEl.appendChild(container);
      contentEl.appendChild(nav);
      contentEl.classList.add('slide-mode');
      document.body.classList.add('slide-mode-on');

      prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
      nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });
      exitBtn.addEventListener('click', exitSlideMode);

      document.addEventListener('keydown', onKeydown);
      
      // ============================================
      // پردازش فرمول‌های MathJax در اسلاید اول
      // ============================================
      goTo(0);
      // یک بار دیگر برای اطمینان از پردازش کامل
      setTimeout(function() {
        if (window.MathJax && window.MathJax.typesetPromise) {
          MathJax.typesetPromise([container]).catch(function(err) {
            console.warn('MathJax initial typeset failed:', err);
          });
        }
      }, 100);
      // ============================================
    }

    function onKeydown(e) {
      if (!active) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
      if (e.key === 'Escape') exitSlideMode();
    }

    function exitSlideMode() {
      active = false;
      btn.classList.remove('active');
      document.body.classList.remove('slide-mode-on');
      document.removeEventListener('keydown', onKeydown);
      contentEl.classList.remove('slide-mode');
      contentEl.innerHTML = originalHTML;
      container = null;
      counterEl = null;
      
      // ============================================
      // پردازش مجدد فرمول‌ها بعد از خروج از حالت اسلاید
      // ============================================
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(function(err) {
          console.warn('MathJax exit typeset failed:', err);
        });
      }
      // ============================================
    }

    btn.addEventListener('click', function () {
      active = !active;
      btn.classList.toggle('active', active);
      if (active) {
        enterSlideMode();
      } else {
        exitSlideMode();
      }
    });
  });
})();
