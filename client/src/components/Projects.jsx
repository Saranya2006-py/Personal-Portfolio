import { useState } from 'react';
import { IconArrowUpRight, IconAward } from './Icons';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');

  if (!projects) return null;

  const allTags = ['all', ...new Set(projects.flatMap((p) => p.tags))];
  const visible = filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="work" className="section projects">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Dataset 01 · Projects</div>
          <h2 className="section-title">
            Things I've <em>built</em> & shipped
          </h2>
          <p className="section-sub">
            AI platforms, analytics tools, and hackathon builds — each one solving a
            real constraint, from crop failure to disaster welfare.
          </p>
        </div>

        <div className="filters">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-chip ${filter === tag ? 'is-active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag === 'all' ? 'All projects' : tag}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((p, i) => (
            <article key={p.id} className="project-card" style={{ '--delay': `${i * 60}ms` }}>
              <div className="project-card__top">
                <span className="project-card__index">{String(i + 1).padStart(2, '0')}</span>
                {p.award && (
                  <span className="project-card__award">
                    <IconAward size={13} /> {p.award}
                  </span>
                )}
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__subtitle">{p.subtitle}</p>
              <p className="project-card__desc">{p.description}</p>
              <div className="project-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              {p.link ? (
                <a href={p.link} className="project-card__link" target="_blank" rel="noreferrer">
                  View project <IconArrowUpRight size={14} />
                </a>
              ) : (
                <span className="project-card__link project-card__link--disabled">
                  Case study coming soon
                </span>
              )}
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .filter-chip {
          background: transparent;
          border: 1px solid var(--ink-line);
          color: var(--fog-dim);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s var(--ease);
          font-family: var(--font-mono);
        }
        .filter-chip:hover {
          border-color: var(--fog);
          color: var(--fog);
        }
        .filter-chip.is-active {
          background: var(--amber);
          border-color: var(--amber);
          color: var(--ink);
          font-weight: 600;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 980px) {
          .project-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .project-grid { grid-template-columns: 1fr; }
        }
        .project-card {
          background: var(--ink-soft);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-lg);
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s var(--ease), transform 0.25s var(--ease);
          animation: cardIn 0.5s var(--ease) both;
          animation-delay: var(--delay);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .project-card:hover {
          border-color: var(--teal);
          transform: translateY(-3px);
        }
        .project-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .project-card__index {
          font-family: var(--font-mono);
          color: var(--fog-dim);
          font-size: 13px;
        }
        .project-card__award {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--amber);
          border: 1px solid var(--amber);
          padding: 3px 9px;
          border-radius: 20px;
        }
        .project-card__title {
          font-size: 22px;
          color: var(--paper);
        }
        .project-card__subtitle {
          color: var(--teal-bright);
          font-size: 13px;
          margin-top: 6px;
          font-weight: 500;
        }
        .project-card__desc {
          color: var(--fog-dim);
          font-size: 14px;
          line-height: 1.65;
          margin-top: 14px;
          flex-grow: 1;
        }
        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fog);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ink-line);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .project-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 22px;
          font-size: 13px;
          font-weight: 600;
          color: var(--amber);
        }
        .project-card__link--disabled {
          color: var(--fog-dim);
          font-weight: 400;
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
