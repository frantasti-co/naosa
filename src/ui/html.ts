/**
 * Plantillas HTML con escapado automático.
 * Todo lo que se interpola se escapa, salvo otro fragmento creado con `html`.
 */

class Html {
  constructor(readonly texto: string) {}
  toString(): string {
    return this.texto;
  }
}

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function aTexto(valor: unknown): string {
  if (valor instanceof Html) return valor.texto;
  if (Array.isArray(valor)) return valor.map(aTexto).join('');
  if (valor === null || valor === undefined || valor === false) return '';
  return String(valor).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

export function html(partes: TemplateStringsArray, ...valores: unknown[]): Html {
  return new Html(partes.reduce((acc, parte, i) => acc + aTexto(valores[i - 1]) + parte));
}

export type { Html };
