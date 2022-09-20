import Header from "../../components/Header";
import axios from "axios";
import { signupFields } from "../../constants/formField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/Input";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function SignupPage() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:5000/signup", {
        ...signupState,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
      }
    }
  };
  return (
    <div className="w-96 mt-48 mx-auto">
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <form className="mt-8 space-y-6">
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <div className="w-full flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
