# Cómo editar el contenido

Todo el contenido está en `src/data/`. No hace falta tocar nada más.
Después de editar, ejecuta `npm test`: comprueba que no haya ids repetidos,
frases duplicadas ni logros sin fuente.

Las duraciones se escriben con `dias(n)` o `horas(n)` (de `src/core/tiempo.ts`).

## Frases del día (`frases.ts`)

Una cadena por línea. Se muestra una al día, en orden, y la lista da la vuelta.

Criterio: **con gracia y sin sermones.** Nada de autoayuda de taza ("cree en ti"),
nada religioso, nada que culpe. Si suena a cartel de gimnasio, fuera.

## Medallas (`medallas.ts`)

```ts
{ id: 'd200', tras: dias(200), emoji: '🎯', nombre: 'Doscientos días', lema: 'Una frase con gracia.' },
```

- `id`: único y estable. No lo cambies una vez publicado.
- El orden de la lista es el orden en pantalla; mantenlo por duración.

## Logros de salud (`salud.ts`)

```ts
{
  id: 'algo-descriptivo',
  tras: dias(90),
  titulo: 'Título corto',
  texto: 'Qué pasa, en una o dos frases.',
  fuente: { nombre: 'NHS', url: 'https://...' },
},
```

Reglas, porque aquí es fácil inventarse cosas:

1. **Siempre con fuente fiable**: organismos de salud (NHS, OMS/IARC, NIH/MedlinePlus,
   CDC), organizaciones especializadas (Drinkaware, British Liver Trust) o estudios
   revisados por pares. Nada de blogs de clínicas ni webs de "detox".
2. **No inventes plazos.** Si la fuente no dice "a las 2 semanas", el texto tampoco.
   Puedes colocar el logro en un momento razonable, pero redacta sin prometer un plazo
   ("normalmente se recupera si dejas de beber", no "a los 14 días tu hígado está sano").
3. Si una fuente se repite, defínela una vez como constante arriba del archivo.
4. Cita cifras de estudios como lo que son: "en un estudio con…", con su tamaño si cabe.

### Fuentes usadas ahora

| Logro | Fuente |
| --- | --- |
| Pico de abstinencia (24–72 h) | [MedlinePlus: Alcohol withdrawal](https://medlineplus.gov/ency/article/000764.htm) |
| Energía y sueño | [Drinkaware: What to expect when you stop drinking](https://www.drinkaware.co.uk/advice-and-support/help-to-stop-drinking-completely/what-to-expect-when-you-stop-drinking) |
| Hígado graso reversible | [NHS: Alcohol-related liver disease](https://www.nhs.uk/conditions/alcohol-related-liver-disease-arld/) |
| Un mes: tensión, insulina, GGT, peso | [Mehta et al. 2018, BMJ Open 8:e020673](https://bmjopen.bmj.com/content/8/5/e020673), 94 bebedores habituales |
| Cáncer de boca y esófago | [IARC Handbook 20A (2023)](https://www.iarc.who.int/faq/iarc-handbooks-of-cancer-prevention-volume-20a-reduction-or-cessation-of-alcohol-consumption) |
