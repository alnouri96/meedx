import React from 'react';
import { ArrowUpRight, Puzzle } from 'lucide-react';
import { siteConfig } from './config/siteConfig';

export function LocalCinemaPoster({ t, eager = false }) {
  return (
    <a className="lc-poster-link" href={siteConfig.homeUrl}>
      <img
        src="/assets/artwork/local-cinema-poster.webp"
        alt={t('الموقع الرسمي لتطبيق Local Cinema', 'Local Cinema official website')}
        width={1536}
        height={1024}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </a>
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
    </section>
  );
}
