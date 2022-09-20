import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constants/url";
import AddDileveryModal from "../../components/modal/AddDileveryModal";
import { ReactComponent as RemoveSvg } from "../../icon/remove.svg";

const Delivery = () => {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const users = async () => {
      const allDilvery = await axios.get(url + "delivery/all");
      setAll(allDilvery.data);
    };
    users();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const addDilevery = () => {
    setShowModal(true);
  };

  const onDel = async (id, index) => {
    await axios.delete(url + "delivery/" + id).then((res) => {
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
            <label className="mr-4 mt-2">Name:</label>
            <input
              type="text"
              name="filter"
              id="filter"
              className="block w-36 rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 mr-4 h-10"
              placeholder="Name search"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {all
                .filter((item) => {
                  if (!filter) {
                    return true;
                  }
                  return item.name.includes(filter);
                })
                .map((element, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{element.name}</td>
                    <td>{element.products}</td>
                    <td>{element.position_lat}</td>
                    <td>{element.position_lng}</td>
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
