import React, { useState, useCallback, useEffect } from 'react';
import Controls from './Controls';
import Output from './Output';
import { generateRandomString } from '../utils/random';
import { estimateStrength } from '../utils/strength';

export default function StringGenerator() {
  // useState: manage length, options, generated string, and messages
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, special: false });
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [history, setHistory] = useState(() => {
    try { const raw = localStorage.getItem('rsg_history'); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  });

  // useCallback: memoize generator to avoid recreation on every render
  const generate = useCallback((l = length, opts = options, pushToHistory = true) => {
    // validation
    if (l < 1 || l > 100) {
      setError('Length must be between 1 and 100.');
      return '';
    }
    if (!opts.upper && !opts.lower && !opts.numbers && !opts.special) {
      setError('Select at least one character type.');
      return '';
    }
    setError('');
    const s = generateRandomString(l, opts);
    setValue(s);
    if (pushToHistory) {
      setHistory((prev) => {
        const next = [s, ...prev.filter((x) => x !== s)].slice(0, 10);
        try { localStorage.setItem('rsg_history', JSON.stringify(next)); } catch (e) {}
        return next;
      });
    }
    return s;
  }, [length, options]);

  // useEffect: regenerate automatically when length or options change
  useEffect(() => {
    // reset success message on changes
    setSuccess('');
    generate(length, options, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  // Toggle option helper
  const toggleOption = useCallback((key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Copy to clipboard helper
  const copyToClipboard = useCallback(async (text = value) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Copied to clipboard');
      setTimeout(() => setSuccess(''), 2000);
    } catch (e) {
      setError('Unable to copy');
    }
  }, [value]);

  // Manual regenerate handler
  const handleRegenerate = useCallback(() => {
    setSuccess('');
    generate();
  }, [generate]);

  const handleExport = useCallback(() => {
    const data = history.length ? history.join('\n') : value;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'random-strings.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [history, value]);

  const strength = estimateStrength(value, options);

  return (
    <div className="card">
      <div className="controls panel">
        <Controls
          length={length}
          setLength={setLength}
          options={options}
          toggleOption={toggleOption}
        />
      </div>

      <div className="panel output card" style={{ marginTop: 12 }}>
        <Output
          value={value}
          onCopy={() => copyToClipboard()}
          onGenerate={handleRegenerate}
          error={error}
          success={success}
          strength={strength}
          history={history}
          onCopyHistory={copyToClipboard}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
