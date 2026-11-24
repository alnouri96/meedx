import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ReleaseNotes({ release, lang, showVersion = true }) {
  const groups = [
    [lang === 'ar' ? 'ما الجديد' : "What's new", release.whatsNew?.[lang]],
    [lang === 'ar' ? 'التحسينات والإصلاحات' : 'Improvements and fixes', release.improvements?.[lang]],
  ].filter(([, items]) => items?.length);

  return (
    <div className="dl-release-block" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {showVersion && (
        <div className="dl-release-head">
          <code dir="ltr">v{release.version} · {release.date}</code>
          {release.latest && (
            <span className="dl-latest-badge"><CheckCircle2 size={12} />{lang === 'ar' ? 'الإصدار الحالي' : 'Current release'}</span>
          )}
        </div>
      )}
      {groups.map(([title, items]) => (
        <section className="dl-note-group" key={title}>
          <h4>{title}</h4>
          <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}

export function CurrentChangelog({ builds, ar, t }) {
  const [lang, setLang] = useState(ar ? 'ar' : 'en');
  const primaryBuild = builds.find((b) => b.id === 'tv') ?? builds[0];
  const latestNote = primaryBuild?.updateNotes?.find((release) => release.latest) ?? primaryBuild?.updateNotes?.[0];

  return (
    <>
      <div className="changelog-controls">
        <code dir="ltr">v{primaryBuild.version}</code>
        <div className="dl-tabs" role="group" aria-label={t('لغة سجل التغييرات', 'Changelog language')}>
          <button type="button" className="dl-tab" lang="ar" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')}>العربية</button>
          <button type="button" className="dl-tab" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
        </div>
      </div>
      <div className="changelog-notes" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {latestNote && (
          <section>
            <h3><bdi>Local Cinema TV &amp; Manager</bdi></h3>
            <ReleaseNotes release={latestNote} lang={lang} showVersion={false} />
          </section>
        )}
      </div>
    </>
  );
}
