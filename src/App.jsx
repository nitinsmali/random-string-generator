import React, { useState, useEffect } from 'react';
import StringGenerator from './components/StringGenerator';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('rsg_theme') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('rsg_theme', theme); } catch (e) {}
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header" style={{ width: '100%', maxWidth: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Random String Generator</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      <main className="app-main">
        <StringGenerator />
      </main>
    </div>
  );
}
