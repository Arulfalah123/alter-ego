import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const mockNews = [
  {
    id: 1,
    title: 'Alter Ego Lolos ke Playoff MPL Indonesia Season 17',
    date: '19 Mei 2026',
    tag: 'MLBB',
    content: 'Setelah melewati fase regular season yang ketat, Alter Ego berhasil mengamankan tiket playoff MPL Indonesia Season 17 dengan rekor 6 kemenangan dari 9 pertandingan.',
    img: '/players/nino.png',
  },
  {
    id: 2,
    title: 'Arfy Raih Week 2 MVP MPL Indonesia S17',
    date: '7 April 2026',
    tag: 'Award',
    content: 'Arifudin "Arfy" Dingarai Putra dinobatkan sebagai MVP Week 2 MPL Indonesia Season 17 setelah penampilan dominan di Gold Lane melawan GEEK Fam.',
    img: '/players/arfy.png',
  },
  {
    id: 3,
    title: 'Reyy Resmi Bergabung dengan Alter Ego',
    date: '4 Maret 2026',
    tag: 'Roster',
    content: 'Reynaldo "Reyy" Ferdiand resmi bergabung sebagai Jungler baru Alter Ego menjelang MPL Indonesia Season 17. Pemain muda berbakat ini sebelumnya bermain di tim MDL.',
    img: '/players/reyy.png',
  },
  {
    id: 4,
    title: 'Nino Raih Rising Star Award di M7 World Championship',
    date: '25 Januari 2026',
    tag: 'Award',
    content: 'Syauki "Nino" Sumarno mendapatkan penghargaan The Rising Star di M7 World Championship setelah tampil konsisten sepanjang turnamen dan membawa Indonesia ke Grand Final.',
    img: '/players/nino.png',
  },
];

export default function Member() {
  const { user, isAuthenticated, login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // ── Logged in view ──────────────────────────────────────────
  if (isAuthenticated) {
    return (
      <div className="bg-ae-dark min-h-screen pt-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-32">

          {/* Welcome */}
          <div className="mb-16 pb-8 border-b border-white/5">
            <span className="section-label">Member Area</span>
            <h1 className="font-display text-5xl lg:text-7xl tracking-wider text-white leading-none">
              WELCOME,<br /><span className="text-ae-red">{user?.name?.toUpperCase()}</span>
            </h1>
          </div>

          {/* Exclusive news */}
          <div>
            <span className="section-label mb-8 block">Exclusive Updates</span>
            <div className="space-y-0">
              {mockNews.map(n => (
                <div key={n.id} className="border-b border-white/5">
                  <button
                    className="w-full text-left py-6 flex items-start gap-6 group"
                    onClick={() => setExpanded(expanded === n.id ? null : n.id)}
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden">
                      <img src={n.img} alt="" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-ae-red text-xs tracking-widest uppercase">{n.tag}</span>
                        <span className="text-white/20 text-xs">{n.date}</span>
                      </div>
                      <h3 className="text-white text-sm font-medium group-hover:text-ae-red transition-colors leading-snug">
                        {n.title}
                      </h3>
                    </div>
                    <span className={`text-white/30 text-lg flex-shrink-0 transition-transform duration-300 ${expanded === n.id ? 'rotate-45' : ''}`}>+</span>
                  </button>

                  {expanded === n.id && (
                    <div className="pb-6 pl-22 ml-22">
                      <p className="text-white/40 text-sm leading-relaxed ml-22 pl-[88px]">{n.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Auth form ───────────────────────────────────────────────
  return (
    <div className="bg-ae-dark min-h-screen pt-16 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-12">
          <span className="section-label">Member Area</span>
          <h1 className="font-display text-6xl tracking-wider text-white leading-none">
            {mode === 'login' ? 'SIGN IN' : 'JOIN US'}
          </h1>
          <div className="w-12 h-px bg-ae-red mt-4" />
        </div>

        {/* Toggle */}
        <div className="flex gap-8 mb-10 border-b border-white/10">
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              className={`pb-4 text-xs tracking-widest uppercase transition-colors ${
                mode === m ? 'text-white border-b border-ae-red -mb-px' : 'text-white/30 hover:text-white/60'
              }`}>
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-8">
          {mode === 'register' && (
            <div>
              <label className="section-label">Full Name</label>
              <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="Your name" className="ae-input" />
            </div>
          )}
          <div>
            <label className="section-label">Email</label>
            <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
              placeholder="your@email.com" className="ae-input" />
          </div>
          <div>
            <label className="section-label">Password</label>
            <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
              placeholder="••••••••" className="ae-input" />
          </div>

          {error && <p className="text-ae-red text-xs tracking-wide">{error}</p>}

          <button type="submit" disabled={loading} className="ae-btn-red w-full disabled:opacity-40">
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-white/20 text-xs text-center">
          {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-ae-red hover:underline">
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>

        {/* Demo hint */}
        <div className="mt-8 p-4 border border-white/5 text-center">
          <p className="text-white/20 text-xs mb-1">Demo credentials</p>
          <p className="text-white/40 text-xs">member@alterego.id / member123</p>
        </div>
      </div>
    </div>
  );
}
