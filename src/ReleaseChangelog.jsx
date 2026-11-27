import React, { useState } from 'react';
import { CheckCircle2, Monitor, Smartphone, Subtitles } from 'lucide-react';

const sectionTypes = [
  { id: 'tv', en: 'Local Cinema TV', ar: 'تطبيق التلفاز', Icon: Monitor },
  { id: 'phone', en: 'Local Cinema Manager', ar: 'تطبيق الهاتف', Icon: Smartphone },
  { id: 'shared', en: 'Shared Across TV & Phone', ar: 'التحديثات المشتركة بين التلفاز والهاتف', Icon: Subtitles },
];

function currentRelease(build) {
  return build?.updateNotes?.find((release) => release.latest) ?? build?.updateNotes?.[0];
}

function ReleaseSections({ builds, lang }) {
  const tv = currentRelease(builds.find((build) => build.id === 'tv'));
  const phone = currentRelease(builds.find((build) => build.id === 'phone'));
  const sections = {
    tv: tv?.sections?.tv,
    phone: phone?.sections?.phone,
    shared: tv?.sections?.shared ?? phone?.sections?.shared,
  };

  return sectionTypes.map(({ id, en, ar, Icon }) => {
    const items = sections[id]?.[lang];
    if (!items?.length) return null;
    return (
      <section className="release-section-card" data-release-section={id} key={id} aria-label={lang === 'ar' ? ar : en}>
        <h3><Icon size={20} aria-hidden="true" /><bdi>{lang === 'ar' ? ar : en}</bdi></h3>
        <ul>
          {items.map(({ title, description }) => (
            <li key={title}><h4>{title}</h4><p>{description}</p></li>
          ))}
        </ul>
      </section>
    );
  });
}

export function ReleaseNotes({ release, lang, builds, showVersion = true }) {
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
      {builds && release.sections && <ReleaseSections builds={builds} lang={lang} />}
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
  const latestNote = currentRelease(primaryBuild);

  return (
    <>
      <div className="changelog-controls">
        {primaryBuild && <code dir="ltr">v{primaryBuild.version}</code>}
        <div className="dl-tabs" role="group" aria-label={t('لغة سجل التغييرات', 'Changelog language')}>
          <button type="button" className="dl-tab" lang="ar" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')}>العربية</button>
          <button type="button" className="dl-tab" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
        </div>
      </div>
      <div className="changelog-notes" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {latestNote?.sections
          ? <ReleaseSections builds={builds} lang={lang} />
          : latestNote && <ReleaseNotes release={latestNote} lang={lang} showVersion={false} />}
      </div>
    </>
  );
}
