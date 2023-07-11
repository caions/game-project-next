import Image from "next/image";
import logoApp from "../../public/logo-appmasters.svg";
import { auth } from "@/config/firebase";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/router";

interface NavbarProps {
  search: string | undefined;
  setSearch: (search: string | undefined) => void;
  gameGenre: string;
  setGameGenre: (gameGenre: string) => void;
  gamesGenres: string[];
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  search,
  setSearch,
  gameGenre,
  setGameGenre,
  gamesGenres,
  showSidebar,
  toggleSidebar,
}) => {
  const authenticated = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("deslogado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="flex items-center md:justify-between justify-center flex-wrap bg-blue-950 px-24 py-1">
      <div className="flex items-center flex-shrink-0 text-white mr-6 w-60 mt-1">
        <Image
          style={{
            filter: "grayscale(1) brightness(0) invert(1)",
          }}
          priority
          src={logoApp}
          alt="logo"
        />
      </div>
      <div className="flex items-center  my-3">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shadow appearance-none border rounded min-w-[240px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search a game"
          />
        </div>
        <div className="absolute top-4 right-8">
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
              onClick={toggleSidebar}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`fixed z-50 inset-0 lg:hidden
             ${showSidebar ? "" : "hidden"}`}
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
            <div
              className={`fixed top-4 right-4 w-full max-w-[17rem] bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 h-[87vh] overflow-scroll`}
            >
              <button
                onClick={toggleSidebar}
                type="button"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600"
              >
                <svg
                  viewBox="0 0 10 10"
                  className="w-2.5 h-2.5 overflow-visible"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0L10 10M10 0L0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
              <ul className="space-y-3 overflow-hidden">
                {gamesGenres.map((game, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer 
                      ${
                        gameGenre === game || (!gameGenre && index === 0)
                          ? "text-sky-500"
                          : ""
                      }`}
                  >
                    <span
                      className={`hover:text-sky-500`}
                      onClick={() => {
                        setGameGenre(game === "Genres" ? "" : game);
                      }}
                    >
                      {game}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>             
      </div>
      <div className="flex items-center  my-3">
        {!!authenticated ? (
          <>
          <button className="mr-2" onClick={()=>{}}>Favorites</button>
          <button onClick={handleLogout}>Logout</button>
          </>
        ) : <button onClick={()=>router.push('/auth')}>Login</button>}
        </div>   
    </nav>
  );
};

export default Navbar;
