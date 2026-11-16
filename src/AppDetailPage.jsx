import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Copy, Download,
  Maximize2, MessageSquare, Monitor, ShieldCheck, Smartphone, Sparkles, Wrench, Puzzle
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
            <span className="badge-ok"><ShieldCheck size={14} /> {t('آمن 100% — بلا أسرار مضمّنة', '100% Safe — Zero Hardcoded Secrets')}</span>
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
                  <>منظومة {L('MEEDX')} المتكاملة للسينما المنزلية: تطبيق شاشة {L('Android TV')} لعرض مكتبتك وإعلانات {L('16:9')} بدقة {L('4K / HDR')}، وتطبيق الهاتف المرافق ({L('TV Hub')}) للتحكم عن بُعد، بث التورنت والمباريات، وإدارة الإضافات والنسخ الاحتياطي.</>,
                  'The complete MEEDX home cinema suite: an Android TV app for your 4K/HDR library & 16:9 Home Trailers, paired with the Phone companion (TV Hub) for remote control, torrent/live casting, addons, and cloud backup.'
                )}
              </p>
            </div>
          </div>

          <div className="semantic-alerts">
            <span className="badge-ok"><CheckCircle2 size={15} /> {t('متاح للتنزيل المباشر · Open Source GPL-3.0', 'Available for Direct Download · Open Source GPL-3.0')}</span>
            <span className="badge-warn"><AlertTriangle size={15} /> {t('تنبيه مهم قبل التثبيت: فعّل «تثبيت التطبيقات من مصادر غير معروفة» على أندرويد والتلفاز.', 'Important Notice: Enable "Install from Unknown Sources" on Android and TV before installing.')}</span>
          </div>

          <div className="detail-dl-grid">
            {[tvApp, phoneApp].filter(Boolean).map((p) => (
              <div key={p.id} className="detail-dl-box">
                <div className="file-title">
                  {p.device === 'tv' ? <Monitor /> : <Smartphone />}
                  <div>
                    <h3>{p.name}</h3>
                    <code dir="ltr">v{p.version} · {p.specs?.sizeLabel} · {p.specs?.platform[lang]} · {p.specs?.architecture[lang]}</code>
                  </div>
                  <span className="badge-ok">{t('مفعّل', 'Active')}</span>
                </div>
                <div className="hash">
                  <code dir="ltr">SHA-256<br />{p.sha256}</code>
                  <button type="button" onClick={() => copy(p.sha256)} aria-label={t('نسخ بصمة ', 'Copy checksum for ') + p.name}>
                    <Copy size={17} />
                  </button>
                </div>
                <div className="file-actions">
                  <button type="button" className="button primary" onClick={() => setModal({ id: 'download', file: p })}>
                    {t(<>تنزيل {p.device === 'tv' ? L('TV APK') : L('Phone APK')}</>, p.device === 'tv' ? 'Download TV APK' : 'Download Phone APK')}
                    <Download size={17} />
                  </button>
                  <button type="button" className="link" onClick={() => contact(p.name)}>
                    {t('بلاغ أو اقتراح', 'Report or suggest')}
                  </button>
                </div>
              </div>
            ))}
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

      <AddonsConnectionsSection t={t} L={L} copy={copy} />

      <section className="wrap section" aria-label={t('سجل التحديثات الكامل', 'Full Patch Notes')}>
        <div className="section-head">
          <div>
            <h2>{t('سجل التحديثات الكامل (Patch Notes)', 'Full Patch Notes (v1.0.0-beta.6 → beta.7)')}</h2>
            <p>{t('جميع الميزات والتحسينات المضافة في الإصدارين السادس والسابع لتطبيق الشاشة والهاتف.', 'All features and improvements across v1.0.0-beta.6 and v1.0.0-beta.7.')}</p>
          </div>
          <span className="gh-ver-badge" dir="ltr">v1.0.0-beta.7</span>
        </div>

        <div className="detail-notes-grid">
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
