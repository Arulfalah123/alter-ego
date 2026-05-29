import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ae-dark">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/team/ae-logo.png" alt="AE" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl tracking-widest">ALTER EGO</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Tim esports profesional Indonesia. Bersaing di level tertinggi MLBB, Valorant, dan CS2.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="section-label mb-4">Navigate</p>
              <div className="space-y-3">
                {[['/', 'Home'], ['/roster', 'Roster'], ['/ba-gallery', 'Brand Ambassador'], ['/collab', 'Collab']].map(([path, label]) => (
                  <Link key={path} to={path} className="block text-sm text-white/40 hover:text-white transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label mb-4">Social</p>
              <div className="space-y-3">
                {[
                  ['Instagram', 'https://www.instagram.com/alteregoesports'],
                  ['Twitter/X', 'https://twitter.com/AlterEgo_IDN'],
                  ['YouTube', 'https://www.youtube.com/channel/UCu3Oq_wEChEPaV7abgY688g'],
                  ['Facebook', 'https://facebook.com/alteregoesportsid'],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="block text-sm text-white/40 hover:text-ae-red transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <p className="section-label mb-4">Kolaborasi</p>
            <p className="text-white/30 text-sm mb-6">Brand kamu ingin berkolaborasi dengan Alter Ego?</p>
            <Link to="/collab" className="ae-btn-outline text-xs py-2 px-6 inline-flex">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-wider">© 2026 Alter Ego Esports. All rights reserved.</p>
          <p className="text-white/20 text-xs tracking-wider">#ALTERCHAMP</p>
        </div>
      </div>
    </footer>
  );
}
