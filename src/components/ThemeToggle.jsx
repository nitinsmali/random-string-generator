import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button
        className="btn"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}
