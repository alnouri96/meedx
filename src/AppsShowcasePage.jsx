import React from 'react';
import {
  ArrowUpRight, CheckCircle2, Download, Layers, Monitor, Smartphone,
  ShieldCheck, Sparkles, Tv, Puzzle
} from 'lucide-react';

export function LocalCinemaPoster({ t }) {
  return (
    <div className="lc-poster-stage" aria-label={t('معاينة شاشة التلفاز والهاتف لتطبيق Local Cinema', 'Local Cinema TV and Phone framed preview')}>
      <div className="lc-stage-tv">
        <img
          src="/assets/screenshots/tv_2026-11-15_19-41-02.png"
          alt={t('واجهة Local Cinema على Android TV', 'Local Cinema on Android TV')}
          loading="eager"
        />
        <span className="lc-device-tag"><Monitor size={12} /> Android TV · 4K</span>
      </div>
      <div className="lc-stage-phone">
        <img
          src="/assets/screenshots/phone_2026-11-15_19-41-02.png"
          alt={t('واجهة Local Cinema Manager على الهاتف', 'Local Cinema Manager on Phone')}
          loading="eager"
        />
        <span className="lc-device-tag"><Smartphone size={12} /> TV Hub</span>
      </div>
    </div>
  );
}

export function AppsShowcasePage({ t, L, navigate, version }) {
  const tags = [
    { icon: Tv, label: 'Android TV' },
    { icon: Smartphone, label: 'Android' },
    { icon: Sparkles, label: t('إعلانات 16:9 وبث مباشر', '16:9 Trailers & Live Cast') },
    { icon: Layers, label: t('ترجمة تلقائية', 'Auto Subtitles') },
    { icon: CheckCircle2, label: t('مجاني ومفتوح المصدر', 'Free & Open Source') },
  ];

  return (
    <section className="wrap section sc-animate" aria-label={t('التطبيقات', 'Apps')}>
      <div className="section-head">
        <div>
          <span className="sc-kicker"><Sparkles size={15} /> {t('إصدارات MEEDX', 'MEEDX Releases')}</span>
          <h1>{t('التطبيقات', 'Apps')}</h1>
          <p>{t('استعرض تطبيقات MEEDX واختر أي تطبيق لفتح صفحته المستقلة ومعاينة الصور والإضافات وسجل التحديثات.', 'Explore MEEDX apps and open any app for its dedicated page, screenshots, addons, specs, and patch notes.')}</p>
        </div>
        <span className="badge-ok"><CheckCircle2 size={15} /> {t('مكتمل ومفحوص ✓', 'Verified & Ready ✓')}</span>
      </div>

      <article className="gh-app-card">
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
                <h2>Local Cinema</h2>
                <span className="gh-ver-badge" dir="ltr">v{version}</span>
                <span className="badge-ok"><ShieldCheck size={14} /> {t('متاح للتنزيل المباشر', 'Ready for Direct Download')}</span>
              </div>
              <p>{t(<>منظومة سينما منزلية متكاملة تجمع شاشة {L('Android TV')} والهاتف بواجهة داكنة وذهبية مع إعلانات {L('16:9')}، تورنت فوري، ترجمة تلقائية، وإضافات {L('Nuvio / Stremio')}.</>, 'A complete home cinema suite pairing Android TV and Phone with 16:9 Home Trailers, instant torrent playback, auto subtitles, and Nuvio / Stremio addons.')}</p>
            </div>
          </div>

          <div className="gh-tag-list">
            {tags.map((tg) => {
              const Icon = tg.icon;
              return (
                <span key={tg.label} className="gh-tag">
                  <Icon size={14} />
                  <span>{tg.label}</span>
                </span>
              );
            })}
          </div>

          <div className="gh-app-actions">
            <a
              href="/apps/local-cinema"
              className="button primary"
              onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}
            >
              <span>{t('فتح صفحة التطبيق والإضافات', 'Open App Page & Addons')}</span>
              <ArrowUpRight size={17} />
            </a>
            <a
              href="/apps/local-cinema#addons"
              className="button"
              onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema#addons'); }}
            >
              <Puzzle size={17} />
              <span>{t('الإضافات ومفاتيح API', 'Addons & API Guides')}</span>
            </a>
            <a
              href="/downloads"
              className="button"
              onClick={(e) => { e.preventDefault(); navigate('/downloads'); }}
            >
              <Download size={17} />
              <span>{t('مركز التحميل المباشر', 'Direct Downloads')}</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
