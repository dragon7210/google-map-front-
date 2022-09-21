import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfoEmail = useSelector((store) => store?.userInfo);
  const users = useSelector((store) => store?.users);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    users.forEach((user) => {
      if (user.email === userInfoEmail) {
        setUserInfo(user);
      }
    });
  }, []);

  const Logout = async (e) => {
    e.preventDefault();

    try {
      await axios.delete("http://localhost:5000/admin/logout");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link
          to="/admin/dashboard"
          className="btn btn-ghost normal-case text-xl"
        >
          Delivery Management System
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 mr-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center p-2 space-x-3 rounded-md hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/delivery"
            className="flex items-center p-2 space-x-3 rounded-md hover:text-white"
          >
            Delivery
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
                <span className="badge">New</span>
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
