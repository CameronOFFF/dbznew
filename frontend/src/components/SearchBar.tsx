import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = () => {
  return (
    <div className="glow-card flex items-center gap-3 px-4 py-3">
      <MagnifyingGlassIcon className="h-5 w-5 text-nebula-200" />
      <input
        type="text"
        placeholder="Buscar missões, itens, jogadores, habilidades..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-nebula-300"
      />
    </div>
  );
};

export default SearchBar;
