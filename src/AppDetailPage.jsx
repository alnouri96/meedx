import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Download, Film,
  KeyRound, Maximize2, MessageSquare, Puzzle, Sparkles, Wrench
} from 'lucide-react';
import { InteractiveShowcase } from './InteractiveShowcase';
import { siteConfig } from './config/siteConfig';
import { AddonsConnectionsSection } from './AddonsConnectionsSection';

export function AppDetailPage({
  ar, t, L, copy, navigate, catalog, shots, slide, setSlide, setModal, contact, label, image
}) {
  const tvApp = catalog.find((p) => p.id === 'tv');
  const lang = ar ? 'ar' : 'en';
  const BackArrow = ar ? ArrowRight : ArrowLeft;
  const [notesDevice, setNotesDevice] = useState(tvApp.id);
  const notes = catalog.find((build) => build.id === notesDevice).updateNotes ?? [];

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
              href="/apps/local-cinema#addons"
              className="button"
              onClick={(event) => { event.preventDefault(); navigate('/apps/local-cinema#addons'); }}
            >
              <Puzzle size={16} />
              <span>{t('دليل الإضافات', 'Add-on guide')}</span>
            </a>
          </div>
        </div>

        <article className="detail-hero-card">
          <div className="detail-hero-head">
            <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" className="detail-app-icon" />
            <div>
              <div className="gh-app-title-row">
                <h1>Local Cinema</h1>
                <span className="gh-ver-badge" dir="ltr">v{tvApp?.version}</span>
                <span className="cinema-source-badge">{t('مفتوح المصدر ومجاني بالكامل', 'Open source & 100% free')}</span>
              </div>
              <p>
                {t(
                  <>شغّل مكتبتك بدقة {L('4K / HDR')} على {L('Android TV')} مع ترجمة مزدوجة. استخدم هاتفك للتحكم بالشاشة وبث الفيديو عبر الشبكة المحلية.</>,
                  'Play your 4K/HDR library with dual subtitles on Android TV. Use your phone to control the TV and cast video over your local network.'
                )}
              </p>
            </div>
          </div>

          <div className="cinema-detail-actions">
            <a
              href="/downloads"
              className="button primary"
              onClick={(event) => { event.preventDefault(); navigate('/downloads'); }}
            >
              {t('تنزيل التطبيقين', 'Get the apps')}<Download size={17} />
            </a>
            <a className="button" href={siteConfig.source}>
              {t('الكود المصدري', 'Source code')}<ArrowUpRight size={16} />
            </a>
            <a className="link" href={siteConfig.source + '/blob/main/docs/THIRD_PARTY.md'}>
              {t('التراخيص', 'Licenses')}
            </a>
          </div>
        </article>
      </section>

      <section className="wrap section cinema-feature-section">
        <InteractiveShowcase t={t} L={L} />
      </section>

      <section className="band cinema-gallery-section">
        <div className="wrap section">
          <div className="section-head">
            <div>
              <h2>{t('معرض Local Cinema', 'Local Cinema gallery')}</h2>
              <p>{t('اختر صورة لتكبيرها.', 'Select an image to zoom in.')}</p>
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

        </div>
      </section>

      <section className="wrap section" style={{ paddingTop: 28, paddingBottom: 12 }}>
        <div id="setup-guide" className="setup-guide" style={{ marginBlockStart: 0 }}>
          <div className="guide-head">
            <div>
              <h3>{t('التشغيل التلقائي وإدارة المفاتيح والإضافات', 'Zero-Account Mode & Phone Hub Management')}</h3>
              <p>{t(<>يعمل التطبيق فور التثبيت بلا حسابات أو مفاتيح. يمكنك إضافة المفاتيح الاختيارية والإضافات من الهاتف عبر {L('TV Hub ← Connection')}.</>, 'The app works right after install with no account or keys. You can manage optional API keys and addons from the phone in TV Hub → Connection.')}</p>
            </div>
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

      <section id="patch-notes" className="wrap section" aria-labelledby="patch-notes-title">
        <div className="section-head">
          <div>
            <h2 id="patch-notes-title">{t('سجل التحديثات', 'Patch notes')}</h2>
            <a className="link" href={siteConfig.releases}>{t('كل الإصدارات على GitHub', 'All releases on GitHub')}<ArrowUpRight size={16} /></a>
          </div>
          <div className="dl-tabs" role="group" aria-label={t('اختر التطبيق', 'Choose an app')}>
            {catalog.map((build) => (
              <button
                key={build.id}
                type="button"
                className={'dl-tab' + (notesDevice === build.id ? ' active' : '')}
                aria-pressed={notesDevice === build.id}
                onClick={() => setNotesDevice(build.id)}
              >
                {build.device === 'tv' ? t('التلفاز', 'TV') : t('الهاتف', 'Phone')}
              </button>
            ))}
          </div>
        </div>

        <div className="detail-notes-grid" dir={ar ? 'rtl' : 'ltr'}>
          {notes.map((release) => (
            <article key={release.version} className="dl-release-block">
              <div className="dl-release-head">
                <code dir="ltr">v{release.version} (code {release.versionCode}) · {release.date}</code>
                {release.latest && <span className="dl-latest-badge"><CheckCircle2 size={12} /> {t('الإصدار الحالي', 'Current release')}</span>}
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
