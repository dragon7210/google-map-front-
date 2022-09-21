import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { customurl } from "../../../constants/url";
import GoogleMap from "google-map-react";

const Home = () => {
  const [deliverys, setDeliverys] = useState([]);

  useEffect(() => {
    getDelivery();
  }, []);

  const getDelivery = async () => {
    const userInfo = cookie.load("userInfo");
    const all = await axios.post(customurl + "all", { userInfo });
    setDeliverys(all.data);
  };
  const onUpdate = () => {};

  const clickHandler = () => {};
  return (
    <>
      <div className="overflow-x-auto p-10">
        <div className=" h-[250px]">
          <table className="table table-zebra w-full text-center">
            <thead className="text-xs uppercase text-gray-400 ">
              <tr>
                <th>No</th>
                <th>Products</th>
                <th>Position lat</th>
                <th>Position lng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deliverys.map((delivery, index) => (
                <tr key={index} className="text-center">
                  <td className="">{index + 1}</td>
                  <td>{delivery.products}</td>
                  <td>{delivery.position_lat}</td>
                  <td>{delivery.position_lng}</td>
                  <td>
                    <button onClick={() => onUpdate()}>finish</button>
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
