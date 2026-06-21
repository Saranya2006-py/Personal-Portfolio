export function LoadingScreen() {
  return (
    <div className="status-screen">
      <div className="status-screen__pulse" />
      <p className="status-screen__text">Loading portfolio data...</p>
      <style>{`
        .status-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          background: var(--ink);
        }
        .status-screen__pulse {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--ink-line);
          border-top-color: var(--amber);
          animation: rotate 0.8s linear infinite;
        }
        .status-screen__text {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--fog-dim);
          letter-spacing: 0.04em;
        }
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function ErrorScreen({ message }) {
  return (
    <div className="status-screen">
      <p className="status-screen__title">Couldn't reach the API</p>
      <p className="status-screen__text">
        {message || 'Something went wrong fetching portfolio data.'}
      </p>
      <p className="status-screen__hint">
        Make sure the backend server is running on port 5000 (see README).
      </p>
      <style>{`
        .status-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--ink);
          padding: 24px;
          text-align: center;
        }
        .status-screen__title {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--paper);
        }
        .status-screen__text {
          font-size: 14px;
          color: var(--fog-dim);
          max-width: 420px;
        }
        .status-screen__hint {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--rose);
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
