'use strict';

const copy = {
  EN: {
    calculator:'Calculator', history:'History', title:'Transport Profit Calculator',
    intro:'Calculate trip costs, profit and break-even rates.', export:'Export CSV', save:'Save calculation',
    parameters:'Trip parameters', parametersHint:'Enter the details of your haul.',
    distance:'Route distance', total:'Total', fuelGroup:'Fuel costs', financials:'Revenue & expenses',
    paid:'Paid distance', empty:'Empty distance', consumption:'Fuel consumption', price:'Fuel price',
    revenue:'Freight payment', driver:'Driver expenses', tolls:'Road tolls', extra:'Other expenses',
    currency:'Currency', breakdown:'Expense breakdown', totalCosts:'Total expenses', fuel:'Fuel',
    profit:'Trip profit', margin:'Profit margin', costKm:'Cost per kilometre', breakEven:'Break-even rate',
    costNote:'All operating expenses', kmNote:'Per total kilometre', evenNote:'Per paid kilometre',
    taxNote:'Amounts exclude VAT. Profit is before tax.', light:'Switch to light theme', dark:'Switch to dark theme',
    historyTitle:'Calculation history', historyIntro:'Saved trips on this device.', noHistory:'No saved calculations',
    historyHint:'Save a calculation to revisit its inputs and results.', open:'Load calculation', saved:'Calculation saved.',
    loaded:'Calculation loaded.', storageError:'Local storage is unavailable. Export a CSV to keep this trip.',
    damaged:'Saved history could not be read.', invalid:'Enter a non-negative number with up to 12 digits and 2 decimals.',
    csv:'Calculation results', inputs:'Trip inputs', value:'Value', measure:'Unit', item:'Item', results:'Trip results',
    distanceTotal:'Total distance', share:'Share', exported:'CSV exported.', unavailable:'Unavailable',
    undefinedHint:'Requires a non-zero denominator.', fix:'Check the highlighted inputs.', 
    noCosts:'No expenses', positive:'Profit before tax', language:'Language', updated:'Results', emptyKm:'empty', paidKm:'paid'
  },
  PL: {
    calculator:'Kalkulator', history:'Historia', title:'Kalkulator zysku z transportu',
    intro:'Oblicz koszty trasy, zysk i stawkę progową.', export:'Eksportuj CSV', save:'Zapisz kalkulację',
    parameters:'Parametry trasy', parametersHint:'Wprowadź dane przewozu.',
    distance:'Długość trasy', total:'Łącznie', fuelGroup:'Koszty paliwa', financials:'Przychody i wydatki',
    paid:'Kilometry płatne', empty:'Kilometry bez ładunku', consumption:'Zużycie paliwa', price:'Cena paliwa',
    revenue:'Zapłata za przewóz', driver:'Koszty kierowcy', tolls:'Opłaty drogowe', extra:'Pozostałe wydatki',
    currency:'Waluta', breakdown:'Struktura kosztów', totalCosts:'Koszty całkowite', fuel:'Paliwo',
    profit:'Zysk z trasy', margin:'Marża zysku', costKm:'Koszt kilometra', breakEven:'Stawka progowa',
    costNote:'Wszystkie koszty przewozu', kmNote:'Za kilometr całej trasy', evenNote:'Za kilometr płatny',
    taxNote:'Kwoty bez VAT. Zysk przed opodatkowaniem.', light:'Włącz jasny motyw', dark:'Włącz ciemny motyw',
    historyTitle:'Historia kalkulacji', historyIntro:'Trasy zapisane na tym urządzeniu.', noHistory:'Brak zapisanych kalkulacji',
    historyHint:'Zapisz kalkulację, aby wrócić do danych i wyników.', open:'Wczytaj kalkulację', saved:'Zapisano kalkulację.',
    loaded:'Wczytano kalkulację.', storageError:'Pamięć lokalna jest niedostępna. Wyeksportuj plik CSV, aby zachować dane.',
    damaged:'Nie udało się odczytać historii.', invalid:'Wprowadź liczbę nieujemną o maks. 12 cyfrach przed przecinkiem i 2 po nim.',
    csv:'Wyniki kalkulacji', inputs:'Dane trasy', value:'Wartość', measure:'Jednostka', item:'Pozycja', results:'Wyniki trasy',
    distanceTotal:'Całkowita długość trasy', share:'Udział', exported:'Wyeksportowano CSV.', unavailable:'Brak danych',
    undefinedHint:'Wymaga niezerowego mianownika.', fix:'Sprawdź zaznaczone pola.',
    noCosts:'Brak kosztów', positive:'Zysk przed opodatkowaniem', language:'Język', updated:'Wyniki', emptyKm:'bez ładunku', paidKm:'płatne'
  }
};

const paths = {
  calculator:'<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 7h8M8 11h1m3 0h1m3 0h.1M8 15h1m3 0h1m3 0h.1M8 18h1m3 0h1"/>',
  history:'<path d="M3 11a9 9 0 1 1 2.4 7M3 5v6h6m3-4v5l3 2"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  moon:'<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>', download:'<path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5"/>',
  bookmark:'<path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z"/>',
  sliders:'<path d="M3 6h3m4 0h11M3 12h10m4 0h4M3 18h5m4 0h9"/><circle cx="8" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
  route:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h9a3.5 3.5 0 0 1 0 7H8a3.5 3.5 0 0 0 0 7h9"/>',
  fuel:'<path d="M3 21V4a1 1 0 0 1 1-1h9v18M1 21h14M4 10h8m1 3h2c2 0 1 5 3 5h1a1 1 0 0 0 1-1V8l-4-4m1 2v4h3"/>',
  wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7"/><path d="M21 12h-5v5h5m-3-2.5h.1"/>',
  pie:'<path d="M10 3a9 9 0 1 0 11 11H10zM14 2.5v7.5h7.5A9 9 0 0 0 14 2.5z"/>',
  trend:'<path d="m3 17 6-6 4 4 8-9m-6 0h6v6"/>', loss:'<path d="m3 7 6 6 4-4 8 9m-6 0h6v-6"/>',
  gauge:'<path d="M3.5 18a9 9 0 1 1 17 0H3.5ZM12 14l4-6M6.5 11l1 .6M12 6v1.5"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>'
};
const svg = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[name] + '</svg>';
const icon = name => '<i data-icon="'+name+'">'+svg(name)+'</i>';
const $ = id => document.getElementById(id);
const prefix = 'freightledger.v1.';
const parts = ['fuel','driver','tolls','extra'];
const colors = ['#07825e','#5c99cc','#e8b65a','#a58ac5'];
const readPref = key => { try { return localStorage.getItem(prefix+key); } catch { return null; } };
const writePref = (key,val) => { try { localStorage.setItem(prefix+key,val); } catch { /* Preferences still apply in memory. */ } };
let lang = readPref('language') === 'PL' ? 'PL' : 'EN';
let theme = readPref('theme') === 'dark' ? 'dark' : 'light';
let currency = 'PLN';
let raw = {...TripMath.defaults};
let historyVisible = false;
let toastTimer;
const t = key => copy[lang][key];
const fmt = (n,min=2) => TripMath.format(n,lang,{min});
const unit = key => ({paid:'km',empty:'km',consumption:'L/100 km',price:currency+'/L'})[key] || currency;

function notify(key) {
  clearTimeout(toastTimer);
  $('toast').textContent=t(key);
  $('toast').className='show';
  toastTimer=setTimeout(() => { $('toast').className=''; $('toast').textContent=''; },3200);
}
function makeFields() {
  for (const grid of document.querySelectorAll('[data-fields]')) {
    grid.innerHTML=grid.dataset.fields.split(',').map(key => `<div class="field" id="field-${key}"><label for="${key}" data-t="${key}"></label><div class="input-wrap"><input id="${key}" type="text" inputmode="decimal" required spellcheck="false" aria-describedby="unit-${key} error-${key}"><span id="unit-${key}"></span></div><p class="error" id="error-${key}" hidden data-t="invalid"></p></div>`).join('');
  }
}
function syncInputs() {
  for (const key of TripMath.fields) {
    const value = raw[key];
    raw[key] = lang === 'PL' ? value.replace('.',',') : value.replace(',','.');
    $(key).value = raw[key];
  }
  $('currency').value=currency;
}
function displayMetrics(r) {
  const valid=!r.errors.length;
  const cards=[
    ['profit',r.profit,r.profit<0n?'loss':'trend','margin','',''],
    ['totalCosts',r.costs,'wallet','costNote','#eaf2fa','#497ba4'],
    ['costKm',r.costKm,'gauge','kmNote','#f0ebf7','#8465a3'],
    ['breakEven',r.breakEven,'target','evenNote','#fbf1dd','#936a1e']
  ];
  $('metrics').innerHTML=cards.map(([key,value,symbol,caption,bg,fg],i)=>{
    const state=i===0?' profit'+(!valid || r.profit===0n?' neutral':r.profit<0n?' loss':''):'';
    const label=i===0?`<span class="margin-chip">${fmt(r.margin)}${r.margin!=null?'%':''}</span> ${t(caption)}`:t(caption);
    return `<article class="metric${state}" style="--icon-bg:${bg||'transparent'};--icon-color:${fg||'white'}"><div class="metric-head"><span class="metric-icon">${icon(symbol)}</span>${t(key)}</div><div class="metric-value">${fmt(value)}<small>${currency}</small></div><div class="subline">${label}</div></article>`;
  }).join('');
}
function drawChart(r) {
  const valid=!r.errors.length;
  const base='<circle cx="110" cy="110" r="93" fill="none" stroke="var(--track)" stroke-width="27"/>';
  let offset=0;
  const arcs=[];
  $('legend').innerHTML=parts.map((key,i)=>{
    const value=valid?r.parts[i]:null;
    const pct=valid && r.costs ? TripMath.round(value*10000n,r.costs) : null;
    if (valid && value>0n) {
      const length=Number(value)/Number(r.costs)*100;
      const gap=length===100?0:Math.min(.7,length*.12);
      arcs.push(`<circle cx="110" cy="110" r="93" pathLength="100" fill="none" stroke="${colors[i]}" stroke-width="27" stroke-dasharray="${length-gap} ${100-length+gap}" stroke-dashoffset="${-offset-gap/2}" transform="rotate(-90 110 110)"/>`);
      offset+=length;
    }
    return `<div class="legend-row"><span class="dot" style="background:${colors[i]}"></span><span>${t(key)}</span><strong>${fmt(value)} ${currency}</strong><span class="percent">${fmt(pct,0)}${pct!=null?'%':''}</span></div>`;
  }).join('');
  $('donut').innerHTML=base+arcs.join('');
  $('chart-value').textContent=fmt(r.costs,0);
  $('chart-value').style.fontSize=fmt(r.costs,0).length>10?'1rem':'';
  document.querySelector('.chart-label .unit').textContent=currency;
  $('legend-total').textContent=fmt(r.costs)+' '+currency;
}
function renderResults() {
  const r=TripMath.calculate(raw);
  for (const key of TripMath.fields) {
    const bad=r.errors.includes(key);
    $(key).setAttribute('aria-invalid',String(bad));
    $('error-'+key).hidden=!bad;
    $('field-'+key).classList.toggle('invalid',bad);
    $('unit-'+key).textContent=unit(key);
  }
  $('save').disabled=$('export').disabled=!!r.errors.length;
  $('distance-total').textContent=t('total')+' · '+fmt(r.distance,0)+' km';
  displayMetrics(r);
  drawChart(r);
}

function readHistory() {
  const stored=localStorage.getItem(prefix+'history');
  if (stored===null) return [];
  const history=JSON.parse(stored);
  if (!Array.isArray(history) || !history.every(row=>row && ['PLN','EUR'].includes(row.currency) &&
    typeof row.date==='string' && Number.isFinite(Date.parse(row.date)) && row.raw &&
    TripMath.fields.every(key=>typeof row.raw[key]==='string') && !TripMath.calculate(row.raw).errors.length)) {
    throw new SyntaxError('Invalid history');
  }
  return history;
}
function saveTrip() {
  if (TripMath.calculate(raw).errors.length) return;
  try {
    const history=readHistory();
    history.unshift({date:new Date().toISOString(),raw:{...raw},currency});
    localStorage.setItem(prefix+'history',JSON.stringify(history));
    renderHistory();
    notify('saved');
  } catch (error) { notify(error instanceof SyntaxError?'damaged':'storageError'); }
}
function renderHistory() {
  const list=$('history-list');
  let history;
  try { history=readHistory(); }
  catch (error) {
    list.innerHTML='<div class="empty">'+t(error instanceof SyntaxError?'damaged':'storageError')+'</div>';
    $('history-count').hidden=true;
    return;
  }
  $('history-count').hidden=!history.length;
  $('history-count').textContent=history.length;
  if (!history.length) {
    list.innerHTML=`<div class="empty"><span class="tile">${icon('history')}</span><h3>${t('noHistory')}</h3><p>${t('historyHint')}</p></div>`;
    return;
  }
  if (!historyVisible) return;
  list.replaceChildren();
  for (const row of history) {
    const r=TripMath.calculate(row.raw);
    const when=new Date(row.date).toLocaleString(lang==='PL'?'pl-PL':'en-GB',{dateStyle:'medium',timeStyle:'short'});
    const entry=document.createElement('article');
    entry.className='history-row';
    entry.innerHTML=`<div><strong>${when}</strong><small>${fmt(r.inputs.paid,0)} km ${t('paidKm')} · ${fmt(r.inputs.empty,0)} km ${t('emptyKm')}</small></div><div><small>${t('profit')}</small><span class="amount ${r.profit<0n?'negative':''}">${fmt(r.profit)} ${row.currency}</span></div><button class="button secondary">${t('open')}</button>`;
    entry.querySelector('button').onclick=()=>{
      raw={...row.raw}; currency=row.currency;
      syncInputs(); renderResults(); showView(false); notify('loaded');
    };
    list.append(entry);
  }
}
function showView(history) {
  historyVisible=history;
  $('calculator-view').hidden=history;
  $('history-view').hidden=!history;
  for (const [id,active] of [['calc-tab',!history],['history-tab',history]]) {
    $(id).classList.toggle('selected',active);
    if (active) $(id).setAttribute('aria-current','page'); else $(id).removeAttribute('aria-current');
  }
  renderHistory();
  window.scrollTo(0,0);
}

function exportCsv() {
  const r=TripMath.calculate(raw);
  if (r.errors.length) return;
  const csvNumber=n=>n==null?'':TripMath.format(n,lang,{group:false});
  const rows=[[t('csv')],[t('taxNote')],[t('currency'),currency],[],[t('inputs'),t('value'),t('measure')]];
  for (const key of TripMath.fields) rows.push([t(key),csvNumber(r.inputs[key]),unit(key)]);
  rows.push([], [t('results'),t('value'),t('measure')]);
  for (const [key,value,u] of [['distanceTotal',r.distance,'km'],['totalCosts',r.costs,currency],['profit',r.profit,currency],['margin',r.margin,'%'],['costKm',r.costKm,currency+'/km'],['breakEven',r.breakEven,currency+'/km']]) {
    rows.push([t(key),csvNumber(value),u]);
  }
  rows.push([],[t('breakdown'),currency,t('share')+' (%)']);
  parts.forEach((key,i)=>rows.push([t(key),csvNumber(r.parts[i]),csvNumber(TripMath.round(r.parts[i]*10000n,r.costs))]));
  const contents='\uFEFFsep=;\r\n'+rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\r\n')+'\r\n';
  const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8'}));
  const a=document.createElement('a');
  a.href=url; a.download='transport-'+new Date().toISOString().slice(0,10)+'-'+currency+'.csv';
  document.body.append(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
  notify('exported');
}
function applyTheme() {
  document.documentElement.dataset.theme=theme;
  $('theme').innerHTML=icon(theme==='dark'?'sun':'moon');
  $('theme').title=t(theme==='dark'?'light':'dark');
  $('theme').setAttribute('aria-label',$('theme').title);
}
function translate() {
  document.documentElement.lang=lang.toLowerCase();
  document.title=t('title')+' | FreightLedger';
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
  $('language').value=lang;
  $('language').setAttribute('aria-label',t('language'));
  $('metrics').setAttribute('aria-label',t('updated'));
  document.querySelector('nav').setAttribute('aria-label',lang==='PL'?'Nawigacja':'Navigation');
  syncInputs(); applyTheme(); renderResults(); renderHistory();
}
makeFields();
document.querySelectorAll('i[data-icon]').forEach(el=>el.innerHTML=svg(el.dataset.icon));
$('form').onsubmit=e=>e.preventDefault();
$('form').oninput=e=>{
  if (TripMath.fields.includes(e.target.id)) { raw[e.target.id]=e.target.value; renderResults(); }
};
$('currency').onchange=e=>{currency=e.target.value; renderResults();};
$('language').onchange=e=>{lang=e.target.value; writePref('language',lang); translate();};
$('theme').onclick=()=>{theme=theme==='light'?'dark':'light'; writePref('theme',theme); applyTheme();};
$('save').onclick=saveTrip;
$('export').onclick=exportCsv;
$('calc-tab').onclick=$('back').onclick=()=>showView(false);
$('history-tab').onclick=()=>showView(true);
window.addEventListener('storage',e=>{if (e.key===prefix+'history' || e.key===null) renderHistory();});
translate();

