import React from 'react';

export default function Controls({ length, setLength, options, toggleOption }) {
  const onLengthChange = (e) => {
    const v = Number(e.target.value);
    if (Number.isNaN(v)) return;
    const clamped = Math.max(1, Math.min(100, v));
    setLength(clamped);
  };

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div className="label">Length</div>
          <div className="muted">{length}</div>
        </div>

        <div className="length-control">
          <input
            type="range"
            min={1}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="slider"
            aria-label="String length"
          />
          <input
            type="number"
            min={1}
            max={100}
            value={length}
            onChange={onLengthChange}
            style={{ width: 72, padding: 6, borderRadius: 6, border: '1px solid #e6e7ee' }}
            aria-label="String length number"
          />
        </div>

        <div style={{ marginTop: 12 }} className="label">Characters</div>
        <div className="checkboxes" style={{ marginTop: 8 }}>
          <label>
            <input type="checkbox" checked={options.upper} onChange={() => toggleOption('upper')} /> Uppercase
          </label>
          <label>
            <input type="checkbox" checked={options.lower} onChange={() => toggleOption('lower')} /> Lowercase
          </label>
          <label>
            <input type="checkbox" checked={options.numbers} onChange={() => toggleOption('numbers')} /> Numbers
          </label>
          <label>
            <input type="checkbox" checked={options.special} onChange={() => toggleOption('special')} /> Special
          </label>
        </div>
      </div>
    </div>
  );
}
