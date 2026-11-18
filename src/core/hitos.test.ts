import { describe, expect, it } from 'vitest';
import { alcanzados, proximos } from './hitos';

const hitos = [
  { id: 'c', tras: 300 },
  { id: 'a', tras: 100 },
  { id: 'b', tras: 200 },
];

describe('alcanzados', () => {
  it('devuelve los conseguidos, el más reciente primero', () => {
    expect(alcanzados(hitos, 250).map((h) => h.id)).toEqual(['b', 'a']);
  });
  it('incluye un hito justo en su límite', () => {
    expect(alcanzados(hitos, 100).map((h) => h.id)).toEqual(['a']);
  });
});

describe('proximos', () => {
  it('ordena por cercanía y limita la cantidad', () => {
    expect(proximos(hitos, 0, 2).map((p) => p.hito.id)).toEqual(['a', 'b']);
  });
  it('mide el progreso desde el último hito conseguido', () => {
    const [siguiente] = proximos(hitos, 150);
    expect(siguiente.hito.id).toBe('b');
    expect(siguiente.progreso).toBeCloseTo(0.5);
    expect(siguiente.falta).toBe(50);
  });
  it('está vacío cuando ya se ha conseguido todo', () => {
    expect(proximos(hitos, 1000)).toEqual([]);
  });
});
