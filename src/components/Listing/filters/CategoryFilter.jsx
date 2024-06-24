import CheckBox from "../../commons/forms/CheckBox";

const CategoryFilter = (props) => {
  const { categories, handleAddFilter, filters } = props;
  return (
    <div className=" bg-fifth rounded-md">
      <div className="flex w-full cursor-pointer items-center gap-2 rounded-t bg-principal p-4">
        <p className="text-xs text-blue-principal">Categorías</p>
      </div>
      <ul className="flex flex-col gap-2 p-2">
        {categories.map((category) => (
          <li className="flex items-center" key={category._id}>
            <CheckBox
              setValue={() => handleAddFilter("categoryId", category._id)}
              value={filters.categoryId?.includes(category._id)}
            />
            <p className="text-xs text-principal">{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
