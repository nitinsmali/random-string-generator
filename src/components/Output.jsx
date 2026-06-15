import React from 'react';

export default function Output({ value, onCopy, onGenerate, error, success, strength, history, onCopyHistory, onExport }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="label">Generated</div>
        <div className="muted">{value.length} chars</div>
      </div>

      <div className="generated" role="textbox" aria-readonly>
        {value || <span className="muted">-- No string generated --</span>}
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div className="label">Strength: <span className="muted">{strength.label}</span></div>
            <div className="strength" aria-hidden style={{ marginTop: 6 }}>
              <div className="strength-bar" style={{ width: `${strength.score}%` }} />
            </div>
          </div>
          <div style={{ marginLeft: 12 }}>
            <button className="btn" onClick={onCopy} disabled={!value}>Copy</button>
            <button className="btn secondary" onClick={onGenerate} style={{ marginLeft: 8 }}>Generate</button>
          </div>
        </div>
      </div>

      <div className="buttons" style={{ marginTop: 12 }}>
        <button className="btn secondary" onClick={onExport}>Export</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="label">Recent</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          {history.length === 0 && <div className="muted">No recent strings</div>}
          {history.map((h, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: 'monospace', wordBreak: 'break-all', flex: 1 }}>{h}</div>
              <div style={{ marginLeft: 8 }}>
                <button className="btn" onClick={() => onCopyHistory(h)}>Copy</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="feedback" style={{ marginTop: 8 }}>
        {error && <div style={{ color: '#dc2626' }}>{error}</div>}
        {success && <div style={{ color: '#059669' }}>{success}</div>}
      </div>
    </div>
  );
}
