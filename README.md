# Lecture Notes Site

سایت ساده برای انتشار یادداشت‌های درسی، ساخته‌شده با Jekyll
ویژگی‌ها:
- دکمه‌ی EN / فا بالای صفحه برای تغییر زبان سایت (پیش‌فرض: **فارسی**)
- دکمه‌ی حالت تاریک/روشن (🌙 / ☀️)
- پشتیبانی کامل از راست‌چین برای محتوای فارسی؛ بلوک‌های کد همیشه چپ‌چین می‌مانند
- اگر برای یک درس، هم فایل فارسی و هم انگلیسی آپلود شود، با زدن دکمه‌ی «EN» نسخه‌ی انگلیسی همان درس نمایش داده می‌شود
- فهرست مطالب (لیست درس‌ها) به‌صورت سایدبار سمت راست/چپ نمایش داده می‌شود
- عکس کاور در صفحه‌ی اصلی
- دکمه‌ی «حالت اسلایدی» بالای هر درس: متن و عکس‌ها به‌صورت اسلاید افقی (شبیه پاورپوینت) نمایش داده می‌شوند، با دکمه‌ی قبلی/بعدی و کلیدهای arrow صفحه‌کلید

## راه‌اندازی (یک‌بار)

1. یک ریپازیتوری جدید در گیت‌هاب بساز.
2. همه‌ی فایل‌های این پوشه را در آن آپلود کن (Add file → Upload files، یا git push).
3. برو به **Settings → Pages**.
4. زیر «Build and deployment»، **Source** را روی **Deploy from a branch** بگذار و شاخه‌ی `main` / پوشه‌ی `/ (root)` را انتخاب کن.
5. چند دقیقه صبر کن؛ آدرس سایت: `https://USERNAME.github.io/REPO-NAME/`

## اضافه‌کردن درس جدید

فایل `.md` داخل `_notes/` با این هدر:

```markdown
---
title: "Lecture Title"
lang: en
slug: my-lecture     # شناسه‌ی یکتا برای این درس
order: 3              # ترتیب نمایش در سایدبار
date: 2026-09-01
---

Content here...
```

## اضافه‌کردن نسخه‌ی فارسی همان درس

یک فایل `.md` دیگر داخل `_notes/` بساز، با **همان `slug`** ولی `lang: fa`:

```markdown
---
title: "عنوان درس"
lang: fa
slug: my-lecture      # باید دقیقاً همان slug نسخه‌ی انگلیسی باشد
order: 3
date: 2026-09-01
---

متن فارسی اینجا...
```

با این کار، دو نسخه به هم متصل می‌شوند: در حالت EN نسخه‌ی انگلیسی نمایش داده می‌شود و در حالت فا نسخه‌ی فارسی. اگر فقط یکی از دو زبان موجود باشد، همان یکی با یک برچسب کوچک (مثلاً `EN`) در هر دو حالت نمایش داده می‌شود.

## عوض‌کردن عکس صفحه‌ی اصلی

عکس خودت رو (jpg/png) داخل پوشه‌ی `assets/images/` آپلود کن، مثلاً به اسم `cover.jpg`، بعد در فایل `index.md` این خط را:

```
src="{{ '/assets/images/cover.svg' | relative_url }}"
```

به این تغییر بده:

```
src="{{ '/assets/images/cover.jpg' | relative_url }}"
```
```
<!-- ============================================ -->
<!-- باکس Note (یادداشت)                         -->
<!-- ============================================ -->
<div class="callout callout-note">
  <div class="callout-title">
    <span class="callout-icon">📝</span> نکته
  </div>
  این یک نکته مهم است که باید به آن توجه کنید.
</div>

<!-- ============================================ -->
<!-- باکس Tip (راهنمایی)                        -->
<!-- ============================================ -->
<div class="callout callout-tip">
  <div class="callout-title">
    <span class="callout-icon">💡</span> راهنمایی
  </div>
  این یک راهنمایی مفید برای انجام بهتر کار است.
</div>

<!-- ============================================ -->
<!-- باکس Warning (هشدار)                      -->
<!-- ============================================ -->
<div class="callout callout-warning">
  <div class="callout-title">
    <span class="callout-icon">⚠️</span> هشدار
  </div>
  لطفاً به این نکته توجه ویژه داشته باشید.
</div>

<!-- ============================================ -->
<!-- باکس Danger (خطر)                         -->
<!-- ============================================ -->
<div class="callout callout-danger">
  <div class="callout-title">
    <span class="callout-icon">🚨</span> خطر
  </div>
  این کار ممکن است باعث بروز مشکل شود.
</div>

<!-- ============================================ -->
<!-- باکس Info (اطلاعات)                        -->
<!-- ============================================ -->
<div class="callout callout-info">
  <div class="callout-title">
    <span class="callout-icon">ℹ️</span> اطلاعات
  </div>
  اطلاعات تکمیلی درباره این موضوع.
</div>

<!-- ============================================ -->
<!-- باکس Success (موفقیت)                     -->
<!-- ============================================ -->
<div class="callout callout-success">
  <div class="callout-title">
    <span class="callout-icon">✅</span> موفقیت
  </div>
  این روش بهترین نتیجه را دارد.
</div>




این یک <span class="text-blue">متن آبی</span> است.
این یک <span class="text-red">متن قرمز</span> است.
این یک <span class="text-green">متن سبز</span> است.
این یک <span class="text-purple">متن بنفش</span> است.
این یک <span class="text-orange">متن نارنجی</span> است.
این یک <span class="text-pink">متن صورتی</span> است.



این یک <span class="hl-blue">هایلایت آبی</span> است.
این یک <span class="hl-red">هایلایت قرمز</span> است.
این یک <span class="hl-green">هایلایت سبز</span> است.
این یک <span class="hl-purple">هایلایت بنفش</span> است.


## <span class="heading-blue">عنوان آبی</span>

## <span class="heading-red">عنوان قرمز</span>

## <span class="heading-green">عنوان سبز</span>

## <span class="heading-purple">عنوان بنفش</span>

## <span class="heading-orange">عنوان نارنجی</span>

## <span class="heading-pink">عنوان صورتی</span>


<div class="box-blue">
  **این یک باکس آبی است.**
  می‌توانید هر متنی در اینجا قرار دهید.
</div>

<div class="box-red">
  **این یک باکس قرمز است.**
  برای هشدارها و نکات مهم.
</div>

<div class="box-green">
  **این یک باکس سبز است.**
  برای موفقیت‌ها و نکات مثبت.
</div>

<div class="box-purple">
  **این یک باکس بنفش است.**
  برای اطلاعات تکمیلی.
</div>

<div class="box-orange">
  **این یک باکس نارنجی است.**
  برای هشدارهای متوسط.
</div>

<div class="box-pink">
  **این یک باکس صورتی است.**
  برای نکات خاص و جذاب.
</div>



<a href="#" class="btn-blue">دکمه آبی</a>
<a href="#" class="btn-red">دکمه قرمز</a>
<a href="#" class="btn-green">دکمه سبز</a>
<a href="#" class="btn-purple">دکمه بنفش</a>
<a href="#" class="btn-orange">دکمه نارنجی</a>
<a href="#" class="btn-pink">دکمه صورتی</a>


<span class="tag-blue">مهم</span>
<span class="tag-red">هشدار</span>
<span class="tag-green">انجام شد</span>
<span class="tag-purple">جدید</span>
<span class="tag-orange">در حال انجام</span>
<span class="tag-pink">ویژه</span>
```



## نکات

- انتخاب زبان و حالت تاریک/روشن در مرورگر کاربر ذخیره می‌شود (localStorage) و بین بازدیدها حفظ می‌شود.
- فایل‌های نمونه‌ی داخل `_notes/` رو می‌تونی حذف یا با یادداشت‌های خودت جایگزین کنی.
- فایل `assets/images/cover.svg` فقط یک عکس نمونه است؛ حتماً با عکس خودت جایگزینش کن.
- برای اینکه یک درس در «حالت اسلایدی» تقسیم‌بندی درستی داشته باشه، محتوا رو با `##` (هدینگ دوم) یا یک خط `---` به بخش‌های جدا تقسیم کن؛ هر بخش یک اسلاید می‌شود. عکس‌ها هم داخل هر اسلاید خودکار اندازه‌شون تنظیم می‌شود.
