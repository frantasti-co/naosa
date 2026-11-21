# NAOSA

**Not Another Obscure Sober Companion App.**

PWA personal para contar el tiempo sin beber alcohol. Muestra el contador, logros de salud
(físicos, con su fuente, y mentales, con humor), medallas por tiempo superado y cinco frases al día con algo de gracia.
Está pensada para acompañar el primer año.

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
    frases.ts    Las 5 frases del día
    estado.ts    Formato de los datos guardados y su validación
  data/        Contenido editable: logros de salud (cuerpo y cabeza), medallas y frases (frases.txt)
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

## APK de Android (Capacitor)

La misma app empaquetada en un APK para instalar a mano, sin Google Play. Todo va dentro
del APK, así que funciona sin conexión y sin service worker. Los datos se guardan en el
almacenamiento de la app (no se comparten con la versión web: para pasarlos, exporta e
importa la copia JSON). En el APK, "Exportar" abre el menú de compartir de Android.

- `.github/workflows/apk.yml` construye el APK en cada PR (artefacto `naosa-apk`) y, en
  cada push a `main`, lo publica en la release `apk`:
  `https://github.com/<usuario>/<repo>/releases/latest/download/naosa.apk`
- En local (con Android SDK y Java 21): `npm run apk` → `android/app/build/outputs/apk/release/`.
- Si tocas el código web, `npm run build:android` lo copia al proyecto Android.
- Va firmado con `android/app/naosa.keystore` (contraseña `naosa-apk`), siempre la misma,
  para que cada APK nuevo se instale encima del anterior sin perder datos. La clave está en
  el repo a propósito porque es una app personal; para una tienda habría que cambiarla.

Para instalarlo: abre el enlace en el móvil, descarga y acepta "Instalar apps de origen
desconocido" para el navegador cuando Android lo pida.

## Fuera de alcance (a propósito)

Notificaciones push, gráficas, varios contadores y sincronización entre dispositivos.
Se pueden añadir más adelante sin tocar el núcleo.

## Aviso

No es consejo médico. Si bebías mucho y a diario, dejarlo de golpe puede ser peligroso:
consúltalo con tu médico.
