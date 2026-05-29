import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const achievements = [
  { year: '2026', title: 'M7 World Championship', result: 'Runner-Up', prize: '$150,000' },
  { year: '2025', title: 'MPL Indonesia Season 16', result: 'Runner-Up', prize: '$52,591' },
  { year: '2020', title: 'ONE Esports MPL Invitational', result: 'Champion', prize: '$35,000' },
  { year: '2021', title: 'M2 World Championship', result: 'Top 4', prize: '$16,800' },
];

const marqueeItems = [
  '#ALTERCHAMP', 'MPL INDONESIA', 'M7 RUNNER-UP', 'SINCE 2017',
  '#ALTERCHAMP', 'MPL INDONESIA', 'M7 RUNNER-UP', 'SINCE 2017',
];

export default function Home() {
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const fn = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="bg-ae-dark">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden flex items-end">

        {/* Background — split player photos */}
        <div ref={heroRef} className="absolute inset-0 scale-110 flex">
          {/* Left player */}
          <div className="w-1/2 h-full relative">
            <img src="/players/nino.png" alt="" className="w-full h-full object-cover object-top" />
          </div>
          {/* Right player */}
          <div className="w-1/2 h-full relative">
            <img src="/players/yazukee.png" alt="" className="w-full h-full object-cover object-top" />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ae-dark via-ae-dark/50 to-ae-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ae-dark/90 via-ae-dark/40 to-ae-dark/90" />
          {/* Center vertical red line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-ae-red/30 -translate-x-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pb-24 w-full">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="section-label">Indonesia's Finest</span>
            <h1 className="font-display text-[clamp(5rem,15vw,14rem)] leading-none tracking-wider text-white mb-2">
              ALTER
            </h1>
            <h1 className="font-display text-[clamp(5rem,15vw,14rem)] leading-none tracking-wider text-ae-red -mt-4 mb-8">
              EGO
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/roster" className="ae-btn-red">
                Meet the Team
              </Link>
              <Link to="/member" className="ae-btn-outline">
                Join Member
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 z-10">
          <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-ae-red to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="border-y border-white/5 py-4 overflow-hidden bg-ae-card">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display text-2xl tracking-widest text-white/20 px-8 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT / STATS ────────────────────────────────────── */}
      <section className="py-32 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="section-label">About</span>
            <h2 className="font-display text-6xl lg:text-8xl tracking-wider text-white mb-8 leading-none">
              BORN TO<br /><span className="text-ae-red">COMPETE</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md">
              Alter Ego berdiri sejak 2017 dan telah menjadi salah satu kekuatan terbesar esports Indonesia.
              Dari MPL hingga panggung dunia, kami terus membuktikan diri.
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Runner-up M7 World Championship 2026, juara MPL Invitational 2020 — perjalanan kami belum selesai.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/5">
            {[
              { val: '$574K+', label: 'Total Winnings' },
              { val: '7+', label: 'Years Active' },
              { val: '50+', label: 'Tournaments' },
              { val: '3', label: 'Game Divisions' },
            ].map(s => (
              <div key={s.label} className="bg-ae-dark p-8">
                <div className="font-display text-5xl text-ae-red tracking-wider mb-2">{s.val}</div>
                <div className="text-white/30 text-xs tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ─────────────────────────────────────── */}
      <section className="py-24 bg-ae-card border-y border-white/5">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <span className="section-label">Achievements</span>
          <h2 className="font-display text-5xl lg:text-7xl tracking-wider text-white mb-16 leading-none">
            TRACK<br />RECORD
          </h2>

          <div className="space-y-0">
            {achievements.map((a, i) => (
              <div key={i}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 hover:border-ae-red/30 transition-colors duration-300 cursor-default">
                <div className="flex items-center gap-8">
                  <span className="font-display text-4xl text-white/10 group-hover:text-ae-red/30 transition-colors w-16">{a.year}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{a.title}</p>
                    <p className="text-ae-red text-xs tracking-wider mt-1">{a.result}</p>
                  </div>
                </div>
                <span className="text-white/20 text-sm font-mono mt-2 sm:mt-0">{a.prize}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROSTER PREVIEW ───────────────────────────────────── */}
      <section className="py-32 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="section-label">Active Roster</span>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider text-white leading-none">
              THE<br /><span className="text-ae-red">SQUAD</span>
            </h2>
          </div>
          <Link to="/roster" className="ae-btn-ghost hidden sm:inline-flex">
            Full Roster →
          </Link>
        </div>

        {/* 3 featured players */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
          {[
            { name: 'NINO', role: 'EXP Lane', img: '/players/nino.png' },
            { name: 'YAZUKEE', role: 'Jungler', img: '/players/yazukee.png' },
            { name: 'HIJUMEE', role: 'Mid Lane', img: '/players/hijumee.png' },
          ].map(p => (
            <div key={p.name} className="player-card relative overflow-hidden bg-ae-card aspect-[3/4] group">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-3xl tracking-widest text-white">{p.name}</p>
                <p className="text-ae-red text-xs tracking-widest uppercase mt-1">{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/roster" className="ae-btn-outline w-full justify-center">Full Roster →</Link>
        </div>
      </section>

      {/* ── COLLAB CTA ───────────────────────────────────────── */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-ae-red/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-ae-red/20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ae-red/20" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <span className="section-label">Partnership</span>
          <h2 className="font-display text-6xl lg:text-9xl tracking-wider text-white mb-8 leading-none">
            LET'S<br /><span className="text-ae-red">COLLAB</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto mb-12">
            Brand kamu ingin menjangkau jutaan fans esports Indonesia? Mari berkolaborasi dengan Alter Ego.
          </p>
          <Link to="/collab" className="ae-btn-red">
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
