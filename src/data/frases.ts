/*
 * Frases del día. Están en frases.txt, una por línea, para que editarlas sea
 * tan fácil como editar un texto. Reglas de tono en CONTENIDO.md.
 */
import texto from './frases.txt?raw';

export const FRASES: readonly string[] = texto
  .split('\n')
  .map((linea) => linea.trim())
  .filter((linea) => linea !== '');
