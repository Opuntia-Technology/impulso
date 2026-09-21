(function (root) {
  'use strict';
  const day = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const parse = s => new Date(s+'T12:00:00');
  const add = (s,n) => { const d=parse(s); d.setDate(d.getDate()+n); return day(d); };
  const monday = s => { const d=parse(s); return add(s,-((d.getDay()+6)%7)); };
  const validDate = s => typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(parse(s)) && day(parse(s))===s;
  const active = (g,d) => g.start<=d && (!g.end || d<g.end);
  const goalsOn = (s,d) => s.goals.filter(g=>active(g,d));
  const habitGoals = s => s.goals.filter(g=>!g.deleted && !g.end);
  const status = (s,g,d) => s.records[d]?.[g.id] ?? null;
  function daily(s,d) {
    const goals=goalsOn(s,d), yes=goals.filter(g=>status(s,g,d)===true).length;
    return {total:goals.length,yes,pending:goals.filter(g=>status(s,g,d)===null).length,percent:goals.length?Math.round(100*yes/goals.length):0};
  }
  function weekReview(s,g,w,today) {
    let missed=null, awaitingReturn=false;
    for(let i=0;i<7;i++) {
      const d=add(w,i); if(d>today)break;
      if(!active(g,d))return {valid:false,missed:null,awaitingReturn:false};
      const value=status(s,g,d);
      if(value===null && d===today)break;
      // An unrecorded past day cannot silently consume the allowance.
      if(value===null)return {valid:false,missed:null,awaitingReturn:false};
      if(value===false) {
        if(missed)return {valid:false,missed:null,awaitingReturn:false};
        missed=d;
        const next=add(d,1), back=next<=today && active(g,next) && status(s,g,next)===true;
        if(!back) {
          if((next>today || (next===today && status(s,g,next)===null)) && active(g,next)) awaitingReturn=true;
          else return {valid:false,missed:null,awaitingReturn:false};
        }
      }
    }
    return {valid:true,missed,awaitingReturn};
  }
  function habit(s,g,today) {
    const start=g.start;
    let streak=0, earned=null;
    for(let w=start; add(w,6)<today; w=add(w,7)) {
      const review=weekReview(s,g,w,today);
      if(review.valid && review.awaitingReturn)break;
      streak=review.valid?streak+1:0;
      if(streak===3 && !earned) earned=add(w,6);
    }
    return {streak:Math.min(streak,3),earned};
  }
  function graceEvents(s,today) {
    const events=[];
    for(const g of s.goals) {
      const start=g.start;
      const earned=habit(s,g,today).earned;
      for(let w=start;w<=today;w=add(w,7)) {
        if(earned && w>earned)break;
        const r=weekReview(s,g,w,today);
        if(r.valid && r.missed)events.push({id:g.id,date:r.missed,title:g.title,kind:r.awaitingReturn?'pending':'recovered'});
      }
    }
    return events;
  }
  function weekly(s,start,today) {
    const dates=Array.from({length:7},(_,i)=>add(start,i));
    let positive=0,negative=0,bonus=0,total=0,yes=0;
    dates.filter(d=>d<=today).forEach(d=>goalsOn(s,d).forEach(g=>{
      total++; const v=status(s,g,d); if(v===true){yes++; positive+=g.reward;} if(v===false)negative+=g.penalty;
    }));
    s.goals.forEach(g=>{const h=habit(s,g,today); if(h.earned && dates.includes(h.earned))bonus+=g.bonus;});
    return {dates,positive,negative,bonus,balance:positive-negative+bonus,percent:total?Math.round(yes/total*100):0,total,yes};
  }
  function weekdayProgress(s,today) {
    const start=monday(today), totals=Array(7).fill(0), counts=Array(7).fill(0);
    const first=s.goals.reduce((min,g)=>g.start<min?g.start:min,today);
    for(let date=first;date<start;date=add(date,1)) {
      const m=daily(s,date);if(!m.total)continue;
      const index=(parse(date).getDay()+6)%7;
      totals[index]+=100*m.yes/m.total;counts[index]++;
    }
    return Array.from({length:7},(_,i)=>{
      const date=add(start,i),m=daily(s,date);
      return {date,count:counts[i],history:counts[i]?Math.round(totals[i]/counts[i]):null,current:date<=today&&m.total?m.percent:null,pending:date<=today?m.pending:0};
    });
  }
  function validate(s) {
    if(!s || s.version!==1 || !Array.isArray(s.goals) || s.goals.length>500 || !s.records || typeof s.records!=='object' || Array.isArray(s.records) || !['ARS','USD','EUR','MXN','CLP','COP','UYU'].includes(s.currency))throw Error('Formato de copia no válido.');
    const ids=new Set();
    for(const g of s.goals) {
      if(!g || typeof g.id!=='string' || !/^[a-zA-Z0-9-]{1,80}$/.test(g.id) || ids.has(g.id) || typeof g.title!=='string' || !g.title.trim() || g.title.length>120 || !validDate(g.start) || (g.end && (!validDate(g.end)||g.end<g.start)) || ![g.reward,g.penalty,g.bonus].every(n=>Number.isFinite(n)&&n>=0&&n<=1e9))throw Error('Objetivo no válido.');
      ids.add(g.id);
    }
    for(const [d,rows] of Object.entries(s.records)) {
      if(!validDate(d) || !rows || typeof rows!=='object' || Array.isArray(rows))throw Error('Registro no válido.');
      for(const [id,v] of Object.entries(rows))if(!ids.has(id)||typeof v!=='boolean')throw Error('Resultado no válido.');
    }
    return s;
  }
  const api={day,add,monday,validDate,active,goalsOn,status,daily,habit,weekly,validate,weekReview,graceEvents,habitGoals,weekdayProgress};
  if(typeof module!=='undefined')module.exports=api; else root.Impulso=api;
})(typeof window!=='undefined'?window:globalThis);
