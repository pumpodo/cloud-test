// Rendert Pinterest-Pins (1000x1500 PNG) aus einer JSON-Spezifikation.
// Aufruf: node render_pins.js <pins.json> <ausgabe-ordner>
// Layouts: "produkt" (Freisteller auf Weiß), "wissen" (Tipp-Liste), "szene" (KI-Hintergrund + echtes Produktfoto)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=path.join(__dirname,'assets');
const css=fs.readFileSync(path.join(A,'pin.css'),'utf8');
const logo='file://'+path.join(A,'logo.png');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// Überschrift: Text in *Sternchen* wird grün hervorgehoben
const hl=s=>esc(s).replace(/\*(.+?)\*/g,'<em>$1</em>');
const src=u=>!u?'':(/^(https?:|file:)/.test(u)?u:'file://'+path.resolve(u));
const foot=cta=>`<div class="foot"><div class="logo"><img src="${logo}"></div><div class="who"><div class="name">Podologin Andrea</div><div class="url">podologie-und-mehr.com</div></div><div class="cta">${esc(cta||'Mehr erfahren')}</div></div>`;
const head=p=>`<span class="kicker">${esc(p.kicker)}</span><h1>${hl(p.headline)}</h1>`+
  (p.sub?`<div class="sub">${esc(p.sub)}</div>`:'')+
  (p.bullets?.length?`<div class="list">${p.bullets.map(b=>`<div>${esc(b)}</div>`).join('')}</div>`:'')+
  (p.deal?`<div class="deal">${hl(p.deal).replace(/<em>/g,'<b>').replace(/<\/em>/g,'</b>')}</div>`:'');
function html(p){
  let body,bg='<div class="blob" style="width:620px;height:620px;right:-240px;top:-200px"></div>';
  if(p.layout==='wissen'){
    body=head(p)+`<div class="tips">${(p.tips||[]).map((t,i)=>`<div class="tip"><div class="n">${i+1}</div><div><div class="tt">${esc(t.titel)}</div>${t.text?`<div class="td">${esc(t.text)}</div>`:''}</div></div>`).join('')}</div>`+foot(p.cta||'Merken & lesen');
  } else if(p.layout==='szene'){
    const top=p.scene_top??470;
    bg=`<div class="scene" style="top:${top}px;background-image:url('${src(p.scene_image)}')"></div>`+
       `<div class="pc" style="${p.card_style||'left:250px;top:790px;width:500px;height:500px'}"><img class="${p.cover?'cover':''}" src="${src(p.image)}"></div>`;
    body=head(p)+'<div class="spacer"></div>'+foot(p.cta);
  } else {
    body=head(p)+`<div class="card"><img class="prod ${p.cover?'set':''}" src="${src(p.image)}"></div>`+foot(p.cta);
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
.card img.set{width:100%;height:100%;max-width:none;max-height:none;object-fit:cover;object-position:center 30%}
.deal{align-self:flex-start;margin-top:22px;background:var(--lime);font-size:30px;font-weight:600;padding:14px 24px;border-radius:20px}.deal b{font-weight:800}
</style></head><body>${bg}<div class="wrap">${body}</div></body></html>`;
}
(async()=>{
  const [spec,out]=process.argv.slice(2);const pins=JSON.parse(fs.readFileSync(spec,'utf8'));
  fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1000,height:1500},deviceScaleFactor:1});
  for(const p of pins){
    const f=path.join(out,p.id+'.html');fs.writeFileSync(f,html(p));
    await pg.goto('file://'+f,{waitUntil:'networkidle'});await pg.evaluate(()=>document.fonts.ready);
    const over=await pg.evaluate(()=>{const w=document.querySelector('.wrap');return w.scrollHeight>1500||[...document.querySelectorAll('h1')].some(h=>h.getBoundingClientRect().height>340)});
    await pg.screenshot({path:path.join(out,p.id+'.png')});
    console.log((over?'WARNUNG Text zu lang: ':'ok ')+p.id);
  }
  await b.close();
})();
