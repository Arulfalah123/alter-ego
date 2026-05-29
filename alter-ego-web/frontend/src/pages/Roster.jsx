import { useState } from 'react';

const players = [
  { id: 1, name: 'NINO', fullName: 'Syauki Fauzan Sumarno', role: 'EXP Lane', img: '/players/nino.png', since: '2024' },
  { id: 2, name: 'YAZUKEE', fullName: 'Muhammad Affan Wahyudi', role: 'Jungler', img: '/players/yazukee.png', since: '2025' },
  { id: 3, name: 'REYY', fullName: 'Reynaldo Ferdiand', role: 'Jungler', img: '/players/reyy.png', since: '2026' },
  { id: 4, name: 'HIJUMEE', fullName: 'Dalvin Ramadhana Putra', role: 'Mid Lane', img: '/players/hijumee.png', since: '2025' },
  { id: 5, name: 'CYRUZ', fullName: 'Muhammad Halim Adicondro', role: 'Mid Lane', img: '/players/cyruz.png', since: '2025' },
  { id: 6, name: 'ARFY', fullName: 'Arifudin Dingarai Putra', role: 'Gold Lane', img: '/players/arfy.png', since: '2025' },
  { id: 7, name: 'ALEKK', fullName: 'Alexander Owen Marcetami', role: 'Roamer', img: '/players/alekk.png', since: '2025' },
];

const staff = [
  { id: 8, name: 'XEPHER', fullName: 'Kenny Deo', role: 'Head Coach', img: '/players/xepher.png', since: '2026' },
  { id: 9, name: 'STYX', fullName: 'Michael Abraham', role: 'Asst. Coach', img: '/players/styx.png', since: '2025' },
];

export default function Roster() {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-ae-dark min-h-screen pt-16">

      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <span className="section-label">MPL Indonesia Season 17</span>
        <h1 className="font-display text-7xl lg:text-[10rem] tracking-wider text-white leading-none">
          ROSTER
        </h1>
        <div className="w-24 h-px bg-ae-red mt-6" />
      </div>

      {/* Players grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-8">
        <p className="section-label mb-8">Players</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {players.map(p => (
            <PlayerCard key={p.id} player={p} active={active} setActive={setActive} />
          ))}
        </div>
      </div>

      {/* Staff */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <p className="section-label mb-8">Coaching Staff</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {staff.map(p => (
            <PlayerCard key={p.id} player={p} active={active} setActive={setActive} />
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-ae-card border border-white/10 max-w-lg w-full overflow-hidden flex flex-col sm:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <div className="sm:w-56 aspect-[3/4] sm:aspect-auto flex-shrink-0">
              <img src={active.img} alt={active.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-ae-red text-xs tracking-widest uppercase mb-2">{active.role}</p>
                <h2 className="font-display text-5xl tracking-wider text-white mb-1">{active.name}</h2>
                <p className="text-white/40 text-sm mb-6">{active.fullName}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30 tracking-wider uppercase">Game</span>
                    <span className="text-white">Mobile Legends: Bang Bang</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30 tracking-wider uppercase">Since</span>
                    <span className="text-white">{active.since}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/30 tracking-wider uppercase">Nationality</span>
                    <span className="text-white">🇮🇩 Indonesia</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setActive(null)}
                className="mt-8 text-xs text-white/30 hover:text-ae-red tracking-widest uppercase transition-colors text-left">
                ← Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player, active, setActive }) {
  return (
    <div
      className="player-card relative overflow-hidden bg-ae-card aspect-[3/4] cursor-pointer group"
      onClick={() => setActive(player)}
    >
      <img src={player.img} alt={player.name} className="w-full h-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-ae-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 right-0 h-px bg-ae-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-2xl tracking-widest text-white">{player.name}</p>
        <p className="text-ae-red text-xs tracking-widest uppercase mt-0.5">{player.role}</p>
      </div>
    </div>
  );
}
