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
        <>يتصفح الهاتف المواقع المحفوظة مع حجب الإعلانات والنوافذ المنبثقة. ويلتقط روابط {L('Magnet')} لإرسالها إلى الشاشة للبث الفوري أو التحميل المحلي.</>,
        'Browse saved sites on your phone with ad and popup blocking. Tap any Magnet link to stream it on TV or download it locally.'
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
        'يكتشف متصفح الهاتف روابط البث المباشر والمباريات والفيديو، ويرسلها إلى شاشة التلفاز بضغطة واحدة.',
        'The phone browser detects live streams, sports matches, and web videos, and casts them to your TV in one tap.'
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
        <>يشغّل التلفاز الأفلام والمسلسلات والموسيقى بدقة {L('4K / HDR')} الخام من مشاركات {L('SMB')} أو أقراص {L('USB')}، ويجلب البوسترات والترجمة العربية تلقائياً.</>,
        'Play raw 4K/HDR movies, series, and music from SMB network shares or USB drives with automatic posters and Arabic subtitles.'
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
        'يعمل الهاتف كريموت للتلفاز، ولوحة مفاتيح لإرسال النصوص والروابط، وماوس هوائي، ويد تحكم للألعاب.',
        'Use your phone as a TV remote, keyboard for text and links, air mouse, and gamepad.'
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
        <>ثبّت {L('Local Cinema TV')} على الشاشة عبر كود {L('Downloader')} المباشر، وثبّت {L('Local Cinema Manager')} على الهاتف. التطبيقان مجانيان ومفتوحا المصدر.</>,
        'Install Local Cinema TV on your TV with the Downloader code, and install Local Cinema Manager on your phone. Both apps are free and open source.'
      ),
      hasCode: true,
    },
    {
      num: '02',
      icon: Compass,
      title: t('تصفّح أو اربط مكتبتك', 'Browse or Link Library'),
      summary: t('مواقع أفلام محفوظة بلا إعلانات، أو ربط الشبكة والهارد.', 'Ad-free saved movie sites, or link SMB shares and external drives.'),
      body: t(
        <>افتح المواقع المحفوظة في المتصفح المانع للإعلانات، أو اربط مجلدات {L('SMB')} وأقراص {L('USB')}، ثم اقرن الهاتف بالشاشة عبر رمز {L('QR')}.</>,
        'Open saved sites in the ad-blocking browser, or connect SMB folders and USB drives. Pair your phone with the TV using the QR code.'
      ),
    },
    {
      num: '03',
      icon: PlayCircle,
      title: t('ابثّ فوراً أو احتفظ بالجودة الخام', 'Stream Now or Keep Raw'),
      summary: t('بث فوري للتورنت والمباريات أو حفظ بجودة خام وترجمة تلقائية.', 'Instant torrent & live casting, or save raw quality with auto subtitles.'),
      body: t(
        'أرسل رابط التورنت أو البث المباشر ليعمل فوراً على الشاشة، أو احفظ الملف في مكتبتك مع جلب البوسترات والتقييمات والترجمة تلقائياً.',
        'Cast any torrent link or live stream straight to the TV, or save the file to your library with automatic posters, ratings, and subtitles.'
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
          text: t('يحجب المتصفح الإعلانات والنوافذ المنبثقة تلقائياً مع تكبير الصفحة من 50% إلى 150%.', 'Blocks ads and popups automatically with 50% to 150% page zoom.'),
        },
        {
          icon: BookmarkCheck,
          title: t('مواقع أفلام ومسلسلات محفوظة', 'Saved Movie & Series Sites'),
          text: t('قائمة مواقع محفوظة مسبقاً داخل المتصفح مع حفظ أيقوناتها على القرص.', 'Pre-saved movie and series bookmarks with offline disk favicons.'),
        },
        {
          icon: Magnet,
          title: t('التقاط تلقائي لروابط التورنت', 'Auto Magnet & Torrent Catch'),
          text: t(<>يلتقط المتصفح روابط {L('Magnet')} وملفات {L('.torrent')} فور الضغط عليها.</>, 'Captures Magnet links and .torrent files on tap.'),
        },
        {
          icon: torrentMode === 'stream' ? Radio : Download,
          title: t('خياران من نفس البرنامج', 'Two Modes in One App'),
          text: torrentMode === 'stream'
            ? t('بث مباشر بلا انتظار: يشغّل الفيلم على الشاشة مباشرة عبر القراءة المتسلسلة مع حذف الملف المؤقت بعد الانتهاء.', 'Instant Stream: Plays on TV via sequential streaming and deletes temporary files when done.')
            : t('تحميل وحفظ: يحفظ الملف الكامل في مكتبة الهاتف أو القرص لمشاهدته لاحقاً بدون إنترنت.', 'Download & Keep: Saves the full file to your library for offline playback.'),
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
          text: t('يلتقط روابط الفيديو والبث المباشر من صفحات الويب ويرسلها إلى التلفاز مع الترجمة.', 'Captures web video and live stream links and casts them to the TV with subtitles.'),
        },
        {
          icon: FolderSync,
          title: t('بث مكتبة الهاتف', 'Phone Library Casting'),
          text: t('ينشر أفلام وموسيقى وصور الهاتف إلى التلفاز عبر الشبكة المحلية مع زر إظهار أو إخفاء لكل مجلد.', 'Shares phone videos, music, and photos to the TV over LAN with per-folder visibility toggles.'),
        },
      ],
    },
    {
      id: 'cinema',
      icon: Sparkles,
      label: t('التشغيل الخام والبيانات التلقائية', 'Raw Playback & Auto Metadata'),
      cards: [
        {
          icon: Maximize2,
          title: t('جودة خام بلا ضغط', 'Uncompressed Raw Quality'),
          text: t(<>يشغّل الفيديو بدقة {L('4K / HDR')} الخام من مشاركات {L('SMB')} وأقراص {L('USB')} مع ضبط الأبعاد التلقائي.</>, 'Plays raw 4K/HDR video from SMB shares and USB drives with automatic aspect-ratio fitting.'),
        },
        {
          icon: Wand2,
          title: t('بوسترات وتقييمات تلقائية', 'Zero-Config Posters & Ratings'),
          text: t(<>يجلب البوسترات وتقييمات {L('IMDb')} و{L('TMDb')} و{L('Rotten Tomatoes')} والملخصات بدون مفاتيح {L('API')}.</>, 'Loads posters, IMDb, TMDb, and Rotten Tomatoes ratings, and synopses without API keys.'),
        },
        {
          icon: SlidersHorizontal,
          title: t('ترجمة مزدوجة ومزامنة فورية', 'Dual Subtitles & Timing Sync'),
          text: t(<>يدعم الترجمة المزدوجة على الشاشة مع ضبط التزامن ({L('±100ms / ±500ms')}) والحجم واللون والموضع.</>, 'Supports dual subtitles on TV with ±100ms and ±500ms timing offset, size, color, and position controls.'),
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
          text: t('يرسل أوامر التنقل والنصوص والروابط من كيبورد الهاتف إلى التلفاز عبر الشبكة المحلية.', 'Sends D-Pad navigation, text, and links from the phone keyboard to the TV over LAN.'),
        },
        {
          icon: MousePointer2,
          title: t('ماوس هوائي', 'Air Mouse & Touchpad'),
          text: t('يحرّك المؤشر على شاشة التلفاز عبر لوحة اللمس في جميع تطبيقات النظام.', 'Moves the cursor across all Android TV apps using the phone touchpad.'),
        },
        {
          icon: Gamepad2,
          title: t('يد تحكم للألعاب', 'TV Gamepad'),
          text: t('يحوّل شاشة الهاتف إلى ذراع تحكم لاسلكية للألعاب على التلفاز.', 'Turns the phone screen into a wireless controller for Android TV games.'),
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
                <span>{t('كود Downloader (نسخة الشاشة):', 'Downloader Code (TV Version):')} <bdi dir="ltr">3213660</bdi></span>
              </button>
              <button type="button" className="button" onClick={() => copy('https://meedx.pages.dev/tv')}>
                <Copy size={16} />
                <span>{t('رابط نسخة الشاشة:', 'TV Link:')} <bdi dir="ltr">meedx.pages.dev/tv</bdi></span>
              </button>
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
