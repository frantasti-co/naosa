/** Persistencia en localStorage. Es la única parte que toca el almacenamiento. */
import { leerEstado, type Estado } from './core/estado';

const CLAVE = 'naosa:estado';

export function cargar(): Estado | null {
  try {
    const texto = localStorage.getItem(CLAVE);
    return texto ? leerEstado(JSON.parse(texto)) : null;
  } catch {
    return null;
  }
}

export function guardar(estado: Estado): void {
  localStorage.setItem(CLAVE, JSON.stringify(estado));
}

export function borrar(): void {
  localStorage.removeItem(CLAVE);
}

/** Descarga el estado como archivo JSON (copia de seguridad). */
export function exportar(estado: Estado): void {
  const blob = new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = `naosa-${new Date().toISOString().slice(0, 10)}.json`;
  enlace.click();
  URL.revokeObjectURL(enlace.href);
}

/** Lee una copia de seguridad. Devuelve null si el archivo no es válido. */
export async function importar(archivo: File): Promise<Estado | null> {
  try {
    return leerEstado(JSON.parse(await archivo.text()));
  } catch {
    return null;
  }
}
