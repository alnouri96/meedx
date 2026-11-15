# MEEDX Website — Agent Handoff (`AGENT_HANDOFF.md`)

> السجل الرسمي ونقطة الاستلام المرجعية لمشروع موقع **MEEDX** (`G:\MEEDX WEB`).

---

## 1. روابط الإنتاج الحية | Production URLs

- **الموقع الحي (Cloudflare Pages):** `https://meedx.pages.dev`
- **تغذية التحديثات التلقائية (`version.json`):** `https://meedx.pages.dev/api/version.json`
- **مستودع GitHub العام:** `https://github.com/alnouri96/meedx`
- **صفحة الإصدارات (GitHub Releases):** `https://github.com/alnouri96/meedx/releases`
- **الإصدار الحالي المنشور:** `https://github.com/alnouri96/meedx/releases/tag/v1.0.0-beta.3`

---

## 2. الحالة الحالية | Current State

### أ) الإصدار والملفات المنشورة (`v1.0.0-beta.3` · `versionCode = 3`)

| التطبيق | الحزمة (`Package ID`) | الحجم (بايت) | بصمة `SHA-256` | رابط التحميل المباشر |
| --- | --- | ---: | --- | --- |
| `Local Cinema TV` | `com.meedx.localcinema.tv` | `38624372` | `1b35502386683b7a0028e381563aee855d4e6045a667719a9cf42cd08d76e7b2` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.3/LocalCinema-TV-v1.0.0-beta.3.apk` |
| `Local Cinema Manager` | `com.meedx.localcinema.manager` | `605953911` | `0c41633b3b3014a26f7a811b13771590cb0dc75d1d208a26e9bf0da5a2609c61` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.3/LocalCinema-Manager-Phone-v1.0.0-beta.3.apk` |

- **المسار الأصلي لملفات APK (المصدر الوحيد):** `G:\Local Cinema\releases\v1.0.0-beta.3\`
- **ملف تسليم التطبيقات المرجعي:** `G:\Local Cinema\AGENT_HANDOFF.md`

### ب) حالة الواجهة والمزايا المنشورة

- **الهوية البصرية والنصوص:** علامة `MEEDX` / `MEEDX Studio` بدون أي أسماء شخصية، مع إصلاح اتجاه الكتابة العربية (`RTL / Bidi`) عبر `<bdi dir="ltr">` و`unicode-bidi: isolate`.
- **معرض لقطات الشاشة:** `14` شريحة (`28` صورة) تشمل التلفاز، الهاتف (`TV Hub` والريموت ولوحة اللمس)، ومشاركة مجلدات ويندوز عبر الشبكة (`SMB` · `.gallery-pc`). أول شريحتين هما `19-41-02` (تفاصيل الفيلم والتقييمات) و`15-59-12` (المواسم واستئناف الحلقة).
- **عارض الصور الاحترافي (`Zoom Lightbox`):** تخطيط Grid بثلاث مناطق مستقلة (الشريط العلوي + منطقة العرض الوسطى `1fr` + شريط التحكم السفلي) لضمان ظهور `100%` من الصورة دون قصّ، مع تكبير `100%`–`300%`، السحب والتحريك، عجلة الماوس، والقرص بالإصبعين.
- **الدعم المالي (`ZainCash` و`QiCard`):** باركودا `ZainCash` و`QiCard` (النسخة المحدّثة في `public/assets/qr/qicard-qr.png`) قابلان للتكبير داخل `Zoom Lightbox` بخلفية بيضاء ناصعة.
- **لوحة معادلة التطبيقات المدمجة (`EquationPanel`):** توضح دمج `7` وظائف وتطبيقات في منظومة `Local Cinema` واحدة.
- **قسم دليل الإعداد (`#setup-guide`):** يشرح محرك البوسترات والتقييمات التلقائي بلا مفاتيح (`Zero-Config`: `Cinemeta`، `TVmaze`، `Jikan`، ويكيبيديا العربية) ودليل مفاتيح الترجمة (`Subsource` كخيار افتراضي + `OpenSubtitles` أو كليهما).

---

## 3. قواعد العمل الإلزامية لأي إيجنت قادم | Mandatory Rules

1. **قاعدة عدم نسخ الـ APK:**
   - تُقرأ وتُفحص وتُرفع ملفات الـ `APK` وبصماتها **مباشرة من مسارها الأصلي** في `G:\Local Cinema\releases\<version>\` (وبالاعتماد على `G:\Local Cinema\AGENT_HANDOFF.md`).
   - يُمنع نسخ أي ملفات `.apk` إلى `G:\MEEDX WEB\MEEDX_Assets\04_Apps_APK\` أو `G:\MEEDX WEB\public\downloads\` أو `dist/`.
2. **قاعدة الحفظ بدون ZIP:**
   - يُمنع إنشاء أي ملفات أرشيف مضغوطة (`*.zip`) في `G:\MEEDX WEB\backups\` أو أي مجلد آخر.
   - يُحفظ العمل عبر تحديث هذا الملف (`AGENT_HANDOFF.md`) وعمل `git commit` محلي (مع التأكد من استبعاد `node_modules/` و`dist/` و`backups/` و`MEEDX_Assets/` و`*.apk` و`*.zip` في `.gitignore`).
3. **قاعدة المزامنة المزدوجة:**
   - أي تعديل على الموقع يجب أن يمر عبر `npm run verify` و`npm run build`، ثم يُنشر على **Cloudflare Pages** (`npx wrangler pages deploy dist --project-name=meedx --branch=main`)، ويُدفع إلى **مستودع GitHub العام** (`git push origin main`).
   - يُمنع منعاً باتاً رفع كود `G:\Local Cinema` الخاص أو أي مفاتيح سرية إلى GitHub.

---

## 4. سجل التحديثات | Session Log

| التاريخ | رقم الحفظ (`Commit`) | ما تم إنجازه | خطوات معلّقة |
| --- | --- | --- | --- |
| `2026-11-15` | `cf59053` | مزامنة السلايد شو (9 شرائح) وإضافة لقطات تفاصيل الفيلم والتشغيل وتحديث `README.md`. | لا يوجد |
| `2026-11-15` | `0891a45` | استبدال الشريحة 1 بلقطة الاقتران الجديدة (`20-28-48`) وتقديم الشريحتين `19-41-02` و`15-59-12` إلى البداية. | لا يوجد |
| `2026-11-15` | `d5e4a36` | إضافة 4 شرائح جديدة لريموت ولوحة لمس الهاتف والكتابة داخل المتصفح ويوتيوب (13 شريحة). | لا يوجد |
| `2026-11-15` | `4764f57` | إضافة شريحة مشاركة مجلدات ويندوز عبر `SMB` (`20-54-00`) ودعم نمط `.gallery-pc` (14 شريحة). | لا يوجد |
| `2026-11-15` | `40b6031` | حذف ملفات `APK` المكررة وأرشيفات `ZIP`، وتحديث `verify-downloads.mjs` و`sync-assets.py` للقراءة من `G:\Local Cinema\releases\` مباشرة، وإيقاف `backup-site.*` عن إنشاء ZIP، واعتماد `AGENT_HANDOFF.md`. | لا يوجد |
| `2026-11-15` | `4294cc0` | إطلاق `v1.0.0-beta.3` (`versionCode = 3`) على GitHub Releases مباشرة من `G:\Local Cinema\releases\v1.0.0-beta.3\`، وتحديث `README.md` بباركودات الدعم والموقع، وتحديث `catalog.json` و`version.json` والنشر الحي على Cloudflare Pages. | لا يوجد |
