import { describe, expect, it } from 'vitest';
import { fraseDelDia } from './frases';

const frases = ['uno', 'dos', 'tres'];

describe('fraseDelDia', () => {
  it('es la misma durante todo el día', () => {
    const manana = new Date(2026, 10, 18, 0, 1);
    const noche = new Date(2026, 10, 18, 23, 59);
    expect(fraseDelDia(frases, manana)).toBe(fraseDelDia(frases, noche));
  });
  it('cambia al día siguiente', () => {
    const hoy = new Date(2026, 10, 18, 12);
    const manana = new Date(2026, 10, 19, 12);
    expect(fraseDelDia(frases, hoy)).not.toBe(fraseDelDia(frases, manana));
  });
  it('no falla con la lista vacía', () => {
    expect(fraseDelDia([], new Date())).toBe('');
  });
});
