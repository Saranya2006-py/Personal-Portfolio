import { useState } from 'react';
import { submitContactMessage } from '../hooks/usePortfolioData';
import { IconMail, IconPhone, IconPin, IconGithub, IconLinkedin, IconSend, IconLoader } from './Icons';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!profile) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await submitContactMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="eyebrow">Field 04 · Contact</div>
            <h2 className="section-title">
              Let's build something <em>data-driven</em>
            </h2>
            <p className="section-sub">
              Open to internships, research collaborations, and AI/data projects.
              Reach out directly or send a message — it lands straight in my inbox.
            </p>

            <div className="contact-links">
              <a href={`mailto:${profile.email}`} className="contact-link">
                <IconMail /> {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-link">
                <IconPhone /> {profile.phone}
              </a>
              <span className="contact-link contact-link--static">
                <IconPin /> {profile.location}
              </span>
            </div>

            <div className="social-row">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconLinkedin />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <IconGithub />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Tell me about the opportunity or project..."
              />
            </div>

            <button type="submit" className="btn btn--primary form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>
                  <IconLoader size={15} /> Sending...
                </>
              ) : (
                <>
                  Send message <IconSend size={15} />
                </>
              )}
            </button>

            {status === 'sent' && (
              <p className="form-feedback form-feedback--success">
                Message received — thanks for reaching out! I'll reply soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Express.</span>
        </div>
      </footer>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        @media (max-width: 880px) {
          .contact-grid { grid-template-columns: 1fr; gap: 44px; }
        }
        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 36px;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--paper);
          font-size: 15px;
          transition: color 0.2s var(--ease);
        }
        .contact-link svg { color: var(--amber); flex-shrink: 0; }
        .contact-link:hover { color: var(--amber-bright); }
        .contact-link--static { color: var(--fog); }
        .contact-link--static svg { color: var(--teal-bright); }
        .social-row {
          display: flex;
          gap: 14px;
          margin-top: 32px;
        }
        .social-row a {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--ink-line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fog);
          transition: all 0.2s var(--ease);
        }
        .social-row a:hover {
          border-color: var(--amber);
          color: var(--amber);
          transform: translateY(-2px);
        }
        .contact-form {
          background: var(--ink-soft);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-lg);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-row label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--fog-dim);
          letter-spacing: 0.04em;
        }
        .form-row input, .form-row textarea {
          background: var(--ink);
          border: 1px solid var(--ink-line);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          color: var(--paper);
          font-size: 14px;
          font-family: var(--font-body);
          resize: vertical;
          transition: border-color 0.2s var(--ease);
        }
        .form-row input:focus, .form-row textarea:focus {
          border-color: var(--amber);
          outline: none;
        }
        .form-submit {
          justify-content: center;
          border: none;
          cursor: pointer;
          margin-top: 6px;
        }
        .form-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-feedback {
          font-size: 13px;
          text-align: center;
          margin: 0;
        }
        .form-feedback--success { color: var(--teal-bright); }
        .form-feedback--error { color: var(--rose); }
        .spin {
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .footer {
          border-top: 1px solid var(--ink-line);
          margin-top: 90px;
          padding: 28px 0;
        }
        .footer__inner {
          font-size: 13px;
          color: var(--fog-dim);
          text-align: center;
        }
      `}</style>
    </section>
  );
}
