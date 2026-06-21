import { useEffect, useState } from 'react';
import { IconMenu, IconClose } from './Icons';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#log', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar({ name }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = name
    ? name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
    : 'ST';

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__mark">{initials}</span>
          <span className="navbar__brand-text">{name}</span>
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a href="#contact" className="navbar__cta navbar__cta--desktop">
          Let's talk
        </a>

        <button
          className="navbar__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="navbar__mobile-cta" onClick={() => setOpen(false)}>
            Let's talk
          </a>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(11, 17, 32, 0.86);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--ink-line);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--paper);
          font-family: var(--font-mono);
          font-size: 14px;
          letter-spacing: 0.02em;
        }
        .navbar__mark {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--amber);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }
        .navbar__brand-text {
          display: none;
        }
        @media (min-width: 560px) {
          .navbar__brand-text { display: inline; }
        }
        .navbar__links {
          display: none;
          gap: 32px;
        }
        .navbar__links a {
          color: var(--fog);
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s var(--ease);
        }
        .navbar__links a:hover {
          color: var(--paper);
        }
        .navbar__cta {
          display: none;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--ink);
          background: var(--amber);
          padding: 9px 18px;
          border-radius: 30px;
          font-weight: 600;
          transition: background 0.2s var(--ease), transform 0.2s var(--ease);
        }
        .navbar__cta:hover {
          background: var(--amber-bright);
          transform: translateY(-1px);
        }
        @media (min-width: 880px) {
          .navbar__links--desktop { display: flex; }
          .navbar__cta--desktop { display: inline-block; }
          .navbar__toggle { display: none; }
        }
        .navbar__toggle {
          background: none;
          border: none;
          color: var(--paper);
          cursor: pointer;
          padding: 6px;
          display: flex;
        }
        .navbar__mobile {
          display: flex;
          flex-direction: column;
          background: var(--ink-soft);
          border-bottom: 1px solid var(--ink-line);
          padding: 8px 28px 20px;
          gap: 4px;
          animation: slideDown 0.25s var(--ease);
        }
        .navbar__mobile a {
          padding: 12px 4px;
          color: var(--fog);
          font-size: 15px;
          border-bottom: 1px solid var(--ink-line);
        }
        .navbar__mobile-cta {
          margin-top: 12px;
          text-align: center;
          background: var(--amber);
          color: var(--ink) !important;
          border: none !important;
          border-radius: 30px;
          padding: 12px;
          font-weight: 600;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
