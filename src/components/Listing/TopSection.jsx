import Search from "../../assets/icons/Search";
import backImage from "../../assets/images/back.png";

const TopSection = (props) => {
  const { searchTerm, setSearchTerm } = props;
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="h-72">
      <img src={backImage} className="w-full h-72 absolute" />
      <div className="flex-col flex items-center p-6 relative">
        <h2 className=" text-3xl font-semibold text-white">
          Compara productos
        </h2>
        <h3 className="text-xl text-white">Selecciona productos y compara</h3>
        <div className="bg-transparent p-4 rounded-lg mt-6">
          <div className=" bg-white border-2 border-gray-300 flex gap-2 w-max items-center rounded-lg px-2">
            <input
              onChange={(e) => handleChange(e)}
              value={searchTerm}
              className="bg-white border-0 rounded-lg focus:outline-none text-black"
            />
            <Search styles="w-4 h-4 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
