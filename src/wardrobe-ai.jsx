import { useState, useRef } from "react";

const MALE_CATEGORIES = {
  tops:       { label:"Tops",       icon:"👕", items:["T-Shirt (Round Neck)","T-Shirt (V-Neck)","Polo Shirt","Casual Shirt","Formal Shirt","Linen Shirt","Kurta","Sherwani","Pathani Suit","Nehru Jacket","Blazer","Hoodie","Sweater","Tank Top"] },
  bottoms:    { label:"Bottoms",    icon:"👖", items:["Jeans (Slim Fit)","Jeans (Regular)","Chinos","Formal Trousers","Cargo Pants","Shorts","Dhoti","Lungi","Pajama","Track Pants","Joggers"] },
  fullbody:   { label:"Full Body",  icon:"🥻", items:["Suit (2-Piece)","Suit (3-Piece)","Sherwani Set","Pathani Set","Kurta Pajama Set","Dhoti Kurta Set","Tracksuit"] },
  footwear:   { label:"Footwear",   icon:"👟", items:["Sneakers","Running Shoes","Formal Oxford Shoes","Loafers","Sandals","Chappal","Mojari","Kolhapuri","Boots","Chelsea Boots"] },
  accessories:{ label:"Accessories",icon:"⌚", items:["Watch","Sunglasses","Belt","Tie","Bow Tie","Pocket Square","Cufflinks","Turban/Safa","Stole","Mala/Necklace","Bracelet","Ring","Cap"] },
  outerwear:  { label:"Outerwear",  icon:"🧥", items:["Blazer","Overcoat","Leather Jacket","Denim Jacket","Windbreaker","Shawl","Cardigan"] },
};

const FEMALE_CATEGORIES = {
  tops:       { label:"Tops & Blouses",  icon:"👚", items:["Crop Top","Tank Top","Camisole","Blouse (Regular)","Blouse (Backless)","Corset Top","Peplum Top","Off-Shoulder Top","Tube Top","Halter Top","Shirt (Casual)","Shirt (Formal)","Kurti","Kurti (Anarkali)","Kurti (A-Line)","Choli/Blouse","Saree Blouse"] },
  bottoms:    { label:"Bottoms & Skirts",icon:"👗", items:["Jeans (Skinny)","Jeans (Wide Leg)","Palazzo Pants","Culottes","Leggings","Jeggings","Trousers","Cigarette Pants","Mini Skirt","Midi Skirt","Maxi Skirt","A-Line Skirt","Pencil Skirt","Churidar","Salwar","Sharara","Garara","Dhoti Pants"] },
  ethnic:     { label:"Ethnic Wear",     icon:"🥻", items:["Saree (Silk)","Saree (Cotton)","Saree (Georgette)","Saree (Chiffon)","Lehenga Choli","Anarkali Suit","Salwar Kameez","Patiala Suit","Punjabi Suit","Gharara Set","Sharara Set","Kaftan","Kurta Set","Gown (Ethnic)"] },
  western:    { label:"Western Wear",    icon:"💃", items:["Maxi Dress","Mini Dress","Midi Dress","Bodycon Dress","Wrap Dress","Shirt Dress","Co-ord Set","Jumpsuit","Romper","Playsuit","Evening Gown","Cocktail Dress"] },
  footwear:   { label:"Footwear",        icon:"👠", items:["Heels (Stiletto)","Heels (Block)","Heels (Wedge)","Heels (Kitten)","Flats (Ballet)","Sandals","Slip-Ons","Sneakers","Boots (Ankle)","Boots (Knee High)","Mojari","Kolhapuri","Juttis"] },
  accessories:{ label:"Accessories",     icon:"💍", items:["Necklace (Choker)","Necklace (Long)","Maang Tikka","Nath/Nose Ring","Jhumkas","Studs","Hoop Earrings","Bangles (Gold)","Bangles (Glass)","Kada","Bracelet","Ring","Anklet/Payal","Dupatta","Stole","Scarf","Handbag","Clutch","Potli Bag","Belt","Hair Accessories","Watch","Sunglasses"] },
  outerwear:  { label:"Outerwear",       icon:"🧥", items:["Blazer","Shrug","Cardigan","Denim Jacket","Leather Jacket","Overcoat","Cape","Poncho","Shawl"] },
};

const OCCASIONS = [
  { id:"shaadi",    label:"Shaadi",         urdu:"شادی",   icon:"💒", color:"#C9184A", desc:"Wedding Ceremony" },
  { id:"haldi",     label:"Haldi",          urdu:"ہلدی",   icon:"💛", color:"#E07B00", desc:"Turmeric Ceremony" },
  { id:"mehndi",    label:"Mehndi",         urdu:"مہندی",  icon:"🌿", color:"#2D6A4F", desc:"Henna Night" },
  { id:"reception", label:"Reception",      urdu:"ریسپشن", icon:"🥂", color:"#5A189A", desc:"Wedding Reception" },
  { id:"baraat",    label:"Baraat",         urdu:"بارات",  icon:"🎺", color:"#B5179E", desc:"Groom's Procession" },
  { id:"eid",       label:"Eid",            urdu:"عید",    icon:"🌙", color:"#0077B6", desc:"Eid ul Fitr / Adha" },
  { id:"diwali",    label:"Diwali",         urdu:"",       icon:"🪔", color:"#E9812F", desc:"Festival of Lights" },
  { id:"navratri",  label:"Navratri",       urdu:"",       icon:"🪘", color:"#D62828", desc:"Garba / Dandiya Night" },
  { id:"party",     label:"Party / Night",  urdu:"",       icon:"🎉", color:"#7209B7", desc:"Club / Night Out" },
  { id:"office",    label:"Office / Formal",urdu:"",       icon:"💼", color:"#023E8A", desc:"Work / Business" },
  { id:"casual",    label:"Casual Outing",  urdu:"",       icon:"☀️", color:"#2B9348", desc:"Everyday Casual" },
  { id:"other",     label:"Other Festival", urdu:"",       icon:"🎊", color:"#606C38", desc:"Any Cultural Event" },
];

const COLORS = ["Red","Blue","Green","Black","White","Yellow","Pink","Orange","Purple","Brown","Grey","Maroon","Navy","Cream","Gold","Silver","Beige","Turquoise","Rose Gold","Mint","Coral","Magenta","Olive","Teal"];

const COLOR_HEX = { red:"#e53935",blue:"#1e88e5",green:"#43a047",black:"#212121",white:"#f5f5f5",yellow:"#fdd835",pink:"#e91e63",orange:"#fb8c00",purple:"#8e24aa",brown:"#6d4c41",grey:"#757575",maroon:"#880e4f",navy:"#0d47a1",cream:"#fff8e1",gold:"#ffd600",silver:"#bdbdbd",beige:"#d7ccc8",turquoise:"#00bcd4","rose gold":"#f48fb1",mint:"#a5d6a7",coral:"#ff7043",magenta:"#ab47bc",olive:"#827717",teal:"#00796b" };

function getHex(color) { return COLOR_HEX[color?.toLowerCase()] || "#9e9e9e"; }

// ── MALE AVATAR ───────────────────────────────────────────────────────────────
function MaleAvatar({ params }) {
  const sc = params?.shirtColor || "#1565c0";
  const pc = params?.pantsColor || "#37474f";
  const fc = params?.shoeColor  || "#4e342e";
  const ethnic = params?.isEthnic;
  return (
    <svg viewBox="0 0 200 380" width="150" height="285" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="372" rx="44" ry="7" fill="rgba(0,0,0,0.2)"/>
      <rect x="60" y="332" width="36" height="26" rx="6" fill={fc}/>
      <rect x="104" y="332" width="36" height="26" rx="6" fill={fc}/>
      <ellipse cx="78"  cy="357" rx="20" ry="7" fill={fc}/>
      <ellipse cx="122" cy="357" rx="20" ry="7" fill={fc}/>
      {ethnic ? (
        <>
          <rect x="72" y="212" width="56" height="120" rx="8" fill={pc} opacity="0.92"/>
          {[222,238,254,270,286,302,318].map(y=><line key={y} x1="74" y1={y} x2="126" y2={y} stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>)}
        </>
      ) : (
        <>
          <rect x="72"  y="212" width="24" height="120" rx="6" fill={pc}/>
          <rect x="104" y="212" width="24" height="120" rx="6" fill={pc}/>
          <rect x="72"  y="208" width="56" height="14"  rx="4" fill={pc}/>
          <line x1="100" y1="212" x2="100" y2="332" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5"/>
        </>
      )}
      <rect x="58" y="120" width="84" height="94" rx="10" fill={sc}/>
      {ethnic ? (
        <>
          <line x1="100" y1="120" x2="100" y2="214" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4,3"/>
          {[136,152,168,184,200].map(y=><circle key={y} cx="100" cy={y} r="2.5" fill="rgba(255,215,0,0.65)"/>)}
        </>
      ) : (
        <>
          <rect x="96" y="120" width="8" height="94" rx="3" fill="rgba(0,0,0,0.12)"/>
          {[133,147,161,175].map(y=><circle key={y} cx="100" cy={y} r="2.2" fill="rgba(255,255,255,0.3)"/>)}
          <polygon points="90,120 100,142 110,120" fill="rgba(255,255,255,0.12)"/>
        </>
      )}
      <rect x="28"  y="122" width="32" height="82" rx="10" fill={sc}/>
      <rect x="140" y="122" width="32" height="82" rx="10" fill={sc}/>
      <ellipse cx="44"  cy="210" rx="13" ry="9" fill="#FFCCAA"/>
      <ellipse cx="156" cy="210" rx="13" ry="9" fill="#FFCCAA"/>
      <rect x="90" y="100" width="20" height="24" rx="6" fill="#FFCCAA"/>
      <ellipse cx="100" cy="78" rx="34" ry="38" fill="#FFCCAA"/>
      <ellipse cx="100" cy="44" rx="34" ry="15" fill="#2c1810"/>
      <rect x="66" y="44" width="68" height="15" fill="#2c1810"/>
      <ellipse cx="88"  cy="76" rx="6" ry="7" fill="white"/>
      <ellipse cx="112" cy="76" rx="6" ry="7" fill="white"/>
      <circle cx="90"  cy="77" r="4"   fill="#3e2723"/>
      <circle cx="114" cy="77" r="4"   fill="#3e2723"/>
      <circle cx="91"  cy="75" r="1.5" fill="white"/>
      <circle cx="115" cy="75" r="1.5" fill="white"/>
      <path d="M82 68 Q88 64 94 67"  stroke="#2c1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M106 67 Q112 64 118 68" stroke="#2c1810" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M97 82 Q100 90 103 82" stroke="#cc9977" strokeWidth="1.5" fill="none"/>
      <path d="M90 96 Q100 103 110 96" stroke="#cc7755" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {!ethnic && <polygon points="100,122 93,138 100,196 107,138" fill="#c62828" opacity="0.85"/>}
    </svg>
  );
}

// ── FEMALE AVATAR ─────────────────────────────────────────────────────────────
function FemaleAvatar({ params }) {
  const tc  = params?.topColor    || "#880e4f";
  const bc  = params?.bottomColor || "#4a148c";
  const fc  = params?.shoeColor   || "#c62828";
  const dc  = params?.dupatColor;
  const isSaree   = params?.isSaree;
  const isLehenga = params?.isLehenga;
  const isWestern = params?.isWestern;
  return (
    <svg viewBox="0 0 200 400" width="150" height="300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="392" rx="40" ry="7" fill="rgba(0,0,0,0.15)"/>
      <rect x="72"  y="360" width="20" height="7"  rx="3" fill={fc}/>
      <rect x="108" y="360" width="20" height="7"  rx="3" fill={fc}/>
      <rect x="84"  y="363" width="4"  height="14" rx="2" fill={fc}/>
      <rect x="120" y="363" width="4"  height="14" rx="2" fill={fc}/>
      {isSaree ? (
        <>
          <path d="M65 202 Q75 310 80 360 L120 360 Q125 310 135 202 Z" fill={bc}/>
          {[215,232,249,266,283,300,317,334].map((y,i)=>(
            <path key={y} d={`M${70+i} ${y} Q100 ${y+5} ${130-i} ${y}`} stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" fill="none"/>
          ))}
          <path d="M58 126 Q32 168 42 214 Q60 222 74 202 Q64 176 70 148 Z" fill={bc} opacity="0.82"/>
          <rect x="66" y="120" width="68" height="84" rx="8" fill={tc}/>
          <rect x="65" y="198" width="70" height="5" rx="2" fill="rgba(255,215,0,0.55)"/>
        </>
      ) : isLehenga ? (
        <>
          <path d="M72 202 Q55 282 50 360 L150 360 Q145 282 128 202 Z" fill={bc}/>
          {[212,232,252,272,292,312,332,352].map((y,i)=>(
            <path key={y} d={`M${57+i*1.5} ${y} Q100 ${y+8} ${143-i*1.5} ${y}`} stroke="rgba(255,255,255,0.13)" strokeWidth="1.2" fill="none"/>
          ))}
          <ellipse cx="100" cy="202" rx="28" ry="5" fill={bc} opacity="0.6"/>
          <rect x="68" y="122" width="64" height="82" rx="8" fill={tc}/>
          {dc&&<path d="M68 122 Q42 170 38 228 Q54 235 64 218 Q57 175 74 148 Z" fill={dc} opacity="0.72"/>}
        </>
      ) : isWestern ? (
        <>
          <path d="M72 178 Q60 262 62 360 L138 360 Q140 262 128 178 Z" fill={bc}/>
          <rect x="68" y="120" width="64" height="60" rx="8" fill={tc}/>
        </>
      ) : (
        <>
          <rect x="68" y="120" width="64" height="112" rx="8" fill={tc}/>
          <line x1="100" y1="120" x2="100" y2="232" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4,3"/>
          {[136,153,170,187,204,220].map(y=><circle key={y} cx="100" cy={y} r="2" fill="rgba(255,215,0,0.55)"/>)}
          <path d="M68 228 Q100 238 132 228 Q130 275 128 360 L72 360 Q70 275 68 228 Z" fill={bc}/>
          {dc&&<path d="M68 120 Q42 167 38 228 Q54 234 64 217 Q57 173 74 146 Z" fill={dc} opacity="0.72"/>}
        </>
      )}
      <rect x="28"  y="122" width="42" height="76" rx="10" fill={tc}/>
      <rect x="130" y="122" width="42" height="76" rx="10" fill={tc}/>
      <ellipse cx="49"  cy="203" rx="13" ry="9" fill="#FFCCAA"/>
      <ellipse cx="151" cy="203" rx="13" ry="9" fill="#FFCCAA"/>
      <ellipse cx="151" cy="198" rx="10" ry="4" fill="none" stroke="#FFD700" strokeWidth="2.5"/>
      <ellipse cx="151" cy="205" rx="10" ry="4" fill="none" stroke="#FF69B4" strokeWidth="1.8"/>
      <rect x="90" y="102" width="20" height="22" rx="6" fill="#FFCCAA"/>
      <path d="M82 120 Q100 130 118 120" stroke="#FFD700" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="100" cy="130" r="3.5" fill="#FFD700"/>
      <ellipse cx="100" cy="78" rx="32" ry="36" fill="#FFCCAA"/>
      <ellipse cx="100" cy="46" rx="32" ry="13" fill="#1a0a00"/>
      <rect x="68" y="46" width="64" height="15" fill="#1a0a00"/>
      <path d="M68 52 Q62 130 66 202 Q74 207 78 202 Q76 130 80 54 Z" fill="#1a0a00"/>
      <path d="M132 52 Q138 130 134 202 Q126 207 122 202 Q124 130 120 54 Z" fill="#1a0a00"/>
      <circle cx="100" cy="56" r="3.5" fill="#C9184A"/>
      <ellipse cx="88"  cy="76" rx="7"  ry="8"  fill="white"/>
      <ellipse cx="112" cy="76" rx="7"  ry="8"  fill="white"/>
      <circle cx="90"  cy="77" r="4.5" fill="#3e2723"/>
      <circle cx="114" cy="77" r="4.5" fill="#3e2723"/>
      <circle cx="91"  cy="75" r="1.5" fill="white"/>
      <circle cx="115" cy="75" r="1.5" fill="white"/>
      {[-3,-1,1,3].map(x=><line key={x}    x1={88+x} y1="68" x2={88+x*1.3} y2="64" stroke="#1a0a00" strokeWidth="1.2"/>)}
      {[-3,-1,1,3].map(x=><line key={"r"+x} x1={112+x} y1="68" x2={112+x*1.3} y2="64" stroke="#1a0a00" strokeWidth="1.2"/>)}
      <path d="M81 67 Q88 62 95 65"  stroke="#1a0a00" strokeWidth="2"   fill="none" strokeLinecap="round"/>
      <path d="M105 65 Q112 62 119 67" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M97 82 Q100 89 103 82" stroke="#cc9977" strokeWidth="1.5" fill="none"/>
      <path d="M90 95 Q100 101 110 95" stroke="#c62828" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M90 95 Q100 93 110 95" stroke="#c62828" strokeWidth="1.5" fill="none"/>
      <circle cx="67" cy="82" r="4" fill="#FFD700"/>
      <ellipse cx="67" cy="91" rx="4" ry="6" fill="#FFD700" opacity="0.8"/>
      <circle cx="133" cy="82" r="4" fill="#FFD700"/>
      <ellipse cx="133" cy="91" rx="4" ry="6" fill="#FFD700" opacity="0.8"/>
    </svg>
  );
}

function buildAvatarParams(outfitItems, gender, wardrobe) {
  const find = (cats) => wardrobe.find(w =>
    outfitItems.some(oi => oi.toLowerCase().includes(w.type.toLowerCase())) &&
    cats.some(c => w.category === c)
  );
  if (gender === "male") {
    const shirt = find(["tops","fullbody","outerwear"]);
    const pants = find(["bottoms"]);
    const shoes = find(["footwear"]);
    return {
      shirtColor: getHex(shirt?.color)||"#1565c0",
      pantsColor: getHex(pants?.color)||"#37474f",
      shoeColor:  getHex(shoes?.color)||"#4e342e",
      isEthnic: ["kurta","sherwani","pathani","dhoti"].some(k=>shirt?.type?.toLowerCase().includes(k))
    };
  } else {
    const top    = find(["tops","ethnic","western"]);
    const bottom = find(["bottoms","ethnic","western"]);
    const shoes  = find(["footwear"]);
    const dupat  = wardrobe.find(w=>outfitItems.some(oi=>oi.toLowerCase().includes(w.type.toLowerCase())) && w.type.toLowerCase().includes("dupatta"));
    const t = top?.type?.toLowerCase()||"";
    return {
      topColor:    getHex(top?.color)||"#880e4f",
      bottomColor: getHex(bottom?.color)||"#4a148c",
      shoeColor:   getHex(shoes?.color)||"#c62828",
      dupatColor:  dupat?getHex(dupat?.color):null,
      isSaree:     t.includes("saree"),
      isLehenga:   t.includes("lehenga")||t.includes("choli"),
      isWestern:   t.includes("dress")||t.includes("gown")||t.includes("jumpsuit"),
    };
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function WardrobeAI() {
  const [wardrobe,      setWardrobe]      = useState([]);
  const [tab,           setTab]           = useState("wardrobe");
  const [gender,        setGender]        = useState("female");
  const [occasion,      setOccasion]      = useState(null);
  const [suggestions,   setSuggestions]   = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [toast,         setToast]         = useState(null);
  const [dragOver,      setDragOver]      = useState(false);
  const [form, setForm] = useState({ category:"", type:"", color:"Black", material:"", note:"", imagePreview:null });
  const fileRef   = useRef();
  const cameraRef = useRef();

  const CATS = gender === "male" ? MALE_CATEGORIES : FEMALE_CATEGORIES;
  const femColor = "#FF69B4";
  const malColor = "#4FC3F7";
  const accent   = gender === "female" ? femColor : malColor;
  const gradA    = gender === "female" ? "linear-gradient(135deg,#880e4f,#FF69B4)" : "linear-gradient(135deg,#0d47a1,#4FC3F7)";
  const gradB    = gender === "female" ? "linear-gradient(135deg,#1a0510,#3d0e2b,#1a0a1f)" : "linear-gradient(135deg,#050b1f,#0d2137,#0a1628)";

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const handleImage = (file) => {
    if (!file?.type?.startsWith("image/")) return showToast("Please select a valid image","error");
    const r = new FileReader();
    r.onload = e => setForm(f=>({...f, imagePreview:e.target.result}));
    r.readAsDataURL(file);
  };

  const addItem = () => {
    if (!form.type) return showToast("Select a clothing type!","error");
    setWardrobe(p=>[...p,{id:Date.now(),...form,gender,addedAt:new Date().toLocaleDateString()}]);
    setForm({category:"",type:"",color:"Black",material:"",note:"",imagePreview:null});
    showToast("Added to wardrobe ✨");
  };

  const myWardrobe = wardrobe.filter(w => w.gender === gender);

  const getSuggestions = async () => {
    if (!occasion) return showToast("Select an occasion first!","error");
    if (myWardrobe.length < 2) return showToast("Add at least 2 items first!","error");
    setLoading(true); setSuggestions(null);
    const occ  = OCCASIONS.find(o=>o.id===occasion);
    const list = myWardrobe.map(w=>`- ${w.type} (${w.category}), Color: ${w.color}${w.material?`, Material: ${w.material}`:""}${w.note?`, Note: ${w.note}`:""}`).join("\n");
    const p = `You are a top Indian fashion stylist. The user (${gender}) has these clothes:\n${list}\n\nSuggest 3 complete outfits for: ${occ.label} (${occ.desc}). Use ONLY items listed. Return ONLY valid JSON no markdown:\n{"occasion":"${occ.label}","outfits":[{"name":"...","items":["..."],"tip":"...","rating":9,"vibe":"..."}],"general_advice":"..."}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:p}]})
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const raw  = data.content.map(i=>i.text||"").join("");
      setSuggestions(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setTab("suggestions");
    } catch(e) { showToast(`AI Error: ${e.message}`,"error"); }
    finally { setLoading(false); }
  };

  const grouped = Object.keys(CATS).reduce((a,c)=>({...a,[c]:myWardrobe.filter(w=>w.category===c)}),{});
  const ACCENT_SETS = [["#FFD700","#FF69B4"],["#FF69B4","#C77DFF"],["#4FC3F7","#FFD700"]];

  return (
    <div style={{minHeight:"100vh",background:gradB,fontFamily:"Georgia,serif",color:"#fff",position:"relative"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse at 25% 40%,${gender==="female"?"rgba(255,105,180,0.09)":"rgba(100,149,237,0.09)"} 0%,transparent 55%),radial-gradient(ellipse at 75% 70%,rgba(255,215,0,0.06) 0%,transparent 50%)`}}/>

      {toast&&<div style={{position:"fixed",top:20,right:20,zIndex:9999,background:toast.type==="error"?"#C9184A":toast.type==="info"?"#023E8A":"#2D6A4F",color:"#fff",padding:"12px 22px",borderRadius:12,fontFamily:"sans-serif",fontSize:14,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",animation:"slideIn .3s ease"}}>{toast.msg}</div>}

      <div style={{maxWidth:1020,margin:"0 auto",padding:"0 14px 80px",position:"relative",zIndex:1}}>

        {/* HEADER */}
        <div style={{textAlign:"center",padding:"36px 0 20px"}}>
          <div style={{fontSize:44}}>{gender==="female"?"👗":"👔"}</div>
          <h1 style={{fontSize:"clamp(24px,5vw,44px)",fontWeight:700,margin:"8px 0 0",background:gender==="female"?"linear-gradient(135deg,#FFD700,#FF69B4,#FF1493)":"linear-gradient(135deg,#FFD700,#4FC3F7,#7986CB)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>My Smart Wardrobe</h1>
          <p style={{color:"rgba(255,255,255,0.4)",fontFamily:"sans-serif",fontSize:14,margin:"6px 0 18px"}}>AI-Powered Outfit Styling for Every Occasion</p>
          <div style={{display:"inline-flex",background:"rgba(255,255,255,0.07)",borderRadius:30,padding:4,gap:4}}>
            {[["female","👩 Female"],["male","👨 Male"]].map(([g,label])=>(
              <button key={g} onClick={()=>{setGender(g);setForm({category:"",type:"",color:"Black",material:"",note:"",imagePreview:null});}} style={{padding:"9px 26px",borderRadius:26,border:"none",cursor:"pointer",fontFamily:"sans-serif",fontSize:14,fontWeight:700,background:gender===g?(g==="female"?"linear-gradient(135deg,#FF69B4,#C9184A)":"linear-gradient(135deg,#4FC3F7,#1565c0)"):"transparent",color:gender===g?"#fff":"rgba(255,255,255,0.38)",transition:"all .3s"}}>{label}</button>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:5,marginBottom:24,background:"rgba(255,255,255,0.05)",borderRadius:16,padding:5}}>
          {[["wardrobe","🗂 Wardrobe",myWardrobe.length],["add","➕ Add Clothes",null],["occasions","🎊 Occasions",null],["suggestions","✨ AI Outfits",suggestions?.outfits?.length||null]].map(([id,label,cnt])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px 4px",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"sans-serif",fontSize:"clamp(10px,1.8vw,13px)",fontWeight:700,background:tab===id?gradA:"transparent",color:tab===id?"#fff":"rgba(255,255,255,0.4)",transition:"all .3s",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              {label}{cnt!=null&&cnt>0&&<span style={{background:"rgba(255,255,255,0.22)",borderRadius:10,padding:"1px 6px",fontSize:11}}>{cnt}</span>}
            </button>
          ))}
        </div>

        {/* ═══ WARDROBE ═══ */}
        {tab==="wardrobe"&&(
          <div>
            {myWardrobe.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px",color:"rgba(255,255,255,0.3)"}}>
                <div style={{fontSize:60}}>{gender==="female"?"👗":"👔"}</div>
                <p style={{fontFamily:"sans-serif",fontSize:18,marginTop:14}}>Your wardrobe is empty</p>
                <button onClick={()=>setTab("add")} style={{marginTop:16,padding:"12px 28px",border:"none",borderRadius:12,cursor:"pointer",background:gradA,color:"#fff",fontFamily:"sans-serif",fontSize:15,fontWeight:700}}>Add First Item ✨</button>
              </div>
            ):(
              Object.entries(CATS).map(([cat,catData])=>{
                const items=grouped[cat]||[];
                if(!items.length)return null;
                return(
                  <div key={cat} style={{marginBottom:26}}>
                    <h3 style={{fontFamily:"sans-serif",fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.7)",margin:"0 0 12px",display:"flex",alignItems:"center",gap:8}}>
                      {catData.icon} {catData.label}
                      <span style={{background:`${accent}28`,color:accent,borderRadius:10,padding:"2px 8px",fontSize:11}}>{items.length}</span>
                    </h3>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:11}}>
                      {items.map(item=>(
                        <div key={item.id} style={{background:"rgba(255,255,255,0.05)",borderRadius:14,border:"1px solid rgba(255,255,255,0.1)",overflow:"hidden",position:"relative"}}>
                          {item.imagePreview?(
                            <div style={{height:108,overflow:"hidden"}}><img src={item.imagePreview} alt={item.type} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
                          ):(
                            <div style={{height:66,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,background:"rgba(255,255,255,0.03)"}}>{catData.icon}</div>
                          )}
                          <div style={{padding:"9px 11px"}}>
                            <div style={{fontFamily:"sans-serif",fontSize:12,fontWeight:700,color:"#fff",marginBottom:4}}>{item.type}</div>
                            <div style={{display:"flex",alignItems:"center",gap:5}}>
                              <div style={{width:10,height:10,borderRadius:"50%",background:item.color.toLowerCase(),border:"1px solid rgba(255,255,255,0.25)"}}/>
                              <span style={{fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.45)"}}>{item.color}</span>
                            </div>
                            {item.note&&<div style={{fontFamily:"sans-serif",fontSize:9,color:`${accent}bb`,marginTop:3}}>{item.note}</div>}
                          </div>
                          <button onClick={()=>{setWardrobe(p=>p.filter(i=>i.id!==item.id));showToast("Removed","info");}} style={{position:"absolute",top:7,right:7,background:"rgba(201,24,74,0.85)",border:"none",borderRadius:7,cursor:"pointer",color:"#fff",fontSize:12,padding:"2px 6px",lineHeight:1}}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ═══ ADD CLOTHES ═══ */}
        {tab==="add"&&(
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:22,padding:26,border:"1px solid rgba(255,255,255,0.09)"}}>
            <h2 style={{fontFamily:"sans-serif",fontSize:19,fontWeight:700,margin:"0 0 20px",color:"#fff"}}>
              {gender==="female"?"👗 Add to Your Wardrobe":"👔 Add to Your Wardrobe"}
              <span style={{fontFamily:"sans-serif",fontSize:12,fontWeight:400,color:"rgba(255,255,255,0.35)",marginLeft:10}}>{gender==="female"?"Female collection":"Male collection"}</span>
            </h2>

            {/* IMAGE UPLOAD */}
            <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:9}}>📸 Photo of Clothing</label>
            <div
              onDragOver={e=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);handleImage(e.dataTransfer.files[0])}}
              onClick={()=>fileRef.current.click()}
              style={{border:`2px dashed ${dragOver?accent:"rgba(255,255,255,0.16)"}`,borderRadius:16,padding:"18px",textAlign:"center",marginBottom:14,background:dragOver?`${accent}0d`:"transparent",transition:"all .25s",cursor:"pointer"}}
            >
              {form.imagePreview?(
                <div style={{position:"relative",display:"inline-block"}}>
                  <img src={form.imagePreview} alt="preview" style={{maxHeight:130,maxWidth:"100%",borderRadius:11,boxShadow:"0 4px 20px rgba(0,0,0,0.5)"}}/>
                  <button onClick={e=>{e.stopPropagation();setForm(f=>({...f,imagePreview:null}));}} style={{position:"absolute",top:-8,right:-8,background:"#C9184A",border:"none",borderRadius:"50%",color:"#fff",width:22,height:22,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              ):(
                <div><div style={{fontSize:34,marginBottom:6}}>📷</div><p style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.35)",margin:0}}>Drag & drop or click to browse gallery</p></div>
              )}
            </div>
            <input ref={fileRef}   type="file" accept="image/*"             style={{display:"none"}} onChange={e=>handleImage(e.target.files[0])}/>
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>handleImage(e.target.files[0])}/>
            <div style={{display:"flex",gap:9,marginBottom:22}}>
              <button onClick={()=>fileRef.current.click()}   style={{flex:1,padding:"11px 0",border:"1px solid rgba(255,255,255,0.18)",borderRadius:12,cursor:"pointer",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.65)",fontFamily:"sans-serif",fontSize:13,fontWeight:600}}>🖼 Browse Gallery</button>
              <button onClick={()=>cameraRef.current.click()} style={{flex:1,padding:"11px 0",border:"1px solid rgba(255,255,255,0.18)",borderRadius:12,cursor:"pointer",background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.65)",fontFamily:"sans-serif",fontSize:13,fontWeight:600}}>📸 Open Camera</button>
            </div>

            {/* CATEGORY */}
            <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:9}}>Category</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
              {Object.entries(CATS).map(([cat,data])=>(
                <button key={cat} onClick={()=>setForm(f=>({...f,category:cat,type:""}))} style={{padding:"7px 14px",border:`1px solid ${form.category===cat?accent:"rgba(255,255,255,0.12)"}`,borderRadius:20,cursor:"pointer",fontFamily:"sans-serif",fontSize:12,fontWeight:600,background:form.category===cat?`${accent}22`:"transparent",color:form.category===cat?accent:"rgba(255,255,255,0.48)"}}>
                  {data.icon} {data.label}
                </button>
              ))}
            </div>

            {/* TYPE */}
            {form.category&&(
              <>
                <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:9}}>Type *</label>
                <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
                  {CATS[form.category].items.map(t=>(
                    <button key={t} onClick={()=>setForm(f=>({...f,type:t}))} style={{padding:"7px 12px",border:`1px solid ${form.type===t?"#FFD700":"rgba(255,255,255,0.1)"}`,borderRadius:16,cursor:"pointer",fontFamily:"sans-serif",fontSize:12,background:form.type===t?"rgba(255,215,0,0.14)":"rgba(255,255,255,0.04)",color:form.type===t?"#FFD700":"rgba(255,255,255,0.5)"}}>
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* COLOR */}
            <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:9}}>Color</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {COLORS.map(c=>(
                <button key={c} onClick={()=>setForm(f=>({...f,color:c}))} style={{padding:"5px 11px",border:`2px solid ${form.color===c?"#fff":"rgba(255,255,255,0.09)"}`,borderRadius:16,cursor:"pointer",fontFamily:"sans-serif",fontSize:11,background:form.color===c?"rgba(255,255,255,0.13)":"rgba(255,255,255,0.03)",color:"#fff",display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:9,height:9,borderRadius:"50%",background:c.toLowerCase(),border:"1px solid rgba(255,255,255,0.28)"}}/>{c}
                </button>
              ))}
            </div>

            <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:7}}>Material <span style={{color:"rgba(255,255,255,0.28)"}}>(optional)</span></label>
            <input value={form.material} onChange={e=>setForm(f=>({...f,material:e.target.value}))} placeholder={gender==="female"?"e.g. Silk, Georgette, Chiffon, Velvet, Crepe...":"e.g. Cotton, Linen, Wool, Velvet..."} style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,color:"#fff",fontFamily:"sans-serif",fontSize:13,marginBottom:12,boxSizing:"border-box"}}/>

            <label style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",display:"block",marginBottom:7}}>Note <span style={{color:"rgba(255,255,255,0.28)"}}>(optional)</span></label>
            <input value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder={gender==="female"?"e.g. embroidered, zardozi work, bridal lehenga, gifted...":"e.g. formal only, embroidered, tailored fit..."} style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:12,color:"#fff",fontFamily:"sans-serif",fontSize:13,marginBottom:22,boxSizing:"border-box"}}/>

            <button onClick={addItem} style={{width:"100%",padding:"14px",border:"none",borderRadius:14,cursor:"pointer",background:gradA,color:"#fff",fontFamily:"sans-serif",fontSize:16,fontWeight:700,letterSpacing:.5}}>✨ Add to Wardrobe</button>
          </div>
        )}

        {/* ═══ OCCASIONS ═══ */}
        {tab==="occasions"&&(
          <div>
            <p style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.38)",textAlign:"center",marginBottom:18}}>Select your occasion — AI will create outfits from your wardrobe</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:26}}>
              {OCCASIONS.map(occ=>(
                <button key={occ.id} onClick={()=>setOccasion(occ.id)} style={{padding:"17px 14px",border:`2px solid ${occasion===occ.id?occ.color:"rgba(255,255,255,0.09)"}`,borderRadius:16,cursor:"pointer",textAlign:"left",background:occasion===occ.id?`${occ.color}22`:"rgba(255,255,255,0.04)",transition:"all .25s"}}>
                  <div style={{fontSize:26,marginBottom:7}}>{occ.icon}</div>
                  <div style={{fontFamily:"sans-serif",fontSize:14,fontWeight:700,color:"#fff",marginBottom:2}}>{occ.label}</div>
                  {occ.urdu&&<div style={{fontSize:12,color:occ.color,marginBottom:3}}>{occ.urdu}</div>}
                  <div style={{fontFamily:"sans-serif",fontSize:11,color:"rgba(255,255,255,0.38)"}}>{occ.desc}</div>
                </button>
              ))}
            </div>
            {occasion&&(
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.48)",marginBottom:14}}>
                  Occasion: <strong style={{color:accent}}>{OCCASIONS.find(o=>o.id===occasion)?.label}</strong> · Wardrobe: <strong style={{color:"#FFD700"}}>{myWardrobe.length} items</strong>
                </div>
                <button onClick={getSuggestions} disabled={loading} style={{padding:"14px 46px",border:"none",borderRadius:16,cursor:loading?"not-allowed":"pointer",background:loading?"rgba(255,255,255,0.07)":gradA,color:loading?"rgba(255,255,255,0.28)":"#fff",fontFamily:"sans-serif",fontSize:17,fontWeight:700,boxShadow:loading?"none":"0 8px 28px rgba(0,0,0,0.35)"}}>
                  {loading?"✨ AI is Styling...":"✨ Get AI Outfit Suggestions"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ SUGGESTIONS ═══ */}
        {tab==="suggestions"&&(
          <div>
            {!suggestions?.outfits?(
              <div style={{textAlign:"center",padding:"60px 20px",color:"rgba(255,255,255,0.3)"}}>
                <div style={{fontSize:58}}>✨</div>
                <p style={{fontFamily:"sans-serif",fontSize:17,marginTop:14}}>No suggestions yet</p>
                <button onClick={()=>setTab("occasions")} style={{marginTop:16,padding:"12px 26px",border:"none",borderRadius:12,cursor:"pointer",background:gradA,color:"#fff",fontFamily:"sans-serif",fontSize:14,fontWeight:600}}>Pick an Occasion 🎊</button>
              </div>
            ):(
              <div>
                <div style={{background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.18)",borderRadius:16,padding:"13px 17px",marginBottom:22}}>
                  <span style={{fontFamily:"sans-serif",fontSize:11,color:"#FFD700",fontWeight:700}}>👗 Stylist's Advice — {suggestions.occasion}  </span>
                  <span style={{fontFamily:"sans-serif",fontSize:13,color:"rgba(255,255,255,0.75)"}}>{suggestions.general_advice}</span>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:22}}>
                  {suggestions.outfits.map((outfit,i)=>{
                    const ap = buildAvatarParams(outfit.items,gender,myWardrobe);
                    const [c1,c2]=ACCENT_SETS[i]||ACCENT_SETS[0];
                    return(
                      <div key={i} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:22,overflow:"hidden"}}>
                        <div style={{height:3,background:`linear-gradient(90deg,${c1},${c2},transparent)`}}/>
                        <div style={{padding:20,display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>

                          {/* AVATAR COLUMN */}
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:155}}>
                            <div style={{background:"rgba(255,255,255,0.04)",borderRadius:18,padding:"14px 18px",border:"1px solid rgba(255,255,255,0.08)",position:"relative",overflow:"hidden"}}>
                              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 100%,${c1}16 0%,transparent 70%)`,pointerEvents:"none"}}/>
                              {gender==="female"?<FemaleAvatar params={ap}/>:<MaleAvatar params={ap}/>}
                            </div>
                            <div style={{marginTop:8,fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",textAlign:"center"}}>{gender==="female"?"👩 Female":"👨 Male"} Model Preview</div>
                            <div style={{display:"flex",gap:5,marginTop:7}}>
                              {[c1,c2,"rgba(255,255,255,0.25)"].map((col,j)=>(
                                <div key={j} style={{width:16,height:16,borderRadius:"50%",background:col,border:"1px solid rgba(255,255,255,0.18)"}}/>
                              ))}
                            </div>
                          </div>

                          {/* INFO COLUMN */}
                          <div style={{flex:1,minWidth:190}}>
                            <div style={{fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:2,marginBottom:3}}>Outfit {i+1}</div>
                            <h3 style={{fontFamily:"Georgia",fontSize:20,fontWeight:700,margin:"0 0 3px",color:"#fff"}}>{outfit.name}</h3>
                            <div style={{fontFamily:"sans-serif",fontSize:12,color:c1,marginBottom:13}}>{outfit.vibe}</div>

                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                              <div style={{background:"rgba(255,255,255,0.07)",borderRadius:10,padding:"5px 13px"}}>
                                <span style={{fontFamily:"sans-serif",fontSize:18,fontWeight:700,color:c1}}>{outfit.rating}</span>
                                <span style={{fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.3)"}}>/10</span>
                              </div>
                              <div>{[...Array(Math.round(outfit.rating/2))].map((_,j)=><span key={j} style={{fontSize:13}}>⭐</span>)}</div>
                            </div>

                            <div style={{marginBottom:13}}>
                              <div style={{fontFamily:"sans-serif",fontSize:10,color:"rgba(255,255,255,0.32)",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>What to Wear</div>
                              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                                {outfit.items.map((item,j)=>{
                                  const matched=myWardrobe.find(w=>item.toLowerCase().includes(w.type.toLowerCase()));
                                  return(
                                    <div key={j} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:20,padding:"5px 11px",fontFamily:"sans-serif",fontSize:11,color:"#fff",display:"flex",alignItems:"center",gap:5}}>
                                      {matched?.imagePreview&&<img src={matched.imagePreview} alt="" style={{width:16,height:16,borderRadius:"50%",objectFit:"cover"}}/>}
                                      {item}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div style={{background:`${c1}13`,border:`1px solid ${c1}30`,borderRadius:11,padding:"9px 13px"}}>
                              <span style={{fontFamily:"sans-serif",fontSize:10,color:c1,fontWeight:700}}>💡 Tip: </span>
                              <span style={{fontFamily:"sans-serif",fontSize:12,color:"rgba(255,255,255,0.7)"}}>{outfit.tip}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{display:"flex",justifyContent:"center",gap:11,marginTop:26}}>
                  <button onClick={()=>setTab("occasions")} style={{padding:"10px 26px",border:"1px solid rgba(255,255,255,0.16)",borderRadius:12,cursor:"pointer",background:"transparent",color:"rgba(255,255,255,0.55)",fontFamily:"sans-serif",fontSize:13}}>← Change Occasion</button>
                  <button onClick={getSuggestions} disabled={loading} style={{padding:"10px 26px",border:"none",borderRadius:12,cursor:"pointer",background:gradA,color:"#fff",fontFamily:"sans-serif",fontSize:13,fontWeight:700}}>{loading?"Styling...":"🔄 Regenerate"}</button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`input::placeholder{color:rgba(255,255,255,0.2);}input:focus{outline:none;border-color:rgba(255,215,0,0.4)!important;}button:hover{opacity:.86;}@keyframes slideIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
