/** Elige la frase del día: cambia cada día y es la misma durante todo el día. */
export function fraseDelDia(frases: readonly string[], fecha: Date): string {
  if (frases.length === 0) return '';
  // Días desde 1970 en hora local, para que cambie a medianoche y no a la 01:00.
  const local = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  const dia = Math.floor(local / 86_400_000);
  return frases[dia % frases.length];
}
