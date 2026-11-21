import React from 'react';
import { ArrowUpRight, Monitor, Puzzle, Smartphone } from 'lucide-react';

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

export function AppsShowcasePage({ t, navigate, version }) {
  return (
    <section className="wrap section sc-animate" aria-label={t('التطبيقات', 'Apps')}>
      <div className="section-head">
        <div>
          <h1>{t('التطبيقات', 'Apps')}</h1>
        </div>
      </div>

      <article className="gh-app-card">
        <div className="gh-app-media">
          <LocalCinemaPoster t={t} />
        </div>

        <div className="gh-app-body">
          <div className="gh-app-top">
            <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" className="gh-app-icon" />
            <div>
              <div className="gh-app-title-row">
                <h2>Local Cinema</h2>
                <span className="gh-ver-badge" dir="ltr">v{version}</span>
              </div>
              <p>{t('مشغّل مكتبة منزلية للتلفاز، مع تطبيق هاتف للتحكم والبث.', 'A home library player for Android TV with a companion app for remote control and casting.')}</p>
            </div>
          </div>

          <div className="gh-app-actions">
            <a
              href="/apps/local-cinema"
              className="button primary"
              onClick={(e) => { e.preventDefault(); navigate('/apps/local-cinema'); }}
            >
              <span>{t('عرض Local Cinema', 'View Local Cinema')}</span>
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
          </div>
        </div>
      </article>
    </section>
  );
}
