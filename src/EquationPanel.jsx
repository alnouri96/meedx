import React from 'react';

const apps = [
  {
    id: 'nova',
    name: 'Nova Video Player',
    ar: 'مشغّل فيديو',
    en: 'Video player',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#0f2537" stroke="#38bdf8" strokeWidth="2"/>
        <circle cx="24" cy="24" r="13" fill="none" stroke="#38bdf8" strokeWidth="1.75" opacity="0.45"/>
        <polygon points="20,16 34,24 20,32" fill="#38bdf8"/>
      </svg>
    ),
  },
  {
    id: 'kodi',
    name: 'Kodi',
    ar: 'مركز وسائط',
    en: 'Media center',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="10" y="10" width="28" height="28" rx="6" transform="rotate(45 24 24)" fill="#0e2a38" stroke="#17b2e7" strokeWidth="2"/>
        <path d="M18 16v16M18 24l9-8M18 24l9 8" stroke="#17b2e7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'plex',
    name: 'Plex',
    ar: 'بث المكتبة',
    en: 'Library server',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#231c0d" stroke="#e5a00d" strokeWidth="2"/>
        <path d="M18 13h7l9 11-9 11h-7l9-11-9-11z" fill="#e5a00d"/>
      </svg>
    ),
  },
  {
    id: 'caster',
    name: 'Web Video Caster',
    ar: 'بث الويب للشاشة',
    en: 'Web casting',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#2a180d" stroke="#fb923c" strokeWidth="2"/>
        <rect x="11" y="13" width="26" height="18" rx="3" fill="none" stroke="#fb923c" strokeWidth="2"/>
        <path d="M13 35a6 6 0 0 1 6 6M13 30a11 11 0 0 1 11 11" fill="none" stroke="#fb923c" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="13.5" cy="40.5" r="2" fill="#fb923c"/>
      </svg>
    ),
  },
  {
    id: 'remote',
    name: 'TV Remote',
    ar: 'ريموت ذكي',
    en: 'Smart remote',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="14" y="5" width="20" height="38" rx="7" fill="#0f2920" stroke="#34d399" strokeWidth="2"/>
        <circle cx="24" cy="11" r="2" fill="#34d399"/>
        <circle cx="24" cy="21" r="6" fill="none" stroke="#34d399" strokeWidth="2"/>
        <circle cx="24" cy="21" r="2" fill="#34d399"/>
        <circle cx="20" cy="32" r="1.7" fill="#34d399"/>
        <circle cx="28" cy="32" r="1.7" fill="#34d399"/>
        <circle cx="20" cy="37" r="1.7" fill="#34d399"/>
        <circle cx="28" cy="37" r="1.7" fill="#34d399"/>
      </svg>
    ),
  },
  {
    id: 'mouse',
    name: 'Air Mouse',
    ar: 'ماوس هوائي',
    en: 'Air mouse',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#1e1736" stroke="#a78bfa" strokeWidth="2"/>
        <path d="M17 12l16 11-7 2 4 9-3.5 1.5-4-9-5.5 4.5V12z" fill="#a78bfa"/>
        <path d="M31 11c3 1.5 5 4 5.5 7" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'gamepad',
    name: 'Gamepad / Joystick',
    ar: 'يد تحكم ألعاب',
    en: 'Game controller',
    svg: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="11" fill="#2d1424" stroke="#f472b6" strokeWidth="2"/>
        <path d="M14 19h20a6 6 0 0 1 6 7l-1.5 7a3.5 3.5 0 0 1-6 1.5L29 31H19l-3.5 3.5a3.5 3.5 0 0 1-6-1.5L8 26a6 6 0 0 1 6-7z" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 25h6M17 22v6" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="31" cy="23.5" r="1.5" fill="#f472b6"/>
        <circle cx="34.5" cy="26.5" r="1.5" fill="#f472b6"/>
      </svg>
    ),
  },
];

export function EquationPanel({ t }) {
  return (
    <div className="equation-panel" aria-label={t('معادلة منظومة Local Cinema', 'Local Cinema all-in-one equation')}>
      <div className="equation-head">
        <span>{t('7 تطبيقات وأدوات في منظومة واحدة', '7 apps & tools in one unified system')}</span>
        <code dir="ltr">7-in-1 · Local Cinema</code>
      </div>
      <div className="equation-flow">
        <div className="equation-items">
          {apps.map((app, index) => (
            <React.Fragment key={app.id}>
              <div className="eq-item">
                <div className="eq-icon">{app.svg}</div>
                <strong dir="ltr">{app.name}</strong>
                <span>{t(app.ar, app.en)}</span>
              </div>
              {index < apps.length - 1 && (
                <span className="eq-op" aria-hidden="true">+</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="eq-equals" aria-hidden="true">=</div>
        <div className="eq-result">
          <img src="/assets/icons/local-cinema-icon.png" alt="Local Cinema" width="84" height="84"/>
          <div className="eq-result-copy">
            <strong dir="ltr">Local Cinema</strong>
            <span>{t('كل هذا وأكثر في منظومة واحدة متكاملة', 'All this and more in one unified ecosystem')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
