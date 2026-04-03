import { useState } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .dash-root {
    min-height: 100vh;
    background: #080a0f;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* Grid background */
  .dash-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,255,140,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,140,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  /* Glow blob */
  .dash-root::after {
    content: '';
    position: fixed;
    top: -200px;
    left: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(0,255,140,0.07) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    animation: blobDrift 12s ease-in-out infinite alternate;
  }

  @keyframes blobDrift {
    from { transform: translate(0, 0); }
    to   { transform: translate(120px, 80px); }
  }

  .dash-inner {
    position: relative;
    z-index: 1;
    max-width: 960px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  /* ── HEADER ── */
  .dash-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 56px;
    animation: fadeUp 0.6s ease both;
  }

  .dash-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .dash-logo-icon {
    width: 44px;
    height: 44px;
    background: #00ff8c;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 0 24px rgba(0,255,140,0.5);
  }

  .dash-logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 3px;
    color: #ffffff;
    line-height: 1;
  }

  .dash-logo-text span {
    color: #00ff8c;
  }

  .dash-badge {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #00ff8c;
    background: rgba(0,255,140,0.1);
    border: 1px solid rgba(0,255,140,0.25);
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* ── HERO TITLE ── */
  .dash-title-block {
    margin-bottom: 48px;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .dash-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: #00ff8c;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dash-eyebrow::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: #00ff8c;
  }

  .dash-h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(56px, 8vw, 88px);
    letter-spacing: 4px;
    line-height: 0.95;
    color: #ffffff;
  }

  .dash-h1 span {
    color: #00ff8c;
    text-shadow: 0 0 40px rgba(0,255,140,0.4);
  }

  .dash-subtitle {
    margin-top: 16px;
    font-size: 15px;
    color: #5a6070;
    max-width: 400px;
    line-height: 1.6;
    font-family: 'DM Mono', monospace;
  }

  /* ── STATS ROW ── */
  .dash-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 40px;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  .stat-card {
    background: #0d1117;
    border: 1px solid #1e2430;
    border-radius: 12px;
    padding: 20px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .stat-card:hover {
    border-color: rgba(0,255,140,0.3);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff8c, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .stat-card:hover::before {
    opacity: 1;
  }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #3a4050;
    margin-bottom: 8px;
  }

  .stat-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 2px;
    color: #ffffff;
  }

  .stat-value.green { color: #00ff8c; }
  .stat-value.yellow { color: #ffd166; }

  .stat-delta {
    font-size: 11px;
    color: #00ff8c;
    font-family: 'DM Mono', monospace;
    margin-top: 2px;
  }

  /* ── MAIN CARD ── */
  .pipeline-card {
    background: #0d1117;
    border: 1px solid #1e2430;
    border-radius: 16px;
    padding: 36px;
    margin-bottom: 24px;
    animation: fadeUp 0.6s 0.3s ease both;
    position: relative;
    overflow: hidden;
  }

  .pipeline-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff8c, #00c8ff, #00ff8c);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    from { background-position: 0% 0%; }
    to   { background-position: 200% 0%; }
  }

  .pipeline-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .pipeline-name {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #e8eaf0;
    letter-spacing: 1px;
  }

  .pipeline-name span {
    color: #5a6070;
  }

  .status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: rgba(0,255,140,0.08);
    border: 1px solid rgba(0,255,140,0.2);
    color: #00ff8c;
    padding: 6px 12px;
    border-radius: 6px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ff8c;
    box-shadow: 0 0 6px #00ff8c;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* Stage pipeline */
  .stages {
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 36px;
  }

  .stage {
    flex: 1;
    text-align: center;
    position: relative;
  }

  .stage-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #161b24;
    border: 1px solid #1e2430;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin: 0 auto 8px;
    position: relative;
    z-index: 1;
    transition: all 0.2s;
  }

  .stage.done .stage-icon {
    background: rgba(0,255,140,0.1);
    border-color: rgba(0,255,140,0.35);
    box-shadow: 0 0 16px rgba(0,255,140,0.15);
  }

  .stage-line {
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    height: 1px;
    background: #1e2430;
    z-index: 0;
  }

  .stage.done .stage-line {
    background: linear-gradient(90deg, #00ff8c, #1e2430);
  }

  .stage:last-child .stage-line {
    display: none;
  }

  .stage-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #3a4050;
  }

  .stage.done .stage-label {
    color: #00ff8c;
  }

  /* ── RUN BUTTON ── */
  .btn-run {
    width: 100%;
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 4px;
    color: #080a0f;
    background: #00ff8c;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 32px rgba(0,255,140,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn-run::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
    pointer-events: none;
  }

  .btn-run:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 48px rgba(0,255,140,0.5);
  }

  .btn-run:active {
    transform: translateY(0);
  }

  .btn-run:disabled {
    background: #0d3d2a;
    color: #00ff8c;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .btn-run.loading {
    background: #0d3d2a;
    color: #00ff8c;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(0,255,140,0.3);
    border-top-color: #00ff8c;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ── LOG STRIP ── */
  .log-strip {
    background: #080a0f;
    border: 1px solid #1e2430;
    border-radius: 10px;
    padding: 16px 20px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #3a4050;
    animation: fadeUp 0.6s 0.4s ease both;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
  }

  .log-prefix {
    color: #00ff8c;
    flex-shrink: 0;
  }

  .log-text {
    white-space: nowrap;
    animation: scrollLog 18s linear infinite;
  }

  @keyframes scrollLog {
    from { transform: translateX(0); }
    to   { transform: translateX(-60%); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const runPipeline = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/run-pipeline");
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to trigger pipeline");
    } finally {
      setLoading(false);
    }
  };

  const stages = [
    { icon: "📦", label: "Build", done: true },
    { icon: "🧪", label: "Test", done: true },
    { icon: "🐳", label: "Docker", done: true },
    { icon: "🚀", label: "Deploy", done: false },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        <div className="dash-inner">

          {/* Header */}
          <header className="dash-header">
            <div className="dash-logo">
              <div className="dash-logo-icon">⚡</div>
              <div className="dash-logo-text">Infra<span>Flow</span></div>
            </div>
            <span className="dash-badge">v1.0 · Local</span>
          </header>

          {/* Title */}
          <div className="dash-title-block">
            <p className="dash-eyebrow">CI/CD Control Center</p>
            <h1 className="dash-h1">YOUR<br /><span>PIPELINE</span><br />DASHBOARD</h1>
            <p className="dash-subtitle">
              // push code → build → test → deploy<br />
              // zero-touch automation
            </p>
          </div>

          {/* Stats */}
          <div className="dash-stats">
            <div className="stat-card">
              <p className="stat-label">Last Build</p>
              <p className="stat-value green">24s</p>
              <p className="stat-delta">↓ 3s faster</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Success Rate</p>
              <p className="stat-value">98%</p>
              <p className="stat-delta" style={{ color: "#ffd166" }}>Last 30 runs</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Status</p>
              <p className="stat-value yellow">READY</p>
              <p className="stat-delta" style={{ color: "#ffd166" }}>Awaiting trigger</p>
            </div>
          </div>

          {/* Pipeline Card */}
          <div className="pipeline-card">
            <div className="pipeline-header">
              <p className="pipeline-name">
                <span>repo / </span>infraflow-app
              </p>
              <span className="status-pill">
                <span className="status-dot" />
                Idle
              </span>
            </div>

            {/* Stages */}
            <div className="stages">
              {stages.map((s, i) => (
                <div key={i} className={`stage ${s.done ? "done" : ""}`}>
                  <div className="stage-icon">{s.icon}</div>
                  {i < stages.length - 1 && <div className="stage-line" />}
                  <p className="stage-label">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={`btn-run ${loading ? "loading" : ""}`}
              onClick={runPipeline}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  RUNNING PIPELINE...
                </>
              ) : (
                <>🚀 RUN PIPELINE</>
              )}
            </button>
          </div>

          {/* Log strip */}
          <div className="log-strip">
            <span className="log-prefix">&gt;_</span>
            <span className="log-text">
              [SYSTEM] InfraFlow ready &nbsp;·&nbsp; Terraform initialized &nbsp;·&nbsp; Docker daemon active &nbsp;·&nbsp; Jenkins connected &nbsp;·&nbsp; AWS EC2 reachable &nbsp;·&nbsp; MongoDB synced &nbsp;·&nbsp; GitHub webhook armed &nbsp;·&nbsp; Awaiting trigger...
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
