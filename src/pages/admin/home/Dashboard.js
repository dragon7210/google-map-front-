import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EditSvg } from "../../../icon/edit.svg";
import { ReactComponent as RemoveSvg } from "../../../icon/remove.svg";
import { adminUrl } from "../../../constants/url";
import EditUserModal from "../../../components/modal/EditUserModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUsers } from "../../../store/slices/users";

const Dashboard = () => {
  const [id, setId] = useState("");
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((store) => store?.users);

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(adminUrl + "token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(adminUrl + "token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get(adminUrl + "users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUsers(response.data));
  };

  const onEdit = (id, index) => {
    setShowModal(true);
    setId(id);
    setIndex(index);
  };

  const onDel = async (id) => {
    await axios.delete(adminUrl + id).then((res) => {
      if (res.status === 200) {
        dispatch(deleteUser(id));
      }
    });
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-no-wrap">
        <div className="container mx-auto py-10 h-64 px-6">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead className="text-xs uppercase text-gray-400 ">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => onEdit(user.id, index)}
                        className="px-2"
                      >
                        <EditSvg className="w-4" />
                      </button>
                      <button onClick={() => onDel(user.id)} className="px-2">
                        <RemoveSvg className="w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal ? (
            <EditUserModal
              showModalOpen={showModal}
              setShowModal={setShowModal}
              id={id}
              index={index}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
