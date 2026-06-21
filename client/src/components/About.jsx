import { IconAward, IconCheck } from './Icons';

export default function About({ summary, skills, education, achievements, research, certifications }) {
  if (!skills) return null;

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Notebook 03 · About</div>
          <h2 className="section-title">
            The <em>skills</em> behind the work
          </h2>
          <p className="section-sub">{summary}</p>
        </div>

        <div className="about-grid">
          <div className="skills-panel">
            <h3 className="panel-title">Technical skills</h3>
            <div className="skills-groups">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group} className="skill-group">
                  <div className="skill-group__label">{group}</div>
                  <div className="skill-group__items">
                    {items.map((item) => (
                      <span key={item} className="skill-pill">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="side-panels">
            <div className="card-panel">
              <h3 className="panel-title">Education</h3>
              {education?.map((e) => (
                <div key={e.id} className="edu-row">
                  <div>
                    <p className="edu-row__degree">{e.degree}</p>
                    <p className="edu-row__inst">{e.institution}</p>
                  </div>
                  <div className="edu-row__right">
                    {e.duration && <span className="edu-row__dur">{e.duration}</span>}
                    <span className="edu-row__detail">{e.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-panel">
              <h3 className="panel-title">Certifications</h3>
              <ul className="check-list">
                {certifications?.map((c) => (
                  <li key={c}>
                    <IconCheck size={13} /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="achievements-strip">
          <h3 className="panel-title">Achievements & recognition</h3>
          <div className="achievement-grid">
            {achievements?.map((a, i) => (
              <div key={i} className="achievement-item">
                <IconAward size={16} />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {research?.length > 0 && (
          <div className="research-strip">
            <h3 className="panel-title">Research & publications</h3>
            <div className="research-grid">
              {research.map((r) => (
                <div key={r.title} className="research-item">
                  <p className="research-item__title">"{r.title}"</p>
                  <p className="research-item__detail">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .panel-title {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fog-dim);
          margin-bottom: 22px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          margin-bottom: 56px;
        }
        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr; }
        }
        .skills-panel, .card-panel {
          background: var(--ink-soft);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-lg);
          padding: 30px 28px;
        }
        .side-panels {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .skills-groups {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .skill-group__label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--teal-bright);
          margin-bottom: 10px;
          letter-spacing: 0.04em;
        }
        .skill-group__items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-pill {
          font-size: 13px;
          color: var(--paper);
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--ink-line);
          padding: 6px 13px;
          border-radius: 20px;
        }
        .edu-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid var(--ink-line);
        }
        .edu-row:last-child { border-bottom: none; padding-bottom: 0; }
        .edu-row:first-of-type { padding-top: 0; }
        .edu-row__degree {
          font-size: 14px;
          color: var(--paper);
          font-weight: 600;
        }
        .edu-row__inst {
          font-size: 13px;
          color: var(--fog-dim);
          margin-top: 4px;
        }
        .edu-row__right {
          text-align: right;
          flex-shrink: 0;
        }
        .edu-row__dur {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--fog-dim);
        }
        .edu-row__detail {
          display: block;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--amber);
          margin-top: 3px;
        }
        .check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .check-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--fog);
          line-height: 1.5;
        }
        .check-list li svg {
          color: var(--teal-bright);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .achievements-strip, .research-strip {
          background: var(--ink-soft);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-lg);
          padding: 30px 28px;
          margin-bottom: 24px;
        }
        .achievement-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 680px) {
          .achievement-grid { grid-template-columns: 1fr; }
        }
        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: var(--fog);
          line-height: 1.5;
        }
        .achievement-item svg {
          color: var(--amber);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .research-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (max-width: 680px) {
          .research-grid { grid-template-columns: 1fr; }
        }
        .research-item {
          border-left: 2px solid var(--teal);
          padding-left: 16px;
        }
        .research-item__title {
          font-size: 14px;
          color: var(--paper);
          font-style: italic;
          line-height: 1.5;
        }
        .research-item__detail {
          font-size: 12.5px;
          color: var(--fog-dim);
          margin-top: 6px;
        }
      `}</style>
    </section>
  );
}
