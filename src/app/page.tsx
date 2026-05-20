"use client";
import React, { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("rag-tab");
  const [ragContext, setRagContext] = useState("implant");
  const [ragInput, setRagInput] = useState("");
  const [ragMessages, setRagMessages] = useState([
    {
      role: "assistant",
      content:
        "Select a knowledge source on the left, then ask a question. I'll answer strictly from that context — no hallucinations.",
    },
  ]);
  const [mapRegion, setMapRegion] = useState({
    title: "Click a Region",
    compliance: "GLOBAL ALLIANCE CORE",
    info: "Click on any continental zone to view regional airworthiness certifications, compliance logs, and operational office hubs.",
  });

  const mapData: any = {
    americas: {
      title: "Americas Region Hub",
      compliance: "FAA Part 145 & 14 CFR Compliant",
      info: "Operational Coordinate: Sheridan, WY, USA. Auditing global supply networks, safety certifications, and active drone telemetry setups.",
    },
    europe: {
      title: "European Airworthiness Hub",
      compliance: "EASA Part 145 & Part 66 Standards",
      info: "Operational Coordinate: Madrid, Spain. Safety assessments, structural component engineering, and civil helipad vertiport compliance audits.",
    },
    mea: {
      title: "Middle East & Africa Hub",
      compliance: "GCAA CAR 21 & MIL-STD-882 Compliant",
      info: "Operational Coordinate: Abu Dhabi, UAE. Supporting defense operations and deep aerospace maintenance under extreme climates.",
    },
    apac: {
      title: "Asia-Pacific Regional Office",
      compliance: "ICAO Annex 6 & CAMO Compliant",
      info: "Operational Coordinate: Hong Kong. Talent acquisition networks deploying licensed maintenance engineers and Part 21 design technicians.",
    },
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
    setRagMessages((prev) => [...prev, { role: "user", content: q }]);
    setRagInput("");

    setTimeout(() => {
      let response = "";
      if (ragContext === "implant") {
        response =
          q.toLowerCase().includes("price") || q.toLowerCase().includes("cost")
            ? "RETRIEVED — Fly4Smiles 72-Hour Basal Implant full-mouth rehabilitation is structured at ₹5,00,000 upfront. Ongoing maintenance cost: ₹0."
            : "RETRIEVED — 72-Hour Basal implants use immediate cortical load anchorage. No bone grafts required. Zero-hallucination compliance protocols enforced.";
      } else {
        response =
          "RETRIEVED — Rotor Wing Services is fully certified under FAA 14 CFR Part 145 and EASA Part 145. Operational trademarks owned exclusively by JavAirTec Holding Group.";
      }
      setRagMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }, 480);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        if (typeof window !== "undefined" && (window as any).showNotification) {
          (window as any).showNotification(
            "Message sent! I'll be in touch within 24 hours.",
          );
        }
        form.reset();
      } else {
        window.location.href =
          "mailto:ashu@ashishsharma.shop?subject=Platform%20Lead";
      }
    } catch {
      window.location.href =
        "mailto:ashu@ashishsharma.shop?subject=Platform%20Lead";
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

  const openChatbot = () => {
    if (typeof window !== "undefined") {
      document.getElementById("bot-bubble")?.click();
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-ticker">
          <div className="ticker-inner">
            <span className="ticker-item">
              Retirement Stress-Test Platforms{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Wealth Coaching Systems <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              AI-Powered Advisory Tools <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Aerospace MRO Compliance Portals{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Multi-Tenant SaaS Platforms{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Knowledge Productization <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Decision-Support Engines <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Clinical RAG Pipelines <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Retirement Stress-Test Platforms{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Wealth Coaching Systems <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              AI-Powered Advisory Tools <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Aerospace MRO Compliance Portals{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Multi-Tenant SaaS Platforms{" "}
              <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Knowledge Productization <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Decision-Support Engines <span className="ticker-dot"> · </span>
            </span>
            <span className="ticker-item">
              Clinical RAG Pipelines <span className="ticker-dot"> · </span>
            </span>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">AI Systems &amp; Platform Engineer</div>
          <h1>
            Your expertise
            <br />
            deserves a<br />
            <em>platform</em> not a<br />
            business <span className="hi">card.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-desc">
              I build <strong>intelligent digital platforms</strong> for
              consultants, coaches, and domain experts — so their knowledge
              works at scale, not just in one-on-one conversations.
            </p>
            <div className="hero-actions">
              <a
                href="https://cal.com/ashish-sharma-2000"
                className="btn-accent"
              >
                Book a 15-min Call
              </a>
              <a href="#what-i-build" className="btn-outline">
                See What I Build
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE ACCESS ── */}
      <section className="feature-access">
        <div className="section-inner" style={{ maxWidth: "1200px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <div className="section-eyebrow">Live Features</div>
            <h2 className="section-title">
              Access the app features directly from the landing page.
            </h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Book an Appointment</h3>
              <p>
                Open the booking flow and submit a scheduling request for your
                chosen service.
              </p>
              <a href="/booking" className="btn-outline">
                Open Booking
              </a>
            </div>
            <div className="feature-card">
              <h3>Talk to the AI Bot</h3>
              <p>
                Use the built-in chatbot to qualify your project and route the
                lead instantly.
              </p>
              <button
                type="button"
                className="btn-outline"
                onClick={openChatbot}
              >
                Open Chatbot
              </button>
            </div>
            <div className="feature-card">
              <h3>Explore Portfolio</h3>
              <p>
                Browse completed projects and review the platform work examples.
              </p>
              <a href="/portfolio" className="btn-outline">
                View Portfolio
              </a>
            </div>
            <div className="feature-card">
              <h3>Send a Direct Brief</h3>
              <p>
                Use the contact form below to share your requirements and get a
                technical response.
              </p>
              <a href="#contact" className="btn-outline">
                Go to Contact
              </a>
            </div>
            <div className="feature-card">
              <h3>Admin Dashboard</h3>
              <p>
                Review submissions, appointments, and content management from
                the admin panel.
              </p>
              <a href="/admin" className="btn-outline">
                Open Admin
              </a>
            </div>
            <div className="feature-card">
              <h3>Read the Blog</h3>
              <p>
                Discover thought leadership and case insights from the published
                blog content.
              </p>
              <a href="/blog" className="btn-outline">
                View Blog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OEM TICKER ── */}
      <section className="oem-ticker">
        <div className="oem-ticker-wrapper">
          <div className="oem-item">
            <span>■</span> AGUSTAWESTLAND
          </div>
          <div className="oem-item">
            <span>■</span> AIRBUS HELICOPTERS
          </div>
          <div className="oem-item">
            <span>■</span> BELL HELICOPTER
          </div>
          <div className="oem-item">
            <span>■</span> SIKORSKY
          </div>
          <div className="oem-item">
            <span>■</span> RUSSIAN HELICOPTERS
          </div>
          <div className="oem-item">
            <span>■</span> ROBINSON HELICOPTER
          </div>
          <div className="oem-item">
            <span>■</span> JAVAIRTECH GROUP
          </div>
          <div className="oem-item">
            <span>■</span> FAA PART 145
          </div>
          <div className="oem-item">
            <span>■</span> EASA PART 145
          </div>
          <div className="oem-item">
            <span>■</span> ICAO ANNEX 6
          </div>
          <div className="oem-item">
            <span>■</span> AGUSTAWESTLAND
          </div>
          <div className="oem-item">
            <span>■</span> AIRBUS HELICOPTERS
          </div>
          <div className="oem-item">
            <span>■</span> BELL HELICOPTER
          </div>
          <div className="oem-item">
            <span>■</span> SIKORSKY
          </div>
          <div className="oem-item">
            <span>■</span> RUSSIAN HELICOPTERS
          </div>
          <div className="oem-item">
            <span>■</span> ROBINSON HELICOPTER
          </div>
          <div className="oem-item">
            <span>■</span> JAVAIRTECH GROUP
          </div>
          <div className="oem-item">
            <span>■</span> FAA PART 145
          </div>
          <div className="oem-item">
            <span>■</span> EASA PART 145
          </div>
          <div className="oem-item">
            <span>■</span> ICAO ANNEX 6
          </div>
        </div>
      </section>

      {/* ── POSITIONING ── */}
      <section className="positioning">
        <div className="pos-inner">
          <div className="pos-label">The core problem I solve</div>
          <div>
            <p className="pos-statement">
              You have 20+ years of insight. Right now, the only way to share it
              is <em>one person at a time.</em>
            </p>
            <p className="pos-sub">
              A booking page doesn't change that. A simple website doesn't
              either. What actually changes it is turning your framework — your
              mental models, your decision criteria — into an interactive system
              that qualifies, educates, and converts clients before you ever
              speak to them.
              <br />
              <br />
              That's what I build.
            </p>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="pains">
        <div className="section-inner" style={{ padding: 0 }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: 0 }}>
            <div style={{ marginBottom: "3rem" }}>
              <div className="section-eyebrow">The Friction of Legacy Web</div>
              <h2 className="section-title">
                Standard templates don't support high-value workflows.
              </h2>
            </div>
            <div className="pains-grid">
              <div className="pain-card">
                <div className="pain-badge">WordPress Bloat</div>
                <h4>Frozen Builds &amp; Brittle Code</h4>
                <p>
                  Plugins that conflict, platforms locked into heavy maintenance
                  loops, and layouts that break the second they face custom data
                  requirements.
                </p>
              </div>
              <div className="pain-card">
                <div className="pain-badge">Operational Leakage</div>
                <h4>Chaotic Support &amp; Intake</h4>
                <p>
                  Vitals lost in messy WhatsApp threads, unscreened leads
                  wasting chair-time, and no structured automation mapping
                  customer actions to outcomes.
                </p>
              </div>
              <div className="pain-card">
                <div className="pain-badge">Integration Failures</div>
                <h4>Brittle SaaS Connectors</h4>
                <p>
                  QuickBooks sync tokens that constantly expire, fragmented
                  Zapier loops, and zero synchronization across critical
                  accounting and reporting systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="for-who" id="for-who">
        <div className="for-who-inner">
          <div className="section-header">
            <span className="section-tag">Who I work with</span>
          </div>
          <div className="profiles-grid">
            <div className="profile-card active">
              <div className="profile-num">01</div>
              <span className="profile-icon">💼</span>
              <h3>Wealth Coaches &amp; Financial Advisors</h3>
              <p>
                You have a proven framework for retirement, inflation, or
                portfolio strategy. You want clients to experience your thinking
                before a call — not just read a bio.
              </p>
              <span className="profile-tag">
                Retirement Planners · QFAs · IFAs
              </span>
            </div>
            <div className="profile-card">
              <div className="profile-num">02</div>
              <span className="profile-icon">🧠</span>
              <h3>Senior Consultants &amp; Domain Experts</h3>
              <p>
                You've spent decades building deep expertise in a complex field.
                Now you want to productize it — create courses, tools, or
                decision systems — without building a whole tech team.
              </p>
              <span className="profile-tag">
                ERP · Payments · Aviation · Risk
              </span>
            </div>
            <div className="profile-card">
              <div className="profile-num">03</div>
              <span className="profile-icon">🚀</span>
              <h3>Knowledge Entrepreneurs</h3>
              <p>
                You're leaving a corporate career (or running one alongside) to
                build something of your own. You need a platform that reflects
                your credibility — and starts generating leads on day one.
              </p>
              <span className="profile-tag">
                Coaches · Advisors · Thought Leaders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE PILLARS ── */}
      <section className="services">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "1rem" }}>
            <div className="section-eyebrow">Technical Capability</div>
            <h2 className="section-title">
              Zero-maintenance architectures
              <br />
              that scale automatically.
            </h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-num">PILLAR 01</div>
              <h3>Applied AI &amp; RAG Solutions</h3>
              <p>
                Knowledge networks trained strictly on custom organizational
                documents. Eliminates hallucinations in high-liability
                verticals.
              </p>
              <ul className="service-bullets">
                <li>Strict systemic contextual compliance</li>
                <li>Embedded vector databases (Pinecone / Chroma)</li>
                <li>Interactive custom triage widgets</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-num">PILLAR 02</div>
              <h3>Multi-Tenant Platforms</h3>
              <p>
                Custom MERN systems (MongoDB, Express, React, Node) built with
                ultra-secure RBAC protocols and modular routing logic.
              </p>
              <ul className="service-bullets">
                <li>Dynamic team-hierarchy reporting structures</li>
                <li>High-throughput data extraction engines</li>
                <li>Interactive custom-resize dashboard widgets</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-num">PILLAR 03</div>
              <h3>Advanced Agent Integrations</h3>
              <p>
                Automating deep workspace pipelines using OpenAI, Python,
                FastAPI, and the Model Context Protocol (MCP).
              </p>
              <ul className="service-bullets">
                <li>Secure GitHub &amp; Notion automated sync</li>
                <li>Token refresh handlers for QuickBooks</li>
                <li>Scalable Docker container deployments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT I BUILD ── */}
      <section className="what-i-build" id="what-i-build">
        <div className="build-inner">
          <div className="build-header">
            <div className="section-tag" style={{ marginBottom: "1.25rem" }}>
              What I build
            </div>
            <h2 className="build-title">
              Not websites.
              <br />
              Decision-support systems.
            </h2>
          </div>
          <div className="build-grid">
            <div className="build-item">
              <div className="build-item-num">01</div>
              <h3>Interactive Calculators &amp; Stress-Tests</h3>
              <p>
                Turn your diagnostic framework into an interactive tool. Users
                input their situation, receive a personalised readiness
                breakdown — and arrive at a call already educated and
                pre-qualified.
              </p>
              <div className="build-item-example">
                Example:{" "}
                <span>
                  Retirement Stress-Test for a Wealth Coach → leads increased 3×
                </span>
              </div>
            </div>
            <div className="build-item">
              <div className="build-item-num">02</div>
              <h3>AI-Powered Advisory Agents</h3>
              <p>
                A custom AI trained on your frameworks, language, and logic —
                that answers common client questions, surfaces your methodology,
                and routes warm prospects to your calendar 24/7.
              </p>
              <div className="build-item-example">
                Example:{" "}
                <span>
                  "Ask me anything about your portfolio" embedded on a wealth
                  coaching platform
                </span>
              </div>
            </div>
            <div className="build-item">
              <div className="build-item-num">03</div>
              <h3>Authority Platforms &amp; Lead Funnels</h3>
              <p>
                A full digital presence built around your credibility —
                positioning you as the clear choice in your niche, with smart
                booking flows that do the qualifying before the call.
              </p>
              <div className="build-item-example">
                Example:{" "}
                <span>
                  Capital Insights — Wealth Coaching Platform, Dublin Ireland
                </span>
              </div>
            </div>
            <div className="build-item">
              <div className="build-item-num">04</div>
              <h3>Productized Knowledge Systems</h3>
              <p>
                Package your IP into scalable digital products — mini-courses,
                diagnostic reports, interactive guides — so your income isn't
                entirely dependent on your calendar.
              </p>
              <div className="build-item-example">
                Example:{" "}
                <span>
                  Inflation-Adjusted Retirement Guide → automated email funnel
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO LABS ── */}
      <section className="demo-workspace" id="demo">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-eyebrow">Interactive Sandbox</div>
            <h2 className="section-title">
              Verify execution quality in real-time.
            </h2>
          </div>

          <div className="workspace-tabs">
            <button
              className={`tab-btn ${activeTab === "rag-tab" ? "active" : ""}`}
              onClick={(e) => setActiveTab("rag-tab")}
            >
              Clinical RAG Pipeline
            </button>
            <button
              className={`tab-btn ${activeTab === "map-tab" ? "active" : ""}`}
              onClick={(e) => setActiveTab("map-tab")}
            >
              Global Aviation Map
            </button>
            <button
              className={`tab-btn ${activeTab === "map-tab" ? "active" : ""}`}
              onClick={(e) => setActiveTab("widget-tab")}
            >
              Drag &amp; Resize Grid
            </button>
          </div>

          {/* Tab 1: RAG */}
          <div
            id="rag-tab"
            className={`tab-content ${activeTab === "rag-tab" ? "active" : ""}`}
          >
            <div className="clinical-rag-grid">
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-header)",
                    marginBottom: "14px",
                    fontSize: "0.88rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--light)",
                  }}
                >
                  Step 1 — Load Knowledge Source
                </h4>
                <div className="document-list">
                  <div
                    className={`document-item ${ragContext === "implant" ? "active" : ""}`}
                    onClick={() => handleRagContext("implant")}
                  >
                    <div className="document-title">
                      Fly4Smiles: 72-Hour Basal Protocol
                    </div>
                    <div className="document-body">
                      Immediate loading implants. Full rehabilitation guaranteed
                      within 72 hours. Total price structures start at
                      ₹5,00,000.
                    </div>
                  </div>
                  <div
                    className={`document-item ${ragContext === "mro" ? "active" : ""}`}
                    onClick={() => handleRagContext("mro")}
                  >
                    <div className="document-title">
                      Aviation Maintenance Certification Laws
                    </div>
                    <div className="document-body">
                      All rotorcraft services registered under JavAirTec.
                      Compliance aligned with FAA and EASA Part 145 standards.
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-header)",
                    marginBottom: "14px",
                    fontSize: "0.88rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--light)",
                  }}
                >
                  Step 2 — Query the AI
                </h4>
                <div className="preview-chat-box">
                  <div className="chat-header">
                    <span>RAG INTAKE EXPERT SYSTEM</span>
                    <span className="status-dot"></span>
                  </div>
                  <div className="chat-messages" id="rag-chat-messages">
                    {ragMessages.map((m, i) => (
                      <div
                        key={i}
                        className={`chat-bubble ${m.role === "assistant" ? "bubble-assistant" : "bubble-user"}`}
                      >
                        {m.content}
                      </div>
                    ))}
                  </div>
                  <div className="chat-input-area">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Ask about price, compliance, timelines..."
                      value={ragInput}
                      onChange={(e) => setRagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitRAGChat();
                      }}
                    />
                    <button className="chat-send-btn" onClick={submitRAGChat}>
                      Ask AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab 2: Map */}
          <div
            id="map-tab"
            className={`tab-content ${activeTab === "map-tab" ? "active" : ""}`}
          >
            <div className="interactive-map-container">
              <div className="map-svg-holder">
                <svg
                  viewBox="0 0 1000 480"
                  width="100%"
                  style={{ maxHeight: "320px" }}
                >
                  <path
                    className="world-continent"
                    d="M120,60 L240,60 L280,140 L340,160 L240,320 L280,440 L220,440 L160,300 L120,240 Z"
                    onClick={() => handleMapClick("americas")}
                  />
                  <path
                    className="world-continent"
                    d="M420,60 L580,60 L620,140 L540,180 L440,140 Z"
                    onClick={() => handleMapClick("europe")}
                  />
                  <path
                    className="world-continent"
                    d="M440,180 L560,180 L660,280 L580,400 L500,400 L420,280 Z"
                    onClick={() => handleMapClick("mea")}
                  />
                  <path
                    className="world-continent"
                    d="M600,60 L900,60 L920,200 L840,360 L700,340 L620,180 Z"
                    onClick={() => handleMapClick("apac")}
                  />
                  <circle
                    className="map-hotspot"
                    cx="210"
                    cy="140"
                    r="6"
                    onClick={() => handleMapClick("americas")}
                  />
                  <circle
                    className="map-hotspot"
                    cx="510"
                    cy="110"
                    r="6"
                    onClick={() => handleMapClick("europe")}
                  />
                  <circle
                    className="map-hotspot"
                    cx="580"
                    cy="210"
                    r="6"
                    onClick={() => handleMapClick("mea")}
                  />
                  <circle
                    className="map-hotspot"
                    cx="800"
                    cy="180"
                    r="6"
                    onClick={() => handleMapClick("apac")}
                  />
                </svg>
              </div>
              <div className="region-details-card" id="region-card">
                <div className="compliance-pill">{mapRegion.compliance}</div>
                <h3 className="region-name">{mapRegion.title}</h3>
                <p className="region-info">{mapRegion.info}</p>
              </div>
            </div>
          </div>

          {/* Tab 3: Widgets */}
          <div
            id="widget-tab"
            className={`tab-content ${activeTab === "widget-tab" ? "active" : ""}`}
          >
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--light)",
                marginBottom: "1.25rem",
              }}
            >
              Drag and reorder widgets to simulate live KPI dashboards inside a
              multi-tenant corporate environment.
            </p>
            <div
              className="dashboard-preview-canvas"
              id="dashboard-canvas"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e)}
            >
              <div
                className="dashboard-widget widget-size-1"
                draggable="true"
                onDragStart={handleDragStart}
                id="widget1"
              >
                <div className="widget-header">
                  <span>DEMURRAGE RISK</span>
                  <span
                    className="status-dot"
                    style={{ background: "#ef4444" }}
                  ></span>
                </div>
                <div className="widget-body">CRITICAL</div>
                <div className="widget-desc">2 Shipments Overdue Free-Days</div>
              </div>
              <div
                className="dashboard-widget widget-size-2"
                draggable="true"
                onDragStart={handleDragStart}
                id="widget2"
              >
                <div className="widget-header">
                  <span>QUICKBOOKS LEDGER</span>
                  <span className="status-dot"></span>
                </div>
                <div className="widget-body">$14,285.00</div>
                <div className="widget-desc">
                  Direct Token Integration Active
                </div>
              </div>
              <div
                className="dashboard-widget widget-size-1"
                draggable="true"
                onDragStart={handleDragStart}
                id="widget3"
              >
                <div className="widget-header">
                  <span>REPORT QUARTER</span>
                  <span>Q4</span>
                </div>
                <div className="widget-body">100% Sync</div>
                <div className="widget-desc">All departments reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process" id="process">
        <div className="process-inner">
          <div className="process-header">
            <div>
              <div className="section-tag" style={{ marginBottom: "1.25rem" }}>
                How it works
              </div>
              <h2 className="process-title">
                A clear process.
                <br />
                No guesswork.
              </h2>
            </div>
            <p className="process-intro">
              A structured approach for senior professionals who are serious
              about their time and don't want to manage a development project —
              just see results.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">Step 01</div>
              <div className="step-body">
                <h4>Discovery Call — 30 minutes</h4>
                <p>
                  We map your expertise, your audience, and your current biggest
                  bottleneck. I'll identify which platform type will create the
                  most leverage — no generic advice.
                </p>
                <span className="step-tag">Free · No commitment</span>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step 02</div>
              <div className="step-body">
                <h4>Strategic Blueprint</h4>
                <p>
                  I build a detailed platform concept — with wireframes,
                  architecture, and content strategy — before a single line of
                  code is written. You approve the direction first.
                </p>
                <span className="step-tag">Week 1</span>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step 03</div>
              <div className="step-body">
                <h4>Build &amp; Iterate</h4>
                <p>
                  Rapid development with weekly check-ins. Short sprints,
                  working previews — so you see progress, not promises. You give
                  feedback in plain English, not technical terms.
                </p>
                <span className="step-tag">Weeks 2–5</span>
              </div>
            </div>
            <div className="step">
              <div className="step-num">Step 04</div>
              <div className="step-body">
                <h4>Launch &amp; Optimise</h4>
                <p>
                  Go live with full setup — analytics, booking integrations, SEO
                  foundations. Track conversion data and optimise based on
                  what's actually working.
                </p>
                <span className="step-tag">Week 6 onwards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="case-study" id="work">
        <div className="case-inner">
          <div className="case-label">Featured Work</div>

          {/* Capital Insights — featured */}
          <div className="case-card">
            <div className="case-top">
              <div className="case-meta">
                <span className="case-badge">Live Project</span>
                <h2>Capital Insights</h2>
                <p className="case-subtitle">
                  Wealth Coaching Platform · Dublin, Ireland
                </p>
                <p>
                  Dharmesh Shah — a QFA with 25 years in ERP and payments —
                  needed a platform that reflected his credibility and
                  positioned his retirement planning framework as more than just
                  advice.
                </p>
                <br />
                <p>
                  We built an interactive Retirement Stress-Test calculator that
                  lets users input their age, savings, and desired income — and
                  receive a personalised, inflation-adjusted retirement number.
                  Prospects arrive at consultations pre-educated and already
                  bought into the framework.
                </p>
              </div>
              <div className="case-numbers">
                <div className="case-stat">
                  <div className="case-stat-num">6wk</div>
                  <div className="case-stat-label">Concept to launch</div>
                </div>
                <div className="case-stat">
                  <div className="case-stat-num">3×</div>
                  <div className="case-stat-label">
                    Qualified leads vs. Topmate alone
                  </div>
                </div>
                <div className="case-stat">
                  <div className="case-stat-num">AI</div>
                  <div className="case-stat-label">
                    Retirement calculator built in
                  </div>
                </div>
                <div className="case-stat">
                  <div className="case-stat-num">IE+IN</div>
                  <div className="case-stat-label">Dual-market positioning</div>
                </div>
              </div>
            </div>
            <div className="case-bottom">
              <div className="case-tags">
                <span className="tag">Wealth Coaching</span>
                <span className="tag">Interactive Calculator</span>
                <span className="tag">Ireland &amp; India</span>
                <span className="tag">Lead Funnel</span>
                <span className="tag">Authority Platform</span>
              </div>
              <a
                href="https://ashishsharma.shop"
                className="btn-accent"
                style={{ fontSize: "0.75rem", padding: "0.6rem 1.4rem" }}
              >
                View Live Site →
              </a>
            </div>
          </div>

          {/* Additional case studies */}
          <div className="work-grid">
            <div className="work-item">
              <div className="work-meta">
                <div>
                  <div className="work-status">● Completed Platform</div>
                  <h3 className="work-name">Standalone Medical AI Workflow</h3>
                  <p className="work-client">Fly4Smiles Surgical Center</p>
                </div>
                <div className="work-tag-list">
                  <span className="work-tag">MERN Stack</span>
                  <span className="work-tag">RAG AI Chatbot</span>
                  <span className="work-tag">Basal Implant Flow</span>
                </div>
              </div>
              <div className="work-desc-panel">
                <p className="work-text">
                  Delivered an independent patient triage engine that runs
                  completely outside the client's unfinished WordPress site.
                  Handles international clinical intake, structures treatment
                  information, and routes metrics to reception instantly.
                </p>
                <div className="work-deliverables">
                  <h5>Shipped Workflow Metrics</h5>
                  <ul>
                    <li>
                      Qualified dental tourism RAG assistant trained on custom
                      treatment documents
                    </li>
                    <li>
                      Zero-hallucination compliance handling 72-hour basal
                      surgical plans
                    </li>
                    <li>
                      Eliminated WhatsApp coordination chaos via structured
                      patient triage
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="work-item">
              <div className="work-meta">
                <div>
                  <div className="work-status">● Active Systems Audit</div>
                  <h3 className="work-name">Aerospace MRO Compliance Portal</h3>
                  <p className="work-client">
                    Rotor Wing Services / JavAirTec Group
                  </p>
                </div>
                <div className="work-tag-list">
                  <span className="work-tag">FAA/EASA Compliance</span>
                  <span className="work-tag">SVG Mapping</span>
                  <span className="work-tag">OEM Carousel</span>
                </div>
              </div>
              <div className="work-desc-panel">
                <p className="work-text">
                  Engineered sensitive digital regulatory portals reflecting
                  absolute operational airworthiness and compliance alignments.
                  Upgraded static designs to support dynamic geographic network
                  visualization models.
                </p>
                <div className="work-deliverables">
                  <h5>Shipped Workflow Metrics</h5>
                  <ul>
                    <li>
                      Compliance alignment with FAA Part 145 &amp; ICAO Annex 6
                      standards
                    </li>
                    <li>
                      Custom continuous high-performance OEM brand ticker
                      animation
                    </li>
                    <li>
                      Dynamic world hub map overlay tracking global operations
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="work-item">
              <div className="work-meta">
                <div>
                  <div className="work-status">● Refactor Completed</div>
                  <h3 className="work-name">Multi-Tenant Operating SaaS</h3>
                  <p className="work-client">Forge-OS Enterprise</p>
                </div>
                <div className="work-tag-list">
                  <span className="work-tag">Decoupled Architecture</span>
                  <span className="work-tag">RBAC</span>
                  <span className="work-tag">QuickBooks API</span>
                </div>
              </div>
              <div className="work-desc-panel">
                <p className="work-text">
                  Refactored a highly complex backend, decoupling a single
                  monolithic core routing script into clean MVC modules.
                  Integrated deep hierarchical multi-tenant controls for secure
                  corporate visibility.
                </p>
                <div className="work-deliverables">
                  <h5>Shipped Workflow Metrics</h5>
                  <ul>
                    <li>
                      Stabilized multi-level manager dropdown visibility arrays
                    </li>
                    <li>
                      Remediated token refresh cycles for continuous QuickBooks
                      synchronization
                    </li>
                    <li>
                      Engineered customized layout drag configurations across
                      team views
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NDA / REPOS ── */}
      <section className="nda-projects" id="github">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="nda-card">
            <div className="nda-icon">🔒</div>
            <h3 className="nda-title">NDA &amp; Custom Enterprise Contracts</h3>
            <p className="nda-desc">
              I sign comprehensive Non-Disclosure and Non-Circumvention
              agreements. Projects such as the{" "}
              <strong>Guardian Program MVP</strong> ($5,000 POC built to secure
              institutional funding tranches) are kept confidential out of
              respect for clients' intellectual property.
            </p>
            <a
              href="https://github.com/ashish-sharma-2000"
              className="btn-outline"
              style={{ marginBottom: "2rem", display: "inline-flex" }}
            >
              View GitHub Profile →
            </a>
            <div className="git-grid">
              <div className="git-card">
                <div className="git-meta">
                  <span className="git-tag">Agent-Integration</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    ⭐ 0
                  </span>
                </div>
                <h5>Agent-Integration-with-MCP-Servers</h5>
                <p>
                  Secure agents reading knowledge graphs and executing Notion +
                  Git automation loops.
                </p>
              </div>
              <div className="git-card">
                <div className="git-meta">
                  <span className="git-tag">Voice-Agent</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    ⭐ 1
                  </span>
                </div>
                <h5>realtime-voice-ai-agent</h5>
                <p>
                  Low-latency WebRTC speech system leveraging Gemini &amp;
                  Faster Whisper technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="social-proof">
        <div className="social-inner">
          <div className="section-tag">What clients say</div>
          <div className="proof-grid">
            <div className="proof-card">
              <p className="proof-quote">
                "Ashu didn't just build a website — he built a system. Within
                two weeks of launching, I had prospects arriving at calls
                already understanding my inflation framework. That's completely
                new for me."
              </p>
              <div className="proof-author">
                <div className="proof-avatar">DS</div>
                <div>
                  <p className="proof-name">Dharmesh Shah</p>
                  <p className="proof-role">
                    QFA · Wealth Coach · Capital Insights, Dublin
                  </p>
                </div>
              </div>
            </div>
            <div className="proof-card">
              <p className="proof-quote">
                "I'd been thinking about productizing my consulting for two
                years. Ashu took what I explained in a single call and turned it
                into a functioning platform in 5 weeks. I didn't have to think
                about the technology once."
              </p>
              <div className="proof-author">
                <div className="proof-avatar">RC</div>
                <div>
                  <p className="proof-name">Rohan Chakraborty</p>
                  <p className="proof-role">
                    ERP Consultant · Independent Practice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-eyebrow">Direct Assembly</div>
            <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
              Let's coordinate an execution strategy.
            </h2>
            <p className="contact-desc">
              Submit your primary operational constraints below. All
              transmissions route directly to{" "}
              <strong>ashishsharmastudio@gmail.com</strong> for a technical
              assessment within 12 hours.
            </p>
            <div className="contact-item">
              <div className="contact-item-icon">@</div>
              <div className="contact-item-text">ashu@ashishsharma.shop</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">India · Working Globally</div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">⏱</div>
              <div className="contact-item-text">
                Usually responds within 24 hours
              </div>
            </div>
            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://cal.com/ashish-sharma-2000"
                className="btn-accent"
              >
                Book a Free 15-min Call
              </a>
            </div>
          </div>

          <div className="contact-form">
            <form
              id="lead-form"
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleFormSubmit}
            >
              <input
                type="hidden"
                name="access_key"
                id="form-access-key"
                value="ea7d1911-c91f-49b8-b4b7-df35ef2e6399"
              />
              <input
                type="hidden"
                name="subject"
                value="New Lead — Ashish Sharma Portfolio"
              />
              <input
                type="hidden"
                name="from_name"
                value="Portfolio Lead Capture"
              />
              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    placeholder="name@domain.com"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Business Domain</label>
                <select name="business_domain" className="form-control">
                  <option value="wealth_coaching">
                    Wealth Coaching / Financial Advisory
                  </option>
                  <option value="medical_tourism">
                    Medical Tourism / Specialized Clinic
                  </option>
                  <option value="aviation_logistics">
                    Aviation &amp; Safety-Critical Engineering
                  </option>
                  <option value="enterprise_saas">
                    Multi-Tenant SaaS / Platform Upgrade
                  </option>
                  <option value="custom_automation">
                    Custom AI / Automated Pipelines
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Primary Bottleneck</label>
                <textarea
                  name="bottleneck"
                  className="form-control"
                  rows={4}
                  required
                  placeholder="Outdated WordPress setup, unintegrated accounting systems, WhatsApp chaos..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "0.75rem",
                }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
