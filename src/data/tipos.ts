import type { Hito } from '../core/hitos';

export interface Fuente {
  nombre: string;
  url: string;
}

/** Beneficio para la salud respaldado por una fuente. */
export interface LogroSalud extends Hito {
  titulo: string;
  texto: string;
  fuente: Fuente;
}

/** Medalla puramente simbólica por tiempo superado. */
export interface Medalla extends Hito {
  emoji: string;
  nombre: string;
  /** Una línea con gracia que acompaña a la medalla. */
  lema: string;
}
