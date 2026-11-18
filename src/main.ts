/**
 * Punto de entrada: decide qué vista pintar y atiende los eventos.
 * El estado vive en localStorage (ver almacen.ts) y se relee en cada acción.
 */
import './ui/estilos.css';
import * as almacen from './almacen';
import { estadoNuevo, reiniciar, type Estado } from './core/estado';
import { FRASES_POR_DIA, numeroDeDia } from './core/frases';
import * as vistas from './ui/vistas';
import { RUTAS, type Ruta } from './ui/vistas';

const app = document.querySelector<HTMLElement>('#app')!;
const nav = document.querySelector<HTMLElement>('#nav')!;

/** Qué frase del día se está enseñando. Vuelve a la primera al cambiar de día. */
const frase = { dia: numeroDeDia(new Date()), indice: 0 };

function fraseActual(ahora: Date): number {
  const hoy = numeroDeDia(ahora);
  if (hoy !== frase.dia) Object.assign(frase, { dia: hoy, indice: 0 });
  return frase.indice;
}

function rutaActual(): Ruta {
  const ruta = location.hash.replace('#/', '');
  return RUTAS.some((r) => r.ruta === ruta) ? (ruta as Ruta) : 'inicio';
}

function pintar(): void {
  const estado = almacen.cargar();
  const ahora = new Date();
  nav.hidden = !estado;

  if (!estado) {
    app.innerHTML = vistas.bienvenida(ahora).texto;
    return;
  }
  const ruta = rutaActual();
  nav.innerHTML = vistas.navegacion(ruta).texto;
  app.innerHTML =
    ruta === 'inicio'
      ? vistas.inicio(estado, ahora, fraseActual(ahora)).texto
      : vistas[ruta](estado, ahora).texto;
}

function actualizar(cambio: (estado: Estado) => Estado): void {
  const estado = almacen.cargar();
  if (estado) almacen.guardar(cambio(estado));
  pintar();
}

/** Lee la fecha de un formulario y evita fechas en el futuro. */
function fechaDelFormulario(form: HTMLFormElement): Date | null {
  const valor = new FormData(form).get('inicio');
  const fecha = new Date(String(valor));
  if (Number.isNaN(fecha.getTime())) return null;
  return fecha > new Date() ? new Date() : fecha;
}

app.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const form = evento.target as HTMLFormElement;
  const fecha = fechaDelFormulario(form);
  if (!fecha) return;

  if (form.dataset.accion === 'empezar') {
    almacen.guardar(estadoNuevo(fecha));
    location.hash = '#/inicio';
    pintar();
  } else if (form.dataset.accion === 'cambiar-inicio') {
    actualizar((estado) => ({ ...estado, inicio: fecha.toISOString() }));
  }
});

app.addEventListener('click', (evento) => {
  const accion = (evento.target as HTMLElement).closest<HTMLElement>('button[data-accion]')?.dataset.accion;
  const estado = almacen.cargar();
  if (!accion || !estado) return;

  switch (accion) {
    case 'otra-frase':
      frase.indice = Math.min(fraseActual(new Date()) + 1, FRASES_POR_DIA - 1);
      pintar();
      break;
    case 'reiniciar':
      if (confirm('¿Reiniciar el contador? Tu mejor racha se guarda.')) {
        actualizar((e) => reiniciar(e, new Date()));
        location.hash = '#/inicio';
      }
      break;
    case 'exportar':
      almacen.exportar(estado);
      break;
    case 'borrar':
      if (confirm('¿Borrar todos los datos de este dispositivo? No se puede deshacer.')) {
        almacen.borrar();
        pintar();
      }
      break;
  }
});

app.addEventListener('change', async (evento) => {
  const input = evento.target as HTMLInputElement;
  if (input.dataset.accion !== 'importar' || !input.files?.[0]) return;

  const estado = await almacen.importar(input.files[0]);
  if (estado) {
    almacen.guardar(estado);
    location.hash = '#/inicio';
    pintar();
  } else {
    alert('Ese archivo no parece una copia de seguridad válida.');
  }
});

window.addEventListener('hashchange', pintar);

// Solo el contador necesita refrescarse cada segundo. En el resto de vistas
// se refresca cada minuto para no pisar lo que se esté escribiendo.
let segundos = 0;
setInterval(() => {
  segundos++;
  if (!almacen.cargar()) return; // en la bienvenida no hay nada que refrescar
  const enFormulario = app.contains(document.activeElement) && document.activeElement !== app;
  if (rutaActual() === 'inicio' || (segundos % 60 === 0 && !enFormulario)) pintar();
}, 1000);

pintar();
