import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, Download, MessageSquare, Heart,
  Gamepad2, Terminal, ArrowUp, ArrowUpRight, AlertTriangle, Wrench
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
import { AppsShowcasePage, LocalCinemaAppCard, LocalCinemaPoster } from './AppsShowcasePage';
import { AppDetailPage } from './AppDetailPage';
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
]);

const LEGACY_HOME_LINKS = new Map([
  ['#apps', '/apps'],
  ['#lab', '/software'],
  ['#software', '/software'],
  ['#services', '/services'],
  ['#downloads', '/downloads'],
]);

function resolveLocation({ pathname, hash, search }) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/addons' || (path === '/' && hash === '#addons')) {
    return { route: '/apps/local-cinema', hash: '#addons', search };
  }
  const legacyRoute = path === '/' ? LEGACY_HOME_LINKS.get(hash) : undefined;
  return legacyRoute ? { route: legacyRoute, hash: '', search } : { route: path, hash, search };
}

function App() {
  const [ar, setAr] = useState(true);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(null);
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState('');
  const [{ route, hash }, setLocation] = useState(() => resolveLocation(window.location));
  const [showTop, setShowTop] = useState(false);

  const t = (a, e) => (ar ? a : e);
  const L = (s) => <bdi dir="ltr">{s}</bdi>;
  const catalog = siteConfig.downloads;
  const releaseVersion = catalog.find((build) => build.id === 'tv')?.version;
  const shots = screenshotGroups.map((group) => {
    const [titleAr, titleEn, descriptionAr, descriptionEn] = screenshotCopy[group.id] ?? [
      <>لقطة {L('Local Cinema')}</>,
      'Local Cinema screenshot',
      <>لقطة من منظومة {L('Local Cinema')}.</>,
      'A capture from the Local Cinema system.',
    ];
    return { ...group, name: t(titleAr, titleEn), text: t(descriptionAr, descriptionEn) };
  });

  const label = (device) => (device === 'tv' ? t('التلفاز', 'TV') : device === 'pc' ? t('الحاسوب', 'Windows PC') : t('الهاتف', 'Phone'));

  useEffect(() => {
    document.documentElement.lang = ar ? 'ar' : 'en';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.title = t('MEEDX: تطوير التطبيقات والألعاب والحلول التقنية', 'MEEDX: Apps, games, and tech solutions');
  }, [ar]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const downloadDevice = { '/tv': 'tv', '/phone': 'phone' }[window.location.pathname.replace(/\/+$/, '')];
    if (downloadDevice) {
      const build = catalog.find((entry) => entry.id === downloadDevice);
      if (build) window.location.replace(build.url);
      return;
    }

    function syncLocation() {
      const next = resolveLocation(window.location);
      const { pathname, search, hash } = window.location;
      const canonicalUrl = next.route + next.search + next.hash;
      if (canonicalUrl !== pathname + search + hash) window.history.replaceState({}, '', canonicalUrl);
      setLocation(next);
    }

    syncLocation();
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('scroll', onScroll);
    };
  }, [catalog]);

  useEffect(() => {
    if (hash === '#support') {
      setModal({ id: 'support' });
      return;
    }
    const anchor = hash && document.getElementById(hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      if (anchor) anchor.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route, hash]);

  function navigate(rawPath) {
    const next = resolveLocation(new URL(rawPath, window.location.origin));
    window.history.pushState({}, '', next.route + next.search + next.hash);
    setLocation(next);
    setMenu(false);
    if (next.route === route && !next.hash && !hash) window.scrollTo({ top: 0, behavior: 'smooth' });
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
  ];

  const softwareItems = [
    {
      id: 'pc-tools',
      path: '/software#pc-tools',
      icon: Terminal,
      title: t('برامج الحاسوب وأدواته', 'PC software and tools'),
      description: t(<>أدوات {L('Windows')} و{L('PowerShell')} و{L('ADB')} لإدارة الحواسيب والأجهزة.</>, 'Windows, PowerShell, and ADB tools for managing computers and devices.'),
    },
    {
      id: 'gaming',
      path: '/software#gaming',
      icon: Gamepad2,
      title: t('أدوات الألعاب', 'Gaming tools'),
      description: t('إعدادات التحكم وملفات تخصيص الألعاب.', 'Control layouts and game configuration files.'),
    },
  ];
  const upcoming = [t('سمارت', 'Smart'), t('فايبر / البيبر', 'Viper / Paper')];
  const openChangelog = (build) => {
    const ordered = build ? [build, ...catalog.filter((entry) => entry.id !== build.id)] : catalog;
    setModal({ id: 'changelog', builds: ordered });
  };

  const contact = (topic = 'Local Cinema', kind = 'feature') => setModal({ id: 'telegram', topic, kind });
  const support = () => setModal({ id: 'support' });
  const image = (file, alt, props) => <img src={file} alt={alt} {...props} />;

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
            <button onClick={() => { setMenu(false); support(); }}>{t('دعم MEEDX', 'Support MEEDX')}<Heart size={18} /></button>
          </nav>
        )}
      </header>

      <main id="main">
        {route === '/' && (
          <>
            <section className="wrap hero cinema-hero" aria-labelledby="cinema-home-title">
              <div className="hero-copy">
                <span className="cinema-source-badge">{t('مفتوح المصدر ومجاني بالكامل', 'Open source & 100% free')}</span>
                <h1 id="cinema-home-title"><bdi>Local Cinema</bdi></h1>
                <p>{t(
                  'شغّل مكتبتك على تلفاز أندرويد. استخدم هاتفك للتحكم بالتشغيل وبث الوسائط عبر شبكتك المحلية.',
                  'Play your library on Android TV. Use your phone to control playback and cast media over your local network.'
                )}</p>
                <div className="hero-buttons">
                  <a href="/downloads" className="button primary" onClick={(e) => { e.preventDefault(); navigate('/downloads'); }}>
                    <Download size={18} />{t('تنزيل التطبيقين', 'Download Apps')}
                  </a>
                  <a href="/apps/local-cinema" className="button" onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}>
                    {t('عرض التطبيق', 'View Local Cinema')}<ArrowUpRight size={18} />
                  </a>
                </div>
                <div className="cinema-quick-downloads">
                  <a href="/tv">{t('تنزيل التلفاز مباشرةً', 'Direct TV download')}</a>
                  <a href="/phone">{t('تنزيل الهاتف مباشرةً', 'Direct phone download')}</a>
                  <a href={siteConfig.releases}><bdi>v{releaseVersion}</bdi></a>
                </div>
              </div>
              <LocalCinemaPoster t={t} navigate={navigate} eager />
            </section>

            <section className="wrap home-section" aria-labelledby="home-apps">
              <h2 id="home-apps">{t('التطبيقات', 'Apps')}</h2>
              <LocalCinemaAppCard t={t} navigate={navigate} version={releaseVersion} />
            </section>

            <section className="wrap home-section" aria-labelledby="home-programs">
              <h2 id="home-programs">{t('البرامج والأدوات', 'Programs & Software')}</h2>
              <div className="home-card-grid">
                {softwareItems.map(({ id, path, icon: Icon, title, description }) => (
                  <a key={id} href={path} className="hub-card" onClick={(event) => { event.preventDefault(); navigate(path); }}>
                    <div className="hub-card-top"><Icon size={23} /><ArrowUpRight size={18} /></div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className="wrap home-section home-upcoming" aria-labelledby="home-upcoming">
              <h2 id="home-upcoming">{t('قادم قريباً', 'Coming Soon')}</h2>
              <div className="home-card-grid">
                {upcoming.map((title) => (
                  <article className="hub-card upcoming-card" key={title}>
                    <h3><bdi>{title}</bdi></h3>
                    <span className="gh-ver-badge">{t('قريباً', 'Coming Soon')}</span>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {route === '/apps' && (
          <AppsShowcasePage t={t} navigate={navigate} version={releaseVersion} />
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
            openChangelog={openChangelog}
            contact={contact}
            label={label}
            image={image}
          />
        )}

        {route === '/software' && (
          <section id="lab" className="wrap section sc-animate">
            <div className="section-head">
              <div>
                <h1>{t('البرامج والألعاب', 'Software & Gaming')}</h1>
                <p>{t('أدوات الحاسوب وملفات ضبط الألعاب قيد الإعداد.', 'Upcoming PC utilities, scripts, and game configuration files.')}</p>
              </div>
            </div>
            <div className="lab">
              {softwareItems.map(({ id, icon: Icon, title, description }) => (
                <article key={id} id={id}>
                  <Icon size={33} />
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <span>{t('الملفات قيد الإعداد.', 'Files are in preparation.')}</span>
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
                <h1>{t('مركز التحميل', 'Download Center')}</h1>
                <p>{t(<>ملفات النسخة التجريبية عبر {L('GitHub Releases')} وبصمات التحقق {L('SHA-256')}.</>, 'Download apps and verify their SHA-256 checksums.')}</p>
              </div>
              <div className="head-tools">
                <a className="link" href={siteConfig.releases} target="_blank" rel="noopener noreferrer">
                  {t('إصدارات GitHub', 'GitHub Releases')} <ArrowUpRight size={16} />
                </a>
                <a className="link" href={siteConfig.source}>
                  {t('الكود المصدري', 'Source code')}<ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="semantic-alerts" style={{ marginBottom: 20 }}>
              <span className="badge-warn">
                <AlertTriangle size={15} />
                {t('قبل التثبيت، فعّل خيار «تثبيت التطبيقات من مصادر غير معروفة» على الهاتف وشاشة Android TV.', 'Before installing, enable "Install from Unknown Sources" on your phone and Android TV.')}
              </span>
            </div>

            <section className="download-program" aria-labelledby="download-local-cinema">
              <div className="download-program-head">
                <h2 id="download-local-cinema">Local Cinema</h2>
                <a className="link" href="/apps/local-cinema" onClick={(event) => { event.preventDefault(); navigate('/apps/local-cinema'); }}>
                  {t('عرض التطبيق', 'View Local Cinema')}<ArrowUpRight size={16} />
                </a>
              </div>
              <div className="downloads">
                {catalog.filter((build) => build.available).map((build) => (
                  <DownloadAppCard key={build.id} build={build} ar={ar} t={t} L={L} copy={copy}
                    onChangelog={() => openChangelog(build)} onContact={() => contact(build.name)} />
                ))}
              </div>
            </section>
          </section>
        )}
        {!VALID_ROUTES.has(route) && (
          <section className="wrap section">
            <h1>{t('الصفحة غير موجودة', 'Page not found')}</h1>
            <a className="button" href="/" onClick={(event) => { event.preventDefault(); navigate('/'); }}>
              {t('العودة إلى الرئيسية', 'Go to the home page')}
            </a>
          </section>
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
            <button className="link" onClick={support}>{t('تواصل بشأن الدعم', 'Contact about support')} <Heart size={17} /></button>
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

      {modal && <Panels key={modal.id} modal={modal} close={() => setModal(null)} shots={shots} t={t} ar={ar} />}
      <div className="toast" role="status">{toast}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
