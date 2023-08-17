import React, { useRef } from "react";
import "./SignIn.css";
import customAxios from "../../axios";
import { useNavigate } from "react-router-dom";


function SignIn({ changeUser }) {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const [{ value: username }, { value: password }] = formRef.current;
      if (username.trim() && password.trim()) {
          const { data } = await customAxios.get(`/users?username=${username}`);
          if (data.length && data.at(0)?.password === password) {
            changeUser(data[0]);
            navigate("/");
        } else {
          alert("Error");
        }
    }

    formRef.current.reset();
  };
  return (
    <div className="signInContainer">
      <h1 className="">
        WRITE YOUR USERNAME AND PASSWORD HERE
      </h1>
      <form ref={formRef} onSubmit={handleSubmit}>
          <input
            defaultValue={"test1"}
            type="text"
            placeholder="username"
          />
          <input defaultValue={"123456"} type="password" placeholder="password" />
          <div className="btns">
            <button className="signUpButton" onClick={() => navigate("/auth/signup")}>
                Create New Account
            </button>
            <button className="signinBtn">Sign In</button>
          </div>
      </form>
    </div>
  );
}

export default SignIn;
