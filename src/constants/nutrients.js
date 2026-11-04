// higherIsBetter: true si más cantidad es mejor, false si menos es mejor,
// null si no se valora (no se marca mejor ni peor al comparar).
export const NUTRIENTS = [
  {
    key: "energy",
    name: "Energía",
    shortName: "Energía",
    unit: "kcal",
    group: "Energía",
    higherIsBetter: false,
    description:
      "La energía es el combustible que el cuerpo humano necesita para vivir y ser productivo. Todos los procesos que se realizan en las células y los tejidos producen y requieren de la energía para llevarse a cabo.",
  },
  {
    key: "protein",
    name: "Proteínas",
    shortName: "Proteínas",
    unit: "g",
    group: "Proteínas e hidratos",
    higherIsBetter: true,
    description:
      "Las proteínas son moléculas grandes y complejas que desempeñan muchas funciones críticas en el cuerpo. Realizan la mayor parte del trabajo en las células y son necesarias para la estructura, función y regulación de los tejidos y órganos del cuerpo.",
  },
  {
    key: "carbohydrates",
    name: "Hidratos de carbono disponibles",
    shortName: "Hidratos",
    unit: "g",
    group: "Proteínas e hidratos",
    higherIsBetter: false,
    description:
      "Los carbohidratos o hidratos de carbono (CHO) son biomoléculas compuestas de carbono, hidrógeno y oxígeno, cuya principal función, en los seres vivos, es brindar energía inmediata a las células del cuerpo.",
  },
  {
    key: "sugars",
    name: "Azúcares totales",
    shortName: "Azúcares",
    unit: "g",
    group: "Proteínas e hidratos",
    higherIsBetter: false,
    description:
      "Los azúcares totales incluyen los azúcares que están presentes de forma natural en alimentos y bebidas nutritivas, como el azúcar en la leche y las frutas, al igual que las azúcares añadidas que puedan estar presentes en el producto",
  },
  {
    key: "totalFat",
    name: "Grasas totales",
    shortName: "Totales",
    unit: "g",
    group: "Grasas",
    higherIsBetter: false,
    description:
      "Las grasas totales incluyen las grasas saturadas, poliinsaturadas, monoinsaturadas y las grasas trans.",
  },
  {
    key: "saturatedFat",
    name: "Grasas saturadas",
    shortName: "Saturadas",
    unit: "g",
    group: "Grasas",
    higherIsBetter: false,
    description:
      "La grasa saturada es un tipo de grasa alimenticia. Es una de las grasas dañinas, junto con las grasas trans. Estas grasas son frecuentemente sólidas a temperatura ambiente.",
  },
  {
    key: "monounsaturatedFat",
    name: "Grasas monoinsaturadas",
    shortName: "Monoinsat.",
    unit: "g",
    group: "Grasas",
    higherIsBetter: null,
    description:
      "La grasa monoinsaturada es un tipo de grasa alimentaria. Es una de las grasas saludables",
  },
  {
    key: "polyunsaturatedFat",
    name: "Grasas poliinsaturadas",
    shortName: "Poliinsat.",
    unit: "g",
    group: "Grasas",
    higherIsBetter: null,
    description:
      "La grasa poliinsaturada es un tipo de grasa dietaria. Es una de las grasas saludables.",
  },
  {
    key: "transFat",
    name: "Grasas trans",
    shortName: "Trans",
    unit: "g",
    group: "Grasas",
    higherIsBetter: false,
    description:
      "La grasa trans es un tipo de grasa alimentaria. De todas las grasas, la grasa trans es la peor para su salud. Consumir demasiada grasa trans en su alimentación incrementa su riesgo de padecer enfermedades cardíacas y otros padecimientos de salud.",
  },
  {
    key: "cholesterol",
    name: "Colesterol",
    shortName: "Colesterol",
    unit: "mg",
    group: "Otros",
    higherIsBetter: false,
    description:
      "El colesterol es una sustancia cerosa y parecida a la grasa que se encuentra en todas las células de su cuerpo. Su cuerpo necesita algo de colesterol para producir hormonas, vitamina D y sustancias que le ayuden a digerir los alimentos.",
  },
  {
    key: "sodium",
    name: "Sodio",
    shortName: "Sodio",
    unit: "mg",
    group: "Otros",
    higherIsBetter: false,
    description:
      "El sodio es un elemento que el cuerpo necesita para funcionar correctamente. La sal contiene sodio. El cuerpo utiliza el sodio para controlar la presión arterial y el volumen sanguíneo. El cuerpo también necesita sodio para que los músculos y los nervios funcionen apropiadamente.",
  },
];

export const MAX_COMPARED_PRODUCTS = 4;
