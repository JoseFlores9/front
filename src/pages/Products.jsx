import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsTable from "../components/products/ProductsTable";
import AddProductTable from "../components/products/AddProductTable";
import axios from "../api/axios";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [nutritionalMax, setNutritionalMax] = useState({});
  const [portionMax, setPortionMax] = useState({});
  const [nutritionalMin, setNutritionalMin] = useState({});
  const [portionMin, setPortionMin] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    const getProduct = async (productId) => {
      try {
        const response = await axios.get(`/products/${productId}`);
        if (products.length === 0) {
          let aux = [];
          aux.push(response.data);
          setProducts(aux);
        }
      } catch (error) {
        console.log(error);
      }
    };
    let id = searchParams.get("id");
    getProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const getMaxFacts = () => {
      let auxMax = {};
      let auxMin = {};
      nutritionalFacts.map((fact) => {
        let auxPortion = products.map((product) => {
          let auxF = product.nutritionalFacts[fact].split("/");
          if (isNaN(auxF[0])) {
            return 0;
          }
          return Number(auxF[0]);
        });
        auxMax[fact] = Math.max(...auxPortion);
        auxMin[fact] = Math.min(...auxPortion);
      });
      setNutritionalMax(auxMax);
      setNutritionalMin(auxMin);
    };
    const getMaxPortion = () => {
      let auxMax = {};
      let auxMin = {};
      nutritionalFacts.map((fact) => {
        let auxPortion = products.map((product) => {
          let auxF = product.nutritionalFacts[fact].split("/");
          if (isNaN(auxF[1])) {
            return 0;
          }
          return Number(auxF[1]);
        });
        auxMin[fact] = Math.min(...auxPortion);
        auxMax[fact] = Math.max(...auxPortion);
      });
      setPortionMax(auxMax);
      setPortionMin(auxMin);
    };
    getMaxFacts();
    getMaxPortion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  return (
    <div className="text-black">
      <h1></h1>
      <div className=" bg-secondary p-4">
        <AddProductTable
          setProducts={setProducts}
          open={open}
          handleClose={handleClose}
          products={products}
        />
      </div>
      <div className=" w-full flex justify-center items-center">
        <ProductsTable
          products={products}
          nutritionalMax={nutritionalMax}
          portionMax={portionMax}
          nutritionalMin={nutritionalMin}
          portionMin={portionMin}
          handleOpen={handleOpen}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
};

export default Products;
