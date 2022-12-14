import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/todo");
    }
  });
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isValidate, setIsValidate] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      if (e.target.value.includes("@")) {
        setIsValidate({ ...isValidate, email: true });
      } else {
        setIsValidate({ ...isValidate, email: false });
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length >= 8) {
        setIsValidate({ ...isValidate, password: true });
      } else {
        setIsValidate({ ...isValidate, password: false });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_ADDRESS + "auth/signin",
        {
          email: inputValue.email,
          password: inputValue.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.localStorage.setItem("token", response.data.access_token);
      alert(`환영합니다, ${inputValue.email}님!`);
      navigate("/todo");
    } catch (error) {
      alert(
        `로그인에 실패했습니다. 다시 시도해주세요: ${error.response.data.message}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          name="email"
          value={inputValue.email}
          onChange={handleChange}
          className="w-full border-2 rounded-xl"
        />
        {isValidate.email ? (
          ""
        ) : (
          <div className="text-red-500 text-xs">
            @이 포함된 이메일 주소를 입력해주세요.
          </div>
        )}
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
          className="w-full border-2 rounded-xl"
        />
        {isValidate.password ? (
          ""
        ) : (
          <div className="text-red-500 text-xs">
            비밀번호는 8자 이상이어야 합니다.
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={!(isValidate.email && isValidate.password)}
        className={`px-3 bg-slate-300 rounded-md ${
          !(isValidate.email && isValidate.password) ? "cursor-not-allowed" : ""
        }`}
      >
        확인
      </button>
    </form>
  );
}

export default Login;
