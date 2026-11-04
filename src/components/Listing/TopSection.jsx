import Search from "../../assets/icons/Search";
import Plus from "../../assets/icons/Plus";
import backImage from "../../assets/images/back.png";

const TopSection = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <section className="relative overflow-hidden">
      <img
        src={backImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-apple">
          Comparador nutricional
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          Compara lo que comes
        </h1>
        <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">
          Busca productos, elige hasta 4 y compara sus calorías, proteínas,
          azúcares y grasas lado a lado.
        </p>
        <label className="mt-6 flex max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3 sm:mt-8 shadow-xl focus-within:ring-4 focus-within:ring-accent/60">
          <Search styles="h-5 w-5 shrink-0 text-gray" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca por nombre o marca…"
            aria-label="Buscar productos"
            className="w-full bg-transparent text-base text-principal placeholder:text-gray focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Borrar búsqueda"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fifth text-principal hover:bg-light-gray"
            >
              <Plus styles="h-3 w-3 rotate-45" />
            </button>
          )}
        </label>
      </div>
    </section>
  );
};

export default TopSection;
