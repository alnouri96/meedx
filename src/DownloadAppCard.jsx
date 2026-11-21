import React from 'react';
import { Copy, Download, Monitor, Smartphone } from 'lucide-react';

export function DownloadAppCard({ build, ar, t, L, copy, onDownload, onContact }) {
  const lang = ar ? 'ar' : 'en';
  const { device, name, version, versionCode, releaseDate, specs, sizeBytes, sha256, downloaderCode, shortUrl } = build;
  const isTv = device === 'tv';
  const DeviceIcon = isTv ? Monitor : Smartphone;

  return (
    <article className="dl-card">
      <div className="file-title">
        <DeviceIcon />
        <div>
          <h2>{name}</h2>
          <code dir="ltr">v{version} · {t('رقم البناء', 'build')} {versionCode}</code>
        </div>
      </div>

      <dl className="dl-spec-grid">
        <div>
          <dt>{t('المنصة', 'Platform')}</dt>
          <dd>{L(specs.platform[lang])}</dd>
        </div>
        <div>
          <dt>{t('المعمارية والحجم', 'Architecture and size')}</dt>
          <dd><code dir="ltr">{specs.architecture[lang]} · {(sizeBytes / 1048576).toFixed(2)} MiB</code></dd>
        </div>
        <div>
          <dt>{t('تاريخ الإصدار', 'Release date')}</dt>
          <dd><time dateTime={releaseDate} dir="ltr">{releaseDate}</time></dd>
        </div>
      </dl>

      {isTv && shortUrl && (
        <div className="downloader-code-box">
          <div className="downloader-code-meta">
            <span className="downloader-code-title">{t('التنزيل عبر التلفاز', 'Download on your TV')}</span>
            {downloaderCode && (
              <p>{t(<>يفتح كود {L('Downloader')} ‏{L(downloaderCode)} مركز التحميل.</>, <>Downloader code {L(downloaderCode)} opens this Downloads hub.</>)}</p>
            )}
            <code dir="ltr">{shortUrl}</code>
          </div>
          <div className="downloader-code-actions">
            {downloaderCode && (
              <button type="button" className="button" onClick={() => copy(downloaderCode)}>
                <Copy size={14} />{t('نسخ الكود', 'Copy code')}
              </button>
            )}
            <button type="button" className="button" onClick={() => copy('https://' + shortUrl)}>
              <Copy size={14} />{t('نسخ رابط APK المباشر', 'Copy direct APK link')}
            </button>
          </div>
        </div>
      )}

      <div className="hash">
        <code dir="ltr">SHA-256<br />{sha256}</code>
        <button type="button" onClick={() => copy(sha256)} aria-label={t('نسخ بصمة ', 'Copy checksum for ') + name}>
          <Copy size={17} />
        </button>
      </div>

      <div className="file-actions">
        <button type="button" className="button primary" onClick={onDownload}>
          <span>{isTv ? t(<>تنزيل {L('APK')} للتلفاز</>, 'Download TV APK') : t(<>تنزيل {L('APK')} للهاتف</>, 'Download Phone APK')}</span>
          <Download size={17} />
        </button>
        <button type="button" className="link" onClick={onContact}>{t('بلاغ أو اقتراح', 'Report or suggest')}</button>
      </div>
    </article>
  );
}
