import { describe, expect, it } from 'vitest';
import type { Hito } from '../core/hitos';
import { DIA } from '../core/tiempo';
import { FRASES } from './frases';
import { MEDALLAS } from './medallas';
import { LOGROS_SALUD } from './salud';
import { LOGROS_CUERPO } from './salud-cuerpo';

// Red de seguridad para cuando se edita el contenido a mano.

/**
 * Calendario del primer año (ver CONTENIDO.md):
 * una al día la semana 1, como mucho 3 días entre una y otra en la semana 2,
 * 5 en la semana 3 y 7 a partir de ahí, hasta llegar al día 365.
 */
function erroresDeCalendario(hitos: readonly Hito[]): string[] {
  const diasHitos = [...new Set(hitos.map((h) => h.tras / DIA))].sort((a, b) => a - b);
  const errores: string[] = [];

  for (let d = 1; d <= 7; d++) {
    if (!diasHitos.some((x) => x > d - 1 && x <= d)) errores.push(`falta uno el día ${d}`);
  }
  const maxHueco = (dia: number) => (dia < 14 ? 3 : dia < 21 ? 5 : 7);
  for (let i = 0; i < diasHitos.length - 1; i++) {
    const [a, b] = [diasHitos[i], diasHitos[i + 1]];
    if (a >= 7 && a < 365 && b - a > maxHueco(a)) errores.push(`hueco de ${b - a} días tras el día ${a}`);
  }
  if (!diasHitos.some((x) => x >= 365)) errores.push('ninguno llega al día 365');
  return errores;
}

describe('contenido', () => {
  it.each([
    ['logros de salud', LOGROS_SALUD],
    ['medallas', MEDALLAS],
  ])('los ids de %s son únicos', (_, lista) => {
    const ids = lista.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each([
    ['logros de salud', LOGROS_SALUD],
    ['medallas', MEDALLAS],
  ])('los %s cumplen el calendario del primer año', (_, lista) => {
    expect(erroresDeCalendario(lista)).toEqual([]);
  });

  it('todo logro de cuerpo tiene una fuente con enlace https', () => {
    for (const logro of LOGROS_CUERPO) {
      expect(logro.fuente.nombre).not.toBe('');
      expect(logro.fuente.url).toMatch(/^https:\/\//);
    }
  });

  it('hay al menos 365 × 5 frases, sin vacías ni repetidas', () => {
    expect(FRASES.length).toBeGreaterThanOrEqual(365 * 5);
    expect(FRASES.every((f) => f.trim() !== '')).toBe(true);
    expect(new Set(FRASES).size).toBe(FRASES.length);
  });
});

describe('erroresDeCalendario', () => {
  it('detecta huecos y días sin hito', () => {
    const hitos = [1, 2, 3, 4, 5, 6, 7, 12, 365].map((d) => ({ id: String(d), tras: d * DIA }));
    expect(erroresDeCalendario(hitos)).toEqual(['hueco de 5 días tras el día 7', 'hueco de 353 días tras el día 12']);
  });
});
