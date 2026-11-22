# موقع مدرسة الرّوافد — نموذج تصميمي

موقع مدرسي متكامل (٨ صفحات) بالعربية والإنجليزية، مع وضع ليلي/نهاري وصور وخطوط محلية.
مدرسة افتراضية بالكامل: الأسماء والأرقام والفعاليات بيانات توضيحية للعرض.

## التشغيل
1. فكّ الضغط عن المجلد كاملًا مع الحفاظ على بنية المجلدات.
2. افتح `index.html` في متصفح حديث. يعمل مباشرة من الملفات، بلا خادم.
3. زر «ع/EN» في الأعلى يبدّل اللغة والاتجاه، وزر الشمس/القمر يبدّل الوضع. الاختيار يُحفظ في المتصفح.

## الصفحات
الرئيسية · عن المدرسة · المراحل الدراسية · الأنشطة · المعلمون · الأخبار · القبول والتسجيل · تواصل معنا
وصفحة المصادر `CREDITS.html`.

## التخصيص
- النصوص: كل العبارات العربية والإنجليزية في `assets/js/i18n.js` (مفتاح واحد لكل عبارة)،
  وتظهر النسخة العربية أيضًا داخل صفحات HTML في خاصية `data-i18n`.
- الألوان: متغيرات `:root` و`[data-theme="dark"]` أعلى `assets/css/style.css`.
- الصور: استبدال الملفات في `assets/img` بالاسم نفسه.
- النماذج: نماذج القبول والمراسلة تجريبية ولا ترسل بيانات؛ اربطها بخدمة فعلية عند الاعتماد.

# Rawafed School — design demo
A complete 8-page bilingual (Arabic/English) school website with dark/light themes and local assets.
Fictional school: all names, figures and events are sample content. Open `index.html`; no server needed.
Language and theme toggles sit in the header and persist in the browser.
