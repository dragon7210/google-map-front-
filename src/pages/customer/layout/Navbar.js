import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const temp = cookie.load("userInfo");
    setUserInfo(temp);
  }, []);

  const Logout = async (e) => {
    e.preventDefault();

    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost normal-case text-xl">
          Delivery Management System
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 mr-4">
          <Link
            to="/home"
            className="flex items-center p-2 space-x-3 rounded-md hover:text-white"
          >
            Home
          </Link>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt="avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/" className="justify-between">
                Profile
                <span className="badge">{userInfo}</span>
              </a>
            </li>
            <li>
              <a href="/" onClick={Logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
