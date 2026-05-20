import re
import os

html_path = r"d:\SIP\ashishsharma-portfolio.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update globals.css
css_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
if css_match:
    css = css_match.group(1)
    new_css = '@import "tailwindcss";\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' + css
    with open(r"src\styles\globals.css", "w", encoding="utf-8") as f:
        f.write(new_css)

# 2. Extract body sections (excluding nav, footer, scripts, chatbots, modales)
body_match = re.search(r'<!-- ── HERO ── -->(.*?)<!-- ── CHATBOT WIDGET ── -->', html, re.DOTALL)
if not body_match:
    print("Could not find body content.")
    exit(1)

body_content = body_match.group(1)

# Convert HTML to JSX
jsx = body_content
jsx = jsx.replace('class=', 'className=')
jsx = jsx.replace('for=', 'htmlFor=')
jsx = jsx.replace('onclick=', 'onClick=')
jsx = jsx.replace('onsubmit=', 'onSubmit=')
jsx = jsx.replace('ondragover=', 'onDragOver=')
jsx = jsx.replace('ondrop=', 'onDrop=')
jsx = jsx.replace('ondragstart=', 'onDragStart=')
jsx = jsx.replace('onkeydown=', 'onKeyDown=')
jsx = jsx.replace('style="padding:0 0;"', 'style={{ padding: 0 }}')
jsx = jsx.replace('style="max-width:1200px; margin:0 auto; padding:0 0;"', 'style={{ maxWidth: "1200px", margin: "0 auto", padding: 0 }}')
jsx = jsx.replace('style="margin-bottom:3rem;"', 'style={{ marginBottom: "3rem" }}')
jsx = jsx.replace('style="max-width:1200px; margin:0 auto;"', 'style={{ maxWidth: "1200px", margin: "0 auto" }}')
jsx = jsx.replace('style="margin-bottom:1rem;"', 'style={{ marginBottom: "1rem" }}')
jsx = jsx.replace('style="margin-bottom:1.25rem"', 'style={{ marginBottom: "1.25rem" }}')
jsx = jsx.replace('style="font-family:var(--font-header); margin-bottom:14px; font-size:0.88rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--light);"', 'style={{ fontFamily: "var(--font-header)", marginBottom: "14px", fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--light)" }}')
jsx = jsx.replace('style="max-height:320px;"', 'style={{ maxHeight: "320px" }}')
jsx = jsx.replace('style="background:#ef4444;"', 'style={{ background: "#ef4444" }}')
jsx = jsx.replace('style="font-size:0.75rem; padding:0.6rem 1.4rem;"', 'style={{ fontSize: "0.75rem", padding: "0.6rem 1.4rem" }}')
jsx = jsx.replace('style="margin-bottom:2rem; display:inline-flex;"', 'style={{ marginBottom: "2rem", display: "inline-flex" }}')
jsx = jsx.replace('style="font-size:0.75rem; color:var(--muted);"', 'style={{ fontSize: "0.75rem", color: "var(--muted)" }}')
jsx = jsx.replace('style="margin-bottom:1.5rem;"', 'style={{ marginBottom: "1.5rem" }}')
jsx = jsx.replace('style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;"', 'style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}')
jsx = jsx.replace('style="width:100%; justify-content:center; margin-top:0.75rem;"', 'style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}')

# Handle self closing tags
jsx = re.sub(r'<input([^>]*?)>', r'<input\1 />', jsx)
jsx = re.sub(r'<br>', r'<br />', jsx)
jsx = re.sub(r'<img([^>]*?)>', r'<img\1 />', jsx)

# Handle SVG camelCase
jsx = jsx.replace('stroke-width', 'strokeWidth')

# We need to change the hardcoded JS strings like `onclick="switchTab(event,'rag-tab')"` to real functions,
# but since the script will be long, we can use a template for `page.tsx` and inject the JSX there.
# Let's fix some specific handlers.
jsx = jsx.replace('onClick="switchTab(event,\'rag-tab\')"', 'onClick={(e) => setActiveTab("rag-tab")}')
jsx = jsx.replace('onClick="switchTab(event,\'map-tab\')"', 'onClick={(e) => setActiveTab("map-tab")}')
jsx = jsx.replace('onClick="switchTab(event,\'widget-tab\')"', 'onClick={(e) => setActiveTab("widget-tab")}')

jsx = jsx.replace('onClick="selectRAGDoc(event,\'implant\')"', 'onClick={() => handleRagContext("implant")}')
jsx = jsx.replace('onClick="selectRAGDoc(event,\'mro\')"', 'onClick={() => handleRagContext("mro")}')

jsx = jsx.replace('onClick="selectMapRegion(\'americas\')"', 'onClick={() => handleMapClick("americas")}')
jsx = jsx.replace('onClick="selectMapRegion(\'europe\')"', 'onClick={() => handleMapClick("europe")}')
jsx = jsx.replace('onClick="selectMapRegion(\'mea\')"', 'onClick={() => handleMapClick("mea")}')
jsx = jsx.replace('onClick="selectMapRegion(\'apac\')"', 'onClick={() => handleMapClick("apac")}')

jsx = jsx.replace('onSubmit="handleFormSubmit(event)"', 'onSubmit={handleFormSubmit}')
jsx = jsx.replace('onKeyDown="if(event.key===\'Enter\')submitRAGChat()"', 'onKeyDown={(e) => { if(e.key === \'Enter\') submitRAGChat(); }}')
jsx = jsx.replace('onClick="submitRAGChat()"', 'onClick={submitRAGChat}')

jsx = jsx.replace('id="rag-tab" className="tab-content active"', 'id="rag-tab" className={`tab-content ${activeTab === "rag-tab" ? "active" : ""}`}')
jsx = jsx.replace('id="map-tab" className="tab-content"', 'id="map-tab" className={`tab-content ${activeTab === "map-tab" ? "active" : ""}`}')
jsx = jsx.replace('id="widget-tab" className="tab-content"', 'id="widget-tab" className={`tab-content ${activeTab === "widget-tab" ? "active" : ""}`}')

jsx = jsx.replace('className="tab-btn active"', 'className={`tab-btn ${activeTab === "rag-tab" ? "active" : ""}`}')
jsx = jsx.replace('className="tab-btn"', 'className={`tab-btn ${activeTab === "map-tab" ? "active" : ""}`}')
# Manually fixing the tabs:
# <button className={`tab-btn ${activeTab === "rag-tab" ? "active" : ""}`} onClick={(e) => setActiveTab("rag-tab")}>Clinical RAG Pipeline</button>
# <button className={`tab-btn ${activeTab === "map-tab" ? "active" : ""}`} onClick={(e) => setActiveTab("map-tab")}>Global Aviation Map</button>
# <button className={`tab-btn ${activeTab === "widget-tab" ? "active" : ""}`} onClick={(e) => setActiveTab("widget-tab")}>Drag & Resize Grid</button>
jsx = re.sub(
    r'<button className="tab-btn active" onClick=\{\(e\) => setActiveTab\("rag-tab"\)\}>Clinical RAG Pipeline</button>',
    r'<button className={`tab-btn ${activeTab === "rag-tab" ? "active" : ""}`} onClick={() => setActiveTab("rag-tab")}>Clinical RAG Pipeline</button>',
    jsx
)
jsx = re.sub(
    r'<button className="tab-btn" onClick=\{\(e\) => setActiveTab\("map-tab"\)\}>Global Aviation Map</button>',
    r'<button className={`tab-btn ${activeTab === "map-tab" ? "active" : ""}`} onClick={() => setActiveTab("map-tab")}>Global Aviation Map</button>',
    jsx
)
jsx = re.sub(
    r'<button className="tab-btn" onClick=\{\(e\) => setActiveTab\("widget-tab"\)\}>Drag &amp; Resize Grid</button>',
    r'<button className={`tab-btn ${activeTab === "widget-tab" ? "active" : ""}`} onClick={() => setActiveTab("widget-tab")}>Drag &amp; Resize Grid</button>',
    jsx
)

# Fix documents active state
jsx = re.sub(
    r'<div className="document-item active" onClick=\{.*?handleRagContext\("implant"\)\}>',
    r'<div className={`document-item ${ragContext === "implant" ? "active" : ""}`} onClick={() => handleRagContext("implant")}>',
    jsx
)
jsx = re.sub(
    r'<div className="document-item" onClick=\{.*?handleRagContext\("mro"\)\}>',
    r'<div className={`document-item ${ragContext === "mro" ? "active" : ""}`} onClick={() => handleRagContext("mro")}>',
    jsx
)

# Remove input value hardcodes or dynamic values
# <input type="text" className="chat-input" id="rag-input" placeholder="..." onKeyDown="...">
jsx = re.sub(
    r'<input type="text" className="chat-input" id="rag-input" placeholder="Ask about price, compliance, timelines\.\.\." onKeyDown=\{\(e\) => \{ if\(e\.key === \'Enter\'\) submitRAGChat\(\); \}\} />',
    r'<input type="text" className="chat-input" placeholder="Ask about price, compliance, timelines..." value={ragInput} onChange={(e) => setRagInput(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter") submitRAGChat(); }} />',
    jsx
)


# Replace chat messages
jsx = re.sub(
    r'<div className="chat-messages" id="rag-chat-messages">.*?</div>\s*<div className="chat-input-area">',
    r"""<div className="chat-messages" id="rag-chat-messages">
              {ragMessages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.role === 'assistant' ? 'bubble-assistant' : 'bubble-user'}`}>
                  {m.content}
                </div>
              ))}
            </div>
            <div className="chat-input-area">""",
    jsx, flags=re.DOTALL
)

# Replace map details
jsx = re.sub(
    r'<div className="compliance-pill" id="region-pill">GLOBAL ALLIANCE CORE</div>\s*<h3 className="region-name" id="region-title">Click a Region</h3>\s*<p className="region-info" id="region-info">Click on any continental zone to view regional airworthiness certifications, compliance logs, and operational office hubs\.</p>',
    r'<div className="compliance-pill">{mapRegion.compliance}</div><h3 className="region-name">{mapRegion.title}</h3><p className="region-info">{mapRegion.info}</p>',
    jsx
)

page_template = """"use client";
import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("rag-tab");
  const [ragContext, setRagContext] = useState("implant");
  const [ragInput, setRagInput] = useState("");
  const [ragMessages, setRagMessages] = useState([
    { role: "assistant", content: "Select a knowledge source on the left, then ask a question. I'll answer strictly from that context — no hallucinations." }
  ]);
  const [mapRegion, setMapRegion] = useState({
    title: "Click a Region",
    compliance: "GLOBAL ALLIANCE CORE",
    info: "Click on any continental zone to view regional airworthiness certifications, compliance logs, and operational office hubs."
  });

  const mapData: any = {
    americas: { title: 'Americas Region Hub', compliance: 'FAA Part 145 & 14 CFR Compliant', info: 'Operational Coordinate: Sheridan, WY, USA. Auditing global supply networks, safety certifications, and active drone telemetry setups.' },
    europe: { title: 'European Airworthiness Hub', compliance: 'EASA Part 145 & Part 66 Standards', info: 'Operational Coordinate: Madrid, Spain. Safety assessments, structural component engineering, and civil helipad vertiport compliance audits.' },
    mea: { title: 'Middle East & Africa Hub', compliance: 'GCAA CAR 21 & MIL-STD-882 Compliant', info: 'Operational Coordinate: Abu Dhabi, UAE. Supporting defense operations and deep aerospace maintenance under extreme climates.' },
    apac: { title: 'Asia-Pacific Regional Office', compliance: 'ICAO Annex 6 & CAMO Compliant', info: 'Operational Coordinate: Hong Kong. Talent acquisition networks deploying licensed maintenance engineers and Part 21 design technicians.' }
  };

  const handleMapClick = (region: string) => {
    setMapRegion(mapData[region]);
    if (typeof window !== "undefined" && (window as any).showNotification) {
      (window as any).showNotification("Selected: " + mapData[region].title);
    }
  };

  const handleRagContext = (ctx: string) => {
    setRagContext(ctx);
    if (typeof window !== "undefined" && (window as any).showNotification) {
      (window as any).showNotification("RAG context updated.");
    }
  };

  const submitRAGChat = () => {
    if (!ragInput.trim()) return;
    const q = ragInput.trim();
    setRagMessages(prev => [...prev, { role: "user", content: q }]);
    setRagInput("");

    setTimeout(() => {
      let response = "";
      if (ragContext === 'implant') {
        response = (q.toLowerCase().includes('price') || q.toLowerCase().includes('cost'))
          ? 'RETRIEVED — Fly4Smiles 72-Hour Basal Implant full-mouth rehabilitation is structured at ₹5,00,000 upfront. Ongoing maintenance cost: ₹0.'
          : 'RETRIEVED — 72-Hour Basal implants use immediate cortical load anchorage. No bone grafts required. Zero-hallucination compliance protocols enforced.';
      } else {
        response = 'RETRIEVED — Rotor Wing Services is fully certified under FAA 14 CFR Part 145 and EASA Part 145. Operational trademarks owned exclusively by JavAirTec Holding Group.';
      }
      setRagMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 480);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        if (typeof window !== "undefined" && (window as any).showNotification) {
          (window as any).showNotification('Message sent! I\\'ll be in touch within 24 hours.');
        }
        form.reset();
      } else {
        window.location.href = 'mailto:ashu@ashishsharma.shop?subject=Platform%20Lead';
      }
    } catch {
      window.location.href = 'mailto:ashu@ashishsharma.shop?subject=Platform%20Lead';
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  };

  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("text", e.target.id);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const el = document.getElementById(id);
    if (el && e.currentTarget) {
      e.currentTarget.appendChild(el);
      if (typeof window !== "undefined" && (window as any).showNotification) {
        (window as any).showNotification("Widget layout updated.");
      }
    }
  };

  return (
    <main>
""" + jsx + """
    </main>
  );
}
"""

with open(r"src\app\page.tsx", "w", encoding="utf-8") as f:
    f.write(page_template)

print("Migration completed.")
