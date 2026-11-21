import React, {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, Minus, Plus, RotateCcw} from 'lucide-react';

const initial = {scale: 1, x: 0, y: 0};
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function ZoomImage({src, alt, t}) {
  const [view, setView] = useState(initial);
  const frame = useRef(null);
  const image = useRef(null);
  const pointers = useRef(new Map());

  function constrain(scale, x, y) {
    if (!image.current || !frame.current) return {scale, x: 0, y: 0};
    const pad = 24;
    const bound = (imageSize, frameSize) => Math.max(0, (imageSize * scale - Math.max(0, frameSize - pad)) / 2);
    const maxX = bound(image.current.clientWidth, frame.current.clientWidth);
    const maxY = bound(image.current.clientHeight, frame.current.clientHeight);
    return {scale, x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY)};
  }

  function zoom(current, value, from = {x: 0, y: 0}, to = from) {
    const scale = clamp(value, 1, 3);
    const ratio = scale / current.scale;
    return constrain(scale, to.x - (from.x - current.x) * ratio, to.y - (from.y - current.y) * ratio);
  }

  function centerAt(x, y) {
    const rect = frame.current.getBoundingClientRect();
    return {x: x - rect.left - rect.width / 2, y: y - rect.top - rect.height / 2};
  }

  useEffect(() => {
    const el = frame.current;
    function wheel(event) {
      event.preventDefault();
      const point = centerAt(event.clientX, event.clientY);
      const impulse = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientHeight : 1);
      setView(current => zoom(current, current.scale * Math.exp(-impulse * 0.002), point));
    }
    const observer = new ResizeObserver(() => setView(current => constrain(current.scale, current.x, current.y)));
    observer.observe(el);
    el.addEventListener('wheel', wheel, {passive: false});
    return () => {
      el.removeEventListener('wheel', wheel);
      observer.disconnect();
    };
  }, []);

  function pointerDown(event) {
    if (event.button !== 0 || pointers.current.size >= 2) return;
    frame.current.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, centerAt(event.clientX, event.clientY));
  }

  function pointerMove(event) {
    const points = pointers.current;
    const before = points.get(event.pointerId);
    if (!before) return;
    const after = centerAt(event.clientX, event.clientY);
    points.set(event.pointerId, after);
    const other = [...points.entries()].find(([id]) => id !== event.pointerId)?.[1];
    if (other) {
      const distance = point => Math.hypot(point.x - other.x, point.y - other.y);
      const midpoint = point => ({x: (point.x + other.x) / 2, y: (point.y + other.y) / 2});
      if (distance(before) > 1) {
        const ratio = distance(after) / distance(before);
        setView(current => zoom(current, current.scale * ratio, midpoint(before), midpoint(after)));
      }
    } else {
      setView(current => constrain(current.scale, current.x + after.x - before.x, current.y + after.y - before.y));
    }
  }

  function pointerEnd(event) {
    pointers.current.delete(event.pointerId);
  }

  const percentage = Math.round(view.scale * 100);
  return <>
    <div ref={frame} className="zoom-stage" data-zoomed={view.scale > 1}
      tabIndex={0} aria-label={t('حرّك الصورة المكبّرة بمفاتيح الأسهم','Pan the zoomed image with arrow keys')}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd}
      onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}
      onKeyDown={event => {
        const delta = {ArrowLeft:[40,0], ArrowRight:[-40,0], ArrowUp:[0,40], ArrowDown:[0,-40]}[event.key];
        if (delta && view.scale > 1) {
          event.preventDefault();
          event.stopPropagation();
          setView(current => constrain(current.scale, current.x + delta[0], current.y + delta[1]));
        }
      }}>
      <img ref={image} src={src} alt={alt} draggable={false}
        style={{transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`}} />
    </div>
    <div className="zoom-controls">
      <button onClick={() => setView(current => zoom(current, current.scale - .25))}
        disabled={view.scale <= 1} aria-label={t('تصغير','Zoom out')}><Minus size={18}/></button>
      <input type="range" min="100" max="300" value={percentage} dir="ltr"
        aria-label={t('نسبة التكبير','Zoom level')} aria-valuetext={percentage + '%'}
        onChange={event => {
          const scale = Number(event.target.value) / 100;
          setView(current => zoom(current, scale));
        }}/>
      <output dir="ltr">{percentage}%</output>
      <button onClick={() => setView(current => zoom(current, current.scale + .25))}
        disabled={view.scale >= 3} aria-label={t('تكبير','Zoom in')}><Plus size={18}/></button>
      <button onClick={() => setView(initial)}><RotateCcw size={16}/>{t('الضبط 100%','Reset 100%')}</button>
    </div>
  </>;
}

export function ZoomViewer({shots, index, device, setDevice, move, t}) {
  const shot = shots[index];
  const photo = shot.images.find(photo => photo.device === device) ?? shot.images[0];
  const label = (device) => ({ tv: t('التلفاز', 'TV'), phone: t('الهاتف', 'Phone'), pc: t('الحاسوب', 'Windows PC') }[device]);
  return <div className="zoom-viewer">
    <ZoomImage key={photo.file} src={'/assets/screenshots/' + photo.file}
      alt={shot.name + ' · ' + label(photo.device)} t={t}/>
    <div className="zoom-footer">
      <div className="zoom-nav">
        <button onClick={() => move(-1)} aria-label={t('الشريحة السابقة','Previous slide')}>{t(<ChevronRight/>,<ChevronLeft/>)}</button>
        <code>{index + 1} / {shots.length}</code>
        <button onClick={() => move(1)} aria-label={t('الشريحة التالية','Next slide')}>{t(<ChevronLeft/>,<ChevronRight/>)}</button>
        <div className="zoom-devices" role="group" aria-label={t('لقطة الجهاز','Device screenshot')}>
          {shot.images.map(item => <button key={item.device} aria-pressed={photo.device === item.device}
            onClick={() => setDevice(item.device)}>{label(item.device)}</button>)}
        </div>
      </div>
    </div>
  </div>;
}
