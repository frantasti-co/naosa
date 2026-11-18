# NAOSA

**Not Another Obscure Sober Companion App.**

PWA personal para contar el tiempo sin beber alcohol. Muestra el contador, logros de salud
con su fuente, medallas por tiempo superado y una frase del día con algo de gracia.

- **Sin servidor ni cuentas.** Los datos viven en el `localStorage` del dispositivo.
  En Ajustes hay exportar/importar en JSON como copia de seguridad.
- **Funciona sin conexión** y se puede instalar en la pantalla de inicio.
- **Pocas dependencias:** Vite, TypeScript, vite-plugin-pwa y Vitest. Sin framework de UI.

## Uso

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm test           # tests del núcleo y del contenido
npm run build      # comprueba tipos y genera dist/
npm run preview    # sirve dist/ para probar la PWA (service worker incluido)
```

Requiere Node 20 o superior.

## Estructura

```
src/
  core/        Lógica pura, sin DOM. Aquí están los tests.
    tiempo.ts    Duraciones y formato ("3 días", "1 mes")
    hitos.ts     Hitos conseguidos y próximos con su progreso
    frases.ts    Frase del día
    estado.ts    Formato de los datos guardados y su validación
  data/        Contenido editable: logros de salud, medallas y frases
  ui/          Vistas (funciones que devuelven HTML), estilos y utilidades
  almacen.ts   Única parte que toca localStorage
  main.ts      Arranque, navegación por hash y eventos
public/        Iconos
```

La regla que mantiene esto simple: **el contenido es datos y la lógica no conoce el DOM.**
Añadir un logro o una frase es editar una lista (ver [CONTENIDO.md](CONTENIDO.md)) y la
lógica se prueba sin navegador.

Las vistas usan la plantilla `html` de `src/ui/html.ts`, que escapa todo lo que se
interpola. No uses `innerHTML` con cadenas montadas a mano.

## Datos guardados

Una única clave en `localStorage`, `naosa:estado`:

```json
{ "version": 1, "inicio": "2026-11-18T09:30:00.000Z", "mejorRacha": 0 }
```

Si algún día cambia el formato, sube `VERSION` en `src/core/estado.ts` y añade la
migración en `leerEstado`, para que las copias antiguas sigan importándose.

## Despliegue

`.github/workflows/desplegar.yml` pasa los tests, construye y publica en GitHub Pages en
cada push a `main`. Solo hay que activarlo una vez en **Settings → Pages → Source:
GitHub Actions**. La app queda en `https://<usuario>.github.io/<repo>/`.

Para instalarla en el móvil, abre esa URL y usa "Añadir a pantalla de inicio".

## Fuera de alcance (a propósito)

Notificaciones push, gráficas, varios contadores y sincronización entre dispositivos.
Se pueden añadir más adelante sin tocar el núcleo.

## Aviso

No es consejo médico. Si bebías mucho y a diario, dejarlo de golpe puede ser peligroso:
consúltalo con tu médico.
