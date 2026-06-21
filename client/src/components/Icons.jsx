// Minimal hand-drawn icon set — kept dependency-free (avoids React 19 / icon-lib peer conflicts).
// Each icon accepts standard SVG props (size via `size`, color inherited via currentColor).

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

export function IconMail({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function IconPhone({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function IconPin({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function IconGithub({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} fill="currentColor" stroke="none" viewBox="0 0 24 24" width={size} height={size} {...rest}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.74.39-1.25.71-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.85 1.18 3.11 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export function IconLinkedin({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} fill="currentColor" stroke="none" viewBox="0 0 24 24" width={size} height={size} {...rest}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function IconArrowUpRight({ size = 16, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function IconChevronDown({ size = 18, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconMenu({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function IconClose({ size = 22, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function IconAward({ size = 16, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="8" r="5.5" />
      <path d="M8.5 13 7 21l5-2.4L17 21l-1.5-8" />
    </svg>
  );
}

export function IconCheck({ size = 14, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconSend({ size = 16, ...rest }) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9 22 2z" />
    </svg>
  );
}

export function IconLoader({ size = 16, ...rest }) {
  return (
    <svg {...base(size)} {...rest} className="spin">
      <path d="M12 2v4" />
      <path d="M12 18v4" opacity="0.3" />
      <path d="M4.9 4.9l2.8 2.8" opacity="0.6" />
      <path d="M16.3 16.3l2.8 2.8" opacity="0.3" />
      <path d="M2 12h4" opacity="0.4" />
      <path d="M18 12h4" opacity="0.7" />
      <path d="M4.9 19.1l2.8-2.8" opacity="0.5" />
      <path d="M16.3 7.7l2.8-2.8" opacity="0.8" />
    </svg>
  );
}
