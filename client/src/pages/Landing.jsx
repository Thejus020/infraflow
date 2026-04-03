import { Github, Activity, CheckCircle, Clock, Terminal as TerminalIcon } from "lucide-react";

function Landing() {
  const handleLogin = () => {
    window.location.href = "https://infraflow-backend.onrender.com/auth/github";
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff8c] font-mono relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. Matrix/Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00ff8c 1px, transparent 1px), linear-gradient(90deg, #00ff8c 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* 2. Drifting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff8c] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full px-6">
        
        {/* Title Section */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] mb-2 opacity-70">Infrastructure Automation Engine</p>
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            INFRA<span className="text-[#00ff8c] drop-shadow-[0_0_15px_rgba(0,255,140,0.5)]">FLOW</span>
          </h1>
          <div className="h-1 w-24 bg-[#00ff8c] mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* 3. Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
          {[
            { label: "Avg Build Time", val: "1m 24s", icon: <Clock size={16}/> },
            { label: "Success Rate", val: "99.2%", icon: <CheckCircle size={16}/> },
            { label: "System Status", val: "OPERATIONAL", icon: <Activity size={16}/> },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900/50 border border-[#00ff8c]/30 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 opacity-60 text-xs mb-1 uppercase tracking-widest">
                {stat.icon} {stat.label}
              </div>
              <div className="text-2xl text-white font-bold">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* 4. Pipeline Stage Progress Bar */}
        <div className="w-full max-w-2xl mb-16 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00ff8c]/20 -translate-y-1/2 z-0"></div>
          {['BUILD', 'TEST', 'DOCKER', 'DEPLOY'].map((stage, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-3 h-3 rounded-full border border-[#00ff8c] ${i < 3 ? 'bg-[#00ff8c] shadow-[0_0_10px_#00ff8c]' : 'bg-black'}`}></div>
              <span className="text-[10px] tracking-tighter opacity-70">{stage}</span>
            </div>
          ))}
        </div>

        {/* 5. The Shimmer Button */}
        <button
          onClick={handleLogin}
          className="group relative overflow-hidden border-2 border-[#00ff8c] bg-transparent px-10 py-4 font-bold text-[#00ff8c] uppercase tracking-widest transition-all hover:bg-[#00ff8c] hover:text-black hover:shadow-[0_0_30px_#00ff8c]"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Github size={20} />
            Authorize System Access
          </span>
          {/* Shimmer Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
        </button>
      </div>

      {/* 6. Scrolling Log Strip */}
      <div className="absolute bottom-0 w-full bg-gray-950 border-t border-[#00ff8c]/20 py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee flex items-center gap-8">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[10px] opacity-40 uppercase tracking-tighter">
              <span className="text-[#00ff8c]">[SYSTEM]</span> Initializing core.v2.4... <span className="text-white">STATUS: OK</span> | 
              <span className="text-[#00ff8c]">[AUTH]</span> Handshaking with GitHub OAuth... | 
              <span className="text-[#00ff8c]">[NET]</span> Connection established via port 5000...
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
      `}} />
    </div>
  );
}

export default Landing;