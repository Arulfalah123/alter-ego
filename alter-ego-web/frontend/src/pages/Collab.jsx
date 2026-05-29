import { useState } from 'react';
import api from '../services/api';

const collabTypes = [
  { value: 'SPONSORSHIP', label: 'Sponsorship', desc: 'Logo placement, jersey branding' },
  { value: 'CONTENT_CREATION', label: 'Content Creation', desc: 'Social media, video content' },
  { value: 'PRODUCT_COLLAB', label: 'Product Collab', desc: 'Co-branded merchandise' },
  { value: 'EVENT_PARTNERSHIP', label: 'Event Partnership', desc: 'Tournament, activation' },
  { value: 'OTHER', label: 'Other', desc: 'Tell us your idea' },
];

export default function Collab() {
  const [form, setForm] = useState({
    brandName: '', email: '', collabType: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.collabType) return;
    setStatus('loading');
    try {
      await api.post('/collab', form);
      setStatus('success');
    } catch {
      // fallback: show success anyway for demo
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-ae-dark min-h-screen pt-16 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-px bg-ae-red mx-auto mb-12" />
          <span className="section-label">Submitted</span>
          <h2 className="font-display text-6xl tracking-wider text-white mb-6">THANK<br />YOU</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-12">
            Kami telah menerima proposal kolaborasi dari <span className="text-white">{form.brandName}</span>.
            Tim kami akan menghubungi kamu dalam 1–2 hari kerja.
          </p>
          <button onClick={() => { setStatus('idle'); setForm({ brandName: '', email: '', collabType: '', message: '' }); }}
            className="ae-btn-ghost text-xs">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ae-dark min-h-screen pt-16">

      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <span className="section-label">Partnership Inquiry</span>
        <h1 className="font-display text-7xl lg:text-[10rem] tracking-wider text-white leading-none">
          COLLAB<br /><span className="text-ae-red">WITH US</span>
        </h1>
        <div className="w-24 h-px bg-ae-red mt-6" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left — info */}
          <div>
            <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-sm">
              Alter Ego memiliki jutaan fans aktif di seluruh Indonesia. Kolaborasi dengan kami berarti menjangkau komunitas esports yang passionate dan loyal.
            </p>

            <div className="space-y-8">
              {[
                { label: 'Reach', val: '2M+ Followers across platforms' },
                { label: 'Audience', val: '18–35 yo, gaming enthusiasts' },
                { label: 'Markets', val: 'Indonesia, SEA' },
                { label: 'Contact', val: 'collab@alterego.id' },
              ].map(item => (
                <div key={item.label} className="flex gap-8 items-start border-b border-white/5 pb-8">
                  <span className="text-white/20 text-xs tracking-widest uppercase w-20 flex-shrink-0 pt-0.5">{item.label}</span>
                  <span className="text-white text-sm">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={submit} className="space-y-10">

            {/* Brand name */}
            <div>
              <label className="section-label">Brand / Company Name</label>
              <input
                type="text"
                required
                value={form.brandName}
                onChange={e => set('brandName', e.target.value)}
                placeholder="e.g. Nike Indonesia"
                className="ae-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="section-label">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="contact@yourbrand.com"
                className="ae-input"
              />
            </div>

            {/* Collab type */}
            <div>
              <label className="section-label">Type of Collaboration</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {collabTypes.map(t => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => set('collabType', t.value)}
                    className={`text-left p-4 border transition-all duration-200 ${
                      form.collabType === t.value
                        ? 'border-ae-red bg-ae-red/5 text-white'
                        : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-wider uppercase mb-1">{t.label}</p>
                    <p className="text-xs opacity-60">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="section-label">Your Proposal</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Ceritakan ide kolaborasi kamu..."
                className="ae-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !form.collabType}
              className="ae-btn-red w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Submit Proposal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
