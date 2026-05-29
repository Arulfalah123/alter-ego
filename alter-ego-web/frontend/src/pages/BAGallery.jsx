import { useState } from 'react';

const baItems = [
  {
    id: 1,
    name: 'LIVY RENATA',
    ig: '@livyrenata',
    role: 'Brand Ambassador',
    caption: 'Content creator & actress. Wajah Alter Ego sejak 2020, direkrut langsung via Instagram.',
    img: '/ba/livy-1.jpg',
    objPos: '50% 15%',
  },
  {
    id: 2,
    name: 'ANNYA ERICA',
    ig: '@annyaerica',
    role: 'Brand Ambassador & Host',
    caption: 'Host & talent Alter Ego Esports. Pembawa acara Annya And The Tea Box Podcast.',
    img: '/ba/annya-1.jpg',
    objPos: '50% 10%',
  },
];

export default function BAGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-ae-dark min-h-screen pt-16">

      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <span className="section-label">Alter Ego Talent</span>
        <h1 className="font-display text-7xl lg:text-[10rem] tracking-wider text-white leading-none">
          BRAND<br /><span className="text-ae-red">AMBASSADOR</span>
        </h1>
        <div className="w-24 h-px bg-ae-red mt-6" />
        <p className="text-white/30 text-sm mt-6 max-w-md leading-relaxed">
          Wajah-wajah eksklusif Alter Ego Esports — talent pilihan yang merepresentasikan nilai dan identitas tim di luar arena kompetisi.
        </p>
      </div>

      {/* 2-column equal grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {baItems.map(item => (
            <BACard key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-2xl w-full bg-ae-card border border-white/10 overflow-hidden flex flex-col sm:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <div className="sm:w-72 flex-shrink-0 overflow-hidden" style={{ height: '420px' }}>
              <img
                src={selected.img}
                alt={selected.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: selected.objPos }}
              />
            </div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-ae-red text-xs tracking-widest uppercase mb-4">{selected.role}</p>
                <h2 className="font-display text-4xl tracking-wider text-white mb-1">{selected.name}</h2>
                <p className="text-white/30 text-sm mb-6">{selected.ig}</p>
                <p className="text-white/50 text-sm leading-relaxed">{selected.caption}</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <a
                  href={`https://instagram.com/${selected.ig.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-ae-red tracking-widest uppercase hover:underline"
                >
                  Instagram →
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors"
                >
                  Close ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BACard({ item, onClick }) {
  return (
    <div
      className="relative overflow-hidden bg-ae-card cursor-pointer group"
      style={{ height: '600px' }}
      onClick={onClick}
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ objectPosition: item.objPos }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      {/* Top red line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-ae-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-ae-red text-xs tracking-widest uppercase mb-2">{item.role}</p>
        <p className="font-display text-4xl tracking-widest text-white">{item.name}</p>
        <p className="text-white/40 text-sm mt-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {item.ig}
        </p>
      </div>
    </div>
  );
}
