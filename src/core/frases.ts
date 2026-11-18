/** Frases que tocan hoy. */

export const FRASES_POR_DIA = 5;

/** Número de día local (cambia a medianoche, no a la hora UTC). */
export function numeroDeDia(fecha: Date): number {
  const local = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  return Math.floor(local / 86_400_000);
}

/**
 * Las frases del día: `cuantas` frases distintas, seguidas en la lista,
 * siempre las mismas durante todo el día. Cada día empieza donde acabó el anterior,
 * así se recorre la lista entera antes de repetir.
 */
export function frasesDelDia(
  frases: readonly string[],
  fecha: Date,
  cuantas = FRASES_POR_DIA,
): string[] {
  const n = Math.min(cuantas, frases.length);
  const inicio = (numeroDeDia(fecha) * cuantas) % Math.max(1, frases.length);
  return Array.from({ length: n }, (_, i) => frases[(inicio + i) % frases.length]);
}
