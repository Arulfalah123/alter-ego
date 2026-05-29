import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Roster from './pages/Roster';
import Member from './pages/Member';
import BAGallery from './pages/BAGallery';
import Collab from './pages/Collab';

// Inner component so useLocation works inside Router
function AppInner() {
  const location = useLocation();

  return (
    <>
      {/* Page transition overlay — triggers on every route change */}
      <PageTransition />

      <div className="min-h-screen bg-ae-dark flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* AnimatePresence keyed by pathname so it re-mounts on navigation */}
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"          element={<Home />} />
              <Route path="/roster"    element={<Roster />} />
              <Route path="/member"    element={<Member />} />
              <Route path="/ba-gallery" element={<BAGallery />} />
              <Route path="/collab"    element={<Collab />} />
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="font-display text-8xl text-ae-red tracking-wider">404</h1>
                    <p className="text-white/40 mt-4">Halaman tidak ditemukan</p>
                    <a href="/" className="ae-btn-red mt-8 inline-flex">Kembali ke Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}
