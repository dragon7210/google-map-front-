import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { customurl } from "../../../constants/url";
import GoogleMap from "google-map-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [deliverys, setDeliverys] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getDelivery();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getDelivery = async () => {
    const userInfo = cookie.load("userInfo");
    const all = await axios.post(customurl + "all", { userInfo });
    setDeliverys(all.data);
  };
  const onUpdate = (id, status) => {
    if (status === 1) {
      status = 0;
    } else {
      status = 1;
    }
    axios.post(customurl + "update/" + id, { status }).then((res) => {
      if (res.status === 200) {
        toast(res.data.msg);
      }
    });
  };
  const clickHandler = () => {};
  return (
    <>
      <div className="overflow-x-auto p-10">
        <div className=" ">
          <table className="table table-zebra w-full text-center">
            <thead className="text-xs uppercase text-gray-400 ">
              <tr>
                <th>No</th>
                <th>Products</th>
                <th>From</th>
                <th>To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deliverys?.map((delivery, index) => (
                <tr key={index} className="text-center">
                  <td className="">{index + 1}</td>
                  <td>{delivery.products}</td>
                  <td>
                    {delivery.from_lat}:{delivery.from_lng}
                  </td>
                  <td>
                    {delivery.to_lat}:{delivery.to_lng}
                  </td>
                  <td>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-center">
                        <input
                          type="checkbox"
                          checked={delivery.status === 1 ? true : false}
                          className="toggle toggle-accent"
                          onClick={() => onUpdate(delivery.id, delivery.status)}
                        />
                      </label>
                      <ToastContainer />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full h-[500px] mt-5">
          <GoogleMap
            defaultZoom={10}
            resetBoundsOnResize={true}
            defaultCenter={{ lat: 47.36667, lng: 8.55 }}
            onClick={clickHandler}
          ></GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Home;
