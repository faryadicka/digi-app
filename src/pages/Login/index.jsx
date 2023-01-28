import React from "react";
import "./styles.css";
import {
  BsPersonFill,
  BsFillKeyFill,
  BsEyeFill,
  BsEyeSlashFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [showAccount, setShowAccount] = React.useState(false);
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dataAccount = {
    email: "digi@admin.test",
    password: "123digi123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      dataAccount.email === input.email &&
      dataAccount.password === input.password
    ) {
      return navigate("/home");
    }
    setShowAccount(true);
  };

  return (
    <div className="login-container d-flex">
      <div className="left-content bg-secondary  d-flex justify-content-center align-items-center">
        <h4 className="text-white">WELCOME TO DIGI APP</h4>
      </div>
      <div className="right-content bg-success d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="email" className="label-input">
              User Name
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <BsPersonFill />
              </span>
              <input
                value={input.email}
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
                type="text"
                className="form-control"
                placeholder="input your username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="email"
              />
            </div>
            <p className="text-warning fw-bold">User : digi@admin.test</p>
          </div>
          <div className="d-flex flex-column position-relative">
            <label htmlFor="password" className="label-input">
              Password
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <BsFillKeyFill />
              </span>
              <input
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                }}
                value={input.password}
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                placeholder="input your password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="password"
              />
            </div>
            <p className="text-warning fw-bold">Password : 123digi123</p>
            <div
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
              className="eye"
            >
              {isShowPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </div>
          </div>
          <button type="submit" className="btn btn-secondary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
