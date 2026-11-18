/**
 * Lógica de hitos: sirve igual para logros de salud y para medallas,
 * porque ambos son "algo que se desbloquea tras X tiempo".
 */

export interface Hito {
  id: string;
  /** Milisegundos sin beber necesarios para desbloquearlo. */
  tras: number;
}

export interface HitoPendiente<T extends Hito> {
  hito: T;
  /** Fracción completada, de 0 a 1. */
  progreso: number;
  /** Milisegundos que faltan. */
  falta: number;
}

const porDuracion = <T extends Hito>(a: T, b: T) => a.tras - b.tras;

/** Hitos ya conseguidos, del más reciente al más antiguo. */
export function alcanzados<T extends Hito>(hitos: readonly T[], ms: number): T[] {
  return hitos.filter((h) => ms >= h.tras).sort(porDuracion).reverse();
}

/**
 * Próximos hitos por conseguir, del más cercano al más lejano.
 * El progreso se mide desde el hito anterior (o desde cero), así la barra
 * del siguiente logro no se queda eternamente al 1 %.
 */
export function proximos<T extends Hito>(
  hitos: readonly T[],
  ms: number,
  cuantos = 3,
): HitoPendiente<T>[] {
  const ordenados = [...hitos].sort(porDuracion);
  const anterior = ordenados.filter((h) => ms >= h.tras).at(-1)?.tras ?? 0;

  return ordenados
    .filter((h) => ms < h.tras)
    .slice(0, cuantos)
    .map((hito) => ({
      hito,
      progreso: (ms - anterior) / (hito.tras - anterior),
      falta: hito.tras - ms,
    }));
}
