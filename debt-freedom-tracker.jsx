import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   DEBT FREEDOM TRACKER v4
   Slate/white · ADHD dopamine · Snowball · What-if
   ═══════════════════════════════════════════════════ */

function fmt(n){const v=Number.isFinite(n)?n:0;return v.toLocaleString(undefined,{style:"currency",currency:"USD",maximumFractionDigits:0})}
function fmtX(n){const v=Number.isFinite(n)?n:0;return v.toLocaleString(undefined,{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2})}
function fmtDate(d){return new Intl.DateTimeFormat(undefined,{year:"numeric",month:"short",day:"numeric"}).format(new Date(d))}
function fmtMoYr(d){return new Intl.DateTimeFormat(undefined,{year:"numeric",month:"short"}).format(new Date(d))}
function uid(){return`${Date.now()}_${Math.random().toString(36).slice(2,8)}`}
function daysBetween(a,b){return Math.max(0,Math.ceil((new Date(b)-new Date(a))/864e5))}
function clamp01(x){return Math.max(0,Math.min(1,x))}
function addMonths(date,n){const d=new Date(date);d.setMonth(d.getMonth()+n);return d}

/* ─── Colors ─── */
const C={bg:"#f8fafc",card:"#ffffff",border:"#e2e8f0",text:"#0f172a",mid:"#334155",light:"#64748b",faint:"#94a3b8",accent:"#0f172a",inner:"#f8fafc",green:"#10b981"};
const sCard={borderRadius:16,background:C.card,border:`1px solid ${C.border}`,padding:20,boxShadow:"0 1px 3px rgba(0,0,0,.04)"};
const sInner={borderRadius:12,border:`1px solid ${C.border}`,background:C.inner,padding:16};
const sLabel={fontSize:11,color:C.light,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600};
const sInput={width:"100%",padding:"12px 14px",borderRadius:12,border:`2px solid ${C.border}`,background:C.card,color:C.text,fontSize:16,fontWeight:600,outline:"none",boxSizing:"border-box",transition:"border-color .2s"};
const sBtnP={borderRadius:12,padding:"10px 20px",fontSize:14,fontWeight:600,border:"none",cursor:"pointer",background:C.accent,color:"#fff",boxShadow:"0 1px 2px rgba(0,0,0,.08)"};
const sBtnS={borderRadius:12,padding:"10px 20px",fontSize:14,fontWeight:600,border:`1px solid ${C.border}`,cursor:"pointer",background:C.card,color:C.text};
const sChip=(color)=>({display:"inline-block",padding:"3px 9px",borderRadius:8,background:color+"18",color,fontSize:11,fontWeight:700});

/* ─── Ring ─── */
function Ring({pct,size=110,stroke=9,color="#0f172a"}){
  const r=(size-stroke)/2,circ=2*Math.PI*r,off=circ*(1-clamp01(pct));
  return(
    <div style={{position:"relative",width:size,height:size}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{transition:"stroke-dashoffset .8s cubic-bezier(.17,.67,.35,1)"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:20,fontWeight:700,color:C.text}}>{Math.round(pct*100)}%</span>
      </div>
    </div>
  );
}

/* ─── Sparkline ─── */
function Sparkline({data,color="#0f172a"}){
  if(!data||data.length<2)return null;
  const w=220,h=44,pad=4;
  const mx=Math.max(...data),mn=Math.min(...data),rng=mx-mn||1;
  const pts=data.map((v,i)=>`${pad+(i/(data.length-1))*(w-pad*2)},${h-pad-((v-mn)/rng)*(h-pad*2)}`).join(" ");
  const area=`${pad},${h-pad} ${pts} ${w-pad},${h-pad}`;
  return(
    <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height:"auto"}}>
      <polygon points={area} fill={color} opacity=".08"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Bar chart for obligation timeline ─── */
function ObligationBars({data}){
  // data: [{label, value, maxValue}]
  if(!data||data.length===0)return null;
  const mx=Math.max(...data.map(d=>d.maxValue||d.value),1);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {data.map((d,i)=>(
        <div key={i}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
            <span style={{color:C.mid,fontWeight:600}}>{d.label}</span>
            <span style={{color:d.value===0?C.green:C.text,fontWeight:700}}>{fmt(d.value)}/mo</span>
          </div>
          <div style={{height:10,borderRadius:99,background:"#e2e8f0",overflow:"hidden"}}>
            <div style={{height:10,borderRadius:99,background:d.value===0?C.green:C.accent,width:`${Math.round((d.value/mx)*100)}%`,transition:"width .6s ease",opacity:d.value===0?.3:1}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Confetti (CSS) ─── */
function Confetti({show}){
  if(!show)return null;
  const colors=["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#0f172a"];
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,pointerEvents:"none",overflow:"hidden"}}>
      <style>{`@keyframes cfall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(400px) rotate(720deg)}}`}</style>
      {Array.from({length:60},(_,i)=>(
        <div key={i} style={{position:"absolute",left:`${30+Math.random()*40}%`,top:"40%",
          width:6+Math.random()*8,height:3+Math.random()*5,background:colors[i%colors.length],borderRadius:1,
          animation:`cfall ${1.2+Math.random()*.8}s ease-out ${Math.random()*.3}s forwards`,opacity:0}}/>
      ))}
    </div>
  );
}

/* ─── Toast ─── */
function Toast({message}){
  if(!message)return null;
  return(
    <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",
      background:"#0f172a",color:"#fff",padding:"14px 28px",borderRadius:14,
      fontSize:15,fontWeight:600,zIndex:9998,boxShadow:"0 8px 32px rgba(0,0,0,.18)",
      pointerEvents:"none",maxWidth:"90vw",textAlign:"center"}}>
      {message}
    </div>
  );
}

/* ═══ DATA ═══ */
const DEBTS=[
  {id:"arrears",name:"Child Support Arrears",icon:"👨‍👧",startingBalance:32417.51,currentBalance:32417.51,monthlyPayment:4000,paySchedule:"biweekly",payPerCheck:2000,type:"paydown",color:"#3b82f6",snowballPriority:1},
  {id:"medical",name:"Medical Loan (SoFi)",icon:"🏥",startingBalance:36936.62,currentBalance:36936.62,monthlyPayment:1229.76,paySchedule:"monthly",type:"paydown",color:"#8b5cf6",snowballPriority:2},
  {id:"taxes",name:"Back Taxes (IRS)",icon:"🏛️",startingBalance:75000,currentBalance:75000,monthlyPayment:949,type:"paydown",color:"#ef4444",note:"Estimate — update when IRS statement arrives",snowballPriority:3},
  {id:"rent",name:"Emily Rent",icon:"🎓",startingBalance:null,currentBalance:null,monthlyPayment:800,type:"countdown",endsOn:"2027-05-31",color:"#f59e0b"},
];

const INIT={debts:JSON.parse(JSON.stringify(DEBTS)),history:[],milestones:[]};

/* ═══ APP ═══ */
export default function DebtFreedomTracker(){
  const[state,setState]=useState(()=>JSON.parse(JSON.stringify(INIT)));
  const[view,setView]=useState("dashboard");
  const[selDebt,setSelDebt]=useState(null);
  const[newBal,setNewBal]=useState("");
  const[whatIfExtra,setWhatIfExtra]=useState(0);
  const[showConfetti,setShowConfetti]=useState(false);
  const[toastMsg,setToastMsg]=useState("");

  const now=new Date();

  function toast(msg){setToastMsg(msg);setTimeout(()=>setToastMsg(""),3500)}
  function fireConfetti(){setShowConfetti(true);setTimeout(()=>setShowConfetti(false),2500)}

  /* ─── Derived ─── */
  const paydowns=state.debts.filter(d=>d.type==="paydown");
  const totalOrig=paydowns.reduce((s,d)=>s+(d.startingBalance||0),0);
  const totalCurr=paydowns.reduce((s,d)=>s+(d.currentBalance||0),0);
  const totalPaid=totalOrig-totalCurr;
  const totalPct=totalOrig>0?totalPaid/totalOrig:0;
  const totalMonthlyOut=state.debts.reduce((s,d)=>s+((d.type==="paydown"&&(d.currentBalance||0)>0)||(d.type==="countdown")?(d.monthlyPayment||0):0),0);
  const totalMonthlyFreed=paydowns.reduce((s,d)=>s+((d.currentBalance||0)<=0?(d.monthlyPayment||0):0),0);

  const maxPayoffDays=Math.max(
    ...paydowns.map(d=>{if((d.currentBalance||0)<=0)return 0;if((d.monthlyPayment||0)<=0)return 9999;return Math.ceil((d.currentBalance||0)/d.monthlyPayment)*30}),
    ...state.debts.filter(d=>d.type==="countdown").map(d=>daysBetween(now,d.endsOn)),0
  );

  /* ─── Streak ─── */
  const streak=useMemo(()=>{
    if(state.history.length===0)return{count:0,label:"No updates yet"};
    const months=new Set();
    state.history.forEach(h=>{
      const d=new Date(h.date);
      months.add(`${d.getFullYear()}-${d.getMonth()}`);
    });
    // count consecutive months backwards from current
    let count=0;
    let check=new Date(now);
    for(let i=0;i<36;i++){
      const key=`${check.getFullYear()}-${check.getMonth()}`;
      if(months.has(key)){count++;check=addMonths(check,-1)}
      else break;
    }
    if(count===0){
      // check if there's one this month we haven't counted
      const thisKey=`${now.getFullYear()}-${now.getMonth()}`;
      if(months.has(thisKey))count=1;
    }
    const label=count===0?"No updates this month":count===1?"Updated this month":`${count} month streak 🔥`;
    return{count,label};
  },[state.history, now]);

  /* ─── Snowball projection ─── */
  const snowball=useMemo(()=>{
    // Simulate paying debts in snowball order (smallest balance first by priority)
    // When one is paid off, its monthly goes to the next
    const active=paydowns
      .filter(d=>(d.currentBalance||0)>0)
      .sort((a,b)=>(a.snowballPriority||99)-(b.snowballPriority||99));

    if(active.length===0)return{events:[],withoutSnowball:[],withSnowball:[]};

    // WITHOUT snowball (each debt at its own payment rate)
    const without=active.map(d=>{
      const mo=d.monthlyPayment>0?Math.ceil((d.currentBalance||0)/d.monthlyPayment):999;
      return{...d,months:mo,payoffDate:addMonths(now,mo)};
    });

    // WITH snowball (freed cash rolls into next debt)
    const sim=active.map(d=>({...d,bal:d.currentBalance||0,payment:d.monthlyPayment||0}));
    const events=[];
    let freedPool=0;
    let month=0;
    const maxIter=200;

    // Also include Emily rent ending as freed cash
    const rentDebt=state.debts.find(d=>d.id==="rent");
    const rentEndsMonth=rentDebt?Math.max(0,Math.ceil(daysBetween(now,rentDebt.endsOn)/30)):999;

    while(sim.some(d=>d.bal>0)&&month<maxIter){
      month++;
      // Check if rent freed this month
      if(rentDebt&&month===rentEndsMonth){
        freedPool+=rentDebt.monthlyPayment||0;
        events.push({month,date:addMonths(now,month),event:`Emily rent ends → +${fmt(rentDebt.monthlyPayment)}/mo freed`,type:"freed",icon:"🎓"});
      }
      // Apply payments, extra goes to first active debt
      let extraThisMonth=freedPool;
      for(const d of sim){
        if(d.bal<=0)continue;
        const pay=d.payment+extraThisMonth;
        extraThisMonth=0;
        const prevBal=d.bal;
        d.bal=Math.max(0,d.bal-pay);
        if(d.bal<=0&&prevBal>0){
          freedPool+=d.payment;
          const overpay=Math.abs(prevBal-pay);
          events.push({month,date:addMonths(now,month),event:`${d.name} paid off → +${fmt(d.payment)}/mo snowballs`,type:"payoff",icon:d.icon,debtId:d.id,color:d.color});
          // overpay rolls to next
          if(overpay>0){
            const next=sim.find(x=>x.bal>0&&x.id!==d.id);
            if(next)next.bal=Math.max(0,next.bal-overpay);
          }
        }
      }
    }

    const withSnowball=active.map(d=>{
      const simD=sim.find(s=>s.id===d.id);
      // find month it hit 0 in events
      const ev=events.find(e=>e.debtId===d.id&&e.type==="payoff");
      const mo=ev?ev.month:(simD&&simD.bal<=0?month:999);
      return{...d,months:mo,payoffDate:addMonths(now,mo)};
    });

    return{events,without,withSnowball};
  },[paydowns,state.debts,now]);

  /* ─── Monthly obligation timeline ─── */
  const obligationTimeline=useMemo(()=>{
    // Build timeline of monthly outflow at key future dates
    const points=[];
    const allDebts=state.debts.filter(d=>(d.type==="paydown"?(d.currentBalance||0)>0:true));
    const currentTotal=allDebts.reduce((s,d)=>s+(d.monthlyPayment||0),0);
    points.push({label:"Now",value:currentTotal,date:now});

    // Gather payoff dates from snowball
    const events=[];
    if(snowball.withSnowball){
      snowball.withSnowball.forEach(d=>{
        if(d.months<999)events.push({date:d.payoffDate,freed:d.monthlyPayment||0,name:d.name});
      });
    }
    // Add rent ending
    const rent=state.debts.find(d=>d.id==="rent");
    if(rent&&rent.endsOn){
      events.push({date:new Date(rent.endsOn),freed:rent.monthlyPayment||0,name:rent.name});
    }
    events.sort((a,b)=>a.date-b.date);

    let running=currentTotal;
    events.forEach(ev=>{
      running=Math.max(0,running-(ev.freed||0));
      points.push({label:`${fmtMoYr(ev.date)}`,value:running,date:ev.date,event:`${ev.name} done`});
    });

    // Ensure we end at 0
    if(running>0){
      points.push({label:"Freedom",value:0,date:addMonths(now,Math.ceil(maxPayoffDays/30))});
    }

    return points;
  },[state.debts,snowball,maxPayoffDays,now]);

  /* ─── Update balance ─── */
  function handleUpdate(){
    if(!selDebt)return;
    const val=parseFloat(newBal);
    if(isNaN(val)||val<0)return;
    const debt=state.debts.find(d=>d.id===selDebt);
    if(!debt||debt.type!=="paydown")return;
    const prevBal=debt.currentBalance||0;
    const delta=prevBal-val;
    if(delta===0)return;

    const newDebts=state.debts.map(d=>d.id===selDebt?{...d,currentBalance:Math.max(0,val)}:d);
    const entry={id:uid(),debtId:selDebt,date:now.toISOString(),prevBalance:prevBal,newBalance:Math.max(0,val),delta};
    const newHist=[entry,...state.history].slice(0,200);
    const newMs=[...state.milestones];
    const startBal=debt.startingBalance||1;
    const prevPct=1-prevBal/startBal;
    const nextPct=1-Math.max(0,val)/startBal;
    let tMsg="";

    if(delta>0)tMsg=`✅ ${fmt(delta)} knocked off ${debt.name}!`;

    if(val<=0&&prevBal>0){
      newMs.unshift({id:uid(),ts:now.toISOString(),debtId:selDebt,message:`🎉 ${debt.name} PAID OFF! ${fmt(debt.monthlyPayment)}/mo is yours!`,type:"payoff"});
      tMsg=`🎉 ${debt.name} IS GONE!`;
    }
    for(const m of[.25,.5,.75,.9]){
      if(prevPct<m&&nextPct>=m){
        const emoji=m>=.75?"🔥":m>=.5?"💪":"✨";
        newMs.unshift({id:uid(),ts:now.toISOString(),debtId:selDebt,message:`${emoji} ${debt.name}: ${Math.round(m*100)}% paid off!`,type:"percent"});
        if(m===.5)tMsg=`💪 HALFWAY on ${debt.name}!`;
        if(m>=.75)tMsg=`🔥 ${Math.round(m*100)}% done with ${debt.name}!`;
      }
    }
    const step=startBal>=50000?5000:2000;
    const pBand=Math.ceil(prevBal/step);
    const nBand=Math.ceil(Math.max(0,val)/step);
    if(nBand<pBand&&val>0)newMs.unshift({id:uid(),ts:now.toISOString(),debtId:selDebt,message:`📉 ${debt.name}: Under ${fmt(nBand*step)}!`,type:"dollar"});
    if(debt.monthlyPayment>0&&delta>0){
      const daysSaved=Math.round((delta/debt.monthlyPayment)*30);
      if(daysSaved>=5)newMs.unshift({id:uid(),ts:now.toISOString(),debtId:selDebt,message:`⏱️ Bought back ~${daysSaved} days of freedom`,type:"time"});
    }
    if(debt.paySchedule==="biweekly"&&delta>0){
      const expected=(debt.payPerCheck||0)*2;
      if(expected>0&&delta>expected*1.3){
        newMs.unshift({id:uid(),ts:now.toISOString(),debtId:selDebt,message:`🎰 Three-paycheck month! Extra ${fmt(delta-expected)} hit!`,type:"bonus"});
        tMsg=`🎰 Three-paycheck month! Bonus damage!`;
      }
    }

    setState({...state,debts:newDebts,history:newHist,milestones:newMs.slice(0,100)});
    if(delta>0)fireConfetti();
    if(tMsg)setTimeout(()=>toast(tMsg),150);
    setNewBal("");setSelDebt(null);setWhatIfExtra(0);setView("dashboard");
  }

  function NavBtn({r,icon,label}){
    return(<button onClick={()=>{setView(r);setSelDebt(null);setWhatIfExtra(0)}}
      style={view===r?{...sBtnP,padding:"8px 16px",fontSize:13}:{...sBtnS,padding:"8px 16px",fontSize:13}}>
      {icon} {label}
    </button>);
  }

  function debtStats(debt){
    const isP=debt.type==="paydown";
    const pct=isP&&debt.startingBalance>0?1-(debt.currentBalance||0)/debt.startingBalance:0;
    const daysLeft=isP?(debt.monthlyPayment>0&&(debt.currentBalance||0)>0?Math.ceil((debt.currentBalance||0)/debt.monthlyPayment)*30:0):daysBetween(now,debt.endsOn);
    const monthsLeft=isP?(debt.monthlyPayment>0?Math.ceil((debt.currentBalance||0)/debt.monthlyPayment):0):Math.max(0,Math.ceil(daysBetween(now,debt.endsOn)/30));
    const isPaidOff=isP&&(debt.currentBalance||0)<=0;
    return{isP,pct,daysLeft,monthsLeft,isPaidOff};
  }

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif"}}>
      <Confetti show={showConfetti}/>
      <Toast message={toastMsg}/>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"24px 20px"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16,marginBottom:24}}>
          <div>
            <div style={{fontSize:22,fontWeight:700,letterSpacing:"-.02em"}}>Debt Freedom Tracker</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginTop:4}}>
              <span style={{fontSize:13,color:C.light}}>{fmtDate(now)}</span>
              {streak.count>0&&(
                <span style={{...sChip(streak.count>=3?"#10b981":"#3b82f6"),fontSize:11}}>
                  {streak.count>=3?"🔥":streak.count>=2?"⚡":"✓"} {streak.label}
                </span>
              )}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <NavBtn r="dashboard" icon="📊" label="Dashboard"/>
            <NavBtn r="update" icon="✏️" label="Update"/>
            <NavBtn r="history" icon="📜" label="History"/>
            <NavBtn r="settings" icon="⚙️" label="Settings"/>
          </div>
        </div>

        {/* ═══ DASHBOARD ═══ */}
        {view==="dashboard"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>

            {/* Hero */}
            <div style={{...sCard,padding:"28px 24px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
                <div style={{flex:1,minWidth:200}}>
                  <div style={sLabel}>Total debt destroyed</div>
                  <div style={{fontSize:42,fontWeight:800,letterSpacing:"-.03em",color:C.green,marginTop:4}}>{fmt(totalPaid)}</div>
                  <div style={{fontSize:13,color:C.light,marginTop:4}}>
                    of {fmt(totalOrig)} · <span style={{fontWeight:600,color:C.text}}>{fmt(totalCurr)}</span> remaining
                  </div>
                  <div style={{fontSize:12,color:C.faint,marginTop:8}}>
                    {fmt(totalMonthlyOut)}/mo total obligations
                    {totalMonthlyFreed>0&&<> · <span style={{color:C.green,fontWeight:600}}>{fmt(totalMonthlyFreed)} freed</span></>}
                  </div>
                </div>
                <Ring pct={totalPct} color={C.accent}/>
                <div style={{textAlign:"center",minWidth:120}}>
                  <div style={{fontSize:36,fontWeight:800}}>{maxPayoffDays.toLocaleString()}</div>
                  <div style={{fontSize:12,color:C.light,marginTop:4}}>days to freedom</div>
                  <div style={{fontSize:11,color:C.faint,marginTop:2}}>~{Math.ceil(maxPayoffDays/30)} months</div>
                </div>
              </div>
            </div>

            {/* Debt cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
              {state.debts.map(debt=>{
                const{isP,pct,daysLeft,monthsLeft,isPaidOff}=debtStats(debt);
                const hist=state.history.filter(h=>h.debtId===debt.id);
                const spark=hist.length>=2?[...hist].reverse().map(h=>h.newBalance):null;
                return(
                  <div key={debt.id}
                    onClick={()=>{if(isP&&!isPaidOff){setSelDebt(debt.id);setNewBal(String(debt.currentBalance||0));setWhatIfExtra(0);setView("update")}}}
                    style={{...sCard,position:"relative",overflow:"hidden",cursor:isP&&!isPaidOff?"pointer":"default",...(isPaidOff?{border:`2px solid ${debt.color}`,opacity:.8}:{})}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:debt.color}}/>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginTop:4}}>
                      <div>
                        <div style={{fontSize:18}}>{debt.icon}</div>
                        <div style={{fontSize:14,fontWeight:700,marginTop:6}}>{debt.name}</div>
                        <div style={{marginTop:4}}>{isP?<span style={sChip(debt.color)}>{Math.round(pct*100)}% paid</span>:<span style={sChip(debt.color)}>countdown</span>}</div>
                        {debt.note&&<div style={{fontSize:11,color:C.faint,marginTop:4,fontStyle:"italic"}}>{debt.note}</div>}
                      </div>
                      <div style={{textAlign:"right"}}>
                        {isPaidOff?<div style={{fontSize:18,fontWeight:800,color:C.green}}>PAID OFF ✓</div>
                        :isP?<><div style={{fontSize:22,fontWeight:800}}>{fmtX(debt.currentBalance||0)}</div><div style={{fontSize:11,color:C.light,marginTop:2}}>remaining</div></>
                        :<><div style={{fontSize:22,fontWeight:800,color:debt.color}}>{monthsLeft}</div><div style={{fontSize:11,color:C.light,marginTop:2}}>months left</div></>}
                      </div>
                    </div>
                    {isP&&<div style={{marginTop:14}}><div style={{height:7,borderRadius:99,background:"#e2e8f0",overflow:"hidden"}}><div style={{height:7,borderRadius:99,background:debt.color,width:`${Math.round(pct*100)}%`,transition:"width .6s ease"}}/></div></div>}
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:14,gap:8}}>
                      <div><div style={sLabel}>{isP?"monthly":"cost/mo"}</div><div style={{fontSize:14,fontWeight:700}}>{fmtX(debt.monthlyPayment)}</div></div>
                      {isP&&debt.paySchedule==="biweekly"&&<div style={{textAlign:"center"}}><div style={sLabel}>per check</div><div style={{fontSize:14,fontWeight:700}}>{fmt(debt.payPerCheck)}</div></div>}
                      <div style={{textAlign:"center"}}><div style={sLabel}>{isP?"payments":"ends"}</div><div style={{fontSize:14,fontWeight:700}}>{isP?monthsLeft:fmtDate(debt.endsOn)}</div></div>
                      <div style={{textAlign:"right"}}><div style={sLabel}>days</div><div style={{fontSize:14,fontWeight:700,color:daysLeft<180?C.green:C.text}}>{daysLeft}</div></div>
                    </div>
                    {spark&&spark.length>=2&&<div style={{marginTop:10}}><Sparkline data={spark} color={debt.color}/></div>}
                    {isP&&!isPaidOff&&<div style={{marginTop:10,fontSize:11,color:C.faint,textAlign:"center"}}>click to update balance</div>}
                  </div>
                );
              })}
            </div>

            {/* Snowball + Obligation Timeline row */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

              {/* Snowball cascade */}
              <div style={sCard}>
                <div style={{fontSize:15,fontWeight:700}}>⛰️ Snowball Cascade</div>
                <div style={{fontSize:12,color:C.light,marginTop:4}}>Each payoff accelerates the next. Freed cash rolls downhill.</div>

                {snowball.events.length>0?(
                  <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                    {snowball.events.map((ev,i)=>(
                      <div key={i} style={{...sInner,padding:"12px 14px",borderLeft:`3px solid ${ev.color||C.accent}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div style={{fontSize:13,fontWeight:600}}>{ev.icon} {ev.event}</div>
                          <div style={{fontSize:11,color:C.faint,whiteSpace:"nowrap"}}>{fmtMoYr(ev.date)}</div>
                        </div>
                        <div style={{fontSize:11,color:C.light,marginTop:4}}>Month {ev.month}</div>
                      </div>
                    ))}
                  </div>
                ):(
                  <div style={{...sInner,marginTop:16,color:C.light,fontSize:13}}>All debts already paid off!</div>
                )}

                {/* Compare with vs without */}
                {snowball.without&&snowball.withSnowball&&snowball.without.length>0&&(
                  <div style={{marginTop:16}}>
                    <div style={{...sLabel,marginBottom:8}}>Without vs With Snowball</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {snowball.without.map((d,i)=>{
                        const ws=snowball.withSnowball.find(x=>x.id===d.id);
                        const saved=ws?d.months-ws.months:0;
                        return(
                          <div key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,padding:"6px 0",borderBottom:i<snowball.without.length-1?`1px solid ${C.border}`:"none"}}>
                            <span style={{fontWeight:600}}>{d.icon} {d.name}</span>
                            <span>
                              <span style={{color:C.light}}>{d.months}mo</span>
                              {saved>0&&<>
                                <span style={{margin:"0 6px",color:C.faint}}>→</span>
                                <span style={{fontWeight:700,color:C.green}}>{ws.months}mo</span>
                                <span style={{...sChip(C.green),marginLeft:6}}>-{saved}mo</span>
                              </>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly obligation timeline */}
              <div style={sCard}>
                <div style={{fontSize:15,fontWeight:700}}>📉 Monthly Obligation Timeline</div>
                <div style={{fontSize:12,color:C.light,marginTop:4}}>Watch your monthly outflow shrink as debts fall off.</div>

                <div style={{marginTop:16}}>
                  <ObligationBars data={obligationTimeline.map(p=>({
                    label:typeof p.label==="string"?p.label:fmtMoYr(p.date),
                    value:p.value,
                    maxValue:obligationTimeline[0]?.value||1,
                    event:p.event,
                  }))}/>
                </div>

                {/* Summary */}
                <div style={{marginTop:16,padding:14,borderRadius:12,background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#166534"}}>
                    {fmt(totalMonthlyOut)}/mo now → $0/mo by {fmtMoYr(addMonths(now,Math.ceil(maxPayoffDays/30)))}
                  </div>
                  <div style={{fontSize:12,color:C.light,marginTop:4}}>
                    That's {fmt(totalMonthlyOut * 12)}/year back in your pocket when it's done.
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones */}
            {state.milestones.length>0&&(
              <div style={sCard}>
                <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>🏆 Milestones</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {state.milestones.slice(0,8).map(m=>(
                    <div key={m.id} style={{...sInner,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px"}}>
                      <div style={{fontSize:13,fontWeight:600}}>{m.message}</div>
                      <div style={{fontSize:11,color:C.faint,whiteSpace:"nowrap",marginLeft:12}}>{fmtDate(m.ts)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Freedom Pipeline */}
            <div style={sCard}>
              <div style={{fontSize:15,fontWeight:700}}>Freedom Pipeline</div>
              <div style={{fontSize:13,color:C.light,marginTop:4}}>When each obligation ends, this money becomes yours.</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginTop:16}}>
                {state.debts.filter(d=>(d.type==="paydown"?(d.currentBalance||0)>0:true)).sort((a,b)=>{
                  const da=a.type==="paydown"?(a.monthlyPayment>0?Math.ceil((a.currentBalance||0)/a.monthlyPayment)*30:9999):daysBetween(now,a.endsOn);
                  const db=b.type==="paydown"?(b.monthlyPayment>0?Math.ceil((b.currentBalance||0)/b.monthlyPayment)*30:9999):daysBetween(now,b.endsOn);
                  return da-db;
                }).map(debt=>{
                  const dl=debt.type==="paydown"?(debt.monthlyPayment>0?Math.ceil((debt.currentBalance||0)/debt.monthlyPayment)*30:0):daysBetween(now,debt.endsOn);
                  return(
                    <div key={debt.id} style={sInner}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:13,fontWeight:600}}>{debt.icon} {debt.name}</div>
                        <div style={{fontSize:13,fontWeight:700,color:C.green}}>+{fmt(debt.monthlyPayment)}/mo</div>
                      </div>
                      <div style={{fontSize:11,color:C.light,marginTop:4}}>Freed in ~{Math.ceil(dl/30)} months ({dl} days)</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ UPDATE ═══ */}
        {view==="update"&&(
          <div style={{maxWidth:520,margin:"0 auto"}}>
            {!selDebt?(
              <div style={sCard}>
                <div style={{fontSize:18,fontWeight:700,marginBottom:16}}>Which debt to update?</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {paydowns.filter(d=>(d.currentBalance||0)>0).map(d=>(
                    <div key={d.id} onClick={()=>{setSelDebt(d.id);setNewBal(String(d.currentBalance||0));setWhatIfExtra(0)}}
                      style={{...sInner,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:15,fontWeight:600}}>{d.icon} {d.name}</span>
                      <span style={{fontWeight:700,color:d.color}}>{fmtX(d.currentBalance||0)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ):(()=>{
              const debt=state.debts.find(d=>d.id===selDebt);
              if(!debt)return null;
              const enteredBal=parseFloat(newBal)||0;
              const preview=(debt.currentBalance||0)-enteredBal;

              // What-if: show impact of extra payment
              const whatIfBal=Math.max(0,enteredBal-whatIfExtra);
              const whatIfDelta=(debt.currentBalance||0)-whatIfBal;
              const normalMonths=debt.monthlyPayment>0?Math.ceil(enteredBal/debt.monthlyPayment):0;
              const whatIfMonths=debt.monthlyPayment>0?Math.ceil(whatIfBal/debt.monthlyPayment):0;
              const monthsSaved=normalMonths-whatIfMonths;

              return(
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div style={sCard}>
                    <div style={{fontSize:18}}>{debt.icon}</div>
                    <div style={{fontSize:20,fontWeight:700,marginTop:4}}>{debt.name}</div>
                    <div style={{fontSize:14,color:C.light,marginTop:4}}>Current: {fmtX(debt.currentBalance||0)}</div>

                    <div style={{marginTop:24}}>
                      <div style={sLabel}>New remaining balance</div>
                      <input type="number" value={newBal}
                        onChange={e=>setNewBal(e.target.value)}
                        onFocus={e=>e.target.select()}
                        style={{...sInput,marginTop:8,borderColor:preview>0?C.green:C.border}}
                        placeholder="Enter new balance" autoFocus step="0.01"/>
                    </div>

                    {preview>0&&(
                      <div style={{marginTop:16,padding:14,borderRadius:12,background:"#f0fdf4",border:"1px solid #bbf7d0",textAlign:"center"}}>
                        <div style={{fontSize:14,color:"#166534",fontWeight:600}}>🎯 {fmt(preview)} knocked off!</div>
                        {debt.monthlyPayment>0&&<div style={{fontSize:12,color:C.light,marginTop:4}}>~{Math.round((preview/debt.monthlyPayment)*30)} days bought back</div>}
                      </div>
                    )}

                    <div style={{display:"flex",gap:12,marginTop:24}}>
                      <button onClick={handleUpdate}
                        style={{...sBtnP,flex:1,padding:"14px 20px",fontSize:16,opacity:preview>0?1:.5}}>
                        Update Balance
                      </button>
                      <button onClick={()=>{setSelDebt(null);setView("dashboard");setWhatIfExtra(0)}}
                        style={{...sBtnS,padding:"14px 20px"}}>Cancel</button>
                    </div>
                  </div>

                  {/* What-if card */}
                  {enteredBal>0&&(
                    <div style={sCard}>
                      <div style={{fontSize:14,fontWeight:700}}>💭 What if you threw extra at this?</div>
                      <div style={{fontSize:12,color:C.light,marginTop:4}}>Slide to see the impact of an extra one-time payment.</div>

                      <div style={{marginTop:16}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                          <span style={{fontSize:13,color:C.mid}}>Extra payment</span>
                          <span style={{fontSize:16,fontWeight:800,color:whatIfExtra>0?C.green:C.text}}>{fmt(whatIfExtra)}</span>
                        </div>
                        <input type="range" min={0} max={Math.min(enteredBal,5000)} step={100} value={whatIfExtra}
                          onChange={e=>setWhatIfExtra(Number(e.target.value))}
                          style={{width:"100%",accentColor:C.accent}}/>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.faint,marginTop:4}}>
                          <span>$0</span>
                          <span>{fmt(Math.min(enteredBal,5000))}</span>
                        </div>
                      </div>

                      {whatIfExtra>0&&(
                        <div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                          <div style={sInner}>
                            <div style={sLabel}>New balance would be</div>
                            <div style={{fontSize:18,fontWeight:800,color:C.green,marginTop:4}}>{fmtX(whatIfBal)}</div>
                          </div>
                          <div style={sInner}>
                            <div style={sLabel}>Total knocked off</div>
                            <div style={{fontSize:18,fontWeight:800,color:C.green,marginTop:4}}>{fmt(whatIfDelta)}</div>
                          </div>
                          <div style={sInner}>
                            <div style={sLabel}>Months to payoff</div>
                            <div style={{fontSize:18,fontWeight:800,marginTop:4}}>
                              <span style={{textDecoration:"line-through",color:C.faint,marginRight:8}}>{normalMonths}</span>
                              <span style={{color:C.green}}>{whatIfMonths}</span>
                            </div>
                          </div>
                          <div style={sInner}>
                            <div style={sLabel}>Time saved</div>
                            <div style={{fontSize:18,fontWeight:800,color:C.green,marginTop:4}}>
                              {monthsSaved>0?`${monthsSaved} month${monthsSaved>1?"s":""}`:"-"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ═══ HISTORY ═══ */}
        {view==="history"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={sCard}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:18,fontWeight:700}}>📜 Balance Updates</div>
                  <div style={{fontSize:13,color:C.light}}>{state.history.length} entries</div>
                </div>
                {streak.count>0&&<span style={sChip(streak.count>=3?"#10b981":"#3b82f6")}>{streak.label}</span>}
              </div>
            </div>
            {state.history.length===0&&<div style={{...sCard,textAlign:"center",color:C.light}}>No updates yet. Click a debt card to log your first balance update.</div>}
            {state.history.slice(0,30).map(h=>{
              const debt=state.debts.find(d=>d.id===h.debtId);
              return(
                <div key={h.id} style={sCard}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:700}}>{debt?.icon} {debt?.name||h.debtId}</div>
                      <div style={{fontSize:12,color:C.light,marginTop:4}}>{fmtDate(h.date)}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:16,fontWeight:800,color:h.delta>0?C.green:"#ef4444"}}>{h.delta>0?"−":"+"}{fmt(Math.abs(h.delta))}</div>
                      <div style={{fontSize:12,color:C.light,marginTop:2}}>{fmtX(h.prevBalance)} → {fmtX(h.newBalance)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ SETTINGS ═══ */}
        {view==="settings"&&(
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={sCard}>
              <div style={{fontSize:18,fontWeight:700}}>⚙️ Settings</div>
              <div style={{fontSize:13,color:C.light}}>Edit debts, add new ones, export/import.</div>
            </div>
            {state.debts.map(debt=>(
              <div key={debt.id} style={sCard}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                  <span style={{fontSize:18}}>{debt.icon}</span>
                  <span style={{fontSize:15,fontWeight:700}}>{debt.name}</span>
                  <span style={sChip(debt.color)}>{debt.type}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {debt.type==="paydown"&&<>
                    <div><div style={sLabel}>Starting balance</div><input type="number" step="0.01" value={debt.startingBalance||0} onChange={e=>setState(p=>({...p,debts:p.debts.map(d=>d.id===debt.id?{...d,startingBalance:Number(e.target.value)}:d)}))} style={{...sInput,fontSize:14,padding:"10px 12px",marginTop:6}}/></div>
                    <div><div style={sLabel}>Current balance</div><input type="number" step="0.01" value={debt.currentBalance||0} onChange={e=>setState(p=>({...p,debts:p.debts.map(d=>d.id===debt.id?{...d,currentBalance:Number(e.target.value)}:d)}))} style={{...sInput,fontSize:14,padding:"10px 12px",marginTop:6}}/></div>
                  </>}
                  <div><div style={sLabel}>Monthly payment</div><input type="number" step="0.01" value={debt.monthlyPayment||0} onChange={e=>setState(p=>({...p,debts:p.debts.map(d=>d.id===debt.id?{...d,monthlyPayment:Number(e.target.value)}:d)}))} style={{...sInput,fontSize:14,padding:"10px 12px",marginTop:6}}/></div>
                  {debt.type==="countdown"&&<div><div style={sLabel}>Ends on</div><input type="date" value={debt.endsOn||""} onChange={e=>setState(p=>({...p,debts:p.debts.map(d=>d.id===debt.id?{...d,endsOn:e.target.value}:d)}))} style={{...sInput,fontSize:14,padding:"10px 12px",marginTop:6}}/></div>}
                </div>
              </div>
            ))}
            <div style={sCard}>
              <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>Add new debt</div>
              <button onClick={()=>{
                const name=prompt("Debt name?");if(!name)return;
                const bal=parseFloat(prompt("Starting balance? (0 for countdown)")||"0");
                const mo=parseFloat(prompt("Monthly payment?")||"0");
                const type=bal>0?"paydown":"countdown";
                const endsOn=type==="countdown"?(prompt("End date? YYYY-MM-DD")||"2027-12-31"):undefined;
                const icons=["💰","📋","🏠","🚗","📱","⚡","🎯"];
                const colors=["#06b6d4","#ec4899","#84cc16","#f97316","#a855f7"];
                setState(p=>({...p,debts:[...p.debts,{id:uid(),name,icon:icons[Math.floor(Math.random()*icons.length)],startingBalance:bal,currentBalance:bal,monthlyPayment:mo,type,endsOn,color:colors[Math.floor(Math.random()*colors.length)],snowballPriority:99}]}));
              }} style={{...sBtnS,width:"100%",padding:14}}>+ Add a debt</button>
            </div>
            <div style={sCard}>
              <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>💾 Data</div>
              <div style={{display:"flex",gap:12}}>
                <button onClick={()=>{
                  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
                  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="debt-tracker.json";a.click();URL.revokeObjectURL(url);
                }} style={{...sBtnP,flex:1}}>Export JSON</button>
                <label style={{...sBtnS,flex:1,textAlign:"center",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  Import JSON
                  <input type="file" accept="application/json" style={{display:"none"}} onChange={e=>{
                    const f=e.target.files?.[0];if(!f)return;
                    const r=new FileReader();r.onload=()=>{try{setState(JSON.parse(String(r.result)));toast("✅ Imported!")}catch{toast("❌ Invalid JSON")}};r.readAsText(f);
                  }}/>
                </label>
              </div>
              <div style={{fontSize:12,color:C.light,marginTop:12}}>Export to save. Import to restore.</div>
            </div>
            <button onClick={()=>{if(confirm("Reset everything?"))setState(JSON.parse(JSON.stringify(INIT)))}}
              style={{fontSize:13,color:"#ef4444",background:"none",border:"none",cursor:"pointer",padding:8,textAlign:"left"}}>Reset to defaults</button>
          </div>
        )}
      </div>
    </div>
  );
}
