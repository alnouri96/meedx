import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, Download, Monitor, Smartphone, MessageSquare, Heart, ShieldCheck,
  Gamepad2, Terminal, ArrowUp, ArrowUpRight, CheckCircle2,
  AlertTriangle, Puzzle, Wrench, Sparkles
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
import { AppsShowcasePage, LocalCinemaPoster } from './AppsShowcasePage';
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

function normalizeRoute(pathname, hash) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/addons' || hash === '#addons') return '/apps/local-cinema';
  if (hash === '#apps') return '/apps';
  if (hash === '#lab' || hash === '#software') return '/software';
  if (hash === '#services') return '/services';
  if (hash === '#downloads') return '/downloads';
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
  const releaseVersion = catalog[0]?.version ?? '1.0.0-beta.11';
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
    document.title = t('MEEDX: تطوير التطبيقات والألعاب والحلول التقنية', 'MEEDX: Apps, games, and tech solutions');
  }, [ar]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const cleanPath = window.location.pathname.replace(/\/+$/, '');
    if (cleanPath === '/tv' && catalog[0]?.url) {
      window.location.replace(catalog[0].url);
      return;
    }
    if (cleanPath === '/phone' && catalog[1]?.url) {
      window.location.replace(catalog[1].url);
      return;
    }
    if (cleanPath === '/addons') {
      window.history.replaceState({}, '', '/apps/local-cinema#addons');
      setRoute('/apps/local-cinema');
      setTimeout(() => document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else if (window.location.hash === '#addons') {
      setTimeout(() => document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else if (window.location.hash === '#support') {
      setModal({ id: 'support' });
    }
    const onPop = () => setRoute(normalizeRoute(window.location.pathname, window.location.hash));
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener('popstate', onPop);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function navigate(rawPath) {
    const [pathOnly, hashPart] = rawPath.split('#');
    const hash = hashPart ? '#' + hashPart : '';
    const target = normalizeRoute(pathOnly || '/', hash);
    const fullUrl = target + (target === '/apps/local-cinema' && hash === '#addons' ? '#addons' : '');
    window.history.pushState({}, '', fullUrl);
    setRoute(target);
    setMenu(false);
    if (hash === '#addons') {
      setTimeout(() => document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' }), 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  const showcaseItems = [
    {
      path: '/software',
      icon: Gamepad2,
      badge: t('قسم الألعاب', 'Gaming Hub'),
      title: t('الألعاب وملفات التخصيص (Gaming & Tweaks)', 'Gaming & Tweaks'),
      desc: t('إعدادات التحكم، ملفات تحسين الأداء، وأدوات تخصيص الألعاب للحاسوب والهاتف.', 'Control layouts, performance profiles, and custom gaming tweaks for PC and mobile.'),
      cta: t('استعرض قسم الألعاب', 'Explore Gaming'),
    },
    {
      path: '/software',
      icon: Terminal,
      badge: 'Windows · PowerShell · ADB',
      title: t('برامج وأدوات الحاسوب (PC Software)', 'PC Software & Scripts'),
      desc: t(<>أدوات وسكربتات {L('Windows')} و{L('PowerShell')} و{L('ADB')} لإدارة الشاشات والهواتف والأنظمة.</>, 'Windows, PowerShell, and ADB utilities for managing TVs, phones, and PCs.'),
      cta: t('استعرض البرامج والأدوات', 'Explore Software'),
    },
    {
      path: '/services',
      icon: Wrench,
      badge: t('خدمات مباشرة', 'Direct Services'),
      title: t('الخدمات التقنية والصيانة', 'Technical Services & Repair'),
      desc: t('صيانة الهواتف، تجميع وصيانة الحاسوب، وتطوير تطبيقات وسكربتات مخصصة حسب الطلب.', 'Phone repair, PC assembly & maintenance, and custom app/script development.'),
      cta: t('اطلب خدمة تقنية', 'Request a Service'),
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
                  <CheckCircle2 size={14} /> {t('استوديو MEEDX · مشاريع مفتوحة المصدر ✓', 'MEEDX Studio · Open-Source Projects ✓')}
                </span>
                <h1>{t('تطبيقات وألعاب،', 'Apps, games,')}<br />{t('وأدوات تقنية.', 'and tech tools.')}</h1>
                <p>
                  {t(
                    <>يطوّر استوديو {L('MEEDX')} تطبيقات مفتوحة المصدر لشاشات {L('Android TV')} والهواتف، وأدوات {L('Windows / ADB')}، وملفات ضبط الألعاب، باللغتين العربية والإنجليزية.</>,
                    'MEEDX Studio builds open-source Android TV and phone apps, Windows and ADB utilities, and game configs in Arabic and English.'
                  )}
                </p>
                <div className="hero-buttons">
                  <a href="/apps/local-cinema" className="button primary" onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}>
                    {t(<>استكشف {L('Local Cinema')}</>, 'Explore Local Cinema')}<ArrowUpRight size={18} />
                  </a>
                  <a href="/downloads" className="button" onClick={(e) => { e.preventDefault(); navigate('/downloads'); }}>
                    {t('مركز التحميل المباشر', 'Downloads Hub')}<Download size={18} />
                  </a>
                </div>
                <div className="hero-meta">
                  <span className="signal" />
                  <code dir="ltr">Local Cinema v{releaseVersion}</code>
                  <span className="badge-ok">{t('متاح للتنزيل المباشر ✓', 'Ready for Download ✓')}</span>
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
                    <span className="sc-kicker"><Sparkles size={15} /> {t('أحدث الإصدارات والأقسام', 'Latest Releases & Sections')}</span>
                    <h2>{t('التطبيقات والألعاب والبرامج', 'Apps, Games & Software')}</h2>
                    <p>{t('إصدارات استوديو MEEDX مع روابط التحميل المباشر وأدلة التشغيل.', 'MEEDX Studio releases with direct download links and setup guides.')}</p>
                  </div>
                </div>

                <article className="gh-app-card" style={{ marginBottom: 22 }}>
                  <a
                    href="/apps/local-cinema"
                    className="gh-app-media"
                    onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}
                  >
                    <LocalCinemaPoster t={t} />
                  </a>
                  <div className="gh-app-body">
                    <div className="gh-app-top">
                      <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" className="gh-app-icon" />
                      <div>
                        <div className="gh-app-title-row">
                          <h3>Local Cinema</h3>
                          <span className="gh-ver-badge" dir="ltr">v{releaseVersion}</span>
                          <span className="badge-ok"><CheckCircle2 size={13} /> {t('مكتمل ومفحوص ✓', 'Verified ✓')}</span>
                        </div>
                        <p>
                          {t(
                            <>يربط شاشة {L('Android TV')} بالهاتف لتشغيل الفيديو بدقة {L('4K / HDR')}، مع إعلانات {L('16:9')}، وبث التورنت والمباريات، والترجمة المزدوجة، وإضافات {L('Nuvio / Stremio')}.</>,
                            'Pairs Android TV and Phone for 4K/HDR local playback, 16:9 trailers, torrent and live stream casting, dual subtitles, and Nuvio or Stremio addons.'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="gh-app-actions">
                      <a href="/apps/local-cinema" className="button primary" onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}>
                        <span>{t('صفحة التطبيق والإضافات والتعليمات', 'App Page, Addons & Guides')}</span>
                        <ArrowUpRight size={17} />
                      </a>
                      <a href="/downloads" className="button" onClick={(e) => { e.preventDefault(); navigate('/downloads'); }}>
                        <Download size={17} />
                        <span>{t('تنزيل APK المباشر', 'Direct APK Download')}</span>
                      </a>
                    </div>
                  </div>
                </article>

                <div className="hub-grid">
                  {showcaseItems.map((c) => {
                    const Icon = c.icon;
                    return (
                      <a
                        key={c.title}
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
                        <span className="hub-link">{c.cta} <ArrowUpRight size={15} /></span>
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
                <p>{t('أدوات الحاسوب وملفات ضبط الألعاب قيد الإعداد.', 'Upcoming PC utilities, scripts, and game configuration files.')}</p>
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
                  <span>{t('لا توجد ملفات منشورة حالياً. تُضاف قريباً.', 'No files published yet. Coming soon.')}</span>
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
                <span className="badge-ok"><CheckCircle2 size={14} /> {t('آمن 100%: بلا مفاتيح مضمّنة', '100% Safe: Zero Secrets')}</span>
                <a className="link" href={siteConfig.githubReleases} target="_blank" rel="noopener noreferrer">
                  GitHub Releases <ArrowUpRight size={16} />
                </a>
                <ShieldCheck size={31} />
              </div>
            </div>

            <div className="semantic-alerts" style={{ marginBottom: 20 }}>
              <span className="badge-warn">
                <AlertTriangle size={15} />
                {t('قبل التثبيت، فعّل خيار «تثبيت التطبيقات من مصادر غير معروفة» على الهاتف وشاشة Android TV.', 'Before installing, enable "Install from Unknown Sources" on your phone and Android TV.')}
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
