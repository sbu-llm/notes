---
layout: default
title: خانه
---

<img class="cover-image" src="{{ '/assets/images/llm_database_desktop_500kb.svg' | relative_url }}" alt="LLM Lecture Notes">

<div class="chrome home-content" data-lang-content="fa" markdown="1">

### <span class="text-orange">یادداشت‌های درس سیستم‌های خبره</span> 
### <span class="hl-green">(مهندسی مدل‌های زبانی بزرگ)</span> 

<div class="box-purple">
  نیم‌سال اول ۱۴۰۶-۱۴۰۵، دانشکده ریاضی، دانشگاه شهید بهشتی
</div>



## <span class="heading-purple"> مدرسین:</span>

<span class="tag-orange">دکتر سعید رضا خردپیشه</span>
<span class="tag-red">میلاد وزان</span>




</div>

<div class="chrome home-content" data-lang-content="en" markdown="1">

### <span class="text-orange">Expert Systems Lecture Notes</span> 
### <span class="hl-green">(Large Language Model Engineering)</span> 

<div class="box-purple">
  2026-2027, Faculty of Mathematics, Shahid Beheshti University
</div>



## <span class="heading-purple"> Instructors:</span>

<span class="tag-orange">Dr. Saeed Reza Kheradpisheh</span>
<span class="tag-red">Milad Vazan</span>
</div>





<!-- ============================================ -->
<!-- نمایش تاریخ شمسی با اعداد فارسی              -->
<!-- ============================================ -->
<div id="persian-date" style="text-align: center; margin-top: 2rem; padding: 1rem; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.95rem;">
  <span id="date-display">در حال بارگذاری تاریخ...</span>
</div>

<script>
  (function() {
    // ============================================
    // تابع تبدیل اعداد انگلیسی به فارسی
    // ============================================
    function toPersianNumber(num) {
      var persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return num.toString().replace(/\d/g, function(d) {
        return persianDigits[parseInt(d)];
      });
    }
    
    // ============================================
    // تابع تبدیل تاریخ میلادی به شمسی
    // ============================================
    function toPersianDate(date) {
      var persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];
      
      function gregorianToJalali(gy, gm, gd) {
        var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var gy2 = (gm > 2) ? (gy + 1) : gy;
        var days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        var jy = -1595 + (33 * Math.floor(days / 12053));
        days %= 12053;
        jy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days > 365) {
          jy += Math.floor((days - 1) / 366);
          days = (days - 1) % 366;
        }
        var jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
        var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return [jy, jm, jd];
      }
      
      var now = date || new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      
      var jalali = gregorianToJalali(year, month, day);
      return {
        year: jalali[0],
        month: jalali[1],
        day: jalali[2],
        monthName: persianMonths[jalali[1] - 1]
      };
    }
    
    // ============================================
    // تابع نمایش تاریخ
    // ============================================
    function displayDate() {
      var dateDisplay = document.getElementById('date-display');
      if (!dateDisplay) return;
      
      var currentDate = new Date();
      var lang = document.documentElement.getAttribute('data-lang') || 'fa';
      
      if (lang === 'fa') {
        // ===== حالت فارسی با اعداد فارسی =====
        var persianDate = toPersianDate(currentDate);
        var weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
        var dayOfWeek = weekDays[currentDate.getDay()];
        
        // تبدیل اعداد به فارسی
        var yearStr = toPersianNumber(persianDate.year);
        var dayStr = toPersianNumber(persianDate.day);
        
        dateDisplay.textContent = dayOfWeek + ' ' + dayStr + ' ' + persianDate.monthName + ' ' + yearStr;
      } else {
        // ===== حالت انگلیسی =====
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
      }
    }
    
    // ============================================
    // اجرا در شروع و هنگام تغییر زبان
    // ============================================
    displayDate();
    
    // گوش دادن به تغییرات زبان
    var observer = new MutationObserver(function() {
      displayDate();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang']
    });
    
    // همچنین وقتی دکمه‌های زبان کلیک می‌شوند
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTimeout(displayDate, 100);
      });
    });
    
  })();
</script>
