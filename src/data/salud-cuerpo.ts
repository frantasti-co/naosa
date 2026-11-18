import { dias } from '../core/tiempo';
import type { Fuente, LogroCuerpo } from './tipos';

/*
 * Logros de salud física ("cuerpo"). Cada uno DEBE llevar una fuente fiable.
 * Si una fuente no da un plazo exacto, el texto no se lo inventa.
 * Cómo añadir más: ver CONTENIDO.md.
 */

const MEDLINEPLUS_ABSTINENCIA: Fuente = {
  nombre: 'MedlinePlus (NIH)',
  url: 'https://medlineplus.gov/ency/article/000764.htm',
};
const DRINKAWARE: Fuente = {
  nombre: 'Drinkaware',
  url: 'https://www.drinkaware.co.uk/advice-and-support/help-to-stop-drinking-completely/what-to-expect-when-you-stop-drinking',
};
const VAN_EIJK_CEREBRO: Fuente = {
  nombre: 'van Eijk et al., Alcohol Clin Exp Res 2013',
  url: 'https://pubmed.ncbi.nlm.nih.gov/23072363/',
};
const NHS_HIGADO: Fuente = {
  nombre: 'NHS',
  url: 'https://www.nhs.uk/conditions/alcohol-related-liver-disease-arld/',
};
const GOPALDAS_ANIMO: Fuente = {
  nombre: 'Gopaldas et al., Alcohol Clin Exp Res 2025 (resumen del Recovery Research Institute)',
  url: 'https://www.recoveryanswers.org/research-post/how-depression-and-anxiety-change-during-treatment-for-alcohol-use-disorder/',
};
const BMJ_UN_MES: Fuente = {
  nombre: 'Mehta et al., BMJ Open 2018',
  url: 'https://bmjopen.bmj.com/content/8/5/e020673',
};
const SUSSEX_DRY_JANUARY: Fuente = {
  nombre: 'Universidad de Sussex, 2018',
  url: 'https://www.sussex.ac.uk/news/article/47131-how-dry-january-is-the-secret-to-better-sleep-saving-money-and-losing-weight',
};
const BIOMARCADORES: Fuente = {
  nombre: 'Current Psychiatry, 2017',
  url: 'https://mdedge.com/content/im-sober-doctor-really-best-biomarkers-underreported-alcohol-use',
};
const NEJM_FIBRILACION: Fuente = {
  nombre: 'Voskoboinik et al., NEJM 2020',
  url: 'https://pubmed.ncbi.nlm.nih.gov/31893513/',
};
const DURAZZO_CORTEZA: Fuente = {
  nombre: 'Durazzo et al., Alcohol 2023',
  url: 'https://pubmed.ncbi.nlm.nih.gov/37657667/',
};
const IARC_CANCER: Fuente = {
  nombre: 'IARC (OMS), 2023',
  url: 'https://www.iarc.who.int/faq/iarc-handbooks-of-cancer-prevention-volume-20a-reduction-or-cessation-of-alcohol-consumption',
};

export const LOGROS_CUERPO: readonly LogroCuerpo[] = [
  {
    id: 'pico-abstinencia',
    categoria: 'cuerpo',
    tras: dias(3),
    titulo: 'Lo peor ya debería haber pasado',
    texto:
      'Si hay síntomas de abstinencia, suelen tocar techo entre las 24 y las 72 horas. ' +
      'Si aun así notas temblores, confusión o fiebre, eso es cosa de un médico, no de una app.',
    fuente: MEDLINEPLUS_ABSTINENCIA,
  },
  {
    id: 'energia-sueno',
    categoria: 'cuerpo',
    tras: dias(7),
    titulo: 'Más energía, mejor sueño',
    texto: 'Dormir mejor y tener más energía suelen ser de lo primero que se nota al dejar de beber.',
    fuente: DRINKAWARE,
  },
  {
    id: 'cerebro-dos-semanas',
    categoria: 'cuerpo',
    tras: dias(14),
    titulo: 'El cerebro empieza a recuperar volumen',
    texto:
      'En 49 personas con dependencia del alcohol, la materia gris se recuperó en parte ' +
      'tras solo dos semanas sin beber. Parcial, pero medible en una resonancia.',
    fuente: VAN_EIJK_CEREBRO,
  },
  {
    id: 'higado-graso',
    categoria: 'cuerpo',
    tras: dias(21),
    titulo: 'El hígado se pone a trabajar para ti',
    texto:
      'La primera fase del daño por alcohol, el hígado graso, normalmente se recupera si dejas de beber. ' +
      'El tuyo lleva tres semanas sin horas extra.',
    fuente: NHS_HIGADO,
  },
  {
    id: 'animo-cuatro-semanas',
    categoria: 'cuerpo',
    tras: dias(28),
    titulo: 'El ánimo se asienta',
    texto:
      'En más de 1.000 personas en tratamiento, la ansiedad y la depresión bajaron ya en la segunda semana. ' +
      'En quienes empezaban peor, la mejora se estabilizó hacia la cuarta.',
    fuente: GOPALDAS_ANIMO,
  },
  {
    id: 'un-mes-tension',
    categoria: 'cuerpo',
    tras: dias(30),
    titulo: 'Tensión y azúcar, a la baja',
    texto:
      'En un estudio con bebedores habituales, un mes sin alcohol bajó la tensión arterial un 6 % ' +
      'y la resistencia a la insulina un 26 % (medianas).',
    fuente: BMJ_UN_MES,
  },
  {
    id: 'un-mes-higado',
    categoria: 'cuerpo',
    tras: dias(30),
    titulo: 'Analítica de hígado más limpia',
    texto:
      'En ese mismo estudio, la GGT (un marcador de daño hepático) bajó un 29 % y el peso un 1,5 % ' +
      'tras un mes sin beber.',
    fuente: BMJ_UN_MES,
  },
  {
    id: 'dry-january',
    categoria: 'cuerpo',
    tras: dias(31),
    titulo: 'Un Dry January completo',
    texto:
      'De más de 800 personas que hicieron un mes sin alcohol, el 71 % dijo dormir mejor, ' +
      'el 67 % tener más energía y el 58 % haber perdido peso. Es una encuesta, pero son muchos.',
    fuente: SUSSEX_DRY_JANUARY,
  },
  {
    id: 'ggt-normal',
    categoria: 'cuerpo',
    tras: dias(42),
    titulo: 'La GGT vuelve a su sitio',
    texto: 'Este marcador del hígado, que el alcohol dispara, suele volver a valores normales en 2 a 6 semanas sin beber.',
    fuente: BIOMARCADORES,
  },
  {
    id: 'globulos-rojos',
    categoria: 'cuerpo',
    tras: dias(90),
    titulo: 'Glóbulos rojos renovados',
    texto:
      'El alcohol agranda los glóbulos rojos (el VCM de la analítica). Suele volver a la normalidad ' +
      'en unos 3 meses sin beber, que es más o menos lo que tardan en renovarse.',
    fuente: BIOMARCADORES,
  },
  {
    id: 'corazon-seis-meses',
    categoria: 'cuerpo',
    tras: dias(182),
    titulo: 'El corazón lleva mejor el ritmo',
    texto:
      'En un ensayo con 140 bebedores con fibrilación auricular, quienes dejaron el alcohol 6 meses ' +
      'tuvieron menos recaídas de arritmia: 53 % frente a 73 %.',
    fuente: NEJM_FIBRILACION,
  },
  {
    id: 'corteza-siete-meses',
    categoria: 'cuerpo',
    tras: dias(222),
    titulo: 'La corteza cerebral se engrosa',
    texto:
      'En 88 personas tras un tratamiento por alcohol, a los 7,3 meses de media sin beber ' +
      'el grosor de la corteza se había recuperado en 26 de las 34 regiones estudiadas.',
    fuente: DURAZZO_CORTEZA,
  },
  {
    id: 'cancer-largo-plazo',
    categoria: 'cuerpo',
    tras: dias(365),
    titulo: 'Menos riesgo de cáncer de boca y esófago',
    texto:
      'La IARC concluye que dejar el alcohol reduce el riesgo de cáncer de boca y de esófago, ' +
      'y que el efecto se asocia a dejarlo a largo plazo. Un año ya cuenta como largo plazo.',
    fuente: IARC_CANCER,
  },
];
