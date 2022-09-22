import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { customurl } from "../../../constants/url";
import GoogleMap from "google-map-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertDistance, getDistance } from "geolib";

import fromImg from "../../../icon/from.png";
import toImg from "../../../icon/to.png";

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

  // DistanceMatrixService();

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
                <th>Distance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deliverys?.map((delivery, index) => (
                <tr key={index} className="text-center">
                  <td className="">{index + 1}</td>
                  <td>{delivery.products}</td>
                  <td>
                    {delivery.from_lat.slice(0, 8)}&nbsp;:&nbsp;
                    {delivery.from_lng.slice(0, 8)}
                  </td>
                  <td>
                    {delivery.to_lat.slice(0, 8)}&nbsp;:&nbsp;
                    {delivery.to_lng.slice(0, 8)}
                  </td>
                  <td>
                    {convertDistance(
                      getDistance(
                        {
                          latitude: delivery.from_lat,
                          longitude: delivery.from_lng,
                        },
                        {
                          latitude: delivery.to_lat,
                          longitude: delivery.to_lng,
                        }
                      ),
                      "km"
                    )
                      .toString()
                      .slice(0, 6)}
                    km
                  </td>
                  <td>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-center">
                        <input
                          type="checkbox"
                          checked={delivery.status === 1 ? true : false}
                          className="toggle toggle-accent"
                          onChange={() =>
                            onUpdate(delivery.id, delivery.status)
                          }
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
            bootstrapURLKeys={{ key: "" }}
            defaultZoom={10}
            defaultCenter={{ lat: 19.076, lng: 72.8777 }}
            yesIWantToUseGoogleMapApiInternals
          >
            {deliverys.length > 0 &&
              deliverys.map((delivery, index) => (
                <span
                  key={index}
                  lat={delivery.from_lat}
                  lng={delivery.from_lng}
                  className="justify-center flex"
                >
                  <img src={fromImg} alt="from" className="w-5" />
                  {index + 1}
                </span>
              ))}
            {deliverys.length > 0 &&
              deliverys.map((delivery, index) => (
                <span
                  key={index}
                  lat={delivery.to_lat}
                  lng={delivery.to_lng}
                  className="justify-center flex"
                >
                  <img src={toImg} alt="to" className="w-5" />
                  {index + 1}
                </span>
              ))}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Home;
