import { dias } from '../core/tiempo';
import type { Medalla } from './tipos';

/** Medallas por tiempo superado. Añadir una es añadir una línea. */
export const MEDALLAS: readonly Medalla[] = [
  { id: 'd1', tras: dias(1), emoji: '🥚', nombre: 'Primer día', lema: 'Cero resacas en las últimas 24 h. Récord personal de hoy.' },
  { id: 'd3', tras: dias(3), emoji: '🐣', nombre: 'Tres días', lema: 'Ya puedes decir "llevo unos días" con la boca pequeña.' },
  { id: 's1', tras: dias(7), emoji: '🌱', nombre: 'Una semana', lema: 'Un fin de semana entero recordado al completo.' },
  { id: 's2', tras: dias(14), emoji: '🌿', nombre: 'Dos semanas', lema: 'Tu hígado ha empezado a mandarte postales.' },
  { id: 'm1', tras: dias(30), emoji: '🥉', nombre: 'Un mes', lema: 'Dry January, pero en el mes que te dio la gana.' },
  { id: 'm2', tras: dias(60), emoji: '🥈', nombre: 'Dos meses', lema: 'Ya tienes opinión formada sobre las cervezas sin alcohol.' },
  { id: 'd100', tras: dias(100), emoji: '💯', nombre: 'Cien días', lema: 'Tres cifras. Como los presidentes con sus primeros cien días, pero tú sí has cumplido.' },
  { id: 'm6', tras: dias(180), emoji: '🥇', nombre: 'Medio año', lema: 'Medio año. Las bodas ya no te dan miedo, solo pereza.' },
  { id: 'a1', tras: dias(365), emoji: '🏆', nombre: 'Un año', lema: 'Una vuelta entera al Sol sin brindis obligatorios.' },
  { id: 'd500', tras: dias(500), emoji: '🚀', nombre: 'Quinientos días', lema: 'Número redondo sin excusa para celebrarlo como antes.' },
  { id: 'a2', tras: dias(730), emoji: '💎', nombre: 'Dos años', lema: 'A estas alturas ya eres "el que no bebe" y nadie insiste.' },
  { id: 'd1000', tras: dias(1000), emoji: '👑', nombre: 'Mil días', lema: 'Mil. Escrito con cuatro cifras. Tómate un zumo.' },
  { id: 'a5', tras: dias(1825), emoji: '🐉', nombre: 'Cinco años', lema: 'Nivel leyenda. Las anécdotas de bar de los demás ya te parecen ficción.' },
];
