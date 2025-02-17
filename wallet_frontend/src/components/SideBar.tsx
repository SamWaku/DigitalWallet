import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Props {
  id: string;
}
const SideBar: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(() => {
    const storedState = localStorage.getItem("sidebarOpen");
    return storedState ? JSON.parse(storedState) : true;
  });
  const [active, setActive] = useState(0);
  const setActiveLink = (index: number) => {
    setActive(index);
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.includes(`/dashboard`)) {
      setActive(1);
    } else if (pathname.includes(`/wallet/${id}`)) {
      setActive(2);
    } else if (pathname.includes(`/transactions/${id}`)) {
      setActive(3);
    } else {
      setActive(4);
    }
  }, [id]);
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);
  return (
    <div
      className={` min-h-screen shadow relative text-left ${
        open ? "w-[11rem]" : "w-16"
      } grid px-2 mt-28 duration-300`}
    >
      {/* SideBar button */}
      <button
        onClick={() => setOpen(!open)}
        className=" absolute right-5 z-30 -top-[3%]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className={`w-9 h-9 ${
            open ? "" : "rotate-180"
          } duration-300 fixed active:scale-90 bg-white shadow-md rounded-full border-2 border-gray-300 p-2 text-gray-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Links */}
      <div
        className={`flex flex-col text-left gap-4 pt-5 text-xs md:text-base fixed items-start justify-center`}
      >
        {/* Dashboard */}
        <Link
          to={`/dashboard/${id}`}
          onClick={() => setActiveLink(1)}
          className={`hover:bg-gray-200 ${
            active === 1 ? "bg-black text-white hover:bg-gray-800" : ""
          } transform transition-all font-semibold text-gray-600 gap-1 md:gap-2 items-center ${
            open ? "w-full" : "md:w-12 w-10"
          } text-left md:p-3 p-1 flex rounded-xl`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <span className={`${open ? "" : "scale-0"} duration-300`}>Home</span>
        </Link>

        {/* Wallet */}
        <Link
          to={`/wallet/${id}`}
          onClick={() => setActiveLink(2)}
          className={`hover:bg-gray-200 ${
            active === 2 ? "bg-black text-white hover:bg-gray-800" : ""
          } transform transition-all font-semibold text-gray-600 gap-1 md:gap-2 items-center ${
            open ? "w-full" : "md:w-12 w-10"
          } text-left md:p-3 p-1 flex rounded-xl`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </span>
          <span className={`${open ? "" : "scale-0"} duration-300`}>
            Wallet
          </span>{" "}
        </Link>

        {/* WalletTransaction */}
        <Link
          to={`/transactions/${id}`}
          onClick={() => setActiveLink(3)}
          className={`hover:bg-gray-200 ${
            active === 3 ? "bg-black text-white hover:bg-gray-800" : ""
          } transform transition-all font-semibold text-gray-600 gap-1 md:gap-2 items-center ${
            open ? "w-full" : "md:w-12 w-10"
          } text-left md:p-3 p-1 flex rounded-xl`}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </span>
          <span className={`${open ? "" : "scale-0"} duration-300`}>
            Transactions
          </span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
