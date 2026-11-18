import { describe, expect, it } from 'vitest';
import { estadoNuevo, leerEstado, reiniciar } from './estado';

describe('leerEstado', () => {
  it('acepta un estado válido', () => {
    const estado = estadoNuevo(new Date('2026-01-01T10:00:00Z'));
    expect(leerEstado(JSON.parse(JSON.stringify(estado)))).toEqual(estado);
  });
  it.each([
    null,
    'texto',
    {},
    { version: 2, inicio: '2026-01-01', mejorRacha: 0 },
    { version: 1, inicio: 'no es fecha', mejorRacha: 0 },
    { version: 1, inicio: '2026-01-01', mejorRacha: -5 },
  ])('rechaza %j', (datos) => {
    expect(leerEstado(datos)).toBeNull();
  });
});

describe('reiniciar', () => {
  it('guarda la racha si es la mejor y empieza de nuevo', () => {
    const estado = estadoNuevo(new Date(0));
    const nuevo = reiniciar(estado, new Date(1000));
    expect(nuevo.inicio).toBe(new Date(1000).toISOString());
    expect(nuevo.mejorRacha).toBe(1000);
  });
  it('no empeora la mejor racha', () => {
    const estado = { ...estadoNuevo(new Date(0)), mejorRacha: 5000 };
    expect(reiniciar(estado, new Date(1000)).mejorRacha).toBe(5000);
  });
});
