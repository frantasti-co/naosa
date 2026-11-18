/** Utilidades de tiempo. Todo trabaja en milisegundos para evitar sorpresas. */

export const SEGUNDO = 1000;
export const MINUTO = 60 * SEGUNDO;
export const HORA = 60 * MINUTO;
export const DIA = 24 * HORA;

export const horas = (n: number): number => n * HORA;
export const dias = (n: number): number => n * DIA;

export interface Desglose {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

/** Milisegundos transcurridos desde `inicio` hasta `ahora` (nunca negativo). */
export function transcurrido(inicio: Date, ahora: Date): number {
  return Math.max(0, ahora.getTime() - inicio.getTime());
}

/** Descompone una duración en días, horas, minutos y segundos. */
export function desglosar(ms: number): Desglose {
  const total = Math.floor(Math.max(0, ms) / SEGUNDO);
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
  };
}

/** Texto corto y legible para una duración: "3 días", "1 año", "12 horas". */
export function describirDuracion(ms: number): string {
  const d = Math.floor(ms / DIA);
  if (d >= 365 && d % 365 === 0) return plural(d / 365, 'año', 'años');
  if (d >= 30 && d % 30 === 0 && d < 365) return plural(d / 30, 'mes', 'meses');
  if (d >= 7 && d % 7 === 0 && d < 30) return plural(d / 7, 'semana', 'semanas');
  if (d >= 1) return plural(d, 'día', 'días');
  return plural(Math.floor(ms / HORA), 'hora', 'horas');
}

function plural(n: number, uno: string, varios: string): string {
  return `${n} ${n === 1 ? uno : varios}`;
}
