/* eslint-disable no-unused-vars */
import { React, useState } from "react";
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

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.prevertDefault();
    // console.log(e.target);
    // try {
    //   const response = await axios.post(process.env.REACT_APP_API_ADDRESS+'/auth/signup' , {
    //     email,
    //     password,
    //   });
    //   window.localStorage.setItem('token', response.access_token);
    //   alert('success', '환영합니다!');
    // } catch (error) {
    //   alert('fail', `로그인에 실패했습니다. 다시 시도해주세요: ${error}`);
    // }
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
        <button type="submit" disabled>
          확인
        </button>
      </form>
    </div>
  );
}

export default Signup;
