import { useEffect, useState } from "react";
import axios from "axios";
import { adminUrl } from "../../../constants/url";
import AddDileveryModal from "../../../components/modal/AddDileveryModal";
import { ReactComponent as RemoveSvg } from "../../../icon/remove.svg";

const Delivery = () => {
  const [all, setAll] = useState([]);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      users();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const users = async () => {
    const allDilvery = await axios.get(adminUrl + "delivery/all");
    setAll(allDilvery.data);
  };
  const addDilevery = () => {
    setShowModal(true);
  };

  const onDel = async (id, index) => {
    await axios.delete(adminUrl + "delivery/" + id).then((res) => {
      if (res.status === 200) {
        setAll((prev) => {
          const temp = prev.map((i) => i);
          temp.splice(index, 1);
          return temp;
        });
      }
    });
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-no-wrap">
        <div className="container mx-auto py-10 h-64 px-6">
          <div className="w-full flex justify-end">
            <div className="flex items-center mx-6">
              <div className="relative w-full mx-4">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      full-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="relative w-full mx-4">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      full-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Product"
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={addDilevery}>
              Add
            </button>
          </div>
          <table className="table table-zebra w-full mt-5">
            <thead className="text-xs uppercase text-gray-500 text-center ">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Dilevery Products</th>
                <th>Position lat</th>
                <th>Position lng</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {all
                .filter((item) => {
                  if (!name && !product) {
                    return true;
                  }
                  return (
                    item.products.includes(product) && item.name.includes(name)
                  );
                })
                .map((element, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <td>{element.products}</td>
                    <td>{element.position_lat}</td>
                    <td>{element.position_lng}</td>
                    <td>{element.status === 1 ? "Finish" : "Sending"}</td>
                    <td>
                      <button
                        onClick={() => onDel(element.id, index)}
                        className="px-2"
                      >
                        <RemoveSvg className="w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal ? (
        <AddDileveryModal
          showModalOpen={showModal}
          setShowModal={setShowModal}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Delivery;
