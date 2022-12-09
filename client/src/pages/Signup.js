import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isValidate, setIsValidate] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

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
        process.env.REACT_APP_API_ADDRESS + "auth/signup",
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
      navigate("/");
    } catch (error) {
      alert(
        `회원가입에 실패했습니다. 다시 시도해주세요: ${error.response.data.message}`
      );
    }
  };
  return (
    <div className="flex flex-col">
      <div>회원가입</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={inputValue.email}
          onChange={handleChange}
        />
        {isValidate.email ? (
          ""
        ) : (
          <div className="text-red-500">
            @이 포함된 이메일 주소를 입력해주세요.
          </div>
        )}
        <input
          type="password"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
        />
        {isValidate.password ? (
          ""
        ) : (
          <div className="text-red-500">비밀번호는 8자 이상이어야 합니다.</div>
        )}
        <button
          type="submit"
          disabled={!(isValidate.email && isValidate.password)}
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default Signup;
