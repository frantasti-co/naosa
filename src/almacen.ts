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

/**
 * Guarda el estado como archivo JSON (copia de seguridad).
 * En el navegador lo descarga; en el APK (Android no deja descargar desde la app)
 * lo escribe en caché y abre el menú de compartir para guardarlo donde se quiera.
 */
export async function exportar(estado: Estado): Promise<void> {
  const texto = JSON.stringify(estado, null, 2);
  const nombre = `naosa-${new Date().toISOString().slice(0, 10)}.json`;
  const { Capacitor } = await import('@capacitor/core');
  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory, Encoding } = await import('@capacitor/filesystem');
    const { Share } = await import('@capacitor/share');
    const { uri } = await Filesystem.writeFile({
      path: nombre,
      data: texto,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
    });
    await Share.share({ title: 'Copia de seguridad de NAOSA', files: [uri] });
    return;
  }
  const blob = new Blob([texto], { type: 'application/json' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombre;
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
