import React, { useState, useRef, useEffect } from 'react';
import { OWNER_PROFILE, PROJECTS_DATA, CERTIFICATES_DATA } from '../data/portfolioData';

const INITIAL_HISTORY = [
  {
    type: 'sys',
    text: 'QUANTUM TELEMETRY SHELL v2.6.0 // NODE: ALI-ANDRADE-TSU [ONLINE]'
  },
  {
    type: 'sys',
    text: 'Escribe "help" o haz clic en un comando rápido para inspeccionar sistemas, proyectos o certificados SEPE/Desafío Latam.'
  }
];

export function InteractiveTerminal({ onNavigateView, onOpenCert }) {
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [telemetry, setTelemetry] = useState([
    { id: 'prtg-lan', label: 'PRTG // LAN Switch Core', status: 'UP', latency: 2.4, load: 18 },
    { id: 'azure-vm', label: 'AZURE // Linux Node IFCT026PO', status: 'ACTIVE', latency: 11.2, load: 24 },
    { id: 'erp-sync', label: 'DEFONTANA // ERP Sync Service', status: 'SYNCED', latency: 8.6, load: 14 },
    { id: 'sec-audit', label: 'SEPE // Firewall IFCT050PO', status: 'PROTECTED', latency: 1.1, load: 9 }
  ]);
  const outputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          latency: +(sensor.latency + (Math.random() - 0.5) * 0.6).toFixed(1),
          load: Math.max(5, Math.min(48, Math.round(sensor.load + (Math.random() - 0.5) * 4)))
        }))
      );
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const next = [...history, { type: 'cmd', text: `ali@quantum-node:~$ ${rawCmd}` }];

    if (cmd === 'help') {
      next.push({
        type: 'out',
        text: [
          'COMANDOS DISPONIBLES:',
          '  whoami      → Resumen profesional y credenciales de Ali Andrade',
          '  stack       → Arquitectura Front-End, Full-Stack, Cloud & IT',
          '  projects    → Listar los 6 proyectos verificados del repositorio',
          '  certs       → Listar los 7 certificados oficiales (SEPE & Desafío Latam)',
          '  prtg        → Estado de sensores de red y telemetría IT',
          '  contact     → Canales directos (Email, Teléfono, WhatsApp, GitHub)',
          '  clear       → Limpiar consola'
        ].join('\n')
      });
    } else if (cmd === 'whoami') {
      next.push({
        type: 'out',
        text: `${OWNER_PROFILE.fullName} | ${OWNER_PROFILE.rolePrimary} & ${OWNER_PROFILE.roleSecondary}.\nUbicación: ${OWNER_PROFILE.location}.\n+6 años integrando soporte IT, redes PRTG, logística ERP Defontana y desarrollo web moderno.`
      });
    } else if (cmd === 'stack') {
      next.push({
        type: 'out',
        text: [
          '[FRONTEND] HTML5, CSS3, Flexbox/Grid, JavaScript ES6+, React, Angular, Bootstrap 5, GSAP, WebGL',
          '[BACKEND ] Node.js, PHP (IFCT091PO), MySQL, Integración de APIs',
          '[CLOUD/IT] Windows Azure & Linux (IFCT026PO), Seguridad Informática (IFCT050PO), PRTG Network Monitor, ERP Defontana'
        ].join('\n')
      });
    } else if (cmd === 'projects') {
      next.push({
        type: 'out',
        text: PROJECTS_DATA.map(
          (p) => `  [${p.index}] ${p.title} (${p.year}) — ${p.categoryLabel} -> ${p.status}`
        ).join('\n')
      });
    } else if (cmd === 'certs') {
      next.push({
        type: 'out',
        text: CERTIFICATES_DATA.map(
          (c, idx) => `  [${idx + 1}] ${c.code}: ${c.title} (${c.issuer}, ${c.hours})`
        ).join('\n')
      });
    } else if (cmd === 'prtg') {
      next.push({
        type: 'out',
        text: telemetry
          .map((t) => `  ● ${t.label.padEnd(32, ' ')} [${t.status}] Latencia: ${t.latency}ms | Carga: ${t.load}%`)
          .join('\n')
      });
    } else if (cmd === 'contact') {
      next.push({
        type: 'out',
        text: `Email: ${OWNER_PROFILE.emailPrimary} | Tel: ${OWNER_PROFILE.phone}\nGitHub: ${OWNER_PROFILE.githubUrl} | LinkedIn: ${OWNER_PROFILE.linkedinUrl}`
      });
    } else if (cmd === 'clear') {
      setHistory(INITIAL_HISTORY);
      setInputVal('');
      return;
    } else if (cmd.startsWith('open cert')) {
      if (onOpenCert) onOpenCert(CERTIFICATES_DATA[0]);
      next.push({ type: 'out', text: 'Abriendo visor de certificados oficiales...' });
    } else {
      next.push({
        type: 'out',
        text: `Comando no reconocido: "${rawCmd}". Escribe "help" para ver la lista de comandos.`
      });
    }

    setHistory(next);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div className="qc-terminal-grid">
      <div className="qc-terminal-card">
        <div className="qc-terminal-header">
          <div className="qc-terminal-dots" aria-hidden="true">
            <span className="qc-dot red" />
            <span className="qc-dot amber" />
            <span className="qc-dot green" />
          </div>
          <span className="qc-terminal-title">ali@quantum-node:~ (Interactive CLI)</span>
          <span className="qc-terminal-badge">BASH // ZSH</span>
        </div>

        <div className="qc-terminal-chips" role="toolbar" aria-label="Comandos rápidos de terminal">
          {['whoami', 'stack', 'projects', 'certs', 'prtg', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="qc-term-chip"
              onClick={() => runCommand(cmd)}
              data-cursor="EXEC"
            >
              $ {cmd}
            </button>
          ))}
        </div>

        <div ref={outputRef} className="qc-terminal-body" role="log" aria-live="polite">
          {history.map((item, idx) => (
            <div key={idx} className={`qc-term-line ${item.type}`}>
              {item.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="qc-terminal-form">
          <label htmlFor="qc-cli-input" className="qc-term-prompt">
            ali@quantum-node:~$
          </label>
          <input
            id="qc-cli-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escribe un comando (ej. help, stack, certs)..."
            className="qc-term-input"
            autoComplete="off"
          />
          <button type="submit" className="qc-term-exec-btn">
            RUN
          </button>
        </form>
      </div>

      <div className="qc-telemetry-card">
        <div className="qc-telemetry-top">
          <span className="qc-telemetry-code">SYS.MONITOR // PRTG & CLOUD</span>
          <span className="qc-telemetry-live">
            <span className="qc-live-dot" /> TELEMETRÍA ACTIVA
          </span>
        </div>
        <h3 className="qc-telemetry-heading">Infraestructura & Operaciones IT</h3>
        <p className="qc-telemetry-desc">
          Panel inspirado en la experiencia real de Ali administrando redes con PRTG Network Monitor,
          entornos Windows Azure / Linux y sistemas ERP Defontana.
        </p>

        <div className="qc-telemetry-list">
          {telemetry.map((sensor) => (
            <div key={sensor.id} className="qc-sensor-row">
              <div className="qc-sensor-info">
                <span className="qc-sensor-name">{sensor.label}</span>
                <span className="qc-sensor-status">{sensor.status}</span>
              </div>
              <div className="qc-sensor-bar-wrap">
                <div
                  className="qc-sensor-bar"
                  style={{ width: `${Math.min(100, sensor.load * 2)}%` }}
                />
              </div>
              <div className="qc-sensor-metric">
                <span>{sensor.latency} ms</span>
                <span>{sensor.load}% CPU</span>
              </div>
            </div>
          ))}
        </div>

        <div className="qc-telemetry-foot">
          <button
            type="button"
            className="qc-btn qc-btn-secondary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => onNavigateView && onNavigateView('cv')}
          >
            Ver Trayectoria IT & CV Completo →
          </button>
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminal;
