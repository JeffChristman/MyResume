import { useState, useRef, useEffect } from "react";


// ============================================================
// ✏️  JEFF CHRISTMAN — RESUME DATA
// ============================================================
const RESUME_DATA = {
  name: "Jeff Christman",
  title: "Azure Cloud Security Lead & Secure Cloud SME",
  subtitle: "20+ years of IT & cybersecurity | Zero Trust | SIEM/SOAR | Federal Compliance",
  location: "Missouri City, TX 77459",
  email: "Iegpartners@gmail.com",
  phone: "+1 713 252 4507",
  summary:
    "Results-driven Azure Cloud Security Lead and Secure Cloud SME with 20+ years of IT and cybersecurity experience, combining deep technical expertise with client-facing engagement leadership. Proven specialist in Microsoft Sentinel (SIEM/SOAR), Microsoft Defender for Cloud, Zero Trust Architecture, and federal compliance frameworks including NIST 800-53, CIS v3, CMMC, and FedRAMP. Extensive experience guiding enterprise and government cloud security programs from strategy and architecture through execution, translating complex technical initiatives into measurable risk reduction, operational resilience, and ATO readiness across Azure Commercial, Azure Government, and AWS GovCloud environments.",
  experience: [
    {
      company: "Maveris",
      role: "Secure Cloud SME — Azure Cloud Security Lead",
      period: "July 2024 – Present",
      location: "Houston, TX",
      bullets: [
        "Serve as primary engagement lead supporting the U.S. Department of Veterans Affairs, ensuring cloud security consulting initiatives are delivered with precision, transparency, and measurable outcomes.",
        "Oversee cross-functional delivery teams across Azure Commercial, Azure Government, and AWS GovCloud, aligning technical execution with client objectives and compliance frameworks (NIST 800-53, CIS v3).",
        "Act as trusted advisor to senior stakeholders, managing escalations and communicating risks, mitigations, and remediation status in clear, business-relevant terms.",
        "Lead Zero Trust and Microsoft Defender for Cloud modernization initiatives, integrating Microsoft Sentinel and Azure Policy to enforce governance, data protection, and insider risk controls.",
        "Implement PowerShell- and Turbot-based automation workflows to accelerate compliance verification and reduce manual audit effort by ~40%.",
        "Mentor junior engineers on secure cloud design, policy automation, and effective client communication.",
      ],
    },
    {
      company: "Avanade",
      role: "Senior Consultant – Cloud Security",
      period: "April 2019 – July 2024",
      location: "Houston, TX",
      bullets: [
        "Architected and led Azure cloud security and transformation initiatives across multiple enterprise and public-sector clients, improving operational efficiency by ~20%.",
        "Automated secure cloud deployments using Terraform and ARM templates, standardizing environments and reducing provisioning times by ~40%.",
        "Conducted recurring NIST and CMMC compliance assessments, driving remediation efforts that achieved 100% closure of identified findings within defined SLA windows.",
        "Supported Zero Trust Architecture implementations spanning identity protection, network segmentation, endpoint security, and monitoring.",
        "Led and mentored global, cross-functional delivery teams, increasing certification attainment and improving project velocity.",
      ],
    },
    {
      company: "Johnson Space Center (NASA)",
      role: "Cloud Security & Migration Consultant",
      period: "March 2018 – March 2019",
      location: "Houston, TX",
      bullets: [
        "Led the secure migration of SharePoint environments totaling over 15TB of data to AWS GovCloud, maintaining 99.9% uptime and strict federal compliance.",
        "Engineered PowerShell DSC automation to streamline configuration and migration activities, reducing manual effort by ~50%.",
        "Authored comprehensive technical and operational documentation adopted as a standard for future NASA cloud migration initiatives.",
        "Delivered targeted training to internal stakeholders, resulting in high adoption rates and zero post-migration security incidents.",
      ],
    },
    {
      company: "Next Chapter Technologies",
      role: "Cloud Automation & DevOps Consultant",
      period: "February 2017 – February 2018",
      location: "Eden Prairie, MN",
      bullets: [
        "Led migration of 20+ legacy systems to cloud platforms, improving performance by ~40% and reducing infrastructure costs by 30%.",
        "Implemented CI/CD pipelines using Jenkins and Ansible, doubling deployment frequency.",
        "Designed lifecycle automation scripts that reduced manual deployment effort by ~70% and achieved 90% deployment reliability.",
      ],
    },
    {
      company: "FoxIT",
      role: "Azure Security / SIEM Engineer",
      period: "January 2016 – February 2017",
      location: "Remote (San Francisco, CA)",
      bullets: [
        "Designed, deployed, and operationalized Microsoft Sentinel across Azure Commercial and Azure Government, establishing centralized SIEM/SOAR capabilities.",
        "Engineered log ingestion pipelines and data connectors for Azure Activity Logs, Entra ID, Microsoft Defender, and third-party sources.",
        "Developed and tuned KQL analytics rules to detect identity compromise, lateral movement, and privilege escalation — reducing false positives and improving SOC efficiency.",
        "Built Sentinel playbooks using Logic Apps to automate enrichment, notification, containment, and remediation workflows.",
        "Established SOC operational processes, runbooks, dashboards, and workbooks for alert triage, incident handling, and executive reporting.",
      ],
    },
    {
      company: "Getronics",
      role: "Senior Technical Support Engineer – Network Security",
      period: "October 2010 – January 2016",
      location: "Houston, TX",
      bullets: [
        "Provided Level-4 escalation support for Cisco ASA firewall platforms, independently reproducing complex customer issues in lab environments.",
        "Performed advanced packet-flow analysis and configuration troubleshooting, validating fixes through lab testing prior to production deployment.",
        "Collaborated with engineering teams to document findings, improve troubleshooting procedures, and contribute to internal knowledge bases.",
      ],
    },
  ],
  military: {
    branch: "U.S. Navy",
    role: "Interior Communications Electrician (E5) — ESWS",
    period: "1986 – 1992",
    detail: "Persian Gulf War Veteran · Enlisted Surface Warfare Specialist",
    bullets: [
      "Managed critical shipboard communications and emergency systems in high-availability environments.",
      "Recognized for operational reliability and technical excellence.",
    ],
    commendations: ["Expeditionary Medals (2 awards)", "Good Conduct Medal"],
  },
  education: [{ school: "Associate's Degree", degree: "Associate's Degree", year: "—", detail: "" }],
  certifications: [
    "AZ-900 – Azure Fundamentals",
    "SC-900 – Security Fundamentals",
    "SSCP – Systems Security Certified Practitioner",
    "GIAC Intrusion Analyst (GCIA)",
    "GIAC Windows 2000 Security",
  ],
  skills: {
    "Cloud Platforms": ["Microsoft Azure (Commercial & GovCloud)", "AWS GovCloud"],
    "Security & Compliance": ["Microsoft Sentinel (SIEM/SOAR)", "Defender for Cloud", "Defender for Endpoint", "Zero Trust Architecture", "CSPM", "Identity Protection", "Incident Response", "NIST 800-53", "CIS v3", "CMMC", "FedRAMP"],
    "Automation & IaC": ["PowerShell", "Terraform", "ARM Templates", "Bicep", "Turbot", "Ansible", "Jenkins"],
    "Monitoring & Analytics": ["Azure Monitor", "Log Analytics", "KQL", "Azure Workbooks", "Power BI"],
    "DevOps & Tooling": ["Azure DevOps", "GitHub Actions", "CI/CD Pipelines"],
    Other: ["Python", "Linux", "Networking", "Firewalls", "Agile Delivery"],
  },
  competencies: [
    "Azure Security Architecture", "Microsoft Sentinel (SIEM/SOAR)", "Microsoft Defender for Cloud",
    "Zero Trust Architecture (ZTA)", "Identity & Access Management (Entra ID)",
    "NIST 800-53 / CIS v3 / CMMC / FedRAMP", "Cloud Security Posture Management",
    "Incident Detection & Response", "Infrastructure as Code", "PowerShell Automation & Compliance",
    "Azure Policy & Landing Zones", "Continuous Monitoring & ATO Readiness",
  ],
};

const SYSTEM_PROMPT = `You are a professional portfolio assistant for Jeff Christman, an Azure Cloud Security Lead and Secure Cloud SME. Answer questions about his background honestly and helpfully using ONLY the information below. If you don't know something, say so — never fabricate details.

--- RESUME DATA ---
Summary: ${RESUME_DATA.summary}
Experience: ${JSON.stringify(RESUME_DATA.experience)}
Military: ${JSON.stringify(RESUME_DATA.military)}
Education: ${JSON.stringify(RESUME_DATA.education)}
Certifications: ${JSON.stringify(RESUME_DATA.certifications)}
Skills: ${JSON.stringify(RESUME_DATA.skills)}
Core Competencies: ${JSON.stringify(RESUME_DATA.competencies)}
Location: ${RESUME_DATA.location}
--- END ---

Keep answers concise (2-4 sentences max). Be warm, confident, and professional. If asked something personal or unrelated, politely redirect to professional topics.`;

// ============================================================
// COMPONENTS
// ============================================================
function SkillBadge({ children }) {
  return <span style={{display:"inline-block",padding:"5px 12px",borderRadius:6,fontSize:11.5,color:"#c8d0dc",background:"rgba(100,160,255,0.08)",border:"1px solid rgba(100,160,255,0.18)",margin:"3px"}}>{children}</span>;
}

function CertBadge({ children }) {
  return <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:10,background:"rgba(76,175,122,0.07)",border:"1px solid rgba(76,175,122,0.2)",marginBottom:8}}><span style={{fontSize:16}}>🏅</span><span style={{fontSize:13,color:"#c8d0dc"}}>{children}</span></div>;
}

function SectionHeader({ children, icon }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
      <div style={{width:3,height:22,background:"linear-gradient(180deg,#64a0ff,#a070ff)",borderRadius:2}}/>
      {icon && <span style={{fontSize:17}}>{icon}</span>}
      <h2 style={{margin:0,fontSize:16,fontWeight:600,color:"#e8ecf0",letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{children}</h2>
    </div>
  );
}

function ExperienceCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const summaryBullets = item.bullets.slice(0, 3);
  const extraBullets = item.bullets.slice(3);
  const hasMore = extraBullets.length > 0;

  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{marginBottom:10,borderRadius:12,overflow:"hidden",background:hovered?"rgba(100,160,255,0.06)":"rgba(255,255,255,0.03)",border:hovered?"1px solid rgba(100,160,255,0.25)":"1px solid rgba(255,255,255,0.07)",transition:"all 0.3s ease",animation:`fadeInUp 0.45s ease ${index*0.07}s both`}}>
      <div style={{padding:"18px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6}}>
          <div>
            <h3 style={{margin:0,fontSize:14,fontWeight:600,color:"#e8ecf0"}}>{item.role}</h3>
            <p style={{margin:"3px 0 0",fontSize:12.5,color:"#64a0ff",fontWeight:500}}>{item.company}</p>
            <p style={{margin:"1px 0 0",fontSize:11,color:"#5a6677"}}>{item.location}</p>
          </div>
          <span style={{fontSize:10.5,color:"#6b7a8d",background:"rgba(255,255,255,0.05)",padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{item.period}</span>
        </div>
        <ul style={{margin:"12px 0 0",paddingLeft:0}}>
          {summaryBullets.map((b,i)=>(
            <li key={i} style={{fontSize:12,color:"#8a95a8",lineHeight:1.6,marginBottom:4,listStyleType:"none",paddingLeft:15,position:"relative"}}>
              <span style={{position:"absolute",left:0,top:7.5,width:4.5,height:4.5,borderRadius:"50%",background:"#64a0ff",opacity:0.5}}/>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div style={{maxHeight:expanded?`${extraBullets.length*38+20}px`:0,overflow:"hidden",transition:"max-height 0.4s cubic-bezier(.4,0,.2,1)"}}>
        <ul style={{margin:"4px 0 0",paddingLeft:0,padding:"0 20px"}}>
          {extraBullets.map((b,i)=>(
            <li key={i} style={{fontSize:12,color:"#8a95a8",lineHeight:1.6,marginBottom:4,listStyleType:"none",paddingLeft:15,position:"relative"}}>
              <span style={{position:"absolute",left:0,top:7.5,width:4.5,height:4.5,borderRadius:"50%",background:"#64a0ff",opacity:0.5}}/>
              {b}
            </li>
          ))}
        </ul>
      </div>
      {hasMore && (
        <button onClick={()=>setExpanded(!expanded)} style={{display:"flex",alignItems:"center",gap:5,width:"100%",padding:"10px 20px 12px",background:"none",border:"none",cursor:"pointer",color:expanded?"#6b7a8d":"#64a0ff",fontSize:11.5,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"color 0.2s"}}>
          <span style={{display:"inline-block",transform:expanded?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.3s cubic-bezier(.4,0,.2,1)",fontSize:10}}>▼</span>
          {expanded?"Less Details":`More Details (${extraBullets.length} more)`}
        </button>
      )}
      {!hasMore && <div style={{height:14}}/>}
    </div>
  );
}

function ChatBubble({ role, text, isLoading }) {
  const isUser = role === "user";
  return (
    <div style={{display:"flex",justifyContent:isUser?"flex-end":"flex-start",marginBottom:10,animation:"fadeIn 0.25s ease"}}>
      <div style={{maxWidth:"82%",padding:"10px 14px",borderRadius:isUser?"16px 16px 4px 16px":"16px 16px 16px 4px",background:isUser?"linear-gradient(135deg,#64a0ff,#a070ff)":"rgba(255,255,255,0.07)",border:isUser?"none":"1px solid rgba(255,255,255,0.1)",color:isUser?"#fff":"#c8d0dc",fontSize:13,lineHeight:1.55,wordBreak:"break-word"}}>
        {isLoading?(<span style={{display:"flex",gap:4,alignItems:"center"}}><span style={{width:6,height:6,borderRadius:"50%",background:"#64a0ff",animation:"pulse 1.2s infinite 0s"}}/><span style={{width:6,height:6,borderRadius:"50%",background:"#64a0ff",animation:"pulse 1.2s infinite 0.2s"}}/><span style={{width:6,height:6,borderRadius:"50%",background:"#64a0ff",animation:"pulse 1.2s infinite 0.4s"}}/></span>):text}
      </div>
    </div>
  );
}

function ScoreRing({ score, size=120, stroke=10 }) {
  const r=(size-stroke)/2;
  const circ=2*Math.PI*r;
  const offset=circ-(score/100)*circ;
  const color=score>=80?"#4caf7a":score>=60?"#64a0ff":score>=40?"#c8a84a":"#e05a5a";
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke 0.4s"}}/>
    </svg>
  );
}

// ── JOB FIT ANALYZER MODAL ──
function JobFitModal({ open, onClose }) {
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [candidateResumes, setCandidateResumes] = useState([]);
  const [compareResults, setCompareResults] = useState([]);

  const analyze = async () => {
    if (!jobDesc.trim()||loading) return;
    setLoading(true); setResult(null); setError(null);
    try {
      const prompt = `You are a resume-to-job-description fit analyzer. Compare the candidate's resume to the job description and return ONLY a valid JSON object — no markdown, no preamble, no explanation outside the JSON.

=== CANDIDATE RESUME ===
Summary: ${RESUME_DATA.summary}
Experience: ${JSON.stringify(RESUME_DATA.experience)}
Military: ${JSON.stringify(RESUME_DATA.military)}
Certifications: ${JSON.stringify(RESUME_DATA.certifications)}
Skills: ${JSON.stringify(RESUME_DATA.skills)}
Competencies: ${JSON.stringify(RESUME_DATA.competencies)}
========================

=== JOB DESCRIPTION ===
${jobDesc.trim()}
========================

Return this exact JSON structure:
{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence executive summary of the fit>",
  "categories": [
    { "name": "Skills Match", "score": <0-100>, "detail": "<brief note>" },
    { "name": "Experience & Depth", "score": <0-100>, "detail": "<brief note>" },
    { "name": "Compliance & Certs", "score": <0-100>, "detail": "<brief note>" },
    { "name": "Leadership & Soft Skills", "score": <0-100>, "detail": "<brief note>" }
  ],
  "matches": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>"],
  "gaps": ["<gap or missing requirement 1>", "<gap or missing requirement 2>"],
  "keywordMatches": ["keyword1", "keyword2"],
  "keywordGaps": ["keyword3", "keyword4"]
}

For keywordMatches: list specific technical skills, tools, frameworks, or qualifications from the JD that the candidate DOES have.
For keywordGaps: list specific ones from the JD that the candidate does NOT have or lacks depth in. Be precise — use the actual terms from the job description.`;

      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const raw = data.content?.[0]?.text||"";
      const cleaned = raw.replace(/```json/g,"").replace(/```/g,"").trim();
      const parsed = JSON.parse(cleaned);
      setResult(parsed);
    } catch {
      setError("Something went wrong analyzing the fit. Please try again.");
    }
    setLoading(false);
  };

  const analyzeMultiple = async () => {
    if (!jobDesc.trim()||candidateResumes.length===0||loading) return;
    setLoading(true); setCompareResults([]); setError(null);
    const results = [];
    for (const [idx,cand] of candidateResumes.entries()) {
      try {
        const prompt = `Analyze this candidate's resume against the job description. Return ONLY valid JSON with: overallScore (0-100), summary (2 sentences), categories array with Skills Match/Experience/Compliance/Leadership scores, matches array, gaps array, keywordMatches array, keywordGaps array.

JOB DESCRIPTION:
${jobDesc.trim()}

CANDIDATE ${idx+1} RESUME:
${cand.text}`;
        const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})});
        const data = await res.json();
        const raw = data.content?.[0]?.text||"";
        const cleaned = raw.replace(/```json/g,"").replace(/```/g,"").trim();
        const parsed = JSON.parse(cleaned);
        results.push({name:cand.name,result:parsed});
      } catch {
        results.push({name:cand.name,result:null,error:true});
      }
    }
    setCompareResults(results);
    setLoading(false);
  };

  if (!open) return null;

  const scoreColor = result ? (result.overallScore>=80?"#4caf7a":result.overallScore>=60?"#64a0ff":result.overallScore>=40?"#c8a84a":"#e05a5a") : "#64a0ff";
  const scoreLabel = result ? (result.overallScore>=80?"Excellent Fit":result.overallScore>=60?"Good Fit":result.overallScore>=40?"Partial Fit":"Low Fit") : "";

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}} onClick={onClose}>
      <div style={{width:"100%",maxWidth:compareMode?780:640,maxHeight:"90vh",overflowY:"auto",background:"#141620",borderRadius:20,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 24px 72px rgba(0,0,0,0.6)",animation:"slideUp 0.3s cubic-bezier(.4,0,.2,1)"}} onClick={e=>e.stopPropagation()}>
        
        {/* Header */}
        <div style={{padding:"20px 24px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#c8a84a,#e07a30)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎯</div>
            <div>
              <p style={{margin:0,fontSize:14,fontWeight:600,color:"#e8ecf0"}}>Job Fit Analyzer</p>
              <p style={{margin:0,fontSize:11,color:"#6b7a8d"}}>Paste a job description to see how well you match</p>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>{setCompareMode(!compareMode);setResult(null);setCompareResults([]);}} style={{padding:"6px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:compareMode?"rgba(200,168,74,0.15)":"rgba(255,255,255,0.04)",color:compareMode?"#c8a84a":"#6b7a8d",cursor:"pointer",fontSize:11,fontWeight:500}}>
              {compareMode?"Single Mode":"Compare Mode"}
            </button>
            <button onClick={onClose} style={{width:30,height:30,borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.04)",color:"#6b7a8d",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
        </div>

        <div style={{padding:"20px 24px 24px"}}>
          <textarea value={jobDesc} onChange={e=>setJobDesc(e.target.value)} placeholder="Paste the full job description here..." rows={result||compareResults.length>0?4:7} style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 14px",color:"#e8ecf0",fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:"vertical",minHeight:(result||compareResults.length>0)?80:140,lineHeight:1.6,transition:"min-height 0.3s ease"}}/>

          {/* Compare Mode: Candidate Upload */}
          {compareMode && (
            <div style={{marginTop:14}}>
              <p style={{margin:"0 0 8px",fontSize:11.5,color:"#8a95a8"}}>Add candidates to compare (paste resume text or upload file):</p>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input type="text" placeholder="Candidate name" id="candName" style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",color:"#e8ecf0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}/>
                <button onClick={()=>{
                  const name=document.getElementById("candName").value.trim()||`Candidate ${candidateResumes.length+1}`;
                  const text=prompt("Paste candidate's resume text:");
                  if(text) setCandidateResumes([...candidateResumes,{name,text}]);
                  document.getElementById("candName").value="";
                }} style={{padding:"8px 16px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#64a0ff,#a070ff)",color:"#fff",fontSize:12,fontWeight:500,cursor:"pointer"}}>+ Add</button>
              </div>
              {candidateResumes.map((c,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6,marginBottom:4,fontSize:12,color:"#c8d0dc"}}>
                  <span>{c.name}</span>
                  <button onClick={()=>setCandidateResumes(candidateResumes.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"#e05a5a",cursor:"pointer",fontSize:14}}>✕</button>
                </div>
              ))}
            </div>
          )}

          <button onClick={compareMode?analyzeMultiple:analyze} disabled={loading||!jobDesc.trim()||(compareMode&&candidateResumes.length===0)} style={{width:"100%",marginTop:12,padding:"11px 0",borderRadius:10,border:"none",background:(loading||!jobDesc.trim()||(compareMode&&candidateResumes.length===0))?"rgba(200,168,74,0.15)":"linear-gradient(135deg,#c8a84a,#e07a30)",color:(loading||!jobDesc.trim()||(compareMode&&candidateResumes.length===0))?"#7a6a3a":"#fff",fontSize:13,fontWeight:600,cursor:(loading||!jobDesc.trim()||(compareMode&&candidateResumes.length===0))?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s"}}>
            {loading?(<><span style={{width:14,height:14,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",animation:"spin 0.6s linear infinite",display:"inline-block"}}/>Analyzing…</>):(<>🎯 {compareMode?`Analyze ${candidateResumes.length} Candidates`:"Analyze Fit"}</>)}
          </button>

          {error && <div style={{marginTop:14,padding:"10px 14px",borderRadius:8,background:"rgba(224,90,90,0.1)",border:"1px solid rgba(224,90,90,0.25)",fontSize:12.5,color:"#e05a5a"}}>{error}</div>}

          {/* SINGLE RESULT */}
          {result && !compareMode && (
            <div style={{marginTop:22,animation:"fadeInUp 0.4s ease"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:24,marginBottom:22}}>
                <div style={{position:"relative",width:120,height:120,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <ScoreRing score={result.overallScore}/>
                  <div style={{position:"absolute",textAlign:"center"}}><p style={{margin:0,fontSize:28,fontWeight:700,color:scoreColor}}>{result.overallScore}<span style={{fontSize:14,opacity:0.5}}>%</span></p></div>
                </div>
                <div>
                  <p style={{margin:0,fontSize:16,fontWeight:600,color:scoreColor}}>{scoreLabel}</p>
                  <p style={{margin:"4px 0 0",fontSize:12,color:"#6b7a8d",maxWidth:260,lineHeight:1.5}}>{result.summary}</p>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                {result.categories.map((cat,i)=>{
                  const barColor=cat.score>=80?"#4caf7a":cat.score>=60?"#64a0ff":cat.score>=40?"#c8a84a":"#e05a5a";
                  return (
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:12,color:"#c8d0dc",fontWeight:500}}>{cat.name}</span>
                        <span style={{fontSize:12,color:barColor,fontWeight:600}}>{cat.score}%</span>
                      </div>
                      <div style={{height:5,borderRadius:3,background:"rgba(255,255,255,0.08)",overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:3,background:barColor,width:`${cat.score}%`,transition:"width 1s cubic-bezier(.4,0,.2,1)"}}/>
                      </div>
                      <p style={{margin:"3px 0 0",fontSize:10.5,color:"#5a6677"}}>{cat.detail}</p>
                    </div>
                  );
                })}
              </div>
              <div style={{marginBottom:18}}>
                <p style={{margin:"0 0 8px",fontSize:11,color:"#6b7a8d",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>Keyword Match</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {(result.keywordMatches||[]).map((kw,i)=>(<span key={"m"+i} style={{padding:"4px 10px",borderRadius:6,fontSize:11.5,color:"#4caf7a",background:"rgba(76,175,122,0.1)",border:"1px solid rgba(76,175,122,0.25)"}}>✓ {kw}</span>))}
                  {(result.keywordGaps||[]).map((kw,i)=>(<span key={"g"+i} style={{padding:"4px 10px",borderRadius:6,fontSize:11.5,color:"#e05a5a",background:"rgba(224,90,90,0.1)",border:"1px solid rgba(224,90,90,0.22)"}}>✕ {kw}</span>))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{background:"rgba(76,175,122,0.06)",border:"1px solid rgba(76,175,122,0.18)",borderRadius:10,padding:"14px 16px"}}>
                  <p style={{margin:"0 0 8px",fontSize:11,color:"#4caf7a",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>✓ Strengths</p>
                  {result.matches.map((m,i)=>(<p key={i} style={{margin:"0 0 6px",fontSize:11.5,color:"#8a95a8",lineHeight:1.5}}>• {m}</p>))}
                </div>
                <div style={{background:"rgba(224,90,90,0.06)",border:"1px solid rgba(224,90,90,0.18)",borderRadius:10,padding:"14px 16px"}}>
                  <p style={{margin:"0 0 8px",fontSize:11,color:"#e05a5a",textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:600}}>⚠ Gaps</p>
                  {result.gaps.map((g,i)=>(<p key={i} style={{margin:"0 0 6px",fontSize:11.5,color:"#8a95a8",lineHeight:1.5}}>• {g}</p>))}
                </div>
              </div>
            </div>
          )}

          {/* COMPARE RESULTS */}
          {compareResults.length>0 && compareMode && (
            <div style={{marginTop:22,animation:"fadeInUp 0.4s ease"}}>
              <p style={{margin:"0 0 14px",fontSize:13,color:"#e8ecf0",fontWeight:600}}>Candidate Comparison</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
                {compareResults.map((cr,i)=>{
                  if(cr.error) return <div key={i} style={{padding:"14px",borderRadius:10,background:"rgba(224,90,90,0.08)",border:"1px solid rgba(224,90,90,0.2)",textAlign:"center"}}><p style={{margin:0,fontSize:12,color:"#e05a5a"}}>{cr.name}<br/>Error analyzing</p></div>;
                  const sc=cr.result.overallScore;
                  const col=sc>=80?"#4caf7a":sc>=60?"#64a0ff":sc>=40?"#c8a84a":"#e05a5a";
                  return (
                    <div key={i} style={{padding:"14px",borderRadius:10,background:"rgba(255,255,255,0.03)",border:`1px solid ${col}33`,textAlign:"center"}}>
                      <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600,color:"#e8ecf0"}}>{cr.name}</p>
                      <div style={{position:"relative",width:80,height:80,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <ScoreRing score={sc} size={80} stroke={8}/>
                        <div style={{position:"absolute"}}><p style={{margin:0,fontSize:20,fontWeight:700,color:col}}>{sc}<span style={{fontSize:10,opacity:0.5}}>%</span></p></div>
                      </div>
                      <p style={{margin:0,fontSize:10.5,color:"#6b7a8d"}}>{cr.result.summary.slice(0,80)}...</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── PDF GENERATOR ──
function generatePDF() {
  const pdfContent = `
${RESUME_DATA.name}
${RESUME_DATA.title}
${RESUME_DATA.location} | ${RESUME_DATA.email} | ${RESUME_DATA.phone}

SUMMARY
${RESUME_DATA.summary}

CORE COMPETENCIES
${RESUME_DATA.competencies.join(" • ")}

EXPERIENCE
${RESUME_DATA.experience.map(exp=>`
${exp.role} | ${exp.company}
${exp.period} | ${exp.location}
${exp.bullets.map(b=>`• ${b}`).join("\n")}
`).join("\n")}

MILITARY SERVICE
${RESUME_DATA.military.branch} | ${RESUME_DATA.military.role}
${RESUME_DATA.military.period} | ${RESUME_DATA.military.detail}
${RESUME_DATA.military.bullets.map(b=>`• ${b}`).join("\n")}
Commendations: ${RESUME_DATA.military.commendations.join(", ")}

CERTIFICATIONS
${RESUME_DATA.certifications.map(c=>`• ${c}`).join("\n")}

SKILLS
${Object.entries(RESUME_DATA.skills).map(([cat,items])=>`${cat}: ${items.join(", ")}`).join("\n")}

EDUCATION
${RESUME_DATA.education[0].school}
`;
  const blob = new Blob([pdfContent],{type:"text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=`${RESUME_DATA.name.replace(/\s/g,"_")}_Resume.txt`;
  a.click(); URL.revokeObjectURL(url);
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [jobFitOpen, setJobFitOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState([{role:"assistant",text:"Hi there! 👋 I'm Jeff's AI assistant. Feel free to ask me anything about his experience, skills, certifications, or background — I'll give you an honest answer."}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);
  useEffect(()=>{if(chatOpen) setTimeout(()=>inputRef.current?.focus(),200);},[chatOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed||loading) return;
    setInput(""); setMessages(prev=>[...prev,{role:"user",text:trimmed}]); setLoading(true);
    try {
      const history=[...messages,{role:"user",text:trimmed}];
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYSTEM_PROMPT,messages:history.map(m=>({role:m.role,content:m.text}))})});
      const data=await res.json();
      const reply=data.content?.[0]?.text||"Sorry, something went wrong.";
      setMessages(prev=>[...prev,{role:"assistant",text:reply}]);
    } catch {
      setMessages(prev=>[...prev,{role:"assistant",text:"Oops — something went wrong. Try again!"}]);
    }
    setLoading(false);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(()=>setShareLinkCopied(false),2000);
  };

  const tabs=[{id:"all",label:"All"},{id:"experience",label:"Experience"},{id:"skills",label:"Skills"},{id:"certs",label:"Certs"},{id:"military",label:"Military"}];
  const stats=[
    {label:"Years Experience",value:"20+",icon:"📅"},
    {label:"Roles Held",value:RESUME_DATA.experience.length.toString(),icon:"💼"},
    {label:"Certifications",value:RESUME_DATA.certifications.length.toString(),icon:"🏅"},
    {label:"Fed/Gov Projects",value:"3+",icon:"🏛️"},
    {label:"Veteran",value:"USN",icon:"⚓"},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;background:#0c0e14;color:#c8d0dc;min-height:100vh}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 18px rgba(100,160,255,.2)}50%{box-shadow:0 0 36px rgba(100,160,255,.4)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:3px}
        input:focus,textarea:focus{outline:none}
      `}</style>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(100,160,255,.07) 0%,transparent 70%)",top:-200,left:-200}}/>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(160,112,255,.05) 0%,transparent 70%)",bottom:"5%",right:-120}}/>
        <div style={{position:"absolute",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(76,175,122,.04) 0%,transparent 70%)",top:"45%",left:"35%"}}/>
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:800,margin:"0 auto",padding:"50px 24px 140px"}}>

        {/* HERO */}
        <div style={{textAlign:"center",marginBottom:28,animation:"slideUp 0.7s ease"}}>
          <div style={{width:88,height:88,borderRadius:"50%",margin:"0 auto 16px",background:"linear-gradient(135deg,#2a6cb8,#7040b8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:700,color:"#fff",boxShadow:"0 4px 32px rgba(100,160,255,.22)",border:"3px solid rgba(255,255,255,.08)"}}>JC</div>
          <h1 style={{fontSize:29,fontWeight:700,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.2}}>{RESUME_DATA.name}</h1>
          <p style={{fontSize:15.5,color:"#64a0ff",fontWeight:500,marginTop:6}}>{RESUME_DATA.title}</p>
          <p style={{fontSize:12,color:"#5a6677",marginTop:5,fontStyle:"italic"}}>{RESUME_DATA.subtitle}</p>
          <div style={{display:"flex",justifyContent:"center",gap:18,marginTop:14,flexWrap:"wrap"}}>
            {[{label:RESUME_DATA.location,icon:"📍"},{label:RESUME_DATA.email,icon:"✉️"},{label:RESUME_DATA.phone,icon:"📞"}].map((c,i)=>(<span key={i} style={{fontSize:11,color:"#5a6677",display:"flex",alignItems:"center",gap:4}}><span style={{opacity:.7}}>{c.icon}</span>{c.label}</span>))}
          </div>

          {/* ── ACTION BUTTONS ── */}
          <div style={{display:"flex",justifyContent:"center",gap:10,marginTop:20,flexWrap:"wrap"}}>
            <button onClick={generatePDF} style={{padding:"9px 18px",borderRadius:10,border:"1px solid rgba(100,160,255,0.3)",background:"rgba(100,160,255,0.08)",color:"#64a0ff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(100,160,255,0.15)";e.currentTarget.style.borderColor="rgba(100,160,255,0.5)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(100,160,255,0.08)";e.currentTarget.style.borderColor="rgba(100,160,255,0.3)";}}>
              📄 Download Resume
            </button>
            <button onClick={copyShareLink} style={{padding:"9px 18px",borderRadius:10,border:"1px solid rgba(76,175,122,0.3)",background:"rgba(76,175,122,0.08)",color:"#4caf7a",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(76,175,122,0.15)";e.currentTarget.style.borderColor="rgba(76,175,122,0.5)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(76,175,122,0.08)";e.currentTarget.style.borderColor="rgba(76,175,122,0.3)";}}>
              {shareLinkCopied?"✓ Copied!":"🔗 Share Profile"}
            </button>
            <button onClick={()=>window.location.href=`mailto:${RESUME_DATA.email}?subject=Schedule a Call&body=Hi Jeff, I'd like to schedule a call to discuss opportunities.`} style={{padding:"9px 18px",borderRadius:10,border:"1px solid rgba(200,168,74,0.3)",background:"rgba(200,168,74,0.08)",color:"#c8a84a",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(200,168,74,0.15)";e.currentTarget.style.borderColor="rgba(200,168,74,0.5)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(200,168,74,0.08)";e.currentTarget.style.borderColor="rgba(200,168,74,0.3)";}}>
              📅 Contact Me to Schedule
            </button>
          </div>
        </div>

        {/* QUICK STATS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:28,animation:"fadeInUp 0.5s ease 0.1s both"}}>
          {stats.map((s,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}><p style={{margin:0,fontSize:18}}>{s.icon}</p><p style={{margin:"4px 0 1px",fontSize:15,fontWeight:700,color:"#e8ecf0"}}>{s.value}</p><p style={{margin:0,fontSize:9.5,color:"#5a6677",textTransform:"uppercase",letterSpacing:"0.04em"}}>{s.label}</p></div>))}
        </div>

        {/* SUMMARY */}
        <div style={{background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"18px 22px",marginBottom:28,animation:"fadeInUp 0.6s ease 0.16s both"}}>
          <p style={{fontSize:13,color:"#8a95a8",lineHeight:1.8}}>{RESUME_DATA.summary}</p>
        </div>

        {/* COMPETENCIES */}
        <div style={{marginBottom:28,animation:"fadeInUp 0.6s ease 0.2s both"}}>
          <SectionHeader icon="⚡">Core Competencies</SectionHeader>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {RESUME_DATA.competencies.map((c,i)=>(<span key={i} style={{padding:"5px 12px",borderRadius:8,fontSize:11.5,color:"#b8c4d6",background:"rgba(160,112,255,.08)",border:"1px solid rgba(160,112,255,.2)"}}>{c}</span>))}
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:5,marginBottom:20,flexWrap:"wrap",animation:"fadeInUp 0.5s ease 0.24s both"}}>
          {tabs.map(t=>(<button key={t.id} onClick={()=>setActiveTab(t.id)} style={{padding:"6px 15px",borderRadius:20,border:activeTab===t.id?"1px solid rgba(100,160,255,.4)":"1px solid rgba(255,255,255,.08)",background:activeTab===t.id?"rgba(100,160,255,.1)":"rgba(255,255,255,.03)",color:activeTab===t.id?"#64a0ff":"#6b7a8d",fontSize:11.5,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{t.label}</button>))}
        </div>

        {/* JOB FIT CTA */}
        <div onClick={()=>setJobFitOpen(true)} style={{marginBottom:28,borderRadius:12,padding:"14px 20px",cursor:"pointer",background:"linear-gradient(135deg,rgba(200,168,74,0.1) 0%,rgba(224,122,48,0.08) 100%)",border:"1px solid rgba(200,168,74,0.25)",display:"flex",alignItems:"center",gap:14,transition:"border-color 0.25s,background 0.25s",animation:"fadeInUp 0.5s ease 0.27s both"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(200,168,74,0.5)";e.currentTarget.style.background="linear-gradient(135deg,rgba(200,168,74,0.16) 0%,rgba(224,122,48,0.12) 100%)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(200,168,74,0.25)";e.currentTarget.style.background="linear-gradient(135deg,rgba(200,168,74,0.1) 0%,rgba(224,122,48,0.08) 100%)";}} >
          <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:"linear-gradient(135deg,#c8a84a,#e07a30)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🎯</div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:13.5,fontWeight:600,color:"#e8ecf0"}}>Check Your Fit for a Role</p>
            <p style={{margin:"2px 0 0",fontSize:11.5,color:"#8a7a4a"}}>Paste a job description and AI will score how well your experience matches</p>
          </div>
          <span style={{fontSize:18,color:"#c8a84a",opacity:0.7}}>→</span>
        </div>

        {/* EXPERIENCE */}
        {(activeTab==="all"||activeTab==="experience")&&(<div style={{marginBottom:36,animation:"fadeInUp 0.5s ease 0.3s both"}}><SectionHeader icon="💼">Experience</SectionHeader>{RESUME_DATA.experience.map((exp,i)=><ExperienceCard key={i} item={exp} index={i}/>)}</div>)}

        {/* SKILLS */}
        {(activeTab==="all"||activeTab==="skills")&&(<div style={{marginBottom:36,animation:"fadeInUp 0.5s ease 0.36s both"}}><SectionHeader icon="🛠">Skills</SectionHeader>{Object.entries(RESUME_DATA.skills).map(([cat,items],i)=>(<div key={i} style={{marginBottom:14}}><span style={{fontSize:10.5,color:"#64a0ff",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:600}}>{cat}</span><div style={{display:"flex",flexWrap:"wrap",marginTop:5}}>{items.map((s,j)=><SkillBadge key={j}>{s}</SkillBadge>)}</div></div>))}</div>)}

        {/* CERTIFICATIONS */}
        {(activeTab==="all"||activeTab==="certs")&&(<div style={{marginBottom:36,animation:"fadeInUp 0.5s ease 0.42s both"}}><SectionHeader icon="🏅">Certifications</SectionHeader>{RESUME_DATA.certifications.map((c,i)=><CertBadge key={i}>{c}</CertBadge>)}</div>)}

        {/* MILITARY */}
        {(activeTab==="all"||activeTab==="military")&&(<div style={{marginBottom:36,animation:"fadeInUp 0.5s ease 0.48s both"}}><SectionHeader icon="⚓">Military Service</SectionHeader><div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"18px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6}}><div><h3 style={{margin:0,fontSize:14,fontWeight:600,color:"#e8ecf0"}}>{RESUME_DATA.military.branch}</h3><p style={{margin:"3px 0 0",fontSize:12.5,color:"#64a0ff",fontWeight:500}}>{RESUME_DATA.military.role}</p><p style={{margin:"2px 0 0",fontSize:11,color:"#4caf7a",fontWeight:500}}>{RESUME_DATA.military.detail}</p></div><span style={{fontSize:10.5,color:"#6b7a8d",background:"rgba(255,255,255,.05)",padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{RESUME_DATA.military.period}</span></div><ul style={{margin:"10px 0 0",paddingLeft:0}}>{RESUME_DATA.military.bullets.map((b,i)=>(<li key={i} style={{fontSize:12,color:"#8a95a8",lineHeight:1.6,marginBottom:3,listStyleType:"none",paddingLeft:15,position:"relative"}}><span style={{position:"absolute",left:0,top:7.5,width:4.5,height:4.5,borderRadius:"50%",background:"#4caf7a",opacity:.6}}/>{b}</li>))}</ul><div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.06)"}}><p style={{fontSize:10,color:"#5a6677",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Commendations</p><div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{RESUME_DATA.military.commendations.map((c,i)=>(<span key={i} style={{fontSize:11,color:"#c8a84a",background:"rgba(200,168,74,.1)",border:"1px solid rgba(200,168,74,.25)",borderRadius:6,padding:"3px 9px"}}>🥇 {c}</span>))}</div></div></div></div>)}

        {/* EDUCATION */}
        {activeTab==="all"&&(<div style={{animation:"fadeInUp 0.5s ease 0.52s both"}}><SectionHeader icon="🎓">Education</SectionHeader><div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:12,padding:"14px 20px"}}><p style={{fontSize:13.5,color:"#c8d0dc"}}>Associate's Degree</p></div></div>)}
      </div>

      {/* FLOAT CHAT BTN */}
      <button onClick={()=>setChatOpen(!chatOpen)} style={{position:"fixed",bottom:28,right:28,zIndex:100,width:chatOpen?"56px":"auto",height:56,paddingLeft:chatOpen?0:22,paddingRight:chatOpen?0:22,borderRadius:chatOpen?"50%":"28px",background:"linear-gradient(135deg,#64a0ff,#a070ff)",border:"none",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 24px rgba(100,160,255,.35)",transition:"all 0.35s cubic-bezier(.4,0,.2,1)",animation:chatOpen?"none":"glow 2.5s ease infinite"}}>
        {chatOpen?<span style={{fontSize:20}}>✕</span>:<><span style={{fontSize:18}}>🤖</span><span>Ask AI about me</span></>}
      </button>

      {/* CHAT PANEL */}
      {chatOpen&&(<div style={{position:"fixed",bottom:96,right:28,width:360,maxWidth:"calc(100vw - 56px)",height:480,borderRadius:18,overflow:"hidden",zIndex:99,background:"#141620",border:"1px solid rgba(255,255,255,.1)",boxShadow:"0 20px 60px rgba(0,0,0,.55)",display:"flex",flexDirection:"column",animation:"slideUp 0.3s cubic-bezier(.4,0,.2,1)"}}><div style={{padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,.08)",background:"rgba(100,160,255,.05)"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#64a0ff,#a070ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div><div><p style={{fontSize:13,fontWeight:600,color:"#e8ecf0",margin:0}}>AI Assistant</p><p style={{fontSize:11,color:"#6b7a8d",margin:0}}>Ask about Jeff's experience</p></div><div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:"#4caf7a"}}/><span style={{fontSize:10,color:"#4caf7a"}}>Online</span></div></div></div><div style={{flex:1,overflowY:"auto",padding:"14px 14px 8px"}}>{messages.map((m,i)=><ChatBubble key={i} role={m.role} text={m.text}/>)}{loading&&<ChatBubble role="assistant" isLoading/>}<div ref={chatEndRef}/></div><div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,.08)"}}><div style={{display:"flex",gap:8,alignItems:"center"}}><input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask a question..." style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"9px 14px",color:"#e8ecf0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}/><button onClick={sendMessage} disabled={loading||!input.trim()} style={{width:40,height:40,borderRadius:10,background:loading||!input.trim()?"rgba(100,160,255,.2)":"linear-gradient(135deg,#64a0ff,#a070ff)",border:"none",color:"#fff",cursor:loading||!input.trim()?"not-allowed":"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"}}>↗</button></div></div></div>)}

      {/* JOB FIT MODAL */}
      <JobFitModal open={jobFitOpen} onClose={()=>setJobFitOpen(false)}/>
    </>
  );
}
