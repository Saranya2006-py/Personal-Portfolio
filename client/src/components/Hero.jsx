import { useEffect, useRef, useState } from 'react';
import { IconArrowUpRight, IconChevronDown } from './Icons';

function useCountUp(target, shouldStart, duration = 1400) {
  const numericTarget = parseFloat(target);
  const isNumeric = !Number.isNaN(numericTarget);
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!shouldStart || !isNumeric) return;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * eased;
      setValue(
        numericTarget % 1 === 0 ? Math.round(current) : Math.round(current * 100) / 100
      );
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldStart, isNumeric, numericTarget, duration]);

  if (!isNumeric) return target;
  return value;
}

function StatTicker({ stat, shouldStart, delay }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (shouldStart) {
      const t = setTimeout(() => setArmed(true), delay);
      return () => clearTimeout(t);
    }
  }, [shouldStart, delay]);

  const display = useCountUp(stat.value, armed);

  return (
    <div className="stat">
      <div className="stat__value">
        {display}
        <span className="stat__suffix">{stat.suffix}</span>
      </div>
      <div className="stat__label">{stat.label}</div>
    </div>
  );
}

export default function Hero({ profile }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!profile) return null;

  return (
    <section id="top" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className={`hero__content ${visible ? 'is-visible' : ''}`}>
          <div className="eyebrow">Portfolio · {profile.location}</div>

          <h1 className="hero__name">
            {profile.name.split(' ')[0]}
            <br />
            <em>{profile.name.split(' ').slice(1).join(' ')}</em>
          </h1>

          <p className="hero__role">{profile.title}</p>

          <p className="hero__summary">{profile.tagline}</p>

          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">
              View projects <IconArrowUpRight />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in touch
            </a>
          </div>
        </div>

        <div className={`hero__stats ${visible ? 'is-visible' : ''}`}>
          <div className="hero__stats-label">// LIVE METRICS</div>
          <div className="stat-grid">
            {profile.stats.map((s, i) => (
              <StatTicker key={s.label} stat={s} shouldStart={visible} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>

      <a href="#work" className="hero__scroll" aria-label="Scroll to work section">
        <IconChevronDown />
      </a>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding-top: 90px;
          padding-bottom: 60px;
          overflow: hidden;
        }
        .hero__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--ink-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--ink-line) 1px, transparent 1px);
          background-size: 64px 64px;
          opacity: 0.18;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent);
        }
        .hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 880px) {
          .hero__inner { grid-template-columns: 1fr; gap: 48px; }
        }
        .hero__content {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .hero__content.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero__name {
          font-size: clamp(48px, 8vw, 88px);
          line-height: 0.98;
          margin-top: 22px;
          letter-spacing: -0.01em;
        }
        .hero__name em {
          font-style: italic;
          color: var(--amber);
          font-weight: 400;
        }
        .hero__role {
          font-family: var(--font-mono);
          color: var(--teal-bright);
          font-size: 15px;
          margin-top: 20px;
          letter-spacing: 0.01em;
        }
        .hero__summary {
          color: var(--fog);
          font-size: 17px;
          line-height: 1.7;
          margin-top: 18px;
          max-width: 540px;
        }
        .hero__actions {
          display: flex;
          gap: 14px;
          margin-top: 38px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease);
        }
        .btn--primary {
          background: var(--amber);
          color: var(--ink);
        }
        .btn--primary:hover {
          background: var(--amber-bright);
          transform: translateY(-2px);
        }
        .btn--ghost {
          border: 1px solid var(--ink-line);
          color: var(--paper);
        }
        .btn--ghost:hover {
          border-color: var(--fog);
          transform: translateY(-2px);
        }
        .hero__stats {
          background: var(--ink-soft);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-lg);
          padding: 30px 28px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s var(--ease) 0.15s, transform 0.7s var(--ease) 0.15s;
        }
        .hero__stats.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero__stats-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--fog-dim);
          margin-bottom: 22px;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }
        .stat__value {
          font-family: var(--font-mono);
          font-size: 36px;
          font-weight: 600;
          color: var(--paper);
          line-height: 1;
        }
        .stat__suffix {
          color: var(--amber);
          font-size: 22px;
        }
        .stat__label {
          font-size: 12px;
          color: var(--fog-dim);
          margin-top: 6px;
          letter-spacing: 0.02em;
        }
        .hero__scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--fog-dim);
          animation: bob 2.2s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero__scroll { animation: none; }
        }
      `}</style>
    </section>
  );
}
