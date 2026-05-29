import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { path: '/', label: 'Home' },
  { path: '/roster', label: 'Roster' },
  { path: '/ba-gallery', label: 'Brand Ambassador' },
  { path: '/collab', label: 'Collab' },
  { path: '/member', label: 'Member' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ae-dark/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/team/ae-logo.png" alt="AE" className="w-8 h-8 object-contain" />
            <span className="font-display text-xl tracking-widest text-white group-hover:text-ae-red transition-colors">
              ALTER EGO
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.path} to={l.path}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-200 ${
                  location.pathname === l.path
                    ? 'text-ae-red'
                    : 'text-white/50 hover:text-white'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/50 tracking-wider uppercase">{user?.name}</span>
                <button onClick={() => { logout(); navigate('/'); }}
                  className="text-xs text-ae-red tracking-widest uppercase hover:text-white transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/member" className="ae-btn-red text-xs py-2 px-6">
                Login
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-ae-dark flex flex-col justify-center px-8 transition-all duration-500 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="space-y-6">
          {links.map((l, i) => (
            <Link key={l.path} to={l.path}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`block font-display text-5xl tracking-widest transition-all duration-300 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              } ${location.pathname === l.path ? 'text-ae-red' : 'text-white hover:text-ae-red'}`}>
              {l.label}
            </Link>
          ))}
        </div>
        {isAuthenticated ? (
          <button onClick={() => { logout(); navigate('/'); setOpen(false); }}
            className="mt-12 text-xs text-ae-red tracking-widest uppercase text-left">
            Logout — {user?.name}
          </button>
        ) : (
          <Link to="/member" onClick={() => setOpen(false)}
            className="mt-12 text-xs text-white/50 tracking-widest uppercase hover:text-ae-red transition-colors">
            Login / Register →
          </Link>
        )}
      </div>
    </>
  );
}
