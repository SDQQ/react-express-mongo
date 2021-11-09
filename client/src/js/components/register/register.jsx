import React, { useState,useRef,useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Notification from "../notification/notification";

const Register = () => {
  const inputRef = useRef()
  const [formData, setFormDada] = useState({ username: null, password: null });
  const [formError, setFormError] = useState({
    userError: null,
    passwordError: null,
  });
  const [notification, setNotification] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const answear = await axios.post("/api/register", formData).catch((err) => {
      // console.log(err.response.data);
      try {
        const errArr = err.response.data.errors.errors;
        let userE = errArr.find((item) => item.param === "username") || null;
        let passwordE =
          errArr.find((item) => item.param === "password") || null;
        userE = userE?.msg ?? null;
        passwordE = passwordE?.msg ?? null;
        // console.log(passwordE,userE)
        return setFormError({ userError: userE, passwordError: passwordE });
      } catch (e) {}

      if (err.response.data.message) {
        return setFormError((oldData) => {
          return { ...oldData, userError: `${err.response.data.message}` };
        });
      }
    });
    // console.log(answear)
    if (answear) {
      return setNotification(true);
    }
  };
  useEffect(()=>{
    inputRef.current.focus()
  },[])

  const onChangeInput = (e, type) => {
    setFormDada((oldData) => {
      const data = { [type]: e.target.value };
      return { ...oldData, ...data };
    });
  };
  const onChangeNotification = () => {
    setNotification(false);
    setRedirect(true);
  };

  return (
    <>
      {notification ? (
        <Notification
          onChangeNotification={onChangeNotification}
          name={`${formData.username}`}
          type={"register"}
        />
      ) : null}
      {redirect ? <Redirect push to={`/login`} /> : null}
      <form
        onSubmit={onSubmitHandler}
        className={"col-6 shadow-lg p-5 rounded-3 reg-form "}
        style={{ margin: "100px auto" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">
            Ваше имя
          </label>
          <input
            ref ={inputRef}
            onChange={(e) => onChangeInput(e, "username")}
            type="text"
            className="form-control text-black"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
          <div
            id="emailHelp"
            className={`form-text text-${
              formError.userError ? "danger" : "white"
            }`}
          >
            {formError.userError
              ? `${formError.userError}`
              : `Имя которое будут все видеть`}
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-white"
          >
            Пароль
          </label>
          <input
            onChange={(e) => onChangeInput(e, "password")}
            type="password"
            className="form-control text-black"
            id="exampleInputPassword1"
          ></input>
          <div
            id="emailHelp"
            className={`form-text text-${
              formError.passwordError ? "danger" : "white"
            }`}
          >
            {formError.passwordError
              ? `Убедитесь что ввели более 4х символов`
              : `Пароль должен содержать более 4х символов`}
          </div>
        </div>
        <button type="submit" className="btn btn-primary text-white">
          Registration
        </button>
      </form>
    </>
  );
};

export default Register;
