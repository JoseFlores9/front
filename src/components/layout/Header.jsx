import { NavLink } from "react-router-dom";
import rat from "../../assets/images/rat.png";

const linkStyles = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
    isActive ? "bg-white text-secondary" : "text-white hover:bg-white/15"
  }`;

const Header = () => {
  return (
    <header className="bg-secondary">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={rat} alt="" className="h-10 w-10" />
          <span className="hidden text-xl font-extrabold tracking-tight text-white sm:inline">
            Healthy<span className="text-apple">Rat</span>
          </span>
        </NavLink>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkStyles}>
            Catálogo
          </NavLink>
          <NavLink to="/product" className={linkStyles}>
            Comparador
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
