import { NavLink } from "react-router-dom";
import CategoryFilter from "./filters/CategoryFilter";

const ProductsList = (props) => {
  const { products, categories, filters, handleAddFilter, loading } = props;
  return (
    <div className="pt-8 flex gap-4 mx-4">
      <div className=" w-[200px] flex flex-col items-center pt-4 bg-third rounded-lg h-[calc(100vh-310px)]">
        <h2 className=" text-lg font-semibold text-fifth">Filtros</h2>
        <CategoryFilter
          categories={categories}
          filters={filters}
          handleAddFilter={handleAddFilter}
        />
      </div>

      <ul className="grid relative grid-cols-1 gap-4 h-[calc(100vh-400px)] overflow-y-scroll no-scrollbar sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {loading && (
          <div className="absolute left-0 w-full h-[calc(100vh-400px)]">
            <div className="flex justify-center items-center w-full h-[calc(100vh-400px)]">
              <div className="absolute h-[calc(100vh-400px)] flex w-screen items-center justify-center bg-white text-white opacity-80" />
              <div className="rounded-full h-20 w-20 bg-secondary animate-ping"></div>
            </div>
          </div>
        )}
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-fifth border-2 border-fourth rounded-lg flex flex-col items-center justify-center w-[300px] cursor-pointer p-4"
          >
            <img src={product.image} className=" w-[100px] h-[100px]" />
            <p className="text-principal text-sm font-normal w-[200px] truncate text-center mt-4">
              {product.name}
            </p>
            <p className="text-principal text-sm font-semibold ">
              {product.brand}
            </p>
            <NavLink
              className="bg-principal text-white px-2 rounded-full hover:text-white"
              to={`product?id=${product._id}`}
            >
              Comparar
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
