import { describe, expect, it } from 'vitest';
import { frasesDelDia } from './frases';

const frases = Array.from({ length: 12 }, (_, i) => `frase ${i}`);

describe('frasesDelDia', () => {
  it('da 5 frases distintas', () => {
    const hoy = frasesDelDia(frases, new Date(2026, 10, 18, 12));
    expect(hoy).toHaveLength(5);
    expect(new Set(hoy).size).toBe(5);
  });
  it('son las mismas durante todo el día', () => {
    const manana = new Date(2026, 10, 18, 0, 1);
    const noche = new Date(2026, 10, 18, 23, 59);
    expect(frasesDelDia(frases, manana)).toEqual(frasesDelDia(frases, noche));
  });
  it('el día siguiente empieza donde acabó el anterior', () => {
    const hoy = frasesDelDia(frases, new Date(2026, 10, 18, 12));
    const manana = frasesDelDia(frases, new Date(2026, 10, 19, 12));
    const siguiente = (frases.indexOf(hoy[4]) + 1) % frases.length;
    expect(manana[0]).toBe(frases[siguiente]);
  });
  it('con menos frases que las pedidas, devuelve las que hay', () => {
    expect(frasesDelDia(['a', 'b'], new Date())).toHaveLength(2);
  });
  it('no falla con la lista vacía', () => {
    expect(frasesDelDia([], new Date())).toEqual([]);
  });
});
