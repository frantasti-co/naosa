import { dias } from '../core/tiempo';
import type { Medalla } from './tipos';

/**
 * Medallas por tiempo superado. La app está pensada para el primer año, así que
 * casi todas caen antes del día 365; las de después son un extra.
 * Añadir una es añadir una línea, en orden de duración.
 */
export const MEDALLAS: readonly Medalla[] = [
  { id: 'd1', tras: dias(1), emoji: '🥚', nombre: 'Primer día', lema: 'Cero resacas en las últimas 24 h. Récord personal de hoy.' },
  { id: 'd2', tras: dias(2), emoji: '🧦', nombre: 'Dos días', lema: 'Ya llevas más que tu propósito de ir al gimnasio de 2019.' },
  { id: 'd3', tras: dias(3), emoji: '🐣', nombre: 'Tres días', lema: 'Ya puedes decir "llevo unos días" con la boca pequeña.' },
  { id: 'd5', tras: dias(5), emoji: '🖐️', nombre: 'Cinco días', lema: 'Una semana laboral entera. Sin el viernes de cañas, pero entera.' },
  { id: 's1', tras: dias(7), emoji: '🌱', nombre: 'Una semana', lema: 'Un fin de semana entero recordado al completo.' },
  { id: 'd10', tras: dias(10), emoji: '🔟', nombre: 'Diez días', lema: 'Dos cifras. A partir de aquí los números empiezan a impresionar.' },
  { id: 's2', tras: dias(14), emoji: '🌿', nombre: 'Dos semanas', lema: 'Tu hígado ha empezado a mandarte postales.' },
  { id: 's3', tras: dias(21), emoji: '🧠', nombre: 'Tres semanas', lema: 'Dicen que en 21 días se crea un hábito. Dicen muchas cosas, pero esta te viene bien.' },
  { id: 'm1', tras: dias(30), emoji: '🥉', nombre: 'Un mes', lema: 'Dry January, pero en el mes que te dio la gana.' },
  { id: 'd45', tras: dias(45), emoji: '🎳', nombre: 'Mes y medio', lema: 'Has sobrevivido a al menos un cumpleaños ajeno. Héroe silencioso.' },
  { id: 'm2', tras: dias(60), emoji: '🥈', nombre: 'Dos meses', lema: 'Ya tienes opinión formada sobre las cervezas sin alcohol.' },
  { id: 'd75', tras: dias(75), emoji: '🧃', nombre: 'Setenta y cinco días', lema: 'Tu camarero de confianza ya te pone el mosto sin preguntar.' },
  { id: 'm3', tras: dias(90), emoji: '🍂', nombre: 'Tres meses', lema: 'Una estación entera. Ha cambiado el tiempo y tú sigues en ello.' },
  { id: 'd100', tras: dias(100), emoji: '💯', nombre: 'Cien días', lema: 'Tres cifras. Como los primeros cien días de un gobierno, pero tú sí has cumplido.' },
  { id: 'm4', tras: dias(120), emoji: '🛼', nombre: 'Cuatro meses', lema: 'Un tercio de año. Las fracciones también cuentan.' },
  { id: 'm5', tras: dias(150), emoji: '🪴', nombre: 'Cinco meses', lema: 'Ya hay planta en casa que lleva menos tiempo viva que tu racha.' },
  { id: 'm6', tras: dias(180), emoji: '🥇', nombre: 'Medio año', lema: 'Medio año. Las bodas ya no te dan miedo, solo pereza.' },
  { id: 'd200', tras: dias(200), emoji: '🎯', nombre: 'Doscientos días', lema: 'Doscientas mañanas sin buscar ibuprofeno a tientas.' },
  { id: 'm8', tras: dias(240), emoji: '🎱', nombre: 'Ocho meses', lema: 'Ocho meses. Hay series que no han aguantado tanto en antena.' },
  { id: 'm9', tras: dias(270), emoji: '🐘', nombre: 'Nueve meses', lema: 'Lo que dura un embarazo. Lo que has gestado es una racha de narices.' },
  { id: 'd300', tras: dias(300), emoji: '🏔️', nombre: 'Trescientos días', lema: 'Desde aquí arriba ya se ve el año completo.' },
  { id: 'm11', tras: dias(330), emoji: '🎆', nombre: 'Once meses', lema: 'Último mes. Ve pensando cómo celebrarlo sin brindar.' },
  { id: 'a1', tras: dias(365), emoji: '🏆', nombre: 'Un año', lema: 'Una vuelta entera al Sol sin brindis obligatorios. Misión cumplida.' },
  { id: 'd500', tras: dias(500), emoji: '🚀', nombre: 'Quinientos días', lema: 'Extra: ya juegas fuera del mapa.' },
  { id: 'a2', tras: dias(730), emoji: '💎', nombre: 'Dos años', lema: 'Extra: a estas alturas ya eres "el que no bebe" y nadie insiste.' },
];
