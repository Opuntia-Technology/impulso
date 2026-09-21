(function(root){
  'use strict';
  function select(previous,day,count,random=Math.random){
    if(previous?.day===day && Number.isInteger(previous.current) && previous.current>=0 && previous.current<count)return previous;
    let remaining=Array.isArray(previous?.remaining)?previous.remaining.filter(n=>Number.isInteger(n)&&n>=0&&n<count):[];
    if(new Set(remaining).size!==remaining.length)remaining=[];
    if(!remaining.length){
      remaining=Array.from({length:count},(_,i)=>i);
      for(let i=count-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]];}
      if(count>1 && remaining[remaining.length-1]===previous?.current)[remaining[0],remaining[count-1]]=[remaining[count-1],remaining[0]];
    }
    return {day,current:remaining.pop(),remaining};
  }
  let memory=null;
  function get(day){
    if(!memory){try{memory=JSON.parse(localStorage.getItem('impulso-daily-quotes-v1'));}catch(e){}}
    memory=select(memory,day,root.ImpulsoQuoteList.length);
    try{localStorage.setItem('impulso-daily-quotes-v1',JSON.stringify(memory));}catch(e){}
    return root.ImpulsoQuoteList[memory.current];
  }
  if(typeof module!=='undefined')module.exports={select};else root.ImpulsoDailyQuotes={get};
})(typeof window!=='undefined'?window:globalThis);
