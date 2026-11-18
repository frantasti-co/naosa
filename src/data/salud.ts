import { dias } from '../core/tiempo';
import type { Fuente, LogroSalud } from './tipos';

/*
 * Logros de salud. Cada uno DEBE llevar una fuente fiable.
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
const NHS_HIGADO: Fuente = {
  nombre: 'NHS',
  url: 'https://www.nhs.uk/conditions/alcohol-related-liver-disease-arld/',
};
const BMJ_UN_MES: Fuente = {
  nombre: 'Mehta et al., BMJ Open 2018',
  url: 'https://bmjopen.bmj.com/content/8/5/e020673',
};
const IARC_CANCER: Fuente = {
  nombre: 'IARC (OMS), 2023',
  url: 'https://www.iarc.who.int/faq/iarc-handbooks-of-cancer-prevention-volume-20a-reduction-or-cessation-of-alcohol-consumption',
};

export const LOGROS_SALUD: readonly LogroSalud[] = [
  {
    id: 'pico-abstinencia',
    tras: dias(3),
    titulo: 'Lo peor ya debería haber pasado',
    texto:
      'Si hay síntomas de abstinencia, suelen tocar techo entre las 24 y las 72 horas. ' +
      'Si aun así notas temblores, confusión o fiebre, eso es cosa de un médico, no de una app.',
    fuente: MEDLINEPLUS_ABSTINENCIA,
  },
  {
    id: 'energia-sueno',
    tras: dias(7),
    titulo: 'Más energía, mejor sueño',
    texto: 'Dormir mejor y tener más energía suelen ser de lo primero que se nota al dejar de beber.',
    fuente: DRINKAWARE,
  },
  {
    id: 'higado-graso',
    tras: dias(14),
    titulo: 'El hígado se pone a trabajar para ti',
    texto:
      'La primera fase del daño por alcohol, el hígado graso, normalmente se recupera si dejas de beber. ' +
      'El tuyo lleva dos semanas sin horas extra.',
    fuente: NHS_HIGADO,
  },
  {
    id: 'un-mes-tension',
    tras: dias(30),
    titulo: 'Tensión y azúcar, a la baja',
    texto:
      'En un estudio con bebedores habituales, un mes sin alcohol bajó la tensión arterial un 6 % ' +
      'y la resistencia a la insulina un 26 % (medianas).',
    fuente: BMJ_UN_MES,
  },
  {
    id: 'un-mes-higado',
    tras: dias(30),
    titulo: 'Analítica de hígado más limpia',
    texto:
      'En ese mismo estudio, la GGT (un marcador de daño hepático) bajó un 29 % y el peso un 1,5 % ' +
      'tras un mes sin beber.',
    fuente: BMJ_UN_MES,
  },
  {
    id: 'cancer-largo-plazo',
    tras: dias(365),
    titulo: 'Menos riesgo de cáncer de boca y esófago',
    texto:
      'La IARC concluye que dejar el alcohol reduce el riesgo de cáncer de boca y de esófago, ' +
      'y que el efecto se asocia a dejarlo a largo plazo. Un año ya cuenta como largo plazo.',
    fuente: IARC_CANCER,
  },
];
