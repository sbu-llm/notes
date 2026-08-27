---
layout: default
title: خانه
---

<img class="cover-image" src="{{ '/assets/images/llm_database_desktop_500kb.svg' | relative_url }}" alt="LLM Lecture Notes">

<div class="chrome home-content" data-lang-content="fa" markdown="1">

### یادداشت‌های درس سیستم‌های خبره
### (مهندسی مدل‌های زبانی بزرگ)
نیم‌سال اول ۱۴۰۶-۱۴۰۵، دانشکده ریاضی، دانشگاه شهید بهشتی 

مدرسین:

دکتر سعیدرضا خردپیشه

میلاد وزان



</div>

<div class="chrome home-content" data-lang-content="en" markdown="1">

# LLM Lecture Notes

Pick a lecture from the sidebar.

To add a new lecture, upload a `.md` file into the `_notes/` folder in GitHub — the page is generated automatically. The site defaults to Persian; if an English version is also uploaded with the same `slug`, it appears when the EN button is selected.

</div>





<!-- ============================================ -->
<!-- نمایش تاریخ شمسی (ساده)                      -->
<!-- ============================================ -->
<div id="persian-date" style="text-align: center; margin-top: 2rem; padding: 1rem; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.95rem;">
  <span id="date-display">در حال بارگذاری تاریخ...</span>
</div>

<script>
  (function() {
    // تابع تبدیل تاریخ میلادی به شمسی (بدون کتابخانه)
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
      return jalali[0] + ' ' + persianMonths[jalali[1] - 1] + ' ' + jalali[2];
    }
    
    // نمایش تاریخ
    var dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
      var currentDate = new Date();
      var persianDate = toPersianDate(currentDate);
      
      // تشخیص زبان فعلی
      var lang = document.documentElement.getAttribute('data-lang') || 'fa';
      
      if (lang === 'fa') {
        var weekDays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
        var dayOfWeek = weekDays[currentDate.getDay()];
        dateDisplay.textContent = dayOfWeek + ' ' + persianDate;
      } else {
        // نمایش به انگلیسی
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
      }
    }
  })();
</script>
