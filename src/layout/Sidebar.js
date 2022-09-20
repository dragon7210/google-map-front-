import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="flex flex-col h-screen p-3 md:w-1/5 bg-gray-800 shadow ">
        <div className="space-y-3">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-slate-200 hover:text-gray-500">
                    User
                  </span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/delivery"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <span className="text-white hover:text-gray-500">
                    Delivery
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="container mx-auto mt-12">
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total users
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                12,00
              </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Profit
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                $ 450k
              </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
              <div className="text-sm font-medium text-gray-500 truncate">
                Total Orders
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                20k
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SideBar;
