import React, { useState } from 'react';
import {
  Sparkles, Link2, Puzzle, ShieldAlert, KeyRound, ExternalLink,
  Copy, CheckCircle2, Tv, Smartphone, Subtitles, Film, RefreshCw,
  Star, Users, HardDrive, BookmarkCheck, PlayCircle
} from 'lucide-react';

export function AddonsConnectionsSection({ t, L, copy }) {
  const [tab, setTab] = useState('plugins');

  const readyManifests = [
    { name: 'OpenSubtitles v3', url: 'https://opensubtitles-v3.strem.io/manifest.json' },
    { name: 'Torrentio', url: 'https://torrentio.strem.fun/manifest.json' },
    { name: 'Comet', url: 'https://comet.elfhosted.com/manifest.json' },
  ];

  const apiProviders = [
    {
      id: 'trakt',
      icon: RefreshCw,
      name: 'Trakt',
      tag: t('اختياري · ربط فوري PKCE بضغطة واحدة', 'Optional · 1-Tap OAuth 2.0 PKCE'),
      desc: t(
        'يزامن سجل المشاهدة وقائمة المتابعة ومواضع التوقف في الاتجاهين عبر ربط OAuth 2.0 PKCE من الهاتف بلا مفاتيح مطورين.',
        'Syncs Watched history, Watchlist, Continue Watching, and resume positions both ways via 1-tap OAuth 2.0 PKCE from the Phone app without developer keys.'
      ),
      steps: [
        t(<>افتح تطبيق الهاتف وانتقل إلى {L('TV Hub ← Connection')} واضغط {L('Connect Trakt Account')}.</>, 'Open the Phone app, go to TV Hub → Connection, and tap Connect Trakt Account.'),
        t(<>سجّل الدخول ووافق على الصلاحيات في متصفح الهاتف. يعود التطبيق تلقائياً عبر {L('PKCE')}.</>, 'Sign in and authorize in your browser. The Phone app completes the PKCE callback automatically.'),
        t(<>تُزامَن حالة الحساب والسجل وقائمة المشاهدة تلقائياً مع الشاشة وتحفظ بشكل دائم.</>, 'Account credentials, Watched status, and Watchlist automatically sync and persist on TV.'),
        t(<>اضغط {L('Refresh · Sync')} أو {L('Sync from Phone Now')} للتحديث اليدوي الفوري في أي وقت.</>, 'Tap Refresh · Sync or Sync from Phone Now anytime for an instant manual refresh.'),
      ],
      links: [
        { label: t('حساب Trakt', 'Trakt Website'), url: 'https://trakt.tv/' },
      ],
    },
    {
      id: 'subsource',
      icon: Subtitles,
      name: 'Subsource',
      tag: t('اختياري · ترجمات عربية', 'Optional · Arabic Subtitles'),
      desc: t(
        'يوفر ملفات ترجمة عربية وإنجليزية للأفلام والمسلسلات والأنمي.',
        'Provides Arabic and English subtitle files for movies, series, and anime.'
      ),
      steps: [
        t(<>افتح موقع {L('subsource.net')} وأنشئ حساباً مجانياً وسجّل الدخول.</>, 'Open subsource.net, create a free account, and sign in.'),
        t(<>انتقل إلى الملف الشخصي ({L('Profile')}) ثم افتح قسم {L('API')}.</>, 'Go to your Profile and open the API section.'),
        t('أنشئ مفتاح API جديداً وانسخ النص الخاص به.', 'Generate a new API key and copy the key string.'),
        t(<>الصق المفتاح في تطبيق الهاتف ({L('TV Hub ← Connection')}) ليصل للشاشة فوراً.</>, 'Paste the key in the phone app (TV Hub → Connection) to sync it to TV instantly.'),
      ],
      links: [
        { label: t('فتح Subsource', 'Open Subsource'), url: 'https://subsource.net/' },
      ],
    },
    {
      id: 'opensubtitles',
      icon: Subtitles,
      name: 'OpenSubtitles',
      tag: t('اختياري · تنبيه DNS خاص', 'Optional · Private DNS Notice'),
      desc: t(
        'فهرس ترجمات عالمي. إذا تعذّر فتح الموقع لدى مزوّد الإنترنت، فعّل DNS خاص (1.1.1.1 أو dns.google).',
        'Global subtitle catalog. If blocked by your ISP, enable Private DNS (1.1.1.1 or dns.google) on your device.'
      ),
      steps: [
        t(<>افتح {L('opensubtitles.com')} (أو {L('.org')}) وسجّل الدخول. فعّل {L('DNS')} خاص إذا كان الموقع محجوباً.</>, 'Open opensubtitles.com (or .org) and sign in. Enable Private DNS if the site is blocked.'),
        t(<>انتقل إلى {L('API Consumers')} من ملفك الشخصي وأنشئ Consumer جديداً.</>, 'Open API Consumers from your profile and create a new Consumer.'),
        t(<>انسخ {L('API Key')} مع اسم المستخدم وكلمة المرور لحسابك.</>, 'Copy the API Key along with your account username and password.'),
        t(<>أرسلها للشاشة من الهاتف عبر {L('TV Hub ← Connection')}.</>, 'Push them to your TV from the phone via TV Hub → Connection.'),
      ],
      copyValue: { label: t('نسخ DNS: 1.1.1.1', 'Copy DNS: 1.1.1.1'), value: '1.1.1.1' },
      copyValueAlt: { label: t('نسخ dns.google', 'Copy dns.google'), value: 'dns.google' },
      links: [
        { label: 'API Consumers (.com)', url: 'https://www.opensubtitles.com/en/consumers' },
        { label: 'OpenSubtitles (.org)', url: 'https://www.opensubtitles.org/' },
      ],
    },
    {
      id: 'tmdb',
      icon: Film,
      name: 'TMDb',
      tag: t('اختياري · بوسترات وممثلين', 'Optional · Posters & Cast'),
      desc: t(
        'يضيف صوراً وخلفيات إضافية للممثلين والأعمال عبر مفتاحك الشخصي. يعمل التطبيق بدونه تلقائياً.',
        'Loads additional cast photos and backdrops with your personal key. The app works without it by default.'
      ),
      steps: [
        t(<>سجّل الدخول في {L('themoviedb.org')} وافتح {L('Settings ← API')}.</>, 'Sign in at themoviedb.org and open Settings → API.'),
        t('اختر طلب مفتاح مطوّر مجاني (Developer) وأكمل النموذج المختصر.', 'Request a free Developer key and complete the short form.'),
        t(<>انسخ القيمة المسماة {L('API Key (v3)')}.</>, 'Copy the value labeled API Key (v3).'),
        t(<>ألصقها في الهاتف وأرسلها للشاشة بضغطة واحدة عبر {L('API_KEYS_SYNC')}.</>, 'Paste it on your phone and push to TV in one tap via API_KEYS_SYNC.'),
      ],
      links: [
        { label: t('صفحة API في TMDb', 'TMDb API Settings'), url: 'https://www.themoviedb.org/settings/api' },
      ],
    },
  ];

  return (
    <section id="addons" className="band" aria-label={t('الإضافات، التوصيلات ومفاتيح API', 'Plugins, Connections & API Guides')}>
      <div className="wrap section">
        <div className="section-head">
          <div>
            <span className="sc-kicker"><CheckCircle2 size={15} /> {t('إصدار v1.0.0-beta.14 · مركز الاتصال وإدارة الإضافات', 'Release v1.0.0-beta.14 · Connection Hub & Addons')}</span>
            <h2>{t('الإضافات، التوصيلات ومفاتيح API والتعليمات', 'Plugins, Connections, APIs & Guides')}</h2>
            <p>{t('إضافات Nuvio وStremio، المزامنة الثنائية عبر الشبكة المحلية، حماية الشاشات (TCL وغيرها)، ودليل إنشاء مفاتيح API الاختيارية.', 'Nuvio & Stremio addons, two-way LAN watch sync, TV background protection, and optional API key creation guides.')}</p>
          </div>
          <span className="sc-lan-pill"><Tv size={14} /> <Smartphone size={14} /> {t('تشغيل فوري بلا حساب', 'Zero-Account Ready')}</span>
        </div>

        <div className="sc-scenarios" role="tablist" aria-label={t('أقسام الإضافات والتوصيلات', 'Plugins and connections tabs')} style={{ marginBottom: 22 }}>
          {[
            ['plugins', Puzzle, t('الإضافات والميزات الجديدة', 'Plugins & Addons')],
            ['connection', Link2, t('نظام التوصيلات وحماية TCL', 'Connection & TCL Guard')],
            ['apis', KeyRound, t('دليل مواقع مفاتيح API الاختيارية', 'API Creation Guides')],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={'sc-pill' + (tab === key ? ' active' : '')}
              onClick={() => setTab(key)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {tab === 'plugins' && (
          <div key="plugins" className="ac-grid sc-animate">
            <article className="ac-card">
              <div className="ac-card-head">
                <span className="sc-gold-badge"><Puzzle size={20} /></span>
                <div>
                  <code dir="ltr">Nuvio Streams & Stremio Addons</code>
                  <h3>{t('طرق تنصيب الإضافات الخارجية (3 طرق)', '3 Ways to Install External Addons')}</h3>
                </div>
              </div>
              <ol className="guide-steps">
                <li>
                  <code dir="ltr">01</code>
                  <span><strong>{t('التثبيت بضغطة واحدة:', 'One-Tap Install:')}</strong> {t('من قائمة الإضافات الجاهزة داخل تطبيق الهاتف مع مزامنة فورية للشاشة.', 'Directly from the built-in catalog in the phone app with instant TV sync.')}</span>
                </li>
                <li>
                  <code dir="ltr">02</code>
                  <span><strong>{t('الاكتشاف التلقائي من الحافظة:', 'Clipboard Auto-Detect:')}</strong> {t(<>عند نسخ أي رابط {L('manifest.json')}، يلتقطه التطبيق ويعرض تثبيته تلقائياً.</>, 'Copy any manifest.json link and the app detects and offers to install it automatically.')}</span>
                </li>
                <li>
                  <code dir="ltr">03</code>
                  <span><strong>{t('اللصق اليدوي:', 'Manual Paste:')}</strong> {t('في الإعدادات المتقدمة لإدارة وترتيب الإضافات بحرية.', 'Paste into Advanced Settings to manage and reorder addons freely.')}</span>
                </li>
              </ol>
              <div className="ac-manifest-list">
                {readyManifests.map((m) => (
                  <div key={m.name} className="ac-copy-row">
                    <div>
                      <strong>{m.name}</strong>
                      <code dir="ltr">{m.url}</code>
                    </div>
                    <button type="button" className="button" onClick={() => copy(m.url)}>
                      <Copy size={14} />
                      <span>{t('نسخ Manifest', 'Copy Manifest')}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="ac-links">
                <a href="https://github.com/tapframe/NuvioStreamsAddon" target="_blank" rel="noopener noreferrer" className="button">
                  <span>NuvioStreamsAddon</span>
                  <ExternalLink size={14} />
                </a>
                <a href="https://stremio-addons.net" target="_blank" rel="noopener noreferrer" className="button">
                  <span>stremio-addons.net</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>

            <article className="ac-card">
              <div className="ac-card-head">
                <span className="sc-gold-badge"><Sparkles size={20} /></span>
                <div>
                  <code dir="ltr">Zero-Account · Watched · Up Next · Cache</code>
                  <h3>{t('الميزات الجديدة المدمجة في التجربة', 'Built-In Experience Upgrades')}</h3>
                </div>
              </div>
              <ul className="ac-icon-list">
                <li>
                  <BookmarkCheck size={18} />
                  <span><strong>{t('تمت المشاهدة وWatchlist:', 'Watched & Watchlist:')}</strong> {t('تتبّع دقيق لما شاهدته مع تلوين أزرار التحديد بالذهبي لسهولة التمييز.', 'Track finished titles and your Watchlist with gold selection highlights.')}</span>
                </li>
                <li>
                  <PlayCircle size={18} />
                  <span><strong>{t('الانتقال التلقائي (Up Next):', 'Auto Up Next:')}</strong> {t('عرض الحلقة التالية والانتقال إليها بسلاسة عند انتهاء الحلقة الحالية.', 'Automatic next-episode prompt and seamless progression.')}</span>
                </li>
                <li>
                  <Users size={18} />
                  <span><strong>{t('صفحات الممثلين وأعمالهم:', 'Cast & Crew Pages:')}</strong> {t('صور بورتريه وعرض بالحجم الكامل واستعراض أعمال الممثل محلياً وعالمياً.', 'Portrait photos, full-size viewer, and local/global filmographies.')}</span>
                </li>
                <li>
                  <Star size={18} />
                  <span><strong>{t('تقييمات من مصادر متعددة:', 'Multi-Source Ratings:')}</strong> {t(<>عرض تقييمات {L('IMDb')} و{L('Rotten Tomatoes')} و{L('Metacritic')} و{L('Trakt')} و{L('MAL')}.</>, 'Combined ratings from IMDb, Rotten Tomatoes, Metacritic, Trakt, and MAL.')}</span>
                </li>
                <li>
                  <HardDrive size={18} />
                  <span><strong>{t('الكاش الدائم على القرص:', 'Persistent Disk Cache:')}</strong> {t('حفظ دائم للصور والبيانات مع مؤقت تحديث قابل للتخصيص (يومي / يومين / أسبوعي / شهري / يدوي).', 'Persistent artwork/metadata cache with customizable refresh intervals (daily / 2 days / weekly / monthly / manual).')}</span>
                </li>
              </ul>
            </article>
          </div>
        )}

        {tab === 'connection' && (
          <div key="connection" className="ac-grid sc-animate">
            <article className="ac-card">
              <div className="ac-card-head">
                <span className="sc-gold-badge"><Link2 size={20} /></span>
                <div>
                  <code dir="ltr">TV Hub ← Connection · API_KEYS_SYNC · ADDONS_SYNC</code>
                  <h3>{t('الاقتران وإدارة المفاتيح والإضافات من الهاتف', 'Phone-to-TV Sync & Connection Hub')}</h3>
                </div>
              </div>
              <ol className="guide-steps">
                <li>
                  <code dir="ltr">01</code>
                  <span>{t(<>تأكد من اتصال الهاتف والشاشة بنفس شبكة {L('Wi-Fi')} المحلية، ثم افتح {L('TV Hub ← Connection')} على الهاتف.</>, 'Ensure Phone and TV are on the same local Wi-Fi, then open TV Hub → Connection on your phone.')}</span>
                </li>
                <li>
                  <code dir="ltr">02</code>
                  <span>{t(<>اقرن الهاتف بالشاشة عبر مسح رمز {L('QR')} أو إدخال كود الاقتران اليدوي.</>, 'Pair via QR scan or manual pairing code.')}</span>
                </li>
                <li>
                  <code dir="ltr">03</code>
                  <span>{t(<>أرسل مفاتيح {L('API')} ({L('API_KEYS_SYNC')}) وإضافات {L('Nuvio / Stremio')} ({L('ADDONS_SYNC')}) من الهاتف لتصل للشاشة تلقائياً دون كتابة على التلفاز.</>, 'Push API keys (API_KEYS_SYNC) and Nuvio/Stremio addons (ADDONS_SYNC) from phone to TV automatically.')}</span>
                </li>
                <li>
                  <code dir="ltr">04</code>
                  <span>{t(<>تعمل المزامنة الثنائية ({L('WATCH_SYNC')}) لحظياً لمواضع التوقف وقوائم المشاهدة بين الجهازين.</>, 'Two-way WATCH_SYNC keeps resume points and watchlists synchronized in real time.')}</span>
                </li>
                <li>
                  <code dir="ltr">05</code>
                  <span>{t(<><strong>النسخ الاحتياطي والاسترجاع الشامل (الهاتف + الشاشة):</strong> احفظ واستعد كل الإعدادات والمفاتيح والإضافات وسجل المشاهدة محلياً أو عبر حساب {L('Google Drive')} مع الإطلاق التلقائي للشاشة.</>, <><strong>Unified Backup & Restore (Phone + TV):</strong> Back up and restore all settings, keys, addons, and watch history locally or via {L('Google Drive')} with automatic TV push.</>)}</span>
                </li>
              </ol>
            </article>

            <article className="ac-card">
              <div className="ac-card-head">
                <span className="sc-gold-badge"><ShieldAlert size={20} /></span>
                <div>
                  <code dir="ltr">TCL (com.tcl.guard) · Sony · Xiaomi · Hisense · Google TV</code>
                  <h3>{t('حماية الخلفية ومنع السكون لجميع الشاشات', 'Background & Sleep Protection for All TVs')}</h3>
                </div>
              </div>
              <p className="ac-desc">
                {t(
                  'توقف بعض الشاشات خدمات الشبكة أثناء السكون. طبّق الإعداد الخاص بشاشتك لإبقاء الريموت والمزامنة متصلين:',
                  'Some TVs restrict background services during sleep. Apply the matching protection for your TV brand:'
                )}
              </p>
              <ol className="guide-steps">
                <li><code dir="ltr">01</code><span>{t(<><strong>شاشات {L('TCL')} ({L('com.tcl.guard')}):</strong> افتح حارس الأمان ← حماية الأذونات ← أذونات التشغيل التلقائي ← اختر {L('Local Cinema')}.</>, 'TCL TVs (com.tcl.guard): Open Safety Guard → Permission Guard → Auto-Launch Permissions → select Local Cinema.')}</span></li>
                <li><code dir="ltr">02</code><span>{t(<>أوقف <strong>«سياسة الإدارة التلقائية»</strong> وفعّل <strong>«البدء التلقائي»</strong> و<strong>«البدء الترابطي»</strong>.</>, 'Disable Auto Management Policy and enable both Auto-Start and Associated Start.')}</span></li>
                <li><code dir="ltr">03</code><span>{t(<><strong>بقية الشاشات ({L('Sony, Xiaomi, Hisense, Google TV')}):</strong> افتح إعدادات البطارية/الطاقة ← استثناء توفير الطاقة ({L('Battery Optimization')}) واختر <strong>«عدم التحسين»</strong>.</>, 'Other TVs (Sony, Xiaomi, Hisense, Google TV): Open Battery / Power settings → Battery Optimization → choose Don’t optimize.')}</span></li>
                <li><code dir="ltr">04</code><span>{t(<>فعّل السماح بالتشغيل في الخلفية والوصول للشبكة المحلية (أو أعد فحص الصلاحيات عبر معالج الصلاحيات في الإعدادات).</>, 'Allow background execution & local network access (or verify via the Permissions Setup Wizard in Settings).')}</span></li>
              </ol>
            </article>
          </div>
        )}

        {tab === 'apis' && (
          <div key="apis" className="ac-api-wrap sc-animate" style={{ marginTop: 0 }}>
            <div className="ac-zero-banner">
              <Sparkles size={20} />
              <span>
                {t(
                  'جميع الميزات الأساسية (البوسترات، التقييمات، الممثلون، والترجمة التلقائية) تعمل فوراً بلا حساب (Zero-Account Mode). هذه المواقع اختيارية فقط لمن يريد مزامنة Trakt أو مصادر إضافية:',
                  'All core features (posters, ratings, cast, and auto subtitles) work immediately in Zero-Account Mode. Use these optional sites only if you want Trakt sync or extra providers:'
                )}
              </span>
            </div>
            <div className="ac-api-grid">
              {apiProviders.map((p) => {
                const Icon = p.icon;
                return (
                  <article key={p.id} className="ac-api-card">
                    <div className="ac-card-head">
                      <span className="sc-gold-badge"><Icon size={20} /></span>
                      <div>
                        <span className="ac-tag">{p.tag}</span>
                        <h4>{p.name}</h4>
                      </div>
                    </div>
                    <p className="ac-desc">{p.desc}</p>
                    <ol className="guide-steps">
                      {p.steps.map((st, idx) => (
                        <li key={idx}>
                          <code dir="ltr">0{idx + 1}</code>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="ac-links">
                      {p.links.map((lnk) => (
                        <a key={lnk.url} href={lnk.url} target="_blank" rel="noopener noreferrer" className="button">
                          <span>{lnk.label}</span>
                          <ExternalLink size={14} />
                        </a>
                      ))}
                      {p.copyValue && (
                        <button type="button" className="button" onClick={() => copy(p.copyValue.value)}>
                          <Copy size={14} />
                          <span>{p.copyValue.label}</span>
                        </button>
                      )}
                      {p.copyValueAlt && (
                        <button type="button" className="button" onClick={() => copy(p.copyValueAlt.value)}>
                          <Copy size={14} />
                          <span>{p.copyValueAlt.label}</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
