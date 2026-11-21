import React, { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { siteConfig } from './config/siteConfig';
import { ZoomViewer } from './ZoomViewer';

function TelegramForm({ initialTopic, initialType, t }) {
  const [topic, setTopic] = useState(initialTopic);
  const [type, setType] = useState(initialType);
  const [message, setMessage] = useState('');
  const types = {
    feature: t('اقتراح', 'Suggestion'),
    bug: t('بلاغ عن مشكلة', 'Bug report'),
    service: t('طلب خدمة', 'Service request'),
  };

  function openDraft(event) {
    event.preventDefault();
    const url = new URL(siteConfig.telegramLink);
    url.searchParams.set('text', ['MEEDX', types[type], topic, message].join('\n'));
    window.open(url.href, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={openDraft}>
      <label htmlFor="type">{t('نوع الرسالة', 'Message type')}</label>
      <select id="type" value={type} onChange={(event) => setType(event.target.value)}>
        {Object.entries(types).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select>
      <label htmlFor="topic">{t('الموضوع', 'Topic')}</label>
      <input id="topic" dir="auto" required maxLength={100} value={topic} onChange={(event) => setTopic(event.target.value)} />
      <label htmlFor="message">{t('التفاصيل', 'Details')}</label>
      <textarea id="message" dir="auto" rows={3} required maxLength={1200} value={message} onChange={(event) => setMessage(event.target.value)} />
      <button className="button primary">{t('افتح المسودة في تلجرام', 'Open draft in Telegram')}<ExternalLink size={17} /></button>
    </form>
  );
}

function DownloadConfirmation({ file, t }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <h3>{file.name}</h3>
      <p>{t('قارن بصمة الملف بعد التنزيل مع البصمة في مركز التحميل.', 'After download, compare the file checksum with the one in the Downloads hub.')}</p>
      <label className="confirm">
        <input type="checkbox" checked={confirm} onChange={(event) => setConfirm(event.target.checked)} />
        {t('تحققت من نسخة التطبيق', 'I checked the APK variant')}
      </label>
      {confirm && (
        <a className="button primary" href={file.url} rel="noopener noreferrer" download>
          {t('ابدأ التنزيل', 'Start APK download')}<Download size={17} />
        </a>
      )}
    </>
  );
}

export function Panels({ modal, close, shots, t }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(modal.index ?? 0);
  const [device, setDevice] = useState(modal.device);
  const isLightbox = modal.id === 'lightbox';
  const titles = {
    support: t('دعم MEEDX', 'Support MEEDX'),
    telegram: t('تواصل عبر تلجرام', 'Contact via Telegram'),
    download: t('تنزيل النسخة التجريبية', 'Download the beta'),
  };

  useEffect(() => {
    const before = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    document.body.classList.add('locked');
    return () => {
      dialog.close();
      document.body.classList.remove('locked');
      before?.focus();
    };
  }, []);

  function move(delta) {
    setIndex((i) => (i + delta + shots.length) % shots.length);
  }

  function onBackdropClick(event) {
    if (event.target !== ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  }

  function onKeyDown(event) {
    if (!isLightbox || event.target.tagName === 'INPUT') return;
    if (event.key === 'ArrowLeft') move(t(1, -1));
    if (event.key === 'ArrowRight') move(t(-1, 1));
  }

  return (
    <dialog
      ref={ref}
      className={isLightbox ? 'lightbox' : 'sheet'}
      aria-labelledby="dialog-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
    >
      <div className="dialog-head">
        <h2 id="dialog-title">{isLightbox ? shots[index].name : titles[modal.id]}</h2>
        <button type="button" autoFocus onClick={close} aria-label={t('إغلاق', 'Close')}><X /></button>
      </div>
      <div className="dialog-body">
        {modal.id === 'support' && (
          <>
            <p>{t('للاستفسار عن دعم المشروع، تواصل مع MEEDX عبر تلجرام.', 'Contact MEEDX on Telegram to ask about supporting the project.')}</p>
            <a className="button primary" href={siteConfig.telegramLink} target="_blank" rel="noopener noreferrer">
              {t('تواصل مع MEEDX', 'Contact MEEDX')}<ExternalLink size={17} />
            </a>
          </>
        )}
        {modal.id === 'telegram' && <TelegramForm initialTopic={modal.topic} initialType={modal.kind} t={t} />}
        {isLightbox && <ZoomViewer shots={shots} index={index} device={device} setDevice={setDevice} move={move} t={t} />}
        {modal.id === 'download' && <DownloadConfirmation file={modal.file} t={t} />}
      </div>
    </dialog>
  );
}
