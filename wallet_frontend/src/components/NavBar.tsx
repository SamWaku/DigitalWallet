import { Link } from "react-router-dom";
// import bg from "../assets/umweoGreen.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const token = Cookies.get("token");
  const name = Cookies.get("name");
  const user = !!token;
  const navigation = useNavigate();
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      Cookies.remove("token");
      navigation("/");
    }
  };
  return (
    <div className="fixed bg-white shadow top-0 w-full z-50">
      <nav className="w-full py-5 flex justify-between px-4 md:px-8 lg:px-12 items-center">
        <div className="flex gap-1 items-center">
          <h1 className="font-extrabold text-xl text-gray-800">WalletApp</h1>
          {/* <img src={bg} alt="logo" loading="lazy" className="h-4" /> */}
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <button className="rounded-full hover:bg-gray-200 p-1 duration-300 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="capitalize pr-2">{name}</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#82eefd] hover:bg-red-500 hover:text-white py-2 px-4 active:scale-95 duration-300 shadow-xl rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={"/"}
              className="bg-[#82eefd] py-2 px-4 active:scale-95 transition-all transform shadow-xl rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
