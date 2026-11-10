import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OWNER_PROFILE, PROJECTS_DATA, CERTIFICATES_DATA, PERSONA_MODES } from '../data/portfolioData';

export function CommandPalette({
  isOpen,
  onClose,
  onNavigateView,
  onSwitchPersona,
  onOpenProject,
  onOpenCert
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => {
    const base = [
      {
        id: 'nav-overview',
        category: 'Navegación',
        label: 'Ir a Overview (Experiencia Principal)',
        shortcut: 'G O',
        action: () => onNavigateView('overview')
      },
      {
        id: 'nav-projects',
        category: 'Navegación',
        label: 'Abrir Laboratorio de Proyectos & Sandbox',
        shortcut: 'G P',
        action: () => onNavigateView('projects')
      },
      {
        id: 'nav-cv',
        category: 'Navegación',
        label: 'Abrir Curriculum Vitae Interactivo & Imprimible',
        shortcut: 'G C',
        action: () => onNavigateView('cv')
      },
      {
        id: 'nav-vault',
        category: 'Navegación',
        label: 'Abrir Bóveda de 7 Certificados Oficiales (SEPE & Desafío Latam)',
        shortcut: 'G V',
        action: () => onNavigateView('vault')
      },
      {
        id: 'nav-qr',
        category: 'Navegación',
        label: 'Abrir Tarjeta QR & Hub de Contacto',
        shortcut: 'G Q',
        action: () => onNavigateView('qr')
      },
      ...PERSONA_MODES.map((m, idx) => ({
        id: `mode-${m.id}`,
        category: 'Modo Shader / Personalidad',
        label: `Activar ${m.label} (${m.headline})`,
        shortcut: `M ${idx + 1}`,
        action: () => onSwitchPersona(idx)
      })),
      ...PROJECTS_DATA.map((p) => ({
        id: `proj-${p.id}`,
        category: 'Proyectos',
        label: `Inspeccionar Proyecto: ${p.title} (${p.categoryLabel})`,
        shortcut: `P ${p.index}`,
        action: () => onOpenProject(p)
      })),
      ...CERTIFICATES_DATA.map((c) => ({
        id: `cert-${c.id}`,
        category: 'Certificados',
        label: `Ver Diploma: ${c.code} — ${c.title}`,
        shortcut: 'CERT',
        action: () => onOpenCert(c)
      })),
      {
        id: 'act-print',
        category: 'Acción Directa',
        label: 'Imprimir / Guardar CV como PDF (Hoja A4 limpia)',
        shortcut: 'CTRL+P',
        action: () => window.print()
      },
      {
        id: 'act-whatsapp',
        category: 'Contacto',
        label: `Escribir por WhatsApp (${OWNER_PROFILE.phone})`,
        shortcut: 'WA',
        action: () => window.open(OWNER_PROFILE.whatsappUrl, '_blank', 'noopener,noreferrer')
      },
      {
        id: 'act-github',
        category: 'Contacto',
        label: 'Abrir Perfil de GitHub (@ali-ajelandrox)',
        shortcut: 'GH',
        action: () => window.open(OWNER_PROFILE.githubUrl, '_blank', 'noopener,noreferrer')
      }
    ];

    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [query, onNavigateView, onSwitchPersona, onOpenProject, onOpenCert]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (actions.length ? (prev + 1) % actions.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          actions.length ? (prev - 1 + actions.length) % actions.length : 0
        );
      } else if (e.key === 'Enter' && actions[selectedIndex]) {
        e.preventDefault();
        actions[selectedIndex].action();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, actions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="qc-cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de Comandos Rápidos"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="qc-cmd-dialog">
        <div className="qc-cmd-header">
          <span className="qc-cmd-icon">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            className="qc-cmd-input"
            placeholder="Buscar proyectos, certificados SEPE, vistas o cambiar shader..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button type="button" className="qc-cmd-esc" onClick={onClose}>
            ESC
          </button>
        </div>

        <div className="qc-cmd-list" role="listbox">
          {actions.length === 0 ? (
            <div className="qc-cmd-empty">No se encontraron comandos para "{query}".</div>
          ) : (
            actions.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={idx === selectedIndex}
                className={`qc-cmd-item ${idx === selectedIndex ? 'is-selected' : ''}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => {
                  item.action();
                  onClose();
                }}
              >
                <div className="qc-cmd-item-left">
                  <span className="qc-cmd-cat">{item.category}</span>
                  <span className="qc-cmd-label">{item.label}</span>
                </div>
                <kbd className="qc-cmd-kbd">{item.shortcut}</kbd>
              </button>
            ))
          )}
        </div>

        <div className="qc-cmd-footer">
          <span>↑↓ Navegar</span>
          <span>↵ Ejecutar</span>
          <span>ESC Cerrar</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
