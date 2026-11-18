# Cómo editar el contenido

Todo el contenido está en `src/data/`. No hace falta tocar nada más.
Después de editar, ejecuta `npm test`: comprueba que no haya ids repetidos,
frases duplicadas ni logros sin fuente.

Las duraciones se escriben con `dias(n)` o `horas(n)` (de `src/core/tiempo.ts`).

## Frases del día (`frases.txt`)

Una frase por línea en `src/data/frases.txt`. Cada día tocan 5 frases seguidas de la
lista: la home enseña la primera y el botón "Otra frase" pasa a la siguiente, hasta 5.
Al día siguiente se sigue por donde se quedó. Hay al menos 365 × 5 = 1.825 frases, así
que no se repite ninguna en todo el año (el test lo comprueba).

Criterio: **con gracia y sin sermones.** Nada de autoayuda de taza ("cree en ti"),
nada religioso, nada que culpe. Si suena a cartel de gimnasio, fuera. Escribe en
segunda persona sin marcar género ("quien no bebe", no "el que no bebe").

## Calendario del primer año

Tanto los logros de salud (cuerpo + cabeza juntos) como las medallas tienen que cumplir:

- Semana 1: al menos uno cada día (días 1 a 7).
- Semana 2: como mucho 3 días entre uno y el siguiente.
- Semana 3: como mucho 5 días.
- Desde ahí: como mucho 7 días, hasta llegar al día 365.

`npm test` falla si se rompe, y dice dónde está el hueco.

## Medallas (`medallas.ts`)

```ts
{ id: 'd200', tras: dias(200), emoji: '🎯', nombre: 'Doscientos días', lema: 'Una frase con gracia.' },
```

- `id`: único y estable. No lo cambies una vez publicado.
- El orden de la lista es el orden en pantalla; mantenlo por duración.
- La app está pensada para el primer año: casi todas caen antes del día 365.

## Logros de salud

Hay dos tipos:

- **Cabeza** (`salud-cabeza.ts`): salud mental, con humor. No necesitan fuente ni fecha
  estricta: son lo que se suele notar, no una promesa. Se añaden con una línea:
  `logro(70, 'Título', 'Texto con gracia.')`.
- **Cuerpo** (`salud-cuerpo.ts`): salud física. Siempre con fuente, con estas reglas:

```ts
{
  id: 'algo-descriptivo',
  tras: dias(90),
  categoria: 'cuerpo',
  titulo: 'Título corto',
  texto: 'Qué pasa, en una o dos frases.',
  fuente: { nombre: 'NHS', url: 'https://...' },
},
```

1. **Siempre con fuente fiable**: organismos de salud (NHS, OMS/IARC, NIH/MedlinePlus,
   CDC), organizaciones especializadas (Drinkaware, British Liver Trust) o estudios
   revisados por pares. Nada de blogs de clínicas ni webs de "detox".
2. **No inventes plazos.** Si la fuente no dice "a las 2 semanas", el texto tampoco.
   Puedes colocar el logro en un momento razonable, pero redacta sin prometer un plazo
   ("normalmente se recupera si dejas de beber", no "a los 14 días tu hígado está sano").
3. Si una fuente se repite, defínela una vez como constante arriba del archivo.
4. Cita cifras de estudios como lo que son: "en un estudio con…", con su tamaño si cabe.

### Fuentes usadas ahora (cuerpo)

| Logro | Fuente |
| --- | --- |
| Pico de abstinencia (24–72 h) | [MedlinePlus: Alcohol withdrawal](https://medlineplus.gov/ency/article/000764.htm) |
| Energía y sueño | [Drinkaware: What to expect when you stop drinking](https://www.drinkaware.co.uk/advice-and-support/help-to-stop-drinking-completely/what-to-expect-when-you-stop-drinking) |
| Materia gris a las 2 semanas | [van Eijk et al. 2013, Alcohol Clin Exp Res](https://pubmed.ncbi.nlm.nih.gov/23072363/), 49 pacientes con dependencia |
| Hígado graso reversible | [NHS: Alcohol-related liver disease](https://www.nhs.uk/conditions/alcohol-related-liver-disease-arld/) |
| Ánimo hacia la semana 4 | [Gopaldas et al. 2025](https://www.recoveryanswers.org/research-post/how-depression-and-anxiety-change-during-treatment-for-alcohol-use-disorder/), 1.005 pacientes en tratamiento |
| Un mes: tensión, insulina, GGT, peso | [Mehta et al. 2018, BMJ Open 8:e020673](https://bmjopen.bmj.com/content/8/5/e020673), 94 bebedores habituales |
| Encuesta Dry January | [Universidad de Sussex 2018](https://www.sussex.ac.uk/news/article/47131-how-dry-january-is-the-secret-to-better-sleep-saving-money-and-losing-weight), más de 800 participantes |
| GGT (2–6 semanas) y VCM (3 meses) | [Current Psychiatry 2017: biomarcadores de alcohol](https://mdedge.com/content/im-sober-doctor-really-best-biomarkers-underreported-alcohol-use) |
| Fibrilación auricular a los 6 meses | [Voskoboinik et al. 2020, NEJM](https://pubmed.ncbi.nlm.nih.gov/31893513/), ensayo con 140 personas |
| Grosor de la corteza a los 7,3 meses | [Durazzo et al. 2023, Alcohol](https://pubmed.ncbi.nlm.nih.gov/37657667/), 88 personas tras tratamiento |
| Cáncer de boca y esófago | [IARC Handbook 20A (2023)](https://www.iarc.who.int/faq/iarc-handbooks-of-cancer-prevention-volume-20a-reduction-or-cessation-of-alcohol-consumption) |

Ojo: varios estudios son con personas con dependencia o en tratamiento. El texto de cada
logro dice con quién se midió para no venderlo como algo universal.
