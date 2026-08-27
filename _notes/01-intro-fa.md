---
title: "۰۱ - مقدمه‌ای بر LLM"
lang: fa
slug: intro
order: 1
---

## مدل‌های زبانی بزرگ چیستند؟

مدل‌های زبانی بزرگ (Large Language Models) شبکه‌های عصبی بزرگی هستند که روی حجم زیادی از متن آموزش دیده‌اند تا بتوانند دنباله‌ی بعدی کلمات را پیش‌بینی کنند.

نکات کلیدی:

- معماری غالب: **Transformer**
- آموزش در دو مرحله: `pre-training` و `fine-tuning`
- مثال کد (همیشه چپ‌چین نمایش داده می‌شود):

```python
def next_token(prompt):
    return model.predict(prompt)
```

> این نسخه‌ی فارسیِ همان درس است — چون `slug` یکسانی با نسخه‌ی انگلیسی دارد (`intro`)، وقتی دکمه‌ی «فا» زده شود همین صفحه نمایش داده می‌شود.

## معماری Transformer

هر بلوک `## عنوان` یک اسلاید جدا می‌شود اگر حالت اسلایدی را روشن کنی. همچنین می‌توانی به‌جای `##` از یک خط `---` هم برای جداکردن اسلایدها استفاده کنی.

![نمونه عکس](https://placehold.co/800x400?text=Transformer)

می‌توانی از <span class="text-red">متن قرمز</span>، <span class="text-blue">متن آبی</span> یا <span class="hl-yellow">هایلایت زرد</span> هم استفاده کنی.

## <span class="text-purple">عنوان رنگی</span>

این یک اسلاید دیگر است
---
<span class="text-red">این متن قرمزه</span>
<span class="text-blue">این متن آبیه</span>
---
