import React, { useState } from 'react';
import {
  Monitor, Smartphone, Copy, Download, ShieldCheck, Sparkles,
  Wrench, FileText, Info, CheckCircle2
} from 'lucide-react';

export function DownloadAppCard({ p, ar, t, L, copy, onDownload, onContact }) {
  const [panel, setPanel] = useState('specs');
  const lang = ar ? 'ar' : 'en';
  const specs = p.specs;
  const notes = p.updateNotes || [];

  return (
    <article className="dl-card">
      <div className="file-title">
        {p.device === 'tv' ? <Monitor /> : <Smartphone />}
        <div>
          <div className="dl-title-row">
            <h3>{p.name}</h3>
            {p.status && <span className="dl-status-pill">{p.status[lang]}</span>}
          </div>
          <code dir="ltr">
            v{p.version} · code {p.versionCode} · {specs ? specs.sizeLabel : `${(p.sizeBytes / 1048576).toFixed(1)} MiB`} · APK
          </code>
        </div>
        <span className="signal" aria-label={t('متاح', 'Available')} />
      </div>

      <div className="dl-tabs" role="tablist" aria-label={t('تفاصيل التطبيق وملاحظات الإصدار', 'App details and update notes')}>
        <button
          type="button"
          role="tab"
          aria-selected={panel === 'specs'}
          className={'dl-tab' + (panel === 'specs' ? ' active' : '')}
          onClick={() => setPanel('specs')}
        >
          <Info size={15} />
          <span>{t('معلومات التطبيق والأمان', 'App Specs & Security')}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={panel === 'notes'}
          className={'dl-tab' + (panel === 'notes' ? ' active' : '')}
          onClick={() => setPanel('notes')}
        >
          <FileText size={15} />
          <span>{t('ملاحظات الإصدار وما أضفناه', 'Update Notes')}</span>
        </button>
      </div>

      {panel === 'specs' && (
        <div key="specs" className="dl-panel sc-animate">
          {specs && (
            <dl className="dl-spec-grid">
              <div>
                <dt>{t('الإصدار والتاريخ', 'Version & Date')}</dt>
                <dd><code dir="ltr">v{p.version} (code {p.versionCode}) · {p.releaseDate}</code></dd>
              </div>
              <div>
                <dt>{t('المنصة والمتطلبات', 'Platform')}</dt>
                <dd>{specs.platform[lang]}</dd>
              </div>
              <div>
                <dt>{t('المعمارية والحجم', 'Architecture & Size')}</dt>
                <dd><code dir="ltr">{specs.architecture[lang]} · {specs.sizeLabel}</code></dd>
              </div>
              <div>
                <dt>{t('الترخيص والأمان', 'License & Security')}</dt>
                <dd className="dl-sec-dd">
                  <ShieldCheck size={14} />
                  <span><bdi dir="ltr">{specs.license}</bdi> · {specs.security[lang]}</span>
                </dd>
              </div>
            </dl>
          )}
          <div className="hash">
            <code dir="ltr">SHA-256<br />{p.sha256}</code>
            <button type="button" onClick={() => copy(p.sha256)} aria-label={t('نسخ بصمة ', 'Copy checksum for ') + p.name}>
              <Copy size={17} />
            </button>
          </div>
        </div>
      )}

      {panel === 'notes' && (
        <div key="notes" className="dl-panel dl-notes-list sc-animate">
          {notes.map((release) => (
            <div key={release.version} className="dl-release-block">
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
                  <h4><Wrench size={15} /> {t('تحسينات الأداء والواجهة (Improvements & Fixes)', 'Improvements & Fixes')}</h4>
                  <ul>
                    {release.improvements[lang].map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="file-actions">
        <button type="button" className="button primary" onClick={onDownload}>
          {t(<>تنزيل {L('APK')}</>, 'Download APK')}
          <Download size={17} />
        </button>
        <button type="button" className="link" onClick={onContact}>
          {t('بلاغ أو اقتراح', 'Report or suggest')}
        </button>
      </div>
    </article>
  );
}
