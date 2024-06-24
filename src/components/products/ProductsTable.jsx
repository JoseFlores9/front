import { Tooltip } from "@mui/material";
import InformationFilledIcon from "../../assets/icons/InformationFilledIcon";
import Plus from "../../assets/icons/Plus";
import FactLabel from "./FactLabel";

const ProductsTable = (props) => {
  const { products, nutritionalMax, handleOpen, setProducts } = props;
  const nutritionalFacts = [
    "Energía (kCal)",
    "Proteínas (g)",
    "Grasas Totales (g)",
    "Grasas Saturadas (g)",
    "Grasas Monoinsaturadas (g)",
    "Grasas Poliinsaturadas (g)",
    "Grasas trans (g)",
    "Colesterol (mg)",
    "Hidratos de Carbono disponibles (g)",
    "Azúcares totales (g)",
    "Sodio (mg)",
  ];

  const descriptionFacts = {
    "Energía (kCal)":
      "La energía es el combustible que el cuerpo humano necesita para vivir y ser productivo. Todos los procesos que se realizan en las células y los tejidos producen y requieren de la energía para llevarse a cabo.",
    "Proteínas (g)":
      "Las proteínas son moléculas grandes y complejas que desempeñan muchas funciones críticas en el cuerpo. Realizan la mayor parte del trabajo en las células y son necesarias para la estructura, función y regulación de los tejidos y órganos del cuerpo.",
    "Grasas Totales (g)":
      "Las grasas totales incluyen las grasas saturadas, poliinsaturadas, monoinsaturadas y las grasas trans.",
    "Grasas Saturadas (g)":
      "La grasa saturada es un tipo de grasa alimenticia. Es una de las grasas dañinas, junto con las grasas trans. Estas grasas son frecuentemente sólidas a temperatura ambiente.",
    "Grasas Monoinsaturadas (g)":
      "La grasa monoinsaturada es un tipo de grasa alimentaria. Es una de las grasas saludables",
    "Grasas Poliinsaturadas (g)":
      "La grasa poliinsaturada es un tipo de grasa dietaria. Es una de las grasas saludables.",
    "Grasas trans (g)":
      "La grasa trans es un tipo de grasa alimentaria. De todas las grasas, la grasa trans es la peor para su salud. Consumir demasiada grasa trans en su alimentación incrementa su riesgo de padecer enfermedades cardíacas y otros padecimientos de salud.",
    "Colesterol (mg)":
      "El colesterol es una sustancia cerosa y parecida a la grasa que se encuentra en todas las células de su cuerpo. Su cuerpo necesita algo de colesterol para producir hormonas, vitamina D y sustancias que le ayuden a digerir los alimentos.",
    "Hidratos de Carbono disponibles (g)":
      "Los carbohidratos o hidratos de carbono (CHO) son biomoléculas compuestas de carbono, hidrógeno y oxígeno, cuya principal función, en los seres vivos, es brindar energía inmediata a las células del cuerpo.",
    "Azúcares totales (g)":
      "Los azúcares totales incluyen los azúcares que están presentes de forma natural en alimentos y bebidas nutritivas, como el azúcar en la leche y las frutas, al igual que las azúcares añadidas que puedan estar presentes en el producto",
    "Sodio (mg)":
      "El sodio es un elemento que el cuerpo necesita para funcionar correctamente. La sal contiene sodio. El cuerpo utiliza el sodio para controlar la presión arterial y el volumen sanguíneo. El cuerpo también necesita sodio para que los músculos y los nervios funcionen apropiadamente.",
  };
  const compare = (value, base) => {
    const aux = Number(value);
    if (aux >= base) {
      return "high";
    }
    return "low";
  };

  const handleDeleteProduct = (index) => {
    let aux = [...products];
    aux.splice(index, 1);
    setProducts(aux);
  };
  return (
    <div className=" bg-fifth w-max rounded-lg mt-8 p-2 border-1 border-secondary flex items-center gap-4">
      <table className="border-separate border-spacing-y-2  rounded-lg ">
        <thead>
          <tr className="">
            <th className="w-[200px]"></th>
            {products.map((product, index) => (
              <th className="" key={product._id}>
                <div className="mr-4 pt-4 w-[200px] flex flex-col items-center relative">
                  {products.length > 1 && (
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="p-2 border-0 hover:border-0 focus:outline-none bg-red-alert rounded-full absolute group-hover:block right-0 top-0 opacity-20 hover:opacity-100"
                    >
                      <Plus styles={"w-4 h-4 text-white rotate-45"} />
                    </button>
                  )}
                  <div className=" w-[100px] h-[100px]">
                    <img className=" w-[100px] h-[100px]" src={product.image} />
                  </div>
                  <div className="h-12">
                    <p>{product.name}</p>
                  </div>
                  <div className="flex">
                    <div className="w-[100px]">100g</div>
                    <div className="w-[100px]">Porción</div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nutritionalFacts.map((element, index) => (
            <tr
              key={index}
              className={`border-1 ${index % 2 === 0 ? " bg-fourth" : ""}`}
            >
              <td className=" py-1 flex items-center gap-2">
                <div className="mr-2 pl-2 w-[200px] flex justify-center">
                  <span className="text-center">{element}</span>
                </div>
                <Tooltip
                  title={descriptionFacts[element]}
                  placement="bottom"
                  arrow={true}
                >
                  <div className="w-max">
                    <InformationFilledIcon styles="w-5 h-5" />
                  </div>
                </Tooltip>
              </td>
              {products.map((product) => (
                <td className="" key={product._id}>
                  <div className="w-[200px] flex justify-center">
                    {product.nutritionalFacts[element].split("/").map(
                      (aux, index) =>
                        aux && (
                          <div key={index} className="w-[100px] text-center">
                            <FactLabel
                              value={aux}
                              factType={element}
                              type={compare(aux, nutritionalMax[element])}
                            />
                          </div>
                        )
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length < 4 && (
        <div className="w-[200px] flex justify-center">
          <button
            onClick={handleOpen}
            className="h-20 bg-principal rounded-full focus:outline-none"
          >
            <Plus styles={"w-10 h-10 text-white"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
