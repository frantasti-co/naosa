/**
 * Vistas: funciones puras que reciben datos y devuelven HTML.
 * No leen ni escriben estado; los eventos se gestionan en main.ts.
 */
import type { Estado } from '../core/estado';
import { fraseDelDia } from '../core/frases';
import { alcanzados, proximos, type HitoPendiente } from '../core/hitos';
import { describirDuracion, desglosar, transcurrido } from '../core/tiempo';
import { FRASES } from '../data/frases';
import { MEDALLAS } from '../data/medallas';
import { LOGROS_SALUD } from '../data/salud';
import type { LogroSalud } from '../data/tipos';
import { aInputLocal, dos, fechaLarga, formatoFalta } from './formato';
import { html, type Html } from './html';

export type Ruta = 'inicio' | 'logros' | 'medallas' | 'ajustes';

export const RUTAS: { ruta: Ruta; icono: string; nombre: string }[] = [
  { ruta: 'inicio', icono: '⏱️', nombre: 'Contador' },
  { ruta: 'logros', icono: '❤️', nombre: 'Salud' },
  { ruta: 'medallas', icono: '🏅', nombre: 'Medallas' },
  { ruta: 'ajustes', icono: '⚙️', nombre: 'Ajustes' },
];

export function bienvenida(ahora: Date): Html {
  return html`
    <section class="tarjeta bienvenida">
      <p class="marca">NAOSA</p>
      <p class="nota">Not Another Obscure Sober Companion App</p>
      <h1>¿Desde cuándo?</h1>
      <p>Indica cuándo fue tu última copa. Todo se guarda solo en este dispositivo.</p>
      <form data-accion="empezar">
        <input type="datetime-local" name="inicio" value="${aInputLocal(ahora)}" max="${aInputLocal(ahora)}" required />
        <button type="submit">Empezar</button>
      </form>
    </section>`;
}

export function inicio(estado: Estado, ahora: Date): Html {
  const ms = transcurrido(new Date(estado.inicio), ahora);
  const t = desglosar(ms);
  const [siguiente] = proximos(LOGROS_SALUD, ms, 1);
  const [medalla] = proximos(MEDALLAS, ms, 1);

  return html`
    <section class="contador">
      <div class="dias">${t.dias}</div>
      <div class="etiqueta">${t.dias === 1 ? 'día' : 'días'} sin alcohol</div>
      <div class="reloj">${dos(t.horas)}:${dos(t.minutos)}:${dos(t.segundos)}</div>
    </section>

    <blockquote class="frase">${fraseDelDia(FRASES, ahora)}</blockquote>

    ${siguiente ? tarjetaProxima('Próximo logro de salud', siguiente.hito.titulo, siguiente) : ''}
    ${medalla ? tarjetaProxima('Próxima medalla', `${medalla.hito.emoji} ${medalla.hito.nombre}`, medalla) : ''}

    ${estado.mejorRacha > 0
      ? html`<p class="nota">Mejor racha anterior: ${describirDuracion(estado.mejorRacha)}</p>`
      : ''}`;
}

function tarjetaProxima(titulo: string, nombre: string, p: HitoPendiente<{ id: string; tras: number }>): Html {
  return html`
    <section class="tarjeta">
      <h2>${titulo}</h2>
      <p class="nombre">${nombre}</p>
      ${barra(p.progreso)}
      <p class="nota">Faltan ${formatoFalta(p.falta)}</p>
    </section>`;
}

function barra(progreso: number): Html {
  const pct = Math.round(Math.min(1, Math.max(0, progreso)) * 100);
  return html`<div class="barra" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
    <div style="width: ${pct}%"></div>
  </div>`;
}

export function logros(estado: Estado, ahora: Date): Html {
  const ms = transcurrido(new Date(estado.inicio), ahora);
  const pendientes = proximos(LOGROS_SALUD, ms, Infinity);
  const conseguidos = alcanzados(LOGROS_SALUD, ms);

  return html`
    <h1>Salud</h1>
    ${pendientes.length > 0
      ? html`<h2>Próximos</h2>
          ${pendientes.map(
            (p, i) => html`
              <article class="tarjeta logro">
                <p class="cuando">A ${describirDuracion(p.hito.tras)} · faltan ${formatoFalta(p.falta)}</p>
                <h3>${p.hito.titulo}</h3>
                ${i === 0 ? barra(p.progreso) : ''}
              </article>`,
          )}`
      : ''}
    <h2>Conseguidos</h2>
    ${conseguidos.length > 0
      ? conseguidos.map(tarjetaLogro)
      : html`<p class="nota">El primero llega a los ${describirDuracion(pendientes[0].hito.tras)}.</p>`}`;
}

function tarjetaLogro(logro: LogroSalud): Html {
  return html`
    <article class="tarjeta logro conseguido">
      <p class="cuando">✓ ${describirDuracion(logro.tras)}</p>
      <h3>${logro.titulo}</h3>
      <p>${logro.texto}</p>
      <p class="fuente">Fuente: <a href="${logro.fuente.url}" target="_blank" rel="noopener">${logro.fuente.nombre}</a></p>
    </article>`;
}

export function medallas(estado: Estado, ahora: Date): Html {
  const ms = transcurrido(new Date(estado.inicio), ahora);
  return html`
    <h1>Medallas</h1>
    <div class="medallas">
      ${MEDALLAS.map((m) => {
        const tiene = ms >= m.tras;
        return html`
          <article class="medalla ${tiene ? '' : 'bloqueada'}">
            <div class="emoji">${tiene ? m.emoji : '🔒'}</div>
            <h3>${m.nombre}</h3>
            <p>${tiene ? m.lema : `Faltan ${formatoFalta(m.tras - ms)}`}</p>
          </article>`;
      })}
    </div>`;
}

export function ajustes(estado: Estado, ahora: Date): Html {
  return html`
    <h1>Ajustes</h1>

    <section class="tarjeta">
      <h2>Fecha de inicio</h2>
      <p class="nota">Ahora: ${fechaLarga.format(new Date(estado.inicio))}</p>
      <form data-accion="cambiar-inicio">
        <input type="datetime-local" name="inicio" value="${aInputLocal(new Date(estado.inicio))}" max="${aInputLocal(ahora)}" required />
        <button type="submit">Guardar</button>
      </form>
    </section>

    <section class="tarjeta">
      <h2>¿Ha habido una copa?</h2>
      <p class="nota">Pasa. El contador vuelve a cero y tu mejor racha se queda guardada.</p>
      <button class="secundario" data-accion="reiniciar">Reiniciar contador</button>
    </section>

    <section class="tarjeta">
      <h2>Copia de seguridad</h2>
      <p class="nota">Tus datos solo viven en este dispositivo. Exporta de vez en cuando.</p>
      <div class="fila">
        <button class="secundario" data-accion="exportar">Exportar</button>
        <label class="boton secundario">Importar<input type="file" accept="application/json" data-accion="importar" hidden /></label>
      </div>
    </section>

    <section class="tarjeta">
      <h2>Borrar todo</h2>
      <button class="peligro" data-accion="borrar">Borrar datos de este dispositivo</button>
    </section>

    <p class="nota aviso">
      Esta app no es consejo médico. Si bebías mucho y a diario, dejarlo de golpe puede ser peligroso:
      consúltalo con tu médico.
    </p>
    <p class="nota aviso">NAOSA · Not Another Obscure Sober Companion App</p>`;
}

export function navegacion(actual: Ruta): Html {
  return html`${RUTAS.map(
    (r) => html`<a href="#/${r.ruta}" class="${r.ruta === actual ? 'activa' : ''}" aria-current="${r.ruta === actual ? 'page' : 'false'}">
      <span aria-hidden="true">${r.icono}</span>${r.nombre}
    </a>`,
  )}`;
}
