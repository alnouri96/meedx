# MEEDX Website — Agent Handoff (`AGENT_HANDOFF.md`)

> السجل الرسمي ونقطة الاستلام المرجعية لمشروع موقع **MEEDX** (`G:\MEEDX WEB`).

---

## 1. روابط الإنتاج الحية | Production URLs

- **الموقع الحي (Cloudflare Pages):** `https://meedx.pages.dev`
- **تغذية التحديثات التلقائية (`version.json`):** `https://meedx.pages.dev/api/version.json`
- **مستودع GitHub العام:** `https://github.com/alnouri96/meedx`
- **بروفايل GitHub للاستوديو:** `https://github.com/alnouri96` (مستودع `https://github.com/alnouri96/alnouri96`)
- **صفحة الإصدارات (GitHub Releases):** `https://github.com/alnouri96/meedx/releases`
- **الإصدار الحالي المنشور:** `https://github.com/alnouri96/meedx/releases/tag/v1.0.0-beta.7`

---

## 2. الحالة الحالية | Current State

### أ) الإصدار والملفات المنشورة (`v1.0.0-beta.7` · `versionCode = 7`)

| التطبيق | الحزمة (`Package ID`) | الحجم (بايت) | بصمة `SHA-256` | رابط التحميل المباشر |
| --- | --- | ---: | --- | --- |
| `Local Cinema TV` | `com.meedx.localcinema.tv` | `38757679` | `44ca11f62eed3701dbd9115f0d73f4f1765ca43c15fa4dd8579e92909f44fd87` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.7/LocalCinema-TV-v1.0.0-beta.7.apk` |
| `Local Cinema Manager` | `com.meedx.localcinema.manager` | `197316085` | `93de9c7d20ca92022e96257f4cc317ef77e31bac042b43c12c01dc536ad6d973` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.7/LocalCinema-Manager-Phone-v1.0.0-beta.7.apk` |

- **المسار الأصلي لملفات APK (المصدر الوحيد):** `G:\Local Cinema\releases\v1.0.0-beta.7\`
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
| `2026-11-15` | `ac369c4` | تحديث `AGENT_HANDOFF.md` ببيانات `v1.0.0-beta.3`. | لا يوجد |
| `2026-11-15` | `841eab9` | توليد بطاقتي البانر (`meedx-hero-banner.png` و`local-cinema-card.png`)، إنشاء ونشر مستودع البروفايل `alnouri96/alnouri96` (`724c790`) مع باركودات الدعم، وتوحيد واجهة `README.md` في `alnouri96/meedx` وضبط بيانات البروفايل الجانبي (`MEEDX`). | لا يوجد |
| `2026-11-15` | `bff8df7` | إطلاق `v1.0.0-beta.4` (`versionCode = 4`) كأحدث إصدار (`--latest`) على GitHub Releases مباشرة من `G:\Local Cinema\releases\v1.0.0-beta.4\`، وتحديث `version.json` و`catalog.json` و`README.md` (في `meedx` و`alnouri96`) والنشر الحي على Cloudflare Pages. | لا يوجد |
| `2026-11-16` | `9504cbf` | إطلاق `v1.0.0-beta.5` (`versionCode = 5`) كأحدث إصدار (`--latest`) على GitHub Releases مباشرة من `G:\Local Cinema\releases\v1.0.0-beta.5\` (مع تقليص حجم تطبيق الهاتف إلى `196.7 MB`)، وتحديث `version.json` و`catalog.json` و`README.md` (في `meedx` و`alnouri96`) والنشر الحي على Cloudflare Pages. | لا يوجد |
| `2026-11-16` | `33431db` | حذف جميع الإصدارات والوسوم القديمة (`v1.0.0-beta.2` و`v1.0.0-beta.3` و`v1.0.0-beta.4`) من `alnouri96/meedx` مع الإبقاء على `v1.0.0-beta.5` فقط والتحقق الحي من `version.json` وروابط التنزيل. | لا يوجد |
| `2026-11-16` | `7aed9cb` | إضافة تجربة الشرح التفاعلية بالأيقونات (`InteractiveShowcase`: المخطط الثنائي الحيّ بأربعة سيناريوهات، دليل البدء في 3 خطوات مع كود `Downloader` `3213660`، مستعرض المزايا التفاعلي بـ 4 تبويبات، وشبكة 8 تطبيقات في منظومة واحدة) والنشر الحي على Cloudflare Pages (`https://46505e97.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `427a1ad` | إضافة وسوم المعاينة الاجتماعية وSEO (`Open Graph` و`Twitter Card` و`Meta Description`) في `index.html` مربوطة بـ `meedx-hero-banner.png` والنشر الحي على Cloudflare Pages. | لا يوجد |
| `2026-11-16` | `23b9676` | تحسين تجربة المستخدم والأنيميشن للأقسام التفاعلية (`قدرات المنظومة الكاملة`، تعريب `هاتف + شاشة · شبكة محلية`، أشرطة أزرار تفاعلية واضحة مع Hover، تبديل تلقائي كل 5 ثوانٍ مع شريط تقدم ذهبي وإيقاف عند التفاعل، وانتقالات `scFadeUp` وتوهج الأيقونات) والنشر الحي على Cloudflare Pages (`https://73e8f845.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `7105c58` | نقل سلايدر ومعرض لقطات الشاشة (`.gallery`) إلى بداية قسم التطبيقات مباشرة بعد الـ Hero وقبل لوحة المعادلة وأقسام الشرح التفاعلية، مع ضبط المسافات (`margin-block-end: 28px`) والنشر الحي على Cloudflare Pages (`https://480e56ac.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `f110d1b` | إطلاق `v1.0.0-beta.6` (`versionCode = 6`) كأحدث إصدار (`--latest`) على `alnouri96/meedx` مع حذف `v1.0.0-beta.5` ووسمه، تحديث `version.json` و`catalog.json` و`README.md`، إنشاء `public/api/config.json` و`public/api/addons.json`، إضافة قسم «الإضافات، الربط ومفاتيح API» (`#addons`)، والنشر الحي على Cloudflare Pages (`https://e7040c2f.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `0509cc7` | إضافة نظام «معلومات التطبيق الكاملة وملاحظات الإصدار (`Update Notes`)» في `catalog.json` و`DownloadAppCard.jsx` لكل تطبيق، وتطوير قسم `#addons` بثلاثة تبويبات تفاعلية (الإضافات والميزات الجديدة، التوصيلات وحماية `TCL com.tcl.guard`، ودليل مواقع مفاتيح API الاختيارية)، وتحديث `#setup-guide`، وضبط استجابة الهيدر على `768px` (`max-width: 900px`)، والنشر الحي على Cloudflare Pages (`https://a7988689.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `ab78857` | النشر الرسمي النهائي لحزمتي `v1.0.0-beta.6` (`versionCode = 6`) على GitHub Releases (`--clobber --latest`) مع Patch Notes الكاملة، تحديث `version.json` و`catalog.json` و`README.md` بالبصمات والأحجام النهائية، إضافة `googleClientId` إلى `public/api/config.json`، وتوسيع Patch Notes وقسم `#addons` (معالج الصلاحيات الذكي، النسخ الاحتياطي الشامل عبر Google Drive ومحلياً، وحماية السكون لجميع الشاشات)، والنشر الحي على Cloudflare Pages (`https://f0fb651e.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `43c5e81` | إعادة هيكلة وتقسيم الموقع إلى مسارات مستقلة (`/`, `/apps`, `/apps/local-cinema`, `/software`, `/services`, `/downloads`, `/addons`) مع `public/_redirects`، جزيئات ذهبية في الهيرو (`GoldParticles.jsx`)، بطاقة GitHub للتطبيقات (`AppsShowcasePage.jsx`)، صفحة تفاصيل مستقلة (`AppDetailPage.jsx`) بسجل `Patch Notes` من `beta.6` إلى `beta.7`، شارات دلالية (`#22C55E` و`#EF4444` و`#E5B94C`)، زر العودة للأعلى (`↑`)، ونشر `v1.0.0-beta.7` (`versionCode = 7`) على GitHub Releases وCloudflare Pages (`https://d9fa07ea.meedx.pages.dev`). | لا يوجد |
| `2026-11-16` | `8bb270f` | نقل قسم «الإضافات، التوصيلات ومفاتيح API والتعليمات» إلى داخل صفحة التطبيق (`/apps/local-cinema#addons`) مع إعادة التوجيه التلقائي لـ `/addons` واقتصار الشريط العلوي على 5 أقسام، إعادة تصميم الصفحة الرئيسية (`/`) لنبذة `MEEDX` ومعرض أحدث البوسترات، استبدال البانر القديم المقصوص بعارض معاينة متجاوب (`LocalCinemaPoster`) وأيقونة `local-cinema-icon.png` الرسمية، والفحص الحي بالمتصفح والنشر على Cloudflare Pages. | لا يوجد |
| `2026-11-16` | `70da282` | إضافة شارات التمييز الصريحة («هذه نسخة الشاشة (Android TV)» و«هذه نسخة الهاتف (Android Phone)»)، وإضافة صندوق كود `Downloader` والروابط المختصرة (`meedx.pages.dev/tv` و`meedx.pages.dev/phone` في `_redirects`) لنسختي الشاشة والهاتف في `/downloads` و`/apps/local-cinema` و`siteConfig.js` و`catalog.json`، والتحقق الحي عبر المتصفح والنشر على Cloudflare Pages. | لا يوجد |
