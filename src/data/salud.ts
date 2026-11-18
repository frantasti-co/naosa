import { LOGROS_CABEZA } from './salud-cabeza';
import { LOGROS_CUERPO } from './salud-cuerpo';
import type { LogroSalud } from './tipos';

/** Todos los logros de salud, cuerpo y cabeza, ordenados por duración. */
export const LOGROS_SALUD: readonly LogroSalud[] = [...LOGROS_CUERPO, ...LOGROS_CABEZA].sort(
  (a, b) => a.tras - b.tras,
);
