import { describe, expect, it } from 'vitest';
import { FRASES } from './frases';
import { MEDALLAS } from './medallas';
import { LOGROS_SALUD } from './salud';

// Red de seguridad para cuando se edita el contenido a mano.
describe('contenido', () => {
  it.each([
    ['logros de salud', LOGROS_SALUD],
    ['medallas', MEDALLAS],
  ])('los ids de %s son únicos', (_, lista) => {
    const ids = lista.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('todo logro de salud tiene una fuente con enlace https', () => {
    for (const logro of LOGROS_SALUD) {
      expect(logro.fuente.nombre).not.toBe('');
      expect(logro.fuente.url).toMatch(/^https:\/\//);
    }
  });

  it('no hay frases vacías ni repetidas', () => {
    expect(FRASES.every((f) => f.trim() !== '')).toBe(true);
    expect(new Set(FRASES).size).toBe(FRASES.length);
  });
});
