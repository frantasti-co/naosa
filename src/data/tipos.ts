import type { Hito } from '../core/hitos';

export interface Fuente {
  nombre: string;
  url: string;
}

/** "cuerpo": salud física, siempre con fuente. "cabeza": salud mental, con humor y sin fechas estrictas. */
export type Categoria = 'cuerpo' | 'cabeza';

export interface LogroSalud extends Hito {
  categoria: Categoria;
  titulo: string;
  texto: string;
  fuente?: Fuente;
}

/** Logro de salud física: la fuente es obligatoria. */
export interface LogroCuerpo extends LogroSalud {
  categoria: 'cuerpo';
  fuente: Fuente;
}

/** Medalla puramente simbólica por tiempo superado. */
export interface Medalla extends Hito {
  emoji: string;
  nombre: string;
  /** Una línea con gracia que acompaña a la medalla. */
  lema: string;
}
