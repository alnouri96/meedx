import React from 'react';
import { ArrowUpRight, Puzzle } from 'lucide-react';

export function LocalCinemaPoster({ t, navigate, eager = false }) {
  return (
    <a className="lc-poster-link" href="/apps/local-cinema" aria-label={t('بوستر تطبيق Local Cinema', 'Local Cinema artwork')} onClick={(event) => { event.preventDefault(); navigate('/apps/local-cinema'); }}>
      <img
        src="/assets/artwork/local-cinema-hero-wide.webp"
        alt={t('عرض توضيحي لواجهة التلفاز وريموت الهاتف', 'Illustration of the TV interface and phone remote')}
        width={1672}
        height={941}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </a>
  );
}

export function LocalCinemaAppCard({ t, navigate, version }) {
  return (
    <article className="gh-app-card">
      <div className="gh-app-media">
        <LocalCinemaPoster t={t} navigate={navigate} />
      </div>

      <div className="gh-app-body">
        <div className="gh-app-top">
          <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" className="gh-app-icon" />
          <div>
            <div className="gh-app-title-row">
              <h2>Local Cinema</h2>
              <span className="gh-ver-badge" dir="ltr">v{version}</span>
              <span className="gh-ver-badge">{t('مجاني بالكامل', '100% Free')}</span>
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
  );
}

export function AppsShowcasePage({ t, navigate, version }) {
  return (
    <section className="wrap section sc-animate" aria-labelledby="apps-title">
      <div className="section-head"><h1 id="apps-title">{t('التطبيقات', 'Apps')}</h1></div>
      <LocalCinemaAppCard t={t} navigate={navigate} version={version} />
    </section>
  );
}
