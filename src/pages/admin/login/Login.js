import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../../../constants/formField";
import Input from "../../../components/Input";
import FormExtra from "../../../components/FormExtra";
import { adminUrl } from "../../../constants/url";
import cookie from "react-cookies";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function LoginPage() {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  useEffect(() => {
    cookie.save("userInfo", loginState.email);
  }, [loginState]);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (req, res) => {
    try {
      await axios.post(adminUrl + "login", {
        ...loginState,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response) {
      }
    }
  };
  return (
    <>
      <div className="w-30 mt-10 mx-auto">
        <Header heading="Login to your account" />
        <form className="mt-8 space-y-6 mx-6">
          <div className="-space-y-px">
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>

          <FormExtra />
          <div className="w-full flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
