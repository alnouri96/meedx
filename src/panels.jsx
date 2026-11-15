import React,{useEffect,useRef,useState} from 'react';
import {X,Copy,Download,ExternalLink} from 'lucide-react';
import {ZoomViewer} from './ZoomViewer';
import {siteConfig} from './config/siteConfig';

export function Panels({modal,close,shots,t,copy}){
 const ref=useRef(null);
 const [device,setDevice]=useState(modal.device);
 const [index,setIndex]=useState(modal.index??0),[confirm,setConfirm]=useState(false);
 const [type,setType]=useState(modal.kind??'feature'),[topic,setTopic]=useState(modal.topic??''),[message,setMessage]=useState('');
 const types={feature:t('اقتراح ميزة','Feature suggestion'),bug:t('بلاغ عن مشكلة','Issue report'),service:t('طلب خدمة أو صيانة','Service request')};
 const telegram=siteConfig.telegramUsername.replace(/^@/,'');
 const suppliedLink=siteConfig.telegramLink?.trim().replace(/^(?:https?:\/\/)?t\.me\//i,'').replace(/\/$/,'');
 const validHandle=value=>/^[A-Za-z0-9_]{5,32}$/.test(value);
 const telegramTarget=validHandle(suppliedLink)?suppliedLink:validHandle(telegram)?telegram:'';
 const telegramReady=Boolean(telegramTarget);
 const payments=Object.entries(siteConfig.payments);
 useEffect(()=>{const before=document.activeElement;const el=ref.current;el.showModal();document.body.classList.add('locked');return()=>{el.close();document.body.classList.remove('locked');before?.focus()}},[]);
 function move(delta){setIndex(i=>(i+delta+shots.length)%shots.length)}
 const title=modal.id==='support'?t('ادعم MEEDX','Support MEEDX'):modal.id==='telegram'?t('تواصل عبر تلجرام','Contact via Telegram'):modal.id==='lightbox'?shots[index].name:t('تحميل النسخة التجريبية','Download the beta');
 return <dialog ref={ref} className={modal.id==='lightbox'?'lightbox':'sheet'} aria-labelledby="dialog-title" onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===ref.current){const r=ref.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}}} onKeyDown={e=>{if(modal.id==='lightbox' && e.target.tagName!=='INPUT'){if(e.key==='ArrowLeft')move(t(1,-1));if(e.key==='ArrowRight')move(t(-1,1))}}}>
  <div className="dialog-head"><h2 id="dialog-title">{title}</h2><button autoFocus onClick={close} aria-label={t('إغلاق','Close')}><X/></button></div>
  <div className="dialog-body">
  {modal.id==='support'&&<><p>{payments.some(([,p])=>!p.configured)?t('الصور المعلّمة مؤقتة وغير صالحة للدفع.','Marked preview images are not valid for payment.'):t('امسح الرمز أو انسخ الرقم من طريقة الدعم التي تفضلها.','Scan the code or copy the account number.')}</p><div className="payments">{payments.map(([id,p])=><article key={id}><h3>{id==='zaincash'?t('زين كاش','ZainCash'):t('كي كارد / الماستر','QiCard / Mastercard')}</h3><img src={p.qr} alt={p.configured?t('رمز الدفع','Payment QR'):t('صورة مؤقتة غير قابلة للدفع','Non-payable preview image')} width="148" height="148"/><code dir="ltr">{p.number||t('الرقم غير مضاف','Number pending')}</code><button className="button" onClick={()=>copy(p.number)} disabled={!p.configured||!p.number}>{t('نسخ الرقم','Copy number')}<Copy size={16}/></button></article>)}</div></>}
  {modal.id==='telegram'&&<form onSubmit={e=>{e.preventDefault();if(!telegramReady)return;const text=['MEEDX',types[type],topic,message].join('\n');window.open('https://t.me/'+telegramTarget+'?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')}}><label htmlFor="type">{t('نوع الرسالة','Message type')}</label><select id="type" value={type} onChange={e=>setType(e.target.value)}>{Object.entries(types).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select><label htmlFor="topic">{t('القسم المعني','Topic')}</label><input id="topic" dir="auto" required maxLength={100} value={topic} onChange={e=>setTopic(e.target.value)}/><label htmlFor="message">{t('التفاصيل','Details')}</label><textarea id="message" dir="auto" rows={3} required maxLength={1200} value={message} onChange={e=>setMessage(e.target.value)}/>{!telegramReady&&<p className="notice">{t('سيُفعّل الزر عند إضافة معرّف تلجرام.','This button will be enabled when a Telegram handle is configured.')}</p>}<button className="button primary" disabled={!telegramReady}>{t('افتح المسودة في تلجرام','Open draft in Telegram')}<ExternalLink size={17}/></button></form>}
  {modal.id==='lightbox'&&<ZoomViewer shots={shots} index={index} device={device} setDevice={setDevice} move={move} t={t}/>}
  {modal.id==='download'&&<><h3>{modal.file.name}</h3><p>{t('قارن بصمة الملف بعد التنزيل مع البصمة في الكتالوج.','Compare the downloaded file checksum with the catalog.')}</p><label className="confirm"><input type="checkbox" checked={confirm} onChange={e=>setConfirm(e.target.checked)}/>{t('راجعت نوع ملف APK','I checked the APK variant')}</label>{confirm&&<a className="button primary" href={modal.file.url} rel="noopener noreferrer" download>{t('ابدأ تنزيل APK','Start APK download')}<Download size={17}/></a>}</>}
  </div>
 </dialog>;
}
