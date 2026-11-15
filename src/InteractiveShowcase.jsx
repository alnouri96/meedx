import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, ShieldOff, Magnet, Cast, Radio, HardDrive, Server,
  Smartphone, Monitor, MousePointer2, Gamepad2, Download, Compass,
  PlayCircle, BookmarkCheck, Tv, FolderSync, Sparkles, Maximize2,
  Wand2, SlidersHorizontal, Keyboard, Copy, ArrowLeftRight, Play,
  Layers, CheckCircle2
} from 'lucide-react';

export function InteractiveShowcase({ t, L, copy }) {
  const [scenario, setScenario] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState(0);
  const [torrentMode, setTorrentMode] = useState('stream');
  const [activeBento, setActiveBento] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setScenario((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(id);
  }, [autoPlay]);

  const scenarios = [
    {
      id: 'torrent',
      icon: ShieldCheck,
      label: t('متصفح مانع للإعلانات + تورنت فوري', 'Ad-Block Browser + Instant Torrent'),
      phoneBadge: t('متصفح محمي + التقاط Magnet', 'Ad-Free Browser + Magnet Catch'),
      bridgeLabel: t('بث فوري أو تحميل', 'Stream or Download'),
      tvBadge: t('تشغيل التورنت فوراً', 'Instant Torrent Playback'),
      phoneIcon: ShieldCheck,
      bridgeIcon: Magnet,
      tvIcon: Tv,
      desc: t(
        <>تصفح المواقع المحفوظة داخل الهاتف بلا إعلانات أو نوافذ منبثقة، والتقط رابط {L('Magnet')} تلقائياً لإرساله إلى الشاشة وبثّه فوراً دون انتظار أو تحميله والاحتفاظ به.</>,
        'Browse saved sites on your phone with zero ads or popups, auto-catch Magnet links, and send them to TV to stream immediately or download and keep.'
      ),
    },
    {
      id: 'cast',
      icon: Cast,
      label: t('بث البثوث والمباريات للشاشة', 'Live Web & Match Casting'),
      phoneBadge: t('التقاط البث من المتصفح', 'Catch Stream from Browser'),
      bridgeLabel: t('قذف مباشر للشاشة', 'Instant Cast to TV'),
      tvBadge: t('عرض مباشر بملء الشاشة', 'Full-Screen Live Playback'),
      phoneIcon: Radio,
      bridgeIcon: Cast,
      tvIcon: Tv,
      desc: t(
        'التقط أي بث مباشر أو مباراة أو فيديو من متصفح الهاتف واقذفه فوراً إلى شاشة التلفاز بضغطة زر واحدة.',
        'Capture any live stream, sports match, or web video from the phone browser and cast it directly to your TV in one tap.'
      ),
    },
    {
      id: 'smb',
      icon: HardDrive,
      label: t('التشغيل الخام من الحاسوب والهارد', 'Raw 4K SMB / USB Playback'),
      phoneBadge: t('فهرسة ومزامنة المصادر', 'Source & Library Control'),
      bridgeLabel: t('قراءة خام 4K / HDR', 'Raw 4K / HDR Stream'),
      tvBadge: t('بوسترات وترجمة تلقائية', 'Auto Posters & Subtitles'),
      phoneIcon: Server,
      bridgeIcon: HardDrive,
      tvIcon: Sparkles,
      desc: t(
        <>اقرأ الأفلام والمسلسلات والموسيقى بدقتها الخام ({L('4K / HDR')}) من مجلدات الشبكة ({L('SMB')}) أو الهارد الخارجي مع جلب البوسترات والترجمة العربية تلقائياً.</>,
        'Stream raw 4K / HDR movies, series, and music over SMB network shares or USB drives with automatic posters and Arabic subtitles.'
      ),
    },
    {
      id: 'control',
      icon: Gamepad2,
      label: t('التحكم الذكي الكامل بالهاتف', 'Remote, Air Mouse & Gamepad'),
      phoneBadge: t('ريموت + ماوس + يد ألعاب', 'Remote + Air Mouse + Gamepad'),
      bridgeLabel: t('أوامر لحظية بلا تأخير', 'Zero-Latency Control'),
      tvBadge: t('استجابة شاملة لكل التطبيقات', 'System-Wide TV Response'),
      phoneIcon: MousePointer2,
      bridgeIcon: ArrowLeftRight,
      tvIcon: Gamepad2,
      desc: t(
        'حوّل هاتفك إلى وحدة تحكم شاملة: ريموت ذكي، لوحة مفاتيح للصق الروابط، ماوس هوائي سلس، ويد تحكم متكاملة للألعاب على الشاشة.',
        'Turn your phone into an all-in-one controller: smart remote, keyboard for pasting links, smooth air mouse, and full TV gamepad.'
      ),
    },
  ];

  const steps = [
    {
      num: '01',
      icon: Download,
      title: t('ثبّت التطبيقين', 'Install Both Apps'),
      summary: t(<>تطبيق الشاشة {L('Local Cinema TV')} وتطبيق الهاتف {L('Local Cinema Manager')}.</>, 'Install Local Cinema TV on your screen and Local Cinema Manager on your phone.'),
      body: t(
        <>حمّل {L('Local Cinema TV')} على شاشتك (أو عبر كود {L('Downloader')} المباشر) وحمّل {L('Local Cinema Manager')} على هاتفك — مجاني ومفتوح المصدر بالكامل.</>,
        'Download Local Cinema TV on your TV (or via the direct Downloader code) and Local Cinema Manager on your phone — 100% free and open source.'
      ),
      hasCode: true,
    },
    {
      num: '02',
      icon: Compass,
      title: t('تصفّح أو اربط مكتبتك', 'Browse or Link Library'),
      summary: t('مواقع أفلام محفوظة بلا إعلانات، أو ربط الشبكة والهارد.', 'Ad-free saved movie sites, or link SMB shares and external drives.'),
      body: t(
        <>افتح مواقع تحميل الأفلام والمسلسلات المحفوظة داخل متصفح التطبيق المانع للإعلانات، أو اربط مجلدات حاسوبك ({L('SMB')}) والهارد الخارجي واقترن بالشاشة بلمسة واحدة.</>,
        'Open saved movie and series sites in the ad-blocking browser, or connect your PC SMB folders and external drives and pair with your TV in one tap.'
      ),
    },
    {
      num: '03',
      icon: PlayCircle,
      title: t('ابثّ فوراً أو احتفظ بالجودة الخام', 'Stream Now or Keep Raw'),
      summary: t('بث فوري للتورنت والمباريات أو حفظ بجودة خام وترجمة تلقائية.', 'Instant torrent & live casting, or save raw quality with auto subtitles.'),
      body: t(
        'التقط رابط التورنت أو البث المباشر لبثّه على الشاشة فوراً دون انتظار، أو حمّله واحتفظ به في مكتبتك مع ترجمة عربية وبوسترات وتقييمات تلقائية.',
        'Catch any torrent link or live stream to play immediately on TV without waiting, or download and keep it in your library with automatic artwork and subtitles.'
      ),
    },
  ];

  const tabs = [
    {
      id: 'browser',
      icon: ShieldCheck,
      label: t('المتصفح المانع للإعلانات والتورنت', 'Ad-Block Browser & Torrent'),
      cards: [
        {
          icon: ShieldOff,
          title: t('متصفح يحجب الإعلانات', 'Ad-Blocking Browser'),
          text: t('تصفح نظيف وسريع يحجب الإعلانات والنوافذ المنبثقة المزعجة تلقائياً.', 'Clean, fast browsing that automatically blocks intrusive ads and popups.'),
        },
        {
          icon: BookmarkCheck,
          title: t('مواقع أفلام ومسلسلات محفوظة', 'Saved Movie & Series Sites'),
          text: t('قائمة مواقع جاهزة ومحفوظة داخل التطبيق للوصول السريع دون عناء البحث.', 'Pre-saved, ready-to-open movie and series sites inside the app for instant access.'),
        },
        {
          icon: Magnet,
          title: t('التقاط تلقائي لروابط التورنت', 'Auto Magnet & Torrent Catch'),
          text: t(<>يلتقط أي رابط تورنت ({L('Magnet / .torrent')}) بمجرد الضغط عليه داخل المتصفح.</>, 'Automatically captures any Magnet or .torrent link the moment you tap it.'),
        },
        {
          icon: torrentMode === 'stream' ? Radio : Download,
          title: t('خياران من نفس البرنامج', 'Two Modes in One App'),
          text: torrentMode === 'stream'
            ? t('بث مباشر فوري بدون تحميل: شاهد الفيلم أو الحلقة على الشاشة لحظياً أثناء القراءة المتسلسلة.', 'Instant Stream: Watch immediately on TV via sequential streaming without waiting for a full download.')
            : t('تحميل الفيلم والاحتفاظ به: احفظ الملف بجودته الكاملة في مكتبتك لمشاهدته في أي وقت.', 'Download & Keep: Save the full-quality file locally in your library for offline playback anytime.'),
          isTorrentToggle: true,
        },
      ],
    },
    {
      id: 'cast',
      icon: Cast,
      label: t('بث البثوث والميديا للشاشة', 'Live & Media Casting'),
      cards: [
        {
          icon: Tv,
          title: t('بث البثوث المباشرة والمباريات', 'Live Streams & Matches'),
          text: t('بث أي بث مباشر أو فيديو من متصفح الهاتف إلى التلفاز فوراً.', 'Cast any live stream, match, or web video from your phone browser to TV instantly.'),
        },
        {
          icon: FolderSync,
          title: t('بث مكتبة الهاتف', 'Phone Library Casting'),
          text: t('نشر وتشغيل أفلام وموسيقى وصور هاتفك على شاشة التلفاز لاسلكياً.', 'Publish and stream your phone movies, music, and photos wirelessly to your TV.'),
        },
      ],
    },
    {
      id: 'cinema',
      icon: Sparkles,
      label: t('التشغيل الخام والذكاء السينمائي', 'Raw Playback & Cinema AI'),
      cards: [
        {
          icon: Maximize2,
          title: t('جودة خام بلا ضغط', 'Uncompressed Raw Quality'),
          text: t(<>تشغيل الأفلام والمسلسلات والموسيقى بدقتها الأصلية ({L('4K / HDR')}) من الشبكة ({L('SMB')}) أو الهارد الخارجي.</>, 'Play movies, series, and music in original 4K / HDR quality from SMB or USB drives.'),
        },
        {
          icon: Wand2,
          title: t('بوسترات وتقييمات تلقائية', 'Zero-Config Posters & Ratings'),
          text: t(<>جلب الأغلفة وتقييمات {L('IMDb')} والملخصات العربية بلا أي مفاتيح {L('API')}.</>, 'Automatic artwork, IMDb ratings, and synopses out of the box with zero API keys.'),
        },
        {
          icon: SlidersHorizontal,
          title: t('ترجمة ومزامنة فورية', 'Subtitles & Instant Audio Sync'),
          text: t(<>جلب الترجمة العربية والإنجليزية تلقائياً مع أزرار ضبط تزامن الصوت ({L('-50ms / +50ms')}).</>, 'Automatic Arabic & English subtitles with instant -50ms / +50ms audio sync controls.'),
        },
      ],
    },
    {
      id: 'controls',
      icon: Gamepad2,
      label: t('أدوات التحكّم الذكي بالهاتف', 'Smart Phone Controls'),
      cards: [
        {
          icon: Keyboard,
          title: t('ريموت ذكي ولوحة مفاتيح', 'Smart Remote & Keyboard'),
          text: t('تنقل سريع ولصق الروابط والنصوص على الشاشة مباشرة من هاتفك.', 'Fast navigation and instant link or text pasting on TV directly from your phone.'),
        },
        {
          icon: MousePointer2,
          title: t('ماوس هوائي', 'Air Mouse & Touchpad'),
          text: t('تحريك المؤشر على شاشة التلفاز بسلاسة تامة عبر حركة ولمس الهاتف.', 'Smooth cursor control across all Android TV apps directly from your phone.'),
        },
        {
          icon: Gamepad2,
          title: t('يد تحكم للألعاب', 'TV Gamepad'),
          text: t('تحويل شاشة هاتفك إلى ذراع تحكم متكاملة للألعاب على التلفاز.', 'Turn your phone screen into a responsive wireless gamepad for TV gaming.'),
        },
      ],
    },
  ];

  const bentoApps = [
    { icon: ShieldCheck, name: t('متصفح مانع إعلانات', 'Ad-Block Browser'), role: t('تصفح نظيف للمواقع المحفوظة بلا نوافذ منبثقة.', 'Clean browsing on saved sites with zero popups.') },
    { icon: Magnet, name: t('محمّل ومشغّل تورنت', 'Torrent Stream & Downloader'), role: t('التقاط Magnet وبث مباشر فوري أو تحميل كامل.', 'Auto Magnet catch for instant streaming or full download.') },
    { icon: Play, name: 'Nova Video Player', role: t('مكتبة أفلام ذكية ببوسترات وملخصات تلقائية.', 'Smart movie library with automatic artwork and metadata.') },
    { icon: Layers, name: 'Kodi', role: t('تشغيل الملفات الخام وقراءة الشبكة والهارد.', 'Raw media playback over local storage, USB, and SMB.') },
    { icon: Server, name: 'Plex', role: t('تصفح منظم للمواسم والحلقات واستئناف المشاهدة.', 'Organized seasons, episodes, and seamless resume.') },
    { icon: Cast, name: 'Web Video Caster', role: t('بث المباريات والبثوث المباشرة من المتصفح للشاشة.', 'Cast live matches and web streams to your TV in one tap.') },
    { icon: MousePointer2, name: t('ريموت وماوس هوائي', 'Remote & Air Mouse'), role: t('لوحة لمس وماوس هوائي وكيبورد سريع للشاشة.', 'Touchpad, air mouse, and remote keyboard for TV.') },
    { icon: Gamepad2, name: t('يد تحكم للألعاب', 'Wireless Gamepad'), role: t('ذراع ألعاب متكاملة عبر شاشة الهاتف.', 'Full wireless gamepad right on your phone screen.') },
  ];

  const activeScenario = scenarios[scenario];
  const PhoneIcon = activeScenario.phoneIcon;
  const BridgeIcon = activeScenario.bridgeIcon;
  const TvIcon = activeScenario.tvIcon;
  const activeStep = steps[step];
  const activeTab = tabs[tab];

  return (
    <div className="showcase">
      <section className="sc-card sc-arch" aria-label={t('كيف يعمل التطبيقان معاً؟', 'How both apps work together')}>
        <div className="sc-head">
          <div>
            <span className="sc-kicker"><CheckCircle2 size={15} /> {t('مجاني ومفتوح المصدر 100% · تطبيقان متكاملان', '100% Free & Open Source · Two Synchronized Apps')}</span>
            <h3>{t('كيف يعمل التطبيقان معاً؟', 'How do both apps work together?')}</h3>
          </div>
          <span className="sc-lan-pill">{t('هاتف + شاشة · شبكة محلية', 'Phone + TV · Local LAN')}</span>
        </div>

        <div className="sc-scenarios" role="tablist" aria-label={t('سيناريوهات العمل', 'Workflow scenarios')}>
          {scenarios.map((item, idx) => {
            const Icon = item.icon;
            const isActive = scenario === idx;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={'sc-pill' + (isActive ? ' active' : '')}
                onClick={() => { setAutoPlay(false); setScenario(idx); }}
                onMouseEnter={() => setAutoPlay(false)}
                onFocus={() => setAutoPlay(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {isActive && autoPlay && <span key={scenario} className="sc-progress" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div key={activeScenario.id + '-diag'} className="sc-diagram sc-animate">
          <div className="sc-node">
            <div className="sc-icon-ring"><Smartphone size={28} /></div>
            <div className="sc-node-text">
              <strong>{t('تطبيق الهاتف', 'Phone App')}</strong>
              <code dir="ltr">Local Cinema Manager</code>
              <span className="sc-node-badge"><PhoneIcon size={14} /> {activeScenario.phoneBadge}</span>
            </div>
          </div>

          <div className="sc-bridge" aria-hidden="true">
            <div className="sc-bridge-track">
              <span className="sc-pulse" />
              <div className="sc-bridge-core"><BridgeIcon size={20} /></div>
              <span className="sc-pulse delay" />
            </div>
            <span className="sc-bridge-label">{activeScenario.bridgeLabel}</span>
          </div>

          <div className="sc-node">
            <div className="sc-icon-ring"><Monitor size={28} /></div>
            <div className="sc-node-text">
              <strong>{t('تطبيق الشاشة', 'TV App')}</strong>
              <code dir="ltr">Local Cinema TV</code>
              <span className="sc-node-badge"><TvIcon size={14} /> {activeScenario.tvBadge}</span>
            </div>
          </div>
        </div>

        <p key={activeScenario.id + '-desc'} className="sc-arch-desc sc-animate">{activeScenario.desc}</p>
      </section>

      <section className="sc-card sc-walk" aria-label={t('ابدأ في 3 خطوات', 'Start in 3 steps')}>
        <div className="sc-head">
          <div>
            <h3>{t('ابدأ في 3 خطوات', 'Start in 3 steps')}</h3>
            <p>{t('اضغط على أي خطوة لاستعراض التفاصيل.', 'Tap any step to inspect what to do.')}</p>
          </div>
          <code dir="ltr">{activeStep.num} / 03</code>
        </div>

        <div className="sc-steps">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.num}
                type="button"
                className={'sc-step-btn' + (step === idx ? ' active' : '')}
                onClick={() => setStep(idx)}
                aria-expanded={step === idx}
              >
                <span className="sc-step-icon"><Icon size={24} /></span>
                <span className="sc-step-meta">
                  <code dir="ltr">{item.num}</code>
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div key={activeStep.num} className="sc-step-detail sc-animate">
          <p>{activeStep.body}</p>
          {activeStep.hasCode && (
            <div className="sc-step-actions">
              <button type="button" className="button primary" onClick={() => copy('3213660')}>
                <Copy size={16} />
                <span>{t('نسخ كود Downloader:', 'Copy Downloader code:')} <bdi dir="ltr">3213660</bdi></span>
              </button>
              <a href="#downloads" className="button">
                <Download size={16} />
                <span>{t('التحميل المباشر للتطبيقين', 'Download both APKs')}</span>
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="sc-card sc-features" aria-label={t('قدرات المنظومة الكاملة', 'Full Ecosystem Capabilities')}>
        <div className="sc-head">
          <div>
            <h3>{t('قدرات المنظومة الكاملة', 'Full Ecosystem Capabilities')}</h3>
            <p>{t('اختر أي قسم لاستكشاف تفاصيل التشغيل والبث والتحكم', 'Select a category to explore playback, streaming, and control features')}</p>
          </div>
        </div>

        <div className="sc-tabs" role="tablist">
          {tabs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === idx}
                className={'sc-tab' + (tab === idx ? ' active' : '')}
                onClick={() => setTab(idx)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div key={activeTab.id} className="sc-feature-grid sc-animate" role="tabpanel">
          {activeTab.cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="sc-feature-item">
                <div className="sc-feature-top">
                  <span className="sc-gold-badge"><Icon size={20} /></span>
                  <h4>{card.title}</h4>
                </div>
                <p>{card.text}</p>
                {card.isTorrentToggle && (
                  <div className="sc-mini-switch" role="group" aria-label={t('وضع التورنت', 'Torrent mode')}>
                    <button
                      type="button"
                      className={torrentMode === 'stream' ? 'active' : ''}
                      onClick={() => setTorrentMode('stream')}
                    >
                      <Radio size={14} /> {t('بث مباشر فوري بدون تحميل', 'Instant stream')}
                    </button>
                    <button
                      type="button"
                      className={torrentMode === 'download' ? 'active' : ''}
                      onClick={() => setTorrentMode('download')}
                    >
                      <Download size={14} /> {t('تحميل الفيلم والاحتفاظ به', 'Download & keep')}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="sc-card sc-bento" aria-label={t('8 تطبيقات في منظومة واحدة', '8 apps in one suite')}>
        <div className="sc-head">
          <div>
            <h3>{t('8 تطبيقات في منظومة واحدة', '8 apps replaced by one free suite')}</h3>
            <p>{t('مرّر أو اضغط على أي أداة لمعرفة كيف تغنيك عنها المنظومة.', 'Hover or tap any tool to see what it replaces.')}</p>
          </div>
          <span className="sc-free-pill">{t('مجاني ومفتوح المصدر', 'Free & Open Source')}</span>
        </div>

        <div className="sc-bento-grid">
          {bentoApps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                type="button"
                className={'sc-bento-item' + (activeBento === idx ? ' active' : '')}
                onMouseEnter={() => setActiveBento(idx)}
                onClick={() => setActiveBento(idx)}
              >
                <span className="sc-gold-badge"><Icon size={19} /></span>
                <strong>{item.name}</strong>
              </button>
            );
          })}
        </div>

        <div className="sc-bento-status">
          <strong>{bentoApps[activeBento].name}:</strong>{' '}
          <span>{bentoApps[activeBento].role}</span>
        </div>
      </section>
    </div>
  );
}
