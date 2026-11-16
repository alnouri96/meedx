import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, Download, Monitor, Smartphone, MessageSquare, Heart, ShieldCheck,
  Gamepad2, Terminal, ArrowUp, ArrowUpRight, Film, KeyRound, CheckCircle2,
  AlertTriangle, Puzzle, Wrench, Sparkles, AppWindow
} from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import '@fontsource/jetbrains-mono/400.css';
import { siteConfig } from './config/siteConfig';
import screenshotGroups from './data/screenshots.json';
import { screenshotCopy } from './data/screenshot-copy';
import { Panels } from './panels';
import { GoldParticles } from './GoldParticles';
import { AppsShowcasePage } from './AppsShowcasePage';
import { AppDetailPage } from './AppDetailPage';
import { AddonsConnectionsSection } from './AddonsConnectionsSection';
import { DownloadAppCard } from './DownloadAppCard';
import './style.css';
import './gallery.css';
import './showcase.css';

const VALID_ROUTES = new Set([
  '/',
  '/apps',
  '/apps/local-cinema',
  '/software',
  '/services',
  '/downloads',
  '/addons',
]);

function normalizeRoute(pathname, hash) {
  if (hash === '#apps') return '/apps';
  if (hash === '#lab' || hash === '#software') return '/software';
  if (hash === '#services') return '/services';
  if (hash === '#downloads') return '/downloads';
  if (hash === '#addons') return '/addons';
  const clean = pathname.replace(/\/+$/, '') || '/';
  return VALID_ROUTES.has(clean) ? clean : '/';
}

function App() {
  const [ar, setAr] = useState(true);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState('');
  const [route, setRoute] = useState(() => normalizeRoute(window.location.pathname, window.location.hash));
  const [showTop, setShowTop] = useState(false);

  const t = (a, e) => (ar ? a : e);
  const L = (s) => <bdi dir="ltr">{s}</bdi>;
  const catalog = siteConfig.downloads;
  const releaseVersion = catalog[0]?.version ?? '1.0.0-beta.7';
  const shots = screenshotGroups.map((group) => {
    const [titleAr, titleEn, descriptionAr, descriptionEn] = screenshotCopy[group.id] ?? [
      <>لقطة {L('Local Cinema')}</>,
      'Local Cinema screenshot',
      <>لقطة من منظومة {L('Local Cinema')}.</>,
      'A capture from the Local Cinema system.',
    ];
    return { ...group, name: t(titleAr, titleEn), text: t(descriptionAr, descriptionEn) };
  });

  const hero = shots.find((shot) => shot.id === '15-19-11') ?? shots[0];
  const heroTv = hero.images.find((photo) => photo.device === 'tv');
  const heroPhone = hero.images.find((photo) => photo.device === 'phone');
  const label = (device) => (device === 'tv' ? t('التلفاز', 'TV') : device === 'pc' ? t('الحاسوب', 'Windows PC') : t('الهاتف', 'Phone'));

  useEffect(() => {
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.title = t('MEEDX — استوديو تطوير التطبيقات والألعاب والحلول التقنية', 'MEEDX — Apps, games & tech solutions studio');
  }, [ar]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (window.location.hash === '#support') setModal({ id: 'support' });
    const onPop = () => setRoute(normalizeRoute(window.location.pathname, window.location.hash));
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener('popstate', onPop);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function navigate(path) {
    const target = normalizeRoute(path, '');
    if (target !== route) {
      window.history.pushState({}, '', target);
      setRoute(target);
    }
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(t('تم النسخ', 'Copied'));
    } catch {
      setToast(t('تعذر النسخ. حدّد النص وانسخه يدوياً.', 'Select and copy the text manually.'));
    }
  }

  const navLinks = [
    ['/', t('الرئيسية', 'Home')],
    ['/apps', t('التطبيقات', 'Apps')],
    ['/software', t('البرامج والألعاب', 'Software & Gaming')],
    ['/services', t('الخدمات', 'Services')],
    ['/downloads', t('التحميلات', 'Downloads')],
    ['/addons', t('الإضافات والتوصيلات', 'Plugins & Connections')],
  ];

  const homeCards = [
    {
      path: '/apps/local-cinema',
      icon: AppWindow,
      badge: `v${releaseVersion}`,
      title: t('تطبيق Local Cinema', 'Local Cinema App'),
      desc: t('صفحة التطبيق الكاملة: معاينة اللقطات، المواصفات، وسجل التحديثات.', 'Dedicated app page with screenshots, specs, and full patch notes.'),
    },
    {
      path: '/apps',
      icon: Sparkles,
      badge: t('معرض التطبيقات', 'Showcase'),
      title: t('التطبيقات', 'Apps'),
      desc: t('استعرض بطاقات التطبيقات والمنصات المدعومة والمزايا.', 'Browse app cards, supported platforms, and features.'),
    },
    {
      path: '/software',
      icon: Gamepad2,
      badge: t('قريباً', 'Upcoming'),
      title: t('البرامج والألعاب', 'Software & Gaming'),
      desc: t('أدوات الحاسوب وسكربتات Windows وملفات تخصيص الألعاب.', 'PC software, Windows scripts, and gaming tweaks.'),
    },
    {
      path: '/services',
      icon: Wrench,
      badge: t('دعم مباشر', 'Direct'),
      title: t('الخدمات التقنية', 'Services'),
      desc: t('صيانة الهواتف، تجميع الحواسيب، وتطوير حلول مخصصة.', 'Phone repair, PC builds, and custom software.'),
    },
    {
      path: '/downloads',
      icon: Download,
      badge: 'APK · SHA-256',
      title: t('مركز التحميل', 'Downloads'),
      desc: t('تنزيل مباشر لحزم الشاشة والهاتف مع بصمات التحقق.', 'Direct TV & Phone APK downloads with checksum verification.'),
    },
    {
      path: '/addons',
      icon: Puzzle,
      badge: 'Nuvio · Trakt · TCL',
      title: t('الإضافات والتوصيلات', 'Plugins & Connections'),
      desc: t('دليل الإضافات الخارجية، النسخ السحابي، ومفاتيح API.', 'External addons, Google backup, TV guard, and API guides.'),
    },
  ];

  const contact = (topic = 'Local Cinema', kind = 'feature') => setModal({ id: 'telegram', topic, kind });
  const support = () => setModal({ id: 'support' });
  const image = (file, alt, props) => <img src={'/assets/screenshots/' + file} alt={alt} {...props} />;

  return (
    <>
      <a href="#main" className="skip">{t('انتقل للمحتوى', 'Skip to content')}</a>
      <header>
        <div className="wrap top">
          <a href="/" className="wordmark" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="/assets/meedx.svg" alt="" />MEEDX
          </a>
          <nav className="desktop" aria-label={t('التنقل الرئيسي', 'Main navigation')}>
            {navLinks.map(([path, s]) => (
              <a
                href={path}
                key={path}
                className={route === path || (path === '/apps' && route.startsWith('/apps/')) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); navigate(path); }}
              >
                {s}
              </a>
            ))}
          </nav>
          <div className="actions">
            <button className="lang" onClick={() => setAr(!ar)} aria-label={t('Switch to English', 'التبديل إلى العربية')}>{ar ? 'EN' : 'AR'}</button>
            <button className="desktop" onClick={() => contact()}><MessageSquare size={17} />{t('تواصل', 'Contact')}</button>
            <button className="desktop top-support" onClick={support}><Heart size={17} />{t(<>ادعم {L('MEEDX')}</>, 'Support MEEDX')}</button>
            <button className="mobile" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={t('القائمة', 'Menu')}>{menu ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-menu" className="mobile drawer" aria-label={t('قائمة الهاتف', 'Mobile menu')}>
            {navLinks.map(([path, s]) => (
              <a href={path} key={path} onClick={(e) => { e.preventDefault(); navigate(path); }}>
                {s}<ArrowUpRight size={18} />
              </a>
            ))}
            <button onClick={() => { setMenu(false); contact(); }}>{t('اقتراح أو طلب عمل', 'Feedback or work request')}<MessageSquare size={18} /></button>
            <button onClick={() => { setMenu(false); support(); }}>{t('زين كاش / كي كارد', 'ZainCash / QiCard')}<Heart size={18} /></button>
          </nav>
        )}
      </header>

      <main id="main">
        {route === '/' && (
          <>
            <section className="wrap hero hero-with-particles">
              <GoldParticles />
              <div className="hero-copy">
                <span className="badge-ok" style={{ marginBottom: 14 }}>
                  <CheckCircle2 size={14} /> {t('متاح للتنزيل المباشر · v' + releaseVersion, 'Ready for Download · v' + releaseVersion)}
                </span>
                <h1>{t('شاشتك ومكتبتك،', 'Your TV and library,')}<br />{t('بيدك.', 'in your hands.')}</h1>
                <p>
                  {t(
                    <>منظومة {L('Local Cinema')} المتكاملة تجمع مكتبة أفلامك ومسلسلاتك المحلية وعبر الويب على شاشة {L('Android TV')} بواجهة سينمائية ذكية مع قسم إعلانات {L('16:9')}، بوسترات وترجمة عربية تلقائية، وتحوّل هاتفك إلى ريموت ومركز تحكم وبث {L('4K')}. من استوديو {L('MEEDX')}.</>,
                    'The complete Local Cinema suite brings your local and web movies and series to Android TV with a smart cinematic interface, 16:9 Home Trailers, automatic posters and Arabic subtitles—while turning your phone into a full remote and 4K streaming hub. Built by MEEDX Studio.'
                  )}
                </p>
                <div className="hero-buttons">
                  <a href="/downloads" className="button primary" onClick={(e) => { e.preventDefault(); navigate('/downloads'); }}>
                    {t('حمّل النسخة التجريبية', 'Get the beta')}<Download size={18} />
                  </a>
                  <a href="/apps/local-cinema" className="button" onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}>
                    {t(<>صفحة {L('Local Cinema')}</>, 'Local Cinema Page')}<ArrowUpRight size={18} />
                  </a>
                </div>
                <div className="hero-meta">
                  <span className="signal" />
                  <code dir="ltr">v{releaseVersion}</code>
                  <span className="badge-ok">{t('مكتمل ومفحوص ✓', 'Verified ✓')}</span>
                </div>
              </div>
              <div className="hardware">
                <div className="tv-frame">{image(heroTv.file, hero.name, { fetchPriority: 'high', width: 1920, height: 1080 })}<div className="bezel"><span>LOCAL CINEMA</span><i /></div><div className="stand" /></div>
                <div className="phone-frame">{image(heroPhone.file, hero.name, { width: 1080, height: 2340 })}</div>
                <div className="frame-meta"><span><Monitor size={16} /> Android TV</span><span><Smartphone size={16} /> Android</span></div>
              </div>
            </section>

            <section className="band">
              <div className="wrap section">
                <div className="section-head">
                  <div>
                    <h2>{t('أقسام المنظومة والاستوديو', 'Explore MEEDX Sections')}</h2>
                    <p>{t('اختر أي قسم للانتقال المباشر إلى صفحته المخصصة.', 'Select any section to open its dedicated view.')}</p>
                  </div>
                </div>
                <div className="hub-grid">
                  {homeCards.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.path}
                        href={c.path}
                        className="hub-card"
                        onClick={(e) => { e.preventDefault(); navigate(c.path); }}
                      >
                        <div className="hub-card-top">
                          <span className="sc-gold-badge"><Icon size={20} /></span>
                          <span className="gh-ver-badge" dir="ltr">{c.badge}</span>
                        </div>
                        <h3>{c.title}</h3>
                        <p>{c.desc}</p>
                        <span className="hub-link">{t('فتح القسم', 'Open section')} <ArrowUpRight size={15} /></span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {route === '/apps' && (
          <AppsShowcasePage t={t} L={L} navigate={navigate} version={releaseVersion} />
        )}

        {route === '/apps/local-cinema' && (
          <AppDetailPage
            ar={ar}
            t={t}
            L={L}
            copy={copy}
            navigate={navigate}
            catalog={catalog}
            shots={shots}
            slide={slide}
            setSlide={setSlide}
            setModal={setModal}
            contact={contact}
            label={label}
            image={image}
          />
        )}

        {route === '/software' && (
          <section id="lab" className="wrap section sc-animate">
            <div className="section-head">
              <div>
                <span className="sc-kicker"><Terminal size={15} /> {t('أدوات الحاسوب والألعاب', 'PC Tools & Gaming')}</span>
                <h1>{t('البرامج والألعاب', 'Software & Gaming')}</h1>
                <p>{t('مساحة مخصصة لأدوات الحاسوب وملفات تخصيص الألعاب القادمة.', 'A dedicated space for upcoming PC software, scripts, and gaming tweaks.')}</p>
              </div>
            </div>
            <div className="lab">
              {[
                [Gamepad2, 'Gaming & Tweaks', t('إعدادات التحكم وملفات تخصيص الألعاب.', 'Control layouts and game configurations.')],
                [Terminal, 'PC Software & Scripts', t(<>أدوات {L('Windows')} و{L('PowerShell')} و{L('ADB')}.</>, 'Windows, PowerShell and ADB utilities.')],
              ].map(([Icon, name, desc]) => (
                <article key={name}>
                  <Icon size={33} />
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <span>{t('لا توجد ملفات منشورة في هذه المرحلة — قريباً', 'No files published yet — coming soon')}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {route === '/services' && (
          <section id="services" className="band sc-animate">
            <div className="wrap section services">
              <div>
                <span className="sc-kicker"><Wrench size={15} /> {t('الدعم والحلول المخصصة', 'Technical Support')}</span>
                <h1>{t('الخدمات التقنية', 'Technical services')}</h1>
                <p>{t('صيانة الأجهزة، تجميع الحواسيب، وتطوير أدوات وسكربتات مخصصة.', 'Device maintenance, PC assembly, and custom software development.')}</p>
              </div>
              <div>
                {[t('صيانة الهواتف', 'Phone repair'), t('تجميع وصيانة الحاسوب', 'PC assembly & maintenance'), t('تطبيقات وسكربتات مخصصة', 'Custom apps & scripts')].map((name) => (
                  <article key={name}>
                    <h3>{name}</h3>
                    <button className="link" onClick={() => contact(name, 'service')}>
                      {t('اطلب عبر تلجرام', 'Request via Telegram')}<ArrowUpRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {route === '/downloads' && (
          <section id="downloads" className="wrap section sc-animate">
            <div className="section-head">
              <div>
                <h1>{t('مركز التحميل', 'Downloads hub')}</h1>
                <p>{t(<>ملفات النسخة التجريبية عبر {L('GitHub Releases')} وبصمات التحقق {L('SHA-256')}.</>, 'Beta release files from GitHub Releases and SHA-256 verification hashes.')}</p>
              </div>
              <div className="head-tools">
                <span className="badge-ok"><CheckCircle2 size={14} /> {t('آمن 100% — بلا أسرار مضمّنة', '100% Safe — Zero Secrets')}</span>
                <a className="link" href={siteConfig.githubReleases} target="_blank" rel="noopener noreferrer">
                  GitHub Releases <ArrowUpRight size={16} />
                </a>
                <ShieldCheck size={31} />
              </div>
            </div>

            <div className="semantic-alerts" style={{ marginBottom: 20 }}>
              <span className="badge-warn">
                <AlertTriangle size={15} />
                {t('تنبيه مهم قبل التثبيت: فعّل «تثبيت التطبيقات من مصادر غير معروفة» على الهاتف وشاشة Android TV.', 'Important Notice: Enable "Install from Unknown Sources" on your phone and Android TV before installing.')}
              </span>
            </div>

            <div className="downloads">
              {catalog.filter((p) => p.available).map((p) => (
                <DownloadAppCard
                  key={p.id}
                  p={p}
                  ar={ar}
                  t={t}
                  L={L}
                  copy={copy}
                  onDownload={() => setModal({ id: 'download', file: p })}
                  onContact={() => contact(p.name)}
                />
              ))}
            </div>

            <div id="setup-guide" className="setup-guide">
              <div className="guide-head">
                <div>
                  <h3>{t('التشغيل التلقائي وإدارة المفاتيح والإضافات', 'Zero-Account Mode & Phone Hub Management')}</h3>
                  <p>{t(<>يعمل التطبيق تلقائياً بلا أي مفاتيح أو حسابات، ويمكنك إدارة المفاتيح الاختيارية والإضافات بسهولة من تطبيق الهاتف عبر {L('TV Hub ← Connection')}.</>, 'The app works automatically with no keys or accounts required; optional API keys and addons are managed easily from the phone app via TV Hub → Connection.')}</p>
                </div>
                <a href="/addons" className="button primary" onClick={(e) => { e.preventDefault(); navigate('/addons'); }}>
                  {t('الانتقال إلى دليل الإضافات والتوصيلات', 'Open Plugins & Connections Guide')}<ArrowUpRight size={16} />
                </a>
              </div>
              <div className="guide-grid">
                <article className="guide-card">
                  <div className="guide-title"><Film size={24} /><div><h4>{t('وضع التشغيل التلقائي بلا حساب', 'Zero-Account Instant Mode')}</h4><code dir="ltr">Zero-Config · Cinemeta / TVmaze / Jikan / Subsource</code></div><span className="signal" aria-label={t('مفعّل تلقائياً', 'Enabled automatically')} /></div>
                  <p>{t(<>تعمل البوسترات، التقييمات من مصادر متعددة، صفحات الممثلين وأعمالهم، إعلانات {L('16:9')}، والترجمة التلقائية فور التثبيت بدون أي تسجيل أو مفاتيح {L('API')}.</>, 'Posters, multi-source ratings, cast filmographies, 16:9 Home Trailers, and automatic subtitles work right after install without any login or API keys.')}</p>
                </article>
                <article className="guide-card">
                  <div className="guide-title"><KeyRound size={24} /><div><h4>{t(<>إدارة المفاتيح والإضافات من الهاتف ({L('TV Hub ← Connection')})</>, 'Manage Keys & Addons from Phone (TV Hub → Connection)')}</h4><code dir="ltr">API_KEYS_SYNC · ADDONS_SYNC · WATCH_SYNC</code></div></div>
                  <p>{t(<>عند إضافة مفاتيح اختيارية ({L('Trakt / Subsource / OpenSubtitles / TMDb')}) أو إضافات {L('Nuvio / Stremio')} على هاتفك، تُزامن تلقائياً مع الشاشة عبر الشبكة المحلية.</>, 'Optional API keys (Trakt / Subsource / OpenSubtitles / TMDb) and Nuvio / Stremio addons added on your phone sync automatically to TV over your local network.')}</p>
                  <div className="guide-links">
                    <a href="/addons" className="link" onClick={(e) => { e.preventDefault(); navigate('/addons'); }}>
                      {t('استعرض دليل الإضافات ومفاتيح API التفصيلي', 'View full Plugins, TV Guard & API Guides')} <ArrowUpRight size={15} />
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {route === '/addons' && (
          <AddonsConnectionsSection t={t} L={L} copy={copy} />
        )}
      </main>

      <footer>
        <div className="wrap foot">
          <div>
            <a href="/" className="wordmark" onClick={(e) => { e.preventDefault(); navigate('/'); }}><img src="/assets/meedx.svg" alt="" />MEEDX</a>
            <p>{t(<>{L('MEEDX')} · تطوير التطبيقات والألعاب والحلول التقنية</>, 'MEEDX · Apps, games & tech solutions')}</p>
          </div>
          <div>
            <h3>{t(<>ادعم تطوير {L('MEEDX')}</>, 'Support MEEDX development')}</h3>
            <button className="link" onClick={support}>ZainCash / QiCard <Heart size={17} /></button>
          </div>
          <button className="button" onClick={() => contact()}>{t('اقتراح أو طلب عمل', 'Feedback or work request')}<MessageSquare size={17} /></button>
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label={t('العودة إلى الأعلى', 'Back to top')}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={20} />
        </button>
      )}

      <div className="floating">
        <button className="primary" onClick={support}><Heart size={17} />{t(<>ادعم {L('MEEDX')} • زين كاش / {L('Qi')}</>, 'Support MEEDX • ZainCash / Qi')}</button>
        <button aria-label={t('نموذج تلجرام', 'Telegram form')} onClick={() => contact()}><MessageSquare size={20} /></button>
      </div>

      {modal && <Panels key={modal.id} modal={modal} setModal={setModal} close={() => setModal(null)} shots={shots} t={t} copy={copy} />}
      <div className="toast" role="status">{toast}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
