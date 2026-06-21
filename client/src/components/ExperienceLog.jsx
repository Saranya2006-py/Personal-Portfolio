const DOT_COLORS = ['#E8A33D', '#3FA796', '#C0625A', '#5BC2AF'];

export default function ExperienceLog({ internships }) {
  if (!internships) return null;

  return (
    <section id="log" className="section log">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Log 02 · Internships</div>
          <h2 className="section-title">
            Nine internships. <em>One</em> running notebook.
          </h2>
          <p className="section-sub">
            Each entry below is a real engagement — dates, company, and what was
            actually shipped or learned, ordered newest first.
          </p>
        </div>

        <div className="log-list">
          {internships.map((job, i) => (
            <div className="log-entry" key={job.id} style={{ '--delay': `${i * 50}ms` }}>
              <div className="log-entry__rail">
                <span
                  className="log-entry__dot"
                  style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                />
                {i < internships.length - 1 && <span className="log-entry__line" />}
              </div>

              <div className="log-entry__body">
                <div className="log-entry__meta">
                  <span className="log-entry__date">{job.duration}</span>
                  <span className="log-entry__mode">{job.mode}</span>
                </div>
                <h3 className="log-entry__role">{job.role}</h3>
                <p className="log-entry__company">{job.company}</p>
                <ul className="log-entry__points">
                  {job.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .log-list {
          display: flex;
          flex-direction: column;
        }
        .log-entry {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 24px;
          animation: cardIn 0.5s var(--ease) both;
          animation-delay: var(--delay);
        }
        .log-entry__rail {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .log-entry__dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
          box-shadow: 0 0 0 4px var(--ink);
        }
        .log-entry__line {
          width: 1px;
          flex-grow: 1;
          background: var(--ink-line);
          margin-top: 4px;
        }
        .log-entry__body {
          padding-bottom: 40px;
        }
        .log-entry__meta {
          display: flex;
          gap: 12px;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 12px;
          margin-bottom: 8px;
        }
        .log-entry__date {
          color: var(--amber);
        }
        .log-entry__mode {
          color: var(--fog-dim);
          border-left: 1px solid var(--ink-line);
          padding-left: 12px;
        }
        .log-entry__role {
          font-size: 21px;
          color: var(--paper);
        }
        .log-entry__company {
          color: var(--teal-bright);
          font-size: 14px;
          margin-top: 5px;
          font-weight: 500;
        }
        .log-entry__points {
          margin: 14px 0 0;
          padding-left: 18px;
          color: var(--fog);
          font-size: 14px;
          line-height: 1.8;
        }
        .log-entry__points li {
          margin-bottom: 4px;
        }
        .log-entry__points li::marker {
          color: var(--fog-dim);
        }
      `}</style>
    </section>
  );
}
