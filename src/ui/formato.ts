import { desglosar } from '../core/tiempo';

/** "3 d 4 h", "5 h 20 min", "12 min". Para lo que falta hasta un hito. */
export function formatoFalta(ms: number): string {
  const { dias, horas, minutos } = desglosar(ms);
  if (dias > 0) return `${dias} d ${horas} h`;
  if (horas > 0) return `${horas} h ${minutos} min`;
  return `${Math.max(1, minutos)} min`;
}

/** Valor para un <input type="datetime-local"> en hora local. */
export function aInputLocal(fecha: Date): string {
  const desfase = fecha.getTimezoneOffset() * 60_000;
  return new Date(fecha.getTime() - desfase).toISOString().slice(0, 16);
}

export const fechaLarga = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeStyle: 'short',
});

export const dos = (n: number): string => String(n).padStart(2, '0');
