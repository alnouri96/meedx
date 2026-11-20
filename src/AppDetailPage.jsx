import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Copy, Download,
  Maximize2, MessageSquare, Monitor, ShieldCheck, Smartphone, Sparkles,
  Wrench, Puzzle, Film, KeyRound, ArrowUpRight
} from 'lucide-react';
import { EquationPanel } from './EquationPanel';
import { InteractiveShowcase } from './InteractiveShowcase';
import { AddonsConnectionsSection } from './AddonsConnectionsSection';

export function AppDetailPage({
  ar, t, L, copy, navigate, catalog, shots, slide, setSlide, setModal, contact, label, image
}) {
  const tvApp = catalog.find((p) => p.id === 'tv');
  const phoneApp = catalog.find((p) => p.id === 'phone');
  const lang = ar ? 'ar' : 'en';
  const BackArrow = ar ? ArrowRight : ArrowLeft;
  const notes = tvApp?.updateNotes || [];

  return (
    <div className="app-detail-page sc-animate">
      <section className="wrap section" style={{ paddingBottom: 28 }}>
        <div className="detail-top-bar">
          <div className="semantic-row">
            <a
              href="/apps"
              className="button"
              onClick={(e) => { e.preventDefault(); navigate('/apps'); }}
            >
              <BackArrow size={16} />
              <span>{t('العودة إلى التطبيقات', 'Back to Apps')}</span>
            </a>
            <a
              href="#addons"
              className="button"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Puzzle size={16} />
              <span>{t('الإضافات والتوصيلات ومفاتيح API', 'Plugins, Connections & APIs')}</span>
            </a>
          </div>
          <div className="semantic-row">
            <span className="badge-ok"><CheckCircle2 size={14} /> {t('مكتمل ومفحوص ✓', 'Verified & Audited ✓')}</span>
            <span className="badge-ok"><ShieldCheck size={14} /> {t('آمن 100%: بلا مفاتيح مضمّنة', '100% Safe: Zero Hardcoded Secrets')}</span>
          </div>
        </div>

        <article className="detail-hero-card">
          <div className="detail-hero-head">
            <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" className="detail-app-icon" />
            <div>
              <div className="gh-app-title-row">
                <h1>Local Cinema</h1>
                <span className="gh-ver-badge" dir="ltr">v{tvApp?.version} · code {tvApp?.versionCode}</span>
              </div>
              <p>
                {t(
                  <>يتكوّن {L('Local Cinema')} من تطبيقين يعملان عبر الشبكة المحلية. يعرض تطبيق {L('Android TV')} مكتبتك بدقة {L('4K / HDR')} مع إعلانات {L('16:9')} وترجمة مزدوجة. ويدير تطبيق الهاتف ({L('TV Hub')}) الريموت، وبث التورنت والمباريات، والإضافات، والنسخ الاحتياطي.</>,
                  'Local Cinema pairs two apps over your local network. The Android TV app plays your 4K/HDR library with 16:9 trailers and dual subtitles. The Phone app (TV Hub) handles remote control, torrent and live stream casting, addons, and backup.'
                )}
              </p>
            </div>
          </div>

          <div className="semantic-alerts">
            <span className="badge-ok"><CheckCircle2 size={15} /> {t('متاح للتنزيل المباشر · Open Source GPL-3.0', 'Available for Direct Download · Open Source GPL-3.0')}</span>
            <span className="badge-warn"><AlertTriangle size={15} /> {t('قبل التثبيت، فعّل خيار «تثبيت التطبيقات من مصادر غير معروفة» على الهاتف والتلفاز.', 'Before installing, enable "Install from Unknown Sources" on your phone and TV.')}</span>
          </div>

          <div className="detail-dl-grid">
            {[tvApp, phoneApp].filter(Boolean).map((p) => {
              const isTv = p.device === 'tv';
              const versionBanner = p.versionBanner?.[lang] ?? (isTv ? t('هذه نسخة الشاشة (Android TV)', 'This is the TV Version (Android TV)') : t('هذه نسخة الهاتف (Android Phone)', 'This is the Phone Version (Android Phone)'));
              const dlLabel = p.downloaderLabel?.[lang] ?? t('كود Downloader (نسخة الشاشة)', 'Downloader Code (TV Version)');
              const dlCode = p.downloaderCode || '3213660';
              const shortUrl = p.shortUrl || 'meedx.pages.dev/tv';
              return (
                <div key={p.id} className="detail-dl-box">
                  <div className={'device-explicit-banner ' + (isTv ? 'tv-banner' : 'phone-banner')}>
                    {isTv ? <Monitor size={18} /> : <Smartphone size={18} />}
                    <strong>{versionBanner}</strong>
                  </div>
                  <div className="file-title">
                    {isTv ? <Monitor /> : <Smartphone />}
                    <div>
                      <h3>{p.name}</h3>
                      <code dir="ltr">v{p.version} · {p.specs?.sizeLabel} · {p.specs?.platform[lang]} · {p.specs?.architecture[lang]}</code>
                    </div>
                    <span className="badge-ok">{t('مفعّل', 'Active')}</span>
                  </div>
                  {isTv && (
                    <div className="downloader-code-box">
                      <div className="downloader-code-meta">
                        <span className="downloader-code-title">{dlLabel}</span>
                        <div className="downloader-code-values">
                          <code dir="ltr" className="downloader-num">{dlCode}</code>
                          <span className="downloader-sep">·</span>
                          <code dir="ltr" className="downloader-url">{shortUrl}</code>
                        </div>
                      </div>
                      <div className="downloader-code-actions">
                        <button type="button" className="button" onClick={() => copy(dlCode)}>
                          <Copy size={14} />
                          <span>{t('نسخ الكود', 'Copy Code')} <bdi dir="ltr">{dlCode}</bdi></span>
                        </button>
                        <button type="button" className="button" onClick={() => copy('https://' + shortUrl)}>
                          <Copy size={14} />
                          <span>{t('نسخ الرابط المختصر', 'Copy Short Link')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="hash">
                    <code dir="ltr">SHA-256<br />{p.sha256}</code>
                    <button type="button" onClick={() => copy(p.sha256)} aria-label={t('نسخ بصمة ', 'Copy checksum for ') + p.name}>
                      <Copy size={17} />
                    </button>
                  </div>
                  <div className="file-actions">
                    <button type="button" className="button primary" onClick={() => setModal({ id: 'download', file: p })}>
                      <span>
                        {isTv
                          ? t(<>تنزيل {L('APK')}: نسخة الشاشة ({L('Android TV')})</>, 'Download APK: TV Version (Android TV)')
                          : t(<>تنزيل {L('APK')}: نسخة الهاتف ({L('Android Phone')})</>, 'Download APK: Phone Version (Android Phone)')}
                      </span>
                      <Download size={17} />
                    </button>
                    <button type="button" className="link" onClick={() => contact(p.name)}>
                      {t('بلاغ أو اقتراح', 'Report or suggest')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="band" style={{ paddingBlock: 12 }}>
        <div className="wrap section">
          <div className="section-head">
            <div>
              <h2>{t('معاينة لقطات الشاشة', 'Screenshots Preview')}</h2>
              <p>{t('اضغط على أي لقطة للتكبير والاستعراض بالحجم الكامل.', 'Click any screenshot to zoom and inspect in full resolution.')}</p>
            </div>
            <code dir="ltr">{shots.length} {t('شريحة', 'slides')}</code>
          </div>

          <div className="gallery">
            <div className="gallery-media">
              <Swiper
                key={ar ? 'ar' : 'en'}
                dir={ar ? 'rtl' : 'ltr'}
                modules={[A11y, Keyboard, Navigation, Pagination]}
                keyboard={{ enabled: true, onlyInViewport: true }}
                navigation
                pagination={{ clickable: true }}
                onSwiper={() => setSlide(0)}
                onSlideChange={(s) => setSlide(s.activeIndex)}
              >
                {shots.map((shot, index) => (
                  <SwiperSlide key={shot.id}>
                    <div className={'paired-shots' + (shot.images.length === 1 ? ' solo' : '')}>
                      {shot.images.map((photo) => (
                        <button
                          type="button"
                          key={photo.file}
                          className={'gallery-device gallery-' + photo.device}
                          onClick={() => setModal({ id: 'lightbox', index, device: photo.device })}
                          aria-label={t('تكبير لقطة ', 'Zoom screenshot: ') + label(photo.device)}
                        >
                          {image(photo.file, shot.name + ' · ' + label(photo.device), { loading: index < 2 ? 'eager' : 'lazy' })}
                          <span><Maximize2 size={15} />{t('تكبير', 'Zoom')} · {label(photo.device)}</span>
                        </button>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <article className="gallery-info">
              <code>{slide + 1} / {shots.length}</code>
              <h3>{shots[slide].name}</h3>
              <p>{shots[slide].text}</p>
              <button className="link" onClick={() => contact()}>
                {t('شارك ملاحظة عن التطبيق', 'Share app feedback')}
                <MessageSquare size={17} />
              </button>
            </article>
          </div>

          <EquationPanel t={t} />
          <InteractiveShowcase t={t} L={L} copy={copy} />
        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 28, paddingBottom: 12 }}>
        <div id="setup-guide" className="setup-guide" style={{ marginBlockStart: 0 }}>
          <div className="guide-head">
            <div>
              <h3>{t('التشغيل التلقائي وإدارة المفاتيح والإضافات', 'Zero-Account Mode & Phone Hub Management')}</h3>
              <p>{t(<>يعمل التطبيق فور التثبيت بلا حسابات أو مفاتيح. يمكنك إضافة المفاتيح الاختيارية والإضافات من الهاتف عبر {L('TV Hub ← Connection')}.</>, 'The app works right after install with no account or keys. You can manage optional API keys and addons from the phone in TV Hub → Connection.')}</p>
            </div>
            <a
              href="#addons"
              className="button primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('الانتقال إلى دليل الإضافات والتعليمات', 'Jump to Addons & Guides')}<ArrowUpRight size={16} />
            </a>
          </div>
          <div className="guide-grid">
            <article className="guide-card">
              <div className="guide-title"><Film size={24} /><div><h4>{t('وضع التشغيل التلقائي بلا حساب', 'Zero-Account Instant Mode')}</h4><code dir="ltr">Zero-Config · Cinemeta / TVmaze / Jikan / Subsource</code></div><span className="signal" aria-label={t('مفعّل تلقائياً', 'Enabled automatically')} /></div>
              <p>{t(<>يجلب التطبيق البوسترات، التقييمات المتعددة، صفحات الممثلين، إعلانات {L('16:9')}، والترجمة التلقائية فور التثبيت بلا تسجيل أو مفاتيح {L('API')}.</>, 'The app loads posters, multi-source ratings, cast pages, 16:9 trailers, and automatic subtitles after install without login or API keys.')}</p>
            </article>
            <article className="guide-card">
              <div className="guide-title"><KeyRound size={24} /><div><h4>{t(<>إدارة المفاتيح والإضافات من الهاتف ({L('TV Hub ← Connection')})</>, 'Manage Keys & Addons from Phone (TV Hub → Connection)')}</h4><code dir="ltr">API_KEYS_SYNC · ADDONS_SYNC · WATCH_SYNC</code></div></div>
              <p>{t(<>أضف مفاتيح {L('Trakt / Subsource / OpenSubtitles / TMDb')} أو إضافات {L('Nuvio / Stremio')} في الهاتف ليرسلها مباشرة إلى الشاشة عبر الشبكة المحلية.</>, 'Add Trakt, Subsource, OpenSubtitles, or TMDb keys and Nuvio or Stremio addons on your phone to push them to the TV over LAN.')}</p>
            </article>
          </div>
        </div>
      </section>

      <AddonsConnectionsSection t={t} L={L} copy={copy} />

      <section className="wrap section" aria-label={t('سجل التحديثات الكامل', 'Full Patch Notes')}>
        <div className="section-head">
          <div>
            <h2>{t('سجل التحديثات الكامل (Patch Notes)', 'Full Patch Notes (v1.0.0-beta.6 → beta.13)')}</h2>
            <p>{t('سجل التغييرات من الإصدار v1.0.0-beta.6 حتى v1.0.0-beta.13 لتطبيقي الشاشة والهاتف.', 'Changes from v1.0.0-beta.6 to v1.0.0-beta.13 for the TV and Phone apps.')}</p>
          </div>
          <span className="gh-ver-badge" dir="ltr">v{tvApp?.version}</span>
        </div>

        <div className="detail-notes-grid" dir={ar ? 'rtl' : 'ltr'}>
          {notes.map((release) => (
            <article key={release.version} className="dl-release-block">
              <div className="dl-release-head">
                <code dir="ltr">v{release.version} (code {release.versionCode}) · {release.date}</code>
                {release.latest && <span className="dl-latest-badge"><CheckCircle2 size={12} /> Latest</span>}
              </div>
              {release.whatsNew && (
                <div className="dl-note-group">
                  <h4><Sparkles size={15} /> {t("ما أُضيف حديثاً (What's New)", "What's New")}</h4>
                  <ul>
                    {release.whatsNew[lang].map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              )}
              {release.improvements && (
                <div className="dl-note-group">
                  <h4><Wrench size={15} /> {t('التحسينات والإصلاحات (Improvements & Fixes)', 'Improvements & Fixes')}</h4>
                  <ul>
                    {release.improvements[lang].map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
