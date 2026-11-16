import React, { useState } from 'react';
import {
  Sparkles, Link2, Puzzle, ShieldAlert, KeyRound, ExternalLink,
  Copy, CheckCircle2, Tv, Smartphone, Subtitles, Film, RefreshCw
} from 'lucide-react';

export function AddonsConnectionsSection({ t, L, copy }) {
  const [filter, setFilter] = useState('all');

  const features = [
    {
      id: 'zero-account',
      icon: Sparkles,
      badge: 'Zero-Account Mode',
      title: t('وضع التشغيل التلقائي بلا حساب', 'Zero-Account Instant Mode'),
      points: [
        t(<>البوسترات، الخلفيات، التقييمات المتعددة، وصفحات الممثلين وأعمالهم تعمل <strong>تلقائياً فور التثبيت</strong> بدون تسجيل.</>, <>Posters, backdrops, multi-source ratings, and cast filmographies work <strong>immediately out of the box</strong> with no login.</>),
        t(<>الترجمة العربية والإنجليزية التلقائية والكاش الدائم مع مؤقت التحديث التلقائي للبوسترات مفعّلة افتراضياً.</>, <>Automatic Arabic/English subtitles and persistent poster caching with auto-refresh timers are enabled by default.</>),
      ],
    },
    {
      id: 'tv-hub-sync',
      icon: Link2,
      badge: 'TV Hub ← Connection · WATCH_SYNC',
      title: t('مركز التوصيلات وإدارة المفاتيح من الهاتف', 'Phone Connection Hub & Key Sync'),
      points: [
        t(<>من الهاتف افتح {L('TV Hub ← Connection')} لإرسال مفاتيح {L('API')} وإضافات {L('Nuvio / Stremio')} إلى الشاشة بضغطة واحدة.</>, <>From the phone, open {L('TV Hub → Connection')} to push API keys and {L('Nuvio / Stremio')} addons straight to your TV.</>),
        t(<>مزامنة ثنائية لحظية عبر الشبكة المحلية ({L('WATCH_SYNC')}) لقوائم «متابعة المشاهدة»، «تمت المشاهدة»، والانتقال التلقائي للحلقة التالية ({L('Up Next')}) و{L('Watchlist')}.</>, <>Real-time two-way LAN sync ({L('WATCH_SYNC')}) for Continue Watching, Watched history, {L('Up Next')}, and your {L('Watchlist')}.</>),
      ],
    },
    {
      id: 'addons',
      icon: Puzzle,
      badge: 'Nuvio / Stremio Addons',
      title: t('الإضافات الخارجية والتثبيت بضغطة واحدة', 'External Addons & One-Tap Install'),
      points: [
        t(<>إضافات متوافقة مع {L('Nuvio / Stremio')} لتوسيع مصادر البث والترجمة؛ ثبّتها بضغطة واحدة من القائمة الجاهزة داخل التطبيق.</>, <>Compatible with {L('Nuvio / Stremio')} to expand stream and subtitle sources; install with one tap from the built-in catalog.</>),
        t(<>يمكنك أيضاً لصق أي رابط {L('manifest.json')} مخصص على الهاتف ليتم مزامنته وتشغيله تلقائياً على الشاشة.</>, <>You can also paste any custom {L('manifest.json')} URL on your phone and have it synced automatically to the TV.</>),
      ],
      manifestUrl: 'https://opensubtitles-v3.strem.io/manifest.json',
    },
    {
      id: 'tcl-guard',
      icon: ShieldAlert,
      badge: 'TCL · com.tcl.guard',
      title: t('حماية الخلفية لشاشات TCL ومنع انقطاع الاتصال', 'TCL Background Guard Protection'),
      points: [
        t(<>على شاشات {L('TCL')}، افتح إعدادات الحماية ({L('com.tcl.guard')} / إدارة التطبيقات) لتطبيق {L('Local Cinema TV')}.</>, <>On {L('TCL')} TVs, open System Manager / Guard ({L('com.tcl.guard')}) for {L('Local Cinema TV')}.</>),
        t(<>أوقف <strong>«سياسة الإدارة التلقائية»</strong> وفعّل <strong>«البدء التلقائي»</strong> و<strong>«البدء الترابطي»</strong> لمنع انقطاع المزامنة والريموت أثناء السكون.</>, <>Disable <strong>Auto Management Policy</strong> and enable <strong>Auto-Start</strong> and <strong>Associated Start</strong> so sync never drops in standby.</>),
      ],
    },
  ];

  const providers = [
    {
      id: 'trakt',
      icon: RefreshCw,
      name: 'Trakt',
      tag: t('اختياري · مزامنة السجل', 'Optional · History Sync'),
      desc: t('لمزامنة سجل «تمت المشاهدة»، «قائمة المشاهدة» ومواضع التوقف ثنائية الاتجاه بين الأجهزة.', 'Two-way sync for Watched history, Watchlist, and playback resume positions across devices.'),
      steps: t('افتح التطبيقات ← أنشئ تطبيق API ← انسخ Client ID والصقه في مركز التوصيلات (أو استخدم الربط السريع المدمج).', 'Open New App → Create an API app → copy Client ID into Connection Hub (or use the built-in quick link).'),
      links: [
        { label: t('إنشاء تطبيق Trakt', 'Create Trakt App'), url: 'https://trakt.tv/oauth/applications/new' },
      ],
    },
    {
      id: 'subsource',
      icon: Subtitles,
      name: 'Subsource',
      tag: t('اختياري · ترجمات عربية', 'Optional · Arabic Subtitles'),
      desc: t('لجلب ترجمات عربية وإنجليزية إضافية للأفلام والمسلسلات والأنمي.', 'Fetch additional Arabic and English subtitles for movies, series, and anime.'),
      steps: t('سجّل الدخول في subsource.net ← أنشئ مفتاح API من لوحة الحساب ← أرسله للشاشة من الهاتف.', 'Sign in at subsource.net → generate an API key from your profile → send it to TV from your phone.'),
      links: [
        { label: t('فتح Subsource', 'Open Subsource'), url: 'https://subsource.net' },
      ],
    },
    {
      id: 'opensubtitles',
      icon: Subtitles,
      name: 'OpenSubtitles',
      tag: t('اختياري · تنبيه DNS', 'Optional · DNS Notice'),
      desc: t('مصدر ترجمات اختياري واسع الانتشار. في حال تعذّر فتح الموقع في شبكتك فعّل DNS خاص (مثل 1.1.1.1 أو 8.8.8.8).', 'Optional global subtitle source. If blocked by your ISP, enable Private DNS (e.g. 1.1.1.1 or 8.8.8.8).'),
      steps: t('أنشئ حساباً ← افتح API Consumers ← أنشئ Consumer وانسخ المفتاح مع بيانات الحساب.', 'Create an account → open API Consumers → create a Consumer and copy the API key.'),
      links: [
        { label: 'API Consumers (.com)', url: 'https://www.opensubtitles.com/en/consumers' },
        { label: 'OpenSubtitles (.org)', url: 'https://www.opensubtitles.org' },
      ],
    },
    {
      id: 'tmdb',
      icon: Film,
      name: 'TMDb',
      tag: t('اختياري · بوسترات وممثلين', 'Optional · Posters & Cast'),
      desc: t('لتوسيع بيانات الممثلين والبوسترات لمن يملك مفتاحاً خاصاً (المنظومة تعمل بدونه تلقائياً).', 'Expand actor profiles and artwork with your own personal key (not required for default Zero-Account mode).'),
      steps: t('افتح Settings ← API ← اطلب مفتاح مطوّر مجاني وانسخ API Key (v3).', 'Open Settings → API → request a developer key and copy API Key (v3).'),
      links: [
        { label: t('صفحة API في TMDb', 'TMDb API Settings'), url: 'https://www.themoviedb.org/settings/api' },
      ],
    },
  ];

  const showFeatures = filter === 'all' || filter === 'features';
  const showApis = filter === 'all' || filter === 'apis';

  return (
    <section id="addons" className="band" aria-label={t('الإضافات، الربط ومفاتيح API', 'Plugins, Addons & Connections')}>
      <div className="wrap section">
        <div className="section-head">
          <div>
            <span className="sc-kicker"><CheckCircle2 size={15} /> {t('الجديد في v1.0.0-beta.6 · تكامل الهاتف والشاشة', 'New in v1.0.0-beta.6 · Phone & TV Integration')}</span>
            <h2>{t('الإضافات، الربط ومفاتيح API', 'Plugins, Addons & Connections')}</h2>
            <p>{t('كل ما تحتاجه لتشغيل الإضافات الخارجية، مزامنة المشاهدة عبر الشبكة المحلية، وحماية الاتصال على شاشات TCL.', 'Everything you need for external addons, local network watch sync, TCL background protection, and optional API keys.')}</p>
          </div>
          <span className="sc-lan-pill"><Tv size={14} /> <Smartphone size={14} /> {t('تشغيل فوري بلا حساب', 'Zero-Account Ready')}</span>
        </div>

        <div className="sc-scenarios" role="tablist" aria-label={t('تصفية دليل الإضافات والربط', 'Filter addons and API guide')} style={{ marginBottom: 22 }}>
          {[
            ['all', Sparkles, t('عرض الدليل الكامل', 'Show All')],
            ['features', Puzzle, t('الإضافات والربط وحماية TCL', 'Addons, Sync & TCL Guard')],
            ['apis', KeyRound, t('مواقع مفاتيح API الاختيارية', 'Optional API Key Sites')],
          ].map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={'sc-pill' + (filter === key ? ' active' : '')}
              onClick={() => setFilter(key)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {showFeatures && (
          <div key={'feat-' + filter} className="ac-grid sc-animate">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.id} className="ac-card">
                  <div className="ac-card-head">
                    <span className="sc-gold-badge"><Icon size={20} /></span>
                    <div>
                      <code dir="ltr">{item.badge}</code>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <ul className="ac-list">
                    {item.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  {item.manifestUrl && (
                    <div className="ac-copy-row">
                      <code dir="ltr">{item.manifestUrl}</code>
                      <button type="button" className="button" onClick={() => copy(item.manifestUrl)}>
                        <Copy size={14} />
                        <span>{t('نسخ Manifest', 'Copy Manifest')}</span>
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {showApis && (
          <div key={'api-' + filter} className="ac-api-wrap sc-animate">
            <div className="ac-subhead">
              <h3><KeyRound size={20} /> {t('دليل المواقع التي تُصنع منها مفاتيح API الاختيارية', 'Optional API Key Providers Directory')}</h3>
              <p>{t('لا تحتاج أي مفتاح لبدء المشاهدة؛ استخدم هذه المواقع فقط إذا أردت مزامنة Trakt أو مصادر ترجمة وبيانات إضافية.', 'No key is required to start watching; use these sites only if you want Trakt sync or extra subtitle and metadata providers.')}</p>
            </div>
            <div className="ac-api-grid">
              {providers.map((p) => {
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
                    <p className="ac-steps">{p.steps}</p>
                    <div className="ac-links">
                      {p.links.map((lnk) => (
                        <a key={lnk.url} href={lnk.url} target="_blank" rel="noopener noreferrer" className="button">
                          <span>{lnk.label}</span>
                          <ExternalLink size={14} />
                        </a>
                      ))}
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
