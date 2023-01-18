import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import Search from "./Search";

const Header = () => {
  const { handleSearch } = useProjects();

  return (
    <header className="py-5 px-4 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl font-black text-sky-600 mb-5 md:mb-0">
          Taskman
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleSearch}
          >
            Search project
          </button>
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
          >
            Log out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
