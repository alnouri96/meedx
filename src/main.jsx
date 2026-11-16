import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Menu,X,Download,Monitor,Smartphone,Maximize2,Copy,MessageSquare,Heart,ShieldCheck,Gamepad2,Terminal,ArrowDown,ArrowUpRight,Film,KeyRound} from 'lucide-react';
import {Swiper,SwiperSlide} from 'swiper/react';
import {A11y,Keyboard,Navigation,Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import '@fontsource/jetbrains-mono/400.css';
import {siteConfig} from './config/siteConfig';
import screenshotGroups from './data/screenshots.json';
import {screenshotCopy} from './data/screenshot-copy';
import {Panels} from './panels';
import {EquationPanel} from './EquationPanel';
import {InteractiveShowcase} from './InteractiveShowcase';
import {AddonsConnectionsSection} from './AddonsConnectionsSection';
import {DownloadAppCard} from './DownloadAppCard';
import './style.css';
import './gallery.css';
import './showcase.css';

function App(){
 const [ar,setAr]=useState(true),[menu,setMenu]=useState(false),[modal,setModal]=useState(null),[slide,setSlide]=useState(0),[toast,setToast]=useState('');
 const t=(a,e)=>ar?a:e;
 const L=s=><bdi dir="ltr">{s}</bdi>;
 const catalog=siteConfig.downloads;
 const releaseVersion=catalog[0]?.version??'1.0.0-beta.2';
 const shortVersion=releaseVersion.replace(/^1\.0\.0-/,'');
 const shots=screenshotGroups.map(group=>{
   const [titleAr,titleEn,descriptionAr,descriptionEn]=screenshotCopy[group.id] ?? [
     <>لقطة {L('Local Cinema')}</>, 'Local Cinema screenshot',
     <>لقطة من منظومة {L('Local Cinema')}.</>, 'A capture from the Local Cinema system.'
   ];
   return {...group,name:t(titleAr,titleEn),text:t(descriptionAr,descriptionEn)};
 });
 const hero=shots.find(shot=>shot.id==='15-19-11') ?? shots[0];
 const heroTv=hero.images.find(photo=>photo.device==='tv');
 const heroPhone=hero.images.find(photo=>photo.device==='phone');
 const label=device=>device==='tv'?t('التلفاز','TV'):device==='pc'?t('الحاسوب','Windows PC'):t('الهاتف','Phone');
 useEffect(()=>{document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';document.title=t('MEEDX — استوديو تطوير التطبيقات والألعاب والحلول التقنية','MEEDX — Apps, games & tech solutions studio')},[ar]);
 useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),2200);return()=>clearTimeout(id)},[toast]);
 async function copy(value){try{await navigator.clipboard.writeText(value);setToast(t('تم النسخ','Copied'))}catch{setToast(t('تعذر النسخ. حدّد النص وانسخه يدوياً.','Select and copy the text manually.'))}}
 const links=[['apps',t('التطبيقات','Apps')],['lab',t('الألعاب والأدوات','Games & tools')],['services',t('الخدمات','Services')],['downloads',t('التحميلات','Downloads')],['addons',t('الإضافات والتوصيلات','Plugins & Connections')]];
 const contact=(topic='Local Cinema',kind='feature')=>setModal({id:'telegram',topic,kind});
 const support=()=>setModal({id:'support'});
 const image=(file,alt,props)=> <img src={'/assets/screenshots/'+file} alt={alt} {...props}/>;
 return <>
 <a href="#main" className="skip">{t('انتقل للمحتوى','Skip to content')}</a>
 <header><div className="wrap top"><a href="#" className="wordmark"><img src="/assets/meedx.svg" alt=""/>MEEDX</a><nav className="desktop" aria-label={t('التنقل الرئيسي','Main navigation')}>{links.map(([id,s])=><a href={'#'+id} key={id}>{s}</a>)}</nav><div className="actions"><button className="lang" onClick={()=>setAr(!ar)} aria-label={t('Switch to English','التبديل إلى العربية')}>{ar?'EN':'AR'}</button><button className="desktop" onClick={()=>contact()}><MessageSquare size={17}/>{t('تواصل','Contact')}</button><button className="desktop top-support" onClick={support}><Heart size={17}/>{t(<>ادعم {L('MEEDX')}</>,'Support MEEDX')}</button><button className="mobile" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-menu" aria-label={t('القائمة','Menu')}>{menu?<X/>:<Menu/>}</button></div></div>
 {menu&&<nav id="mobile-menu" className="mobile drawer" aria-label={t('قائمة الهاتف','Mobile menu')}>{links.map(([id,s])=><a href={'#'+id} key={id} onClick={()=>setMenu(false)}>{s}<ArrowUpRight size={18}/></a>)}<button onClick={()=>{setMenu(false);contact()}}>{t('اقتراح أو طلب عمل','Feedback or work request')}<MessageSquare size={18}/></button><button onClick={()=>{setMenu(false);support()}}>{t('زين كاش / كي كارد','ZainCash / QiCard')}<Heart size={18}/></button></nav>}</header>
 <main id="main">
 <section className="wrap hero">
 <div className="hero-copy"><h1>{t('شاشتك ومكتبتك،','Your TV and library,')}<br/>{t('بيدك.','in your hands.')}</h1><p>{t(<>منظومة {L('Local Cinema')} المتكاملة تجمع مكتبة أفلامك ومسلسلاتك المحلية وعبر الويب على شاشة {L('Android TV')} بواجهة سينمائية ذكية تجلب البوسترات والتقييمات والترجمة العربية تلقائياً، وتحوّل هاتفك إلى ريموت وماوس هوائي ويد تحكم متكاملة. الإصدار الأول من {L('MEEDX')} — استوديو تطوير التطبيقات والألعاب والحلول التقنية.</>,'The complete Local Cinema suite brings your local and web movies and series to Android TV with a smart cinematic interface featuring automatic posters, ratings, and Arabic subtitles—while turning your phone into a full remote, air mouse, and gamepad. The debut release by MEEDX — a studio for apps, games, and tech solutions.')}</p><div className="hero-buttons"><a href="#downloads" className="button primary">{t('حمّل النسخة التجريبية','Get the beta')}<Download size={18}/></a><a href="#apps" className="button">{t(<>استكشف {L('Local Cinema')}</>,'Explore Local Cinema')}<ArrowUpRight size={18}/></a></div><div className="hero-meta"><span className="signal"/><code dir="ltr">v{releaseVersion}</code><span>{t('متاح للتحميل المباشر','Available for download')}</span></div></div>
 <div className="hardware"><div className="tv-frame">{image(heroTv.file,hero.name,{fetchPriority:'high',width:1920,height:1080})}<div className="bezel"><span>LOCAL CINEMA</span><i/></div><div className="stand"/></div><div className="phone-frame">{image(heroPhone.file,hero.name,{width:1080,height:2340})}</div><div className="frame-meta"><span><Monitor size={16}/> Android TV</span><span><Smartphone size={16}/> Android</span></div></div>
 <div className="hero-foot"><span>MEEDX Studio</span><a href="#lab">{t('الألعاب وأدوات الحاسوب','Gaming & PC tools')}<ArrowDown size={16}/></a></div>
 </section>
 <section id="apps" className="band"><div className="wrap section"><div className="section-head"><div><h2>Local Cinema</h2><p>{t('معاينة قصيرة لمنظومة الشاشة والهاتف.','A short preview of the TV and phone apps.')}</p></div><code dir="ltr">{shortVersion}</code></div><div className="gallery"><div className="gallery-media"><Swiper key={ar?'ar':'en'} dir={ar?'rtl':'ltr'} modules={[A11y,Keyboard,Navigation,Pagination]} keyboard={{enabled:true,onlyInViewport:true}} navigation pagination={{clickable:true}} onSwiper={()=>setSlide(0)} onSlideChange={s=>setSlide(s.activeIndex)}>{shots.map((shot,index)=><SwiperSlide key={shot.id}>
   <div className={'paired-shots' + (shot.images.length===1?' solo':'')}>
     {shot.images.map(photo=><button type="button" key={photo.file}
       className={'gallery-device gallery-'+photo.device}
       onClick={()=>setModal({id:'lightbox',index,device:photo.device})}
       aria-label={t('تكبير لقطة ','Zoom screenshot: ')+label(photo.device)}>
       {image(photo.file,shot.name+' · '+label(photo.device),{loading:index<2?'eager':'lazy'})}
       <span><Maximize2 size={15}/>{t('تكبير','Zoom')} · {label(photo.device)}</span>
     </button>)}
   </div>
 </SwiperSlide>)}</Swiper></div><article className="gallery-info"><code>{slide+1} / {shots.length}</code><h3>{shots[slide].name}</h3><p>{shots[slide].text}</p><button className="link" onClick={()=>contact()}>{t('شارك ملاحظة عن التطبيق','Share app feedback')}<MessageSquare size={17}/></button></article></div><EquationPanel t={t}/><InteractiveShowcase t={t} L={L} copy={copy}/></div></section>
 <section id="lab" className="wrap section"><div className="section-head"><div><h2>{t('الألعاب وأدوات الحاسوب','Gaming & PC tools')}</h2><p>{t('مساحة المشاريع القادمة.','A space for upcoming projects.')}</p></div></div><div className="lab">{[[Gamepad2,'Gaming & Tweaks',t('إعدادات التحكم وملفات تخصيص الألعاب.','Control layouts and game configurations.')],[Terminal,'PC Software & Scripts',t(<>أدوات {L('Windows')} و{L('PowerShell')} و{L('ADB')}.</>,'Windows, PowerShell and ADB utilities.')]].map(([Icon,name,desc])=><article key={name}><Icon size={33}/><h3>{name}</h3><p>{desc}</p><span>{t('لا توجد ملفات منشورة في المعاينة','No files in this preview')}</span></article>)}</div></section>
 <section id="services" className="band"><div className="wrap section services"><div><h2>{t('الخدمات التقنية','Technical services')}</h2><p>{t('صيانة الأجهزة وتطوير أدوات مخصصة.','Device maintenance and custom software.')}</p></div><div>{[t('صيانة الهواتف','Phone repair'),t('تجميع وصيانة الحاسوب','PC assembly & maintenance'),t('تطبيقات وسكربتات مخصصة','Custom apps & scripts')].map(name=><article key={name}><h3>{name}</h3><button className="link" onClick={()=>contact(name,'service')}>{t('اطلب عبر تلجرام','Request via Telegram')}<ArrowUpRight size={16}/></button></article>)}</div></div></section>
 <section id="downloads" className="wrap section"><div className="section-head"><div><h2>{t('مركز التحميل','Downloads hub')}</h2><p>{t(<>ملفات النسخة التجريبية عبر {L('GitHub Releases')} وبصمات التحقق.</>,'Beta release files from GitHub Releases and verification hashes.')}</p></div><div className="head-tools"><a className="link" href={siteConfig.githubReleases} target="_blank" rel="noopener noreferrer">GitHub Releases <ArrowUpRight size={16}/></a><ShieldCheck size={31}/></div></div><div className="downloads">{catalog.filter(p=>p.available).map(p=><DownloadAppCard key={p.id} p={p} ar={ar} t={t} L={L} copy={copy} onDownload={()=>setModal({id:'download',file:p})} onContact={()=>contact(p.name)}/>)}</div>
 <div id="setup-guide" className="setup-guide">
   <div className="guide-head">
     <div>
       <h3>{t('التشغيل التلقائي وإدارة المفاتيح والإضافات','Zero-Account Mode & Phone Hub Management')}</h3>
       <p>{t(<>يعمل التطبيق تلقائياً بلا أي مفاتيح أو حسابات، ويمكنك إدارة المفاتيح الاختيارية والإضافات بسهولة من تطبيق الهاتف عبر {L('TV Hub ← Connection')}.</>,'The app works automatically with no keys or accounts required; optional API keys and addons are managed easily from the phone app via TV Hub → Connection.')}</p>
     </div>
     <a href="#addons" className="button primary">{t('الانتقال إلى دليل الإضافات والتوصيلات','Open Plugins & Connections Guide')}<ArrowUpRight size={16}/></a>
   </div>
   <div className="guide-grid">
     <article className="guide-card">
       <div className="guide-title"><Film size={24}/><div><h4>{t('وضع التشغيل التلقائي بلا حساب','Zero-Account Instant Mode')}</h4><code dir="ltr">Zero-Config · Cinemeta / TVmaze / Jikan / Subsource</code></div><span className="signal" aria-label={t('مفعّل تلقائياً','Enabled automatically')}/></div>
       <p>{t(<>تعمل البوسترات، التقييمات من مصادر متعددة، صفحات الممثلين وأعمالهم، والترجمة التلقائية فور التثبيت بدون أي تسجيل أو مفاتيح {L('API')}.</>,'Posters, multi-source ratings, cast filmographies, and automatic subtitles work right after install without any login or API keys.')}</p>
     </article>
     <article className="guide-card">
       <div className="guide-title"><KeyRound size={24}/><div><h4>{t(<>إدارة المفاتيح والإضافات من الهاتف ({L('TV Hub ← Connection')})</>,'Manage Keys & Addons from Phone (TV Hub → Connection)')}</h4><code dir="ltr">API_KEYS_SYNC · ADDONS_SYNC · WATCH_SYNC</code></div></div>
       <p>{t(<>عند إضافة مفاتيح اختيارية ({L('Trakt / Subsource / OpenSubtitles / TMDb')}) أو إضافات {L('Nuvio / Stremio')} على هاتفك، تُزامن تلقائياً مع الشاشة عبر الشبكة المحلية.</>,'Optional API keys (Trakt / Subsource / OpenSubtitles / TMDb) and Nuvio / Stremio addons added on your phone sync automatically to TV over your local network.')}</p>
       <div className="guide-links">
         <a className="link" href="#addons">{t('استعرض دليل الإضافات ومفاتيح API التفصيلي','View full Plugins, TCL Guard & API Guides')} <ArrowUpRight size={15}/></a>
       </div>
     </article>
   </div>
 </div>
 </section>
 <AddonsConnectionsSection t={t} L={L} copy={copy}/>
 </main>
 <footer><div className="wrap foot"><div><a href="#" className="wordmark"><img src="/assets/meedx.svg" alt=""/>MEEDX</a><p>{t(<>{L('MEEDX')} · تطوير التطبيقات والألعاب والحلول التقنية</>,'MEEDX · Apps, games & tech solutions')}</p></div><div><h3>{t(<>ادعم تطوير {L('MEEDX')}</>,'Support MEEDX development')}</h3><button className="link" onClick={support}>ZainCash / QiCard <Heart size={17}/></button></div><button className="button" onClick={()=>contact()}>{t('اقتراح أو طلب عمل','Feedback or work request')}<MessageSquare size={17}/></button></div></footer>
 <div className="floating"><button className="primary" onClick={support}><Heart size={17}/>{t(<>ادعم {L('MEEDX')} • زين كاش / {L('Qi')}</>,'Support MEEDX • ZainCash / Qi')}</button><button aria-label={t('نموذج تلجرام','Telegram form')} onClick={()=>contact()}><MessageSquare size={20}/></button></div>
 {modal&&<Panels key={modal.id} modal={modal} setModal={setModal} close={()=>setModal(null)} shots={shots} t={t} copy={copy}/>}
 <div className="toast" role="status">{toast}</div>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
