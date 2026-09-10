import { useState } from 'react';
import { Menu, Network, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/network', label: 'Network' },
  { to: '/investigation', label: 'Investigation' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080b0d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-left" onClick={() => setMobileNav(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dca86a]/50 text-[#dca86a]"><Network size={16} /></span>
          <span className="font-mono text-sm font-bold tracking-[0.3em]">CIPHER</span>
        </Link>
        <nav className={`${mobileNav ? 'absolute left-0 right-0 top-[72px] flex border-b border-white/10 bg-[#0c1012] p-5' : 'hidden'} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileNav(false)}
              className={({ isActive }) => `text-left text-sm transition ${isActive ? 'text-[#e6bc7e]' : 'text-white/50 hover:text-white'}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#87a98b]" /> Prototype environment
          </div>
          <button className="md:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-end">
        <div>
          <div className="font-mono text-sm font-bold tracking-[0.3em] text-white">CIPHER</div>
          <p className="mt-3 text-sm text-white/35">Graph intelligence for financial crime investigation.</p>
          <div className="mt-5 flex gap-5">
            {navItems.map(({ to, label }) => (
              <Link key={to} to={to} className="text-xs text-white/30 transition hover:text-white/60">{label}</Link>
            ))}
          </div>
        </div>
        <div className="text-left font-mono text-[10px] uppercase tracking-[0.16em] text-white/25 sm:text-right">
          <div>Prototype — Synthetic Data Environment</div>
          <div className="mt-2 text-[#dca86a]/60">Built for the next signal</div>
        </div>
      </div>
    </footer>
  );
}
