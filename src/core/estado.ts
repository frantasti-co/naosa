/**
 * Estado persistente de la app y su validación.
 * Si algún día cambia el formato, sube VERSION y añade la migración en `leerEstado`.
 */

export const VERSION = 1;

export interface Estado {
  version: typeof VERSION;
  /** Fecha y hora de inicio de la racha actual, en ISO 8601. */
  inicio: string;
  /** Racha más larga terminada, en milisegundos. */
  mejorRacha: number;
}

export function estadoNuevo(inicio: Date): Estado {
  return { version: VERSION, inicio: inicio.toISOString(), mejorRacha: 0 };
}

/** Valida datos de origen desconocido (localStorage o un archivo importado). */
export function leerEstado(datos: unknown): Estado | null {
  if (typeof datos !== 'object' || datos === null) return null;
  const { version, inicio, mejorRacha } = datos as Record<string, unknown>;

  if (version !== VERSION) return null;
  if (typeof inicio !== 'string' || Number.isNaN(Date.parse(inicio))) return null;
  if (typeof mejorRacha !== 'number' || !Number.isFinite(mejorRacha) || mejorRacha < 0) {
    return null;
  }
  return { version, inicio, mejorRacha };
}

/** Termina la racha actual (recaída) y empieza otra en `ahora`. */
export function reiniciar(estado: Estado, ahora: Date): Estado {
  const racha = Math.max(0, ahora.getTime() - Date.parse(estado.inicio));
  return {
    ...estado,
    inicio: ahora.toISOString(),
    mejorRacha: Math.max(estado.mejorRacha, racha),
  };
}
