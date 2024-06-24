import { useNavigate } from "react-router-dom";
import rat from "../../assets/images/rat.png";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="py-4 pl-8 bg-secondary flex items-center gap-2">
      <img src={rat} alt="rat" className="w-12 h-12" />
      <h1
        onClick={() => navigate("/")}
        className=" text-xl text-fifth cursor-pointer"
      >
        HealthyRat
      </h1>
    </div>
  );
};

export default Header;
