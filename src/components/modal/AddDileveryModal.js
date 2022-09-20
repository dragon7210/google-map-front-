import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../constants/url";
import { MultiSelect } from "react-multi-select-component";
import { ProductList } from "../../constants/productList";
import GoogleMap from "google-map-react";

const AddDileveryModal = ({ showModalOpen, setShowModal }) => {
  const [all, setAll] = useState([]);
  const [deliveryInfo, setDilveryInfo] = useState({});
  const [selected, setSelected] = useState([]);
  const [pos, setPos] = useState([]);

  const clickHandler = (e) => {
    setPos([...pos, { lat: e.lat, lng: e.lng }]);
  };

  useEffect(() => {
    users();
  }, []);

  useEffect(() => {
    setDilveryInfo({
      ...deliveryInfo,
      selProduct: selected,
    });
  }, [selected]);

  const users = async () => {
    const all = await axios.get(url);
    setAll(all.data);
  };

  const selPeople = (e) => {
    setDilveryInfo({
      ...deliveryInfo,
      sel: e.target.value,
    });
  };
  const handleSubmit = async () => {
    await axios
      .post(url + "delivery/add", { deliveryInfo, pos })
      .then((res) => {
        if (res.status === 200) {
          setShowModal(false);
          window.location.reload("/dilevery");
        }
      });
  };

  return (
    <>
      {showModalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto  my-6 mx-auto">
              <div className="flex border-0 rounded-lg shadow-lg relative  flex-col w-[1200px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Delivery Products Information
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-4 w-full md:w-1/3 p-7">
                    <div>
                      <label>Select the dilevery</label>
                      <select
                        id="name"
                        onChange={selPeople}
                        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                      >
                        {all.map((user, index) => (
                          <option key={index} value={user.name}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>Select the Products</label>
                      <MultiSelect
                        options={ProductList}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </div>
                    <div>
                      <label>Position lat</label>
                      <input
                        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                        value={pos[0] && pos[0].lat}
                        readOnly
                      />
                    </div>
                    <div>
                      <label>Position lng</label>
                      <input
                        className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                        value={pos[0] && pos[0].lng}
                        readOnly
                      />
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      {/* {pos.length &&
                        deliveryInfo?.sel &&
                        deliveryInfo.selProduct.length} */}
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 h-[600px] p-5">
                    <GoogleMap
                      defaultZoom={10}
                      resetBoundsOnResize={true}
                      defaultCenter={{ lat: 47.36667, lng: 8.55 }}
                      onClick={clickHandler}
                    >
                      {pos.length > 0 &&
                        pos.map((_pos, index) => (
                          <span
                            key={index}
                            className="w-2 h-2 bg-black absolute -left-1 -top-1 rounded-full"
                            lat={_pos.lat}
                            lng={_pos.lng}
                          />
                        ))}
                    </GoogleMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddDileveryModal;
