// cinematic-kit.jsx — DAYA Teaser "Cinematic" post system
// Reusable slide components for @her.solotrip carousels, stories & mantra cards.
// Exports to window: Icon, Stage, Cover, TipSlide, CTASlide, Story, Mantra, Dots.

// Synced from the real DAYA icons/ set (DAYA-DESIGN.md source of truth).
// One icon system for @her.solotrip teaser AND the DAYA app.
const ICONS = {
  'arrow-left':'<path d="M19 12 L 5 12"/><path d="M11 6 L 5 12 L 11 18"/>',
  'arrow-right':'<path d="M5 12 L 19 12"/><path d="M13 6 L 19 12 L 13 18"/>',
  'arrow-up-right':'<path d="M7 17 L 17 7"/><path d="M9 7 L 17 7 L 17 15"/>',
  'bell':'<path d="M5.5 18 L 18.5 18 L 17 16 V 11 A 5 5 0 0 0 7 11 V 16 Z"/><path d="M10 21 A 2 2 0 0 0 14 21"/><path d="M12 4 V 6"/>',
  'bookmark':'<path d="M6 4 L 18 4 L 18 21 L 12 16 L 6 21 Z"/>',
  'calendar':'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5 L 20.5 9.5"/><path d="M8 3 L 8 7"/><path d="M16 3 L 16 7"/>',
  'camera':'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7 L 9.5 4.5 L 14.5 4.5 L 16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
  'check':'<path d="M5 12.5 L 10 17.5 L 19 6.5"/>',
  'chevron-down':'<path d="M5 9 L 12 16 L 19 9"/>',
  'chevron-up':'<path d="M5 15 L 12 8 L 19 15"/>',
  'circle-three':'<circle cx="12" cy="5.5" r="2.2"/><circle cx="5.5" cy="17" r="2.2"/><circle cx="18.5" cy="17" r="2.2"/><path d="M10.5 7.5 L 7 14.5"/><path d="M13.5 7.5 L 17 14.5"/><path d="M7.7 17 L 16.3 17"/>',
  'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7 L 12 12 L 16 14"/>',
  'close':'<path d="M5.5 5.5 L 18.5 18.5"/><path d="M18.5 5.5 L 5.5 18.5"/>',
  'compass':'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 L 13.5 13.5 L 8.5 15.5 L 10.5 10.5 Z"/>',
  'constellation':'<circle cx="5" cy="7" r="1.4" fill="currentColor" stroke="none"/><circle cx="11" cy="10.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="13" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="16" cy="20" r="1.4" fill="currentColor" stroke="none"/><path d="M5 7 L 11 10.5 L 15 6 L 19 13 L 16 20 L 9 18 L 11 10.5"/>',
  'crossroads':'<circle cx="12" cy="13" r="2" fill="currentColor" stroke="none"/><path d="M12 4 L 12 11"/><path d="M4 20 Q 7 17 10.5 14.5"/><path d="M20 20 Q 17 17 13.5 14.5"/><path d="M9 4.5 L 12 4 L 11 7"/><path d="M4 17 L 4 20 L 7 20"/><path d="M17 20 L 20 20 L 20 17"/>',
  'eye':'<path d="M2.5 12 C 5.5 7 8.5 5 12 5 C 15.5 5 18.5 7 21.5 12 C 18.5 17 15.5 19 12 19 C 8.5 19 5.5 17 2.5 12 Z"/><circle cx="12" cy="12" r="3"/>',
  'flame':'<path d="M12 22 C 7.5 22 4.5 18.5 4.5 15 C 4.5 11 7 9 8 6.5 C 8.5 5 10.5 3.5 10.5 2 C 11 4.5 12.5 5.5 14.5 8 C 17 11 19.5 12.5 19.5 16 C 19.5 19.5 16.5 22 12 22 Z"/>',
  'globe':'<circle cx="12" cy="12" r="9"/><path d="M3 12 L 21 12"/><path d="M12 3 C 15.5 6.5 15.5 17.5 12 21"/><path d="M12 3 C 8.5 6.5 8.5 17.5 12 21"/>',
  'heart':'<path d="M12 20.5 C 4 15 3 9 7 7 C 9.5 6 11.5 7.5 12 9 C 12.5 7.5 14.5 6 17 7 C 21 9 20 15 12 20.5 Z"/>',
  'home':'<path d="M3.5 11.5 L 12 4 L 20.5 11.5"/><path d="M5.5 10 L 5.5 20 L 18.5 20 L 18.5 10"/><path d="M10 20 L 10 14 L 14 14 L 14 20"/>',
  'key':'<circle cx="7" cy="12" r="3"/><path d="M10 12 L 21 12"/><path d="M17 12 V 15"/><path d="M20 12 V 14.5"/>',
  'keyring':'<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5 L 7 13"/><path d="M7 13 L 7 20"/><rect x="5" y="16" width="2.5" height="2" rx="0.5"/><path d="M12 7.5 L 12 20"/><rect x="10.5" y="16" width="2.5" height="2" rx="0.5"/><path d="M12 7.5 L 17 13"/><path d="M17 13 L 17 20"/><rect x="16.5" y="16" width="2.5" height="2" rx="0.5"/>',
  'lock':'<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11 V 7.5 A 4 4 0 0 1 16 7.5 V 11"/>',
  'map':'<path d="M3 6 L 9 4 L 15 6 L 21 4 L 21 18 L 15 20 L 9 18 L 3 20 Z"/><path d="M9 4 L 9 18"/><path d="M15 6 L 15 20"/>',
  'menu':'<path d="M4 7 L 20 7"/><path d="M4 12 L 20 12"/><path d="M4 17 L 20 17"/>',
  'message':'<path d="M4 6 L 20 6 A 1.5 1.5 0 0 1 21.5 7.5 L 21.5 16 A 1.5 1.5 0 0 1 20 17.5 L 14 17.5 L 10 21 L 10 17.5 L 4 17.5 A 1.5 1.5 0 0 1 2.5 16 L 2.5 7.5 A 1.5 1.5 0 0 1 4 6 Z"/>',
  'moon-cycle':'<path d="M6 16 A 4 4 0 1 1 6 8 A 2.5 2.5 0 0 0 6 16 Z"/><circle cx="12" cy="12" r="4"/><path d="M18 16 A 4 4 0 1 0 18 8 A 2.5 2.5 0 0 1 18 16 Z"/>',
  'moon':'<path d="M20 13.5 A 9 9 0 1 1 10.5 4 A 7 7 0 0 0 20 13.5 Z"/>',
  'pin':'<path d="M12 21.5 C 6.5 16 5 12 5 9 A 7 7 0 1 1 19 9 C 19 12 17.5 16 12 21.5 Z"/><circle cx="12" cy="9" r="2.5"/>',
  'plus':'<path d="M12 5 L 12 19"/><path d="M5 12 L 19 12"/>',
  'route':'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M7.4 17.5 C 10 13 14 11 16.6 6.5"/>',
  'search':'<circle cx="11" cy="11" r="6.5"/><path d="M15.7 15.7 L 20.5 20.5"/>',
  'send':'<path d="M21.5 2.5 L 2.5 11 L 11 13 L 13 21.5 L 21.5 2.5 Z"/><path d="M21.5 2.5 L 11 13"/>',
  'settings':'<circle cx="12" cy="12" r="3"/><path d="M12 2 V 4"/><path d="M12 20 V 22"/><path d="M2 12 H 4"/><path d="M20 12 H 22"/><path d="M4.93 4.93 L 6.34 6.34"/><path d="M17.66 17.66 L 19.07 19.07"/><path d="M4.93 19.07 L 6.34 17.66"/><path d="M17.66 6.34 L 19.07 4.93"/>',
  'share':'<circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="6" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="M8.7 10.8 L 15.3 7.2"/><path d="M8.7 13.2 L 15.3 16.8"/>',
  'shield':'<path d="M12 3 L 5 6 V 12 C 5 16.5 8 19.5 12 21 C 16 19.5 19 16.5 19 12 V 6 Z"/>',
  'star':'<path d="M12 2 L 13.4 10.4 L 21.5 12 L 13.4 13.6 L 12 22 L 10.6 13.6 L 2.5 12 L 10.6 10.4 Z"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2 V 4.5"/><path d="M12 19.5 V 22"/><path d="M2 12 H 4.5"/><path d="M19.5 12 H 22"/><path d="M4.93 4.93 L 6.7 6.7"/><path d="M17.3 17.3 L 19.07 19.07"/><path d="M4.93 19.07 L 6.7 17.3"/><path d="M17.3 6.7 L 19.07 4.93"/>',
  'thread':'<path d="M3 16 Q 6 9 12 12 Q 18 15 21 8"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="3" cy="16" r="1.2" fill="currentColor" stroke="none"/><circle cx="21" cy="8" r="1.2" fill="currentColor" stroke="none"/>',
  'torch':'<path d="M12 2 C 13.5 4 15 6 15 8 A 3 3 0 0 1 9 8 C 9 6 10.5 4 12 2 Z"/><path d="M8 9 L 16 9 L 14 12 L 10 12 Z"/><path d="M11 12 L 11 21"/><path d="M13 12 L 13 21"/><path d="M9 21 L 15 21"/>',
  'trash':'<path d="M4 7 L 20 7"/><path d="M9.5 7 L 9.5 4.5 L 14.5 4.5 L 14.5 7"/><path d="M6 7 L 7 20 L 17 20 L 18 7"/><path d="M10 11 L 10 16"/><path d="M14 11 L 14 16"/>',
  'user':'<circle cx="12" cy="8.5" r="3.5"/><path d="M4.5 20 C 4.5 16 7.5 13.5 12 13.5 C 16.5 13.5 19.5 16 19.5 20"/>',
  'users':'<circle cx="9" cy="9.5" r="3"/><path d="M3 19.5 C 3 16 5.5 14.5 9 14.5 C 12.5 14.5 15 16 15 19.5"/><path d="M15 7 A 3 3 0 1 1 15 12.5"/><path d="M16.5 14.5 C 19 14.5 21 16 21 19.5"/>',
  'ward':'<circle cx="12" cy="12" r="9"/><path d="M12 6 L 13.4 10.6 L 18 12 L 13.4 13.4 L 12 18 L 10.6 13.4 L 6 12 L 10.6 10.6 Z"/>',
  // carried over (not in official icons/ set, still referenced by some slides)
  suitcase:'<path d="M6 8 L 18 8 A 2 2 0 0 1 20 10 L 20 18 A 2 2 0 0 1 18 20 L 6 20 A 2 2 0 0 1 4 18 L 4 10 A 2 2 0 0 1 6 8 Z"/><path d="M9 8 L 9 6 A 1.5 1.5 0 0 1 10.5 4.5 L 13.5 4.5 A 1.5 1.5 0 0 1 15 6 L 15 8"/><path d="M12 12 L 12 16"/>',
  plane:'<path d="M21 14.5 L 13.5 12.5 L 12 4 L 10.5 4 L 11 12 L 5 10.5 L 4.5 8.5 L 3.5 8.5 L 4 11.5 L 2.5 13 L 4 13.8 L 4.5 16 L 6.5 14.8 L 11 16 L 11 19 L 9.5 20 L 9.5 21 L 12.5 20.2 L 15.5 21 L 15.5 20 L 14 19 L 14 16.2 Z"/>',
};

// Pass color="silver" for the DAYA brushed-metal look: a vertical gradient
// (dark -> bright highlight -> mid -> dark) so the glyph reads clearly as silver,
// not flat grey. Filled dot-icons pick up a bright silver via currentColor.
function Icon({ name, size = 24, stroke = 1.7, color = 'currentColor', style }) {
  const silver = color === 'silver';
  const gid = 'cine-sil-' + name;
  const defs = silver
    ? `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0.85" y2="1">`
      + `<stop offset="0" stop-color="#aab6c3"/><stop offset="0.34" stop-color="#f4f8fb"/>`
      + `<stop offset="0.62" stop-color="#cdd7e1"/><stop offset="1" stop-color="#9aa7b5"/>`
      + `</linearGradient></defs>`
    : '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={silver ? `url(#${gid})` : color} color={silver ? '#dde5ee' : undefined}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} dangerouslySetInnerHTML={{ __html: defs + (ICONS[name] || '') }} />
  );
}

if (typeof document !== 'undefined' && !document.getElementById('cine-styles')) {
  const s = document.createElement('style');
  s.id = 'cine-styles';
  s.textContent = `
    .cine{position:relative;overflow:hidden;color:var(--cream);
      font-family:var(--sans);isolation:isolate;}
    .cine *{box-sizing:border-box;}
    .cine-grain{position:absolute;inset:0;pointer-events:none;z-index:40;opacity:.12;
      mix-blend-mode:overlay;background-size:240px 240px;
      background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>");}
    .cine-vig{position:absolute;inset:0;z-index:30;pointer-events:none;
      box-shadow:inset 0 0 200px rgba(4,16,11,.22);}
    .kbar{display:flex;align-items:center;gap:14px;}
    .kbar i{width:6px;height:38px;background:var(--marigold);border-radius:3px;display:block;}
    .kbar span{font-family:var(--display);font-weight:800;font-size:23px;letter-spacing:.14em;color:var(--cream);}
    .counter{font-family:var(--display);font-weight:700;font-size:23px;letter-spacing:.1em;color:var(--marigold);}
    .bignum{font-family:var(--display);font-weight:900;line-height:.8;color:transparent;
      -webkit-text-stroke:2px rgba(239,192,90,.45);}
    .chip{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;
      border:2px solid #c3cdd7;color:#dbe2e9;
      box-shadow:0 0 22px rgba(205,214,223,.18), inset 0 1px 0 rgba(255,255,255,.35);}
    .badge{font-family:var(--display);font-weight:800;letter-spacing:.02em;color:var(--ink);
      background:var(--marigold);border-radius:999px;display:inline-flex;align-items:center;gap:10px;}
    .hand{font-family:var(--hand);color:var(--marigold);}
    .dots{display:flex;gap:10px;align-items:center;}
    .dots b{width:10px;height:10px;border-radius:50%;background:rgba(244,236,219,.28);display:block;}
    .dots b.on{background:var(--marigold);width:28px;border-radius:5px;}
  `;
  document.head.appendChild(s);
}

// dusk background; glow = 'bottom' | 'topright' | 'center'
// photo: optional image-slot id. src: optional Unsplash photo id (or full url).
const UURL = (s) => !s ? null : (s.startsWith('photo-') ? `https://images.unsplash.com/${s}?w=1200&q=80&auto=format&fit=crop` : s);
function Stage({ w = 1080, h = 1350, glow = 'bottom', sun = true, dim = 0.5, photo, src, children }) {
  const glows = {
    bottom: 'radial-gradient(95% 52% at 50% 100%, rgba(239,176,80,.85) 0%, rgba(221,122,77,.32) 28%, rgba(11,53,39,0) 60%)',
    topright: 'radial-gradient(70% 48% at 88% 4%, rgba(239,176,80,.7) 0%, rgba(221,122,77,.26) 30%, rgba(11,53,39,0) 62%)',
    center: 'radial-gradient(60% 40% at 50% 42%, rgba(239,176,80,.5) 0%, rgba(11,53,39,0) 64%)',
  };
  const sunPos = {
    bottom: { left: '50%', bottom: '-60px', transform: 'translateX(-50%)' },
    topright: { right: '-90px', top: '-90px' },
    center: { left: '50%', top: '34%', transform: 'translate(-50%,-50%)' },
  };
  const hasPhoto = !!photo;
  return (
    <div className="cine" style={{ width: w, height: h, background: '#06251b' }}>
      {/* baked dusk fallback (shows through if photo fails / empty) */}
      <div style={{ position: 'absolute', inset: 0, background:
        `${glows[glow]}, linear-gradient(180deg,#0a2b20 0%,#0d3a2b 44%,#16513f 74%,#2f6a50 100%)` }} />
      {!hasPhoto && sun && <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, #f6d680 0%, #efb650 46%, rgba(239,182,80,0) 70%)',
        opacity: .9, ...sunPos[glow] }} />}
      {hasPhoto && (window.__EXPORT__
        ? <img crossOrigin="anonymous" alt="" src={(window.__SLOT_OVERRIDES__ && window.__SLOT_OVERRIDES__[photo]) || UURL(src)}
            style={{ position: 'absolute', inset: 0, width: w, height: h, objectFit: 'cover', zIndex: 1, filter: 'saturate(1.14) contrast(1.04) brightness(1.12)' }} />
        : <image-slot id={photo} src={UURL(src)} style={{ position: 'absolute', inset: 0, width: w, height: h, zIndex: 1, filter: 'saturate(1.14) contrast(1.04) brightness(1.12)' }}
            shape="rect" fit="cover" placeholder="Drop your own travel photo"></image-slot>)}
      {/* emerald cinematic grade over the photo - kept light so country colours stay vivid */}
      {hasPhoto && <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: glows[glow], mixBlendMode: 'soft-light', opacity: .06 }} />}
      {/* legibility + mood gradient (kept strong only at the bottom where text sits) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, background:
        `linear-gradient(180deg, rgba(6,37,27,${hasPhoto ? 0.0 : dim}) 0%, rgba(6,37,27,0) 46%, rgba(4,16,11,${hasPhoto ? 0.12 : 0.32}) 70%, rgba(3,14,9,${hasPhoto ? 0.74 : 0.95}) 100%)` }} />
      {children}
      <div className="cine-vig" />
      <div className="cine-grain" />
    </div>
  );
}

function Dots({ total, idx, style }) {
  return (
    <div className="dots" style={style}>
      {Array.from({ length: total }).map((_, i) =>
        <b key={i} className={i === idx ? 'on' : ''} />)}
    </div>
  );
}

// ---------- COVER ----------
function Cover({ kicker, lead, sub, photo, src }) {
  return (
    <Stage glow="bottom" dim={0.5} photo={photo} src={src}>
      <div style={{ position: 'absolute', zIndex: 20, top: 80, left: 80 }} className="kbar"><i /><span>{kicker}</span></div>
      <div style={{ position: 'absolute', zIndex: 20, left: 80, right: 80, bottom: 250 }}>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 124, lineHeight: .88,
          letterSpacing: '-.02em', color: 'var(--cream)', textShadow: '0 4px 34px rgba(0,0,0,.45)' }}
          dangerouslySetInnerHTML={{ __html: lead }} />
        {sub && <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 50,
          color: 'var(--sage-mist)', marginTop: 22 }}>{sub}</div>}
      </div>
      <div style={{ position: 'absolute', zIndex: 20, left: 80, bottom: 104, display: 'flex', alignItems: 'center', gap: 18 }}>
        <span className="badge" style={{ fontSize: 24, padding: '14px 26px' }}>SAVE FOR LATER</span>
        <span className="hand" style={{ fontSize: 40, whiteSpace: 'nowrap' }}>swipe →</span>
      </div>
    </Stage>
  );
}

// ---------- TIP ----------
function TipSlide({ n, total, idx, kicker, icon, head, body, photo, src }) {
  const glow = idx % 2 === 0 ? 'topright' : 'bottom';
  return (
    <Stage glow={glow} dim={0.42} photo={photo} src={src}>
      <div style={{ position: 'absolute', zIndex: 20, top: 78, left: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="kbar"><i /><span style={{ fontSize: 20 }}>{kicker}</span></div>
        <div className="counter">{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      </div>

      <div className="bignum" style={{ position: 'absolute', zIndex: 5, top: 150, right: 72, fontSize: 360 }}>
        {String(n).padStart(2, '0')}
      </div>

      <div style={{ position: 'absolute', zIndex: 20, left: 80, right: 80, bottom: 150 }}>
        <div className="chip" style={{ width: 92, height: 92, marginBottom: 34 }}>
          <Icon name={icon} size={46} stroke={1.7} color="silver" />
        </div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 78, lineHeight: .98,
          letterSpacing: '-.015em', color: 'var(--cream)' }}
          dangerouslySetInnerHTML={{ __html: head }} />
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 33, lineHeight: 1.42,
          color: 'var(--sage-mist)', marginTop: 26, maxWidth: 860 }}
          dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <Dots total={total} idx={idx} style={{ position: 'absolute', zIndex: 20, left: 80, bottom: 84 }} />
    </Stage>
  );
}

// ---------- CTA ----------
function CTASlide({ total, idx, handle = '@her.solotrip', prompt, photo, src }) {
  return (
    <Stage glow="center" dim={0.5} photo={photo} src={src}>
      <div style={{ position: 'absolute', zIndex: 20, inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 110px' }}>
        <Icon name="bookmark" size={70} color="silver" stroke={1.6} />
        <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 96, lineHeight: .92,
          color: 'var(--cream)', marginTop: 34 }}>SAVE THIS<br />FOR LATER</div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 46,
          color: 'var(--sage-mist)', marginTop: 28, maxWidth: 760 }}>{prompt}</div>
        <div style={{ height: 1, width: 120, background: 'rgba(244,236,219,.25)', margin: '46px 0' }} />
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 40, color: 'var(--marigold)',
          letterSpacing: '.02em' }}>{handle}</div>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 28, color: 'var(--sage-mist)',
          marginTop: 12, letterSpacing: '.02em' }}>follow for more solo travel, minus the fear</div>
      </div>
      <Dots total={total} idx={idx} style={{ position: 'absolute', zIndex: 20, left: '50%', transform: 'translateX(-50%)', bottom: 84 }} />
    </Stage>
  );
}

// ---------- STORY (9:16) ----------
function Story({ kicker, head, points = [], poll, handle = '@her.solotrip', photo, src }) {
  return (
    <Stage w={1080} h={1920} glow="bottom" dim={0.5} photo={photo} src={src}>
      <div style={{ position: 'absolute', zIndex: 20, top: 110, left: 84, right: 84,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="kbar"><i /><span style={{ fontSize: 24 }}>{kicker}</span></div>
        <span className="hand" style={{ fontSize: 40 }}>tap →</span>
      </div>
      <div style={{ position: 'absolute', zIndex: 20, left: 84, right: 84, top: 360 }}>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 96, lineHeight: .96,
          letterSpacing: '-.015em', color: 'var(--cream)' }} dangerouslySetInnerHTML={{ __html: head }} />
      </div>
      <div style={{ position: 'absolute', zIndex: 20, left: 84, right: 84, top: 700, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {points.map((p, i) =>
          <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 46, color: 'var(--marigold)', lineHeight: 1, flex: '0 0 auto', width: 50 }}>{i + 1}</span>
            <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 40, lineHeight: 1.34, color: 'var(--cream)' }} dangerouslySetInnerHTML={{ __html: p }} />
          </div>)}
      </div>
      {poll && <div style={{ position: 'absolute', zIndex: 20, left: 84, right: 84, bottom: 230,
        background: 'rgba(244,236,219,.96)', borderRadius: 26, padding: '34px 36px', boxShadow: '0 20px 50px rgba(0,0,0,.35)' }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 34, color: 'var(--ink)', textAlign: 'center', marginBottom: 24 }}>{poll.q}</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {poll.opts.map((o, i) =>
            <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--display)', fontWeight: 800, fontSize: 32,
              padding: '20px 0', borderRadius: 16, color: i === 0 ? 'var(--ink)' : '#6b5a3a',
              background: i === 0 ? 'var(--marigold)' : 'rgba(0,0,0,.06)' }}>{o}</div>)}
        </div>
      </div>}
      <div style={{ position: 'absolute', zIndex: 20, left: 0, right: 0, bottom: 110, textAlign: 'center',
        fontFamily: 'var(--display)', fontWeight: 800, fontSize: 34, color: 'var(--marigold)', letterSpacing: '.04em' }}>{handle}</div>
    </Stage>
  );
}

// ---------- MANTRA (centered, original) ----------
function Mantra({ pre, quote, after, handle = '@her.solotrip', photo, src }) {
  return (
    <Stage glow="bottom" sun={false} dim={0.5} photo={photo} src={src}>
      {/* photo leads; text sits in a bottom scrim so the scenery stays unmissable */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, background:
        'linear-gradient(180deg, rgba(3,14,9,.12) 0%, rgba(3,14,9,0) 36%, rgba(3,14,9,.52) 70%, rgba(3,14,9,.95) 100%)' }} />
      <div style={{ position: 'absolute', zIndex: 20, left: 96, right: 96, bottom: 188, textAlign: 'center' }}>
        {pre && <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 24, letterSpacing: '.26em',
          color: 'var(--marigold)', marginBottom: 30 }}>{pre}</div>}
        <div style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 88, lineHeight: 1.06,
          color: 'var(--cream)', textShadow: '0 4px 30px rgba(0,0,0,.55)' }} dangerouslySetInnerHTML={{ __html: quote }} />
        <div style={{ height: 2, width: 120, background: 'var(--marigold)', borderRadius: 2, margin: '34px auto 0' }} />
        {after && <div style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 28, color: 'var(--sage-mist)',
          marginTop: 26, letterSpacing: '.02em' }}>{after}</div>}
      </div>
      <div style={{ position: 'absolute', zIndex: 20, left: 0, right: 0, bottom: 90, textAlign: 'center',
        fontFamily: 'var(--display)', fontWeight: 800, fontSize: 30, color: 'var(--marigold)', letterSpacing: '.06em' }}>{handle}</div>
    </Stage>
  );
}

// ---------- MANTRA GRAND (cinematic, photo-led, bottom editorial) ----------
function MantraGrand({ kicker = 'A REMINDER', quote, after, handle = '@her.solotrip', photo, src, glow = 'bottom' }) {
  return (
    <Stage glow={glow} sun={false} dim={0.5} photo={photo} src={src}>
      {/* cinematic bottom scrim for legibility over the photo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, background:
        'linear-gradient(180deg, rgba(3,14,9,0) 32%, rgba(3,14,9,.46) 60%, rgba(3,14,9,.93) 100%)' }} />
      {/* top kicker */}
      <div style={{ position: 'absolute', zIndex: 20, top: 84, left: 84 }} className="kbar">
        <i /><span style={{ fontSize: 22 }}>{kicker}</span>
      </div>
      {/* quote block, bottom-left editorial */}
      <div style={{ position: 'absolute', zIndex: 20, left: 84, right: 96, bottom: 192 }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 600, fontSize: 150,
          lineHeight: .7, color: 'rgba(239,192,90,.94)' }}>&ldquo;</div>
        <div style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 88, lineHeight: 1.03,
          letterSpacing: '-.01em', color: 'var(--cream)', textShadow: '0 4px 32px rgba(0,0,0,.55)', marginTop: 8 }}
          dangerouslySetInnerHTML={{ __html: quote }} />
        <div style={{ height: 2, width: 132, background: 'var(--marigold)', borderRadius: 2, marginTop: 34 }} />
        {after && <div style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 30, lineHeight: 1.4,
          color: 'var(--sage-mist)', marginTop: 22 }} dangerouslySetInnerHTML={{ __html: after }} />}
      </div>
      {/* handle */}
      <div style={{ position: 'absolute', zIndex: 20, left: 84, bottom: 96, fontFamily: 'var(--display)',
        fontWeight: 800, fontSize: 30, color: 'var(--marigold)', letterSpacing: '.04em' }}>{handle}</div>
    </Stage>
  );
}

Object.assign(window, { Icon, Stage, Dots, Cover, TipSlide, CTASlide, Story, Mantra, MantraGrand });
