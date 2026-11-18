import { describe, expect, it } from 'vitest';
import { desglosar, describirDuracion, dias, horas, transcurrido } from './tiempo';

describe('transcurrido', () => {
  it('devuelve la diferencia en ms', () => {
    expect(transcurrido(new Date(0), new Date(5000))).toBe(5000);
  });
  it('nunca es negativo si el inicio está en el futuro', () => {
    expect(transcurrido(new Date(5000), new Date(0))).toBe(0);
  });
});

describe('desglosar', () => {
  it('separa días, horas, minutos y segundos', () => {
    const ms = dias(2) + horas(3) + 4 * 60_000 + 5_000 + 999;
    expect(desglosar(ms)).toEqual({ dias: 2, horas: 3, minutos: 4, segundos: 5 });
  });
});

describe('describirDuracion', () => {
  it.each([
    [horas(12), '12 horas'],
    [dias(1), '1 día'],
    [dias(3), '3 días'],
    [dias(7), '1 semana'],
    [dias(14), '2 semanas'],
    [dias(30), '1 mes'],
    [dias(90), '3 meses'],
    [dias(100), '100 días'],
    [dias(365), '1 año'],
    [dias(730), '2 años'],
    [dias(1000), '1000 días'],
  ])('%i ms → %s', (ms, texto) => {
    expect(describirDuracion(ms)).toBe(texto);
  });
});
