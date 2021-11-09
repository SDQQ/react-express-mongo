import React, { useState } from 'react'
import './login.scss'
import axios from 'axios'
import Notification from '../notification/notification'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/actions/set-user'
import Logedin from '../logedin/logedin'

const Login = () => {
  const dispatch = useDispatch()
  const state = useSelector(({ setUser }) => setUser)
  // console.log(state)
  const [formData, setFormDada] = useState({ username: null, password: null })
  const [formError, setFormError] = useState({
    userError: null,
    passwordError: null,
  })
  const [notification, setNotification] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // console.log(formData);
    const answear = await axios.post('/api/login', formData).catch((err) => {
      // console.log(err.response.data);
      try {
        const errArr = err.response.data.errors.errors
        let userE = errArr.find((item) => item.param === 'username') || null
        let passwordE = errArr.find((item) => item.param === 'password') || null
        userE = userE?.msg ?? null
        passwordE = passwordE?.msg ?? null
        // console.log(passwordE,userE)
        return setFormError({ userError: userE, passwordError: passwordE })
      } catch (e) {}

      if (err.response.data.message) {
        return setFormError((oldData) => {
          return { ...oldData, userError: `${err.response.data.message}` }
        })
      }
    })
    if (answear) {
      localStorage.setItem('token', `${answear.data.token}`)
      dispatch(getUser())
      // console.log(user);
      setFormError({ userError: null, passwordError: null })
      return setNotification(true)
    }
  }

  const onChangeInput = (e, type) => {
    setFormDada((oldData) => {
      const data = { [type]: e.target.value }
      return { ...oldData, ...data }
    })
  }
  const onChangeNotification = () => {
    setNotification(false)
  }

  return (
    <>
      {notification ? (
        <Notification
          onChangeNotification={onChangeNotification}
          name={`${formData.username}`}
          type="login"
        />
      ) : null}
      {state ? (
        <Logedin userData={state} />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className={"col-6 p-5 rounded-3 shadow-lg login-form "}
          style={{ margin: '100px auto' }}
        >
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Ваш ник
            </label>
            <input
              autoFocus
              onChange={(e) => onChangeInput(e, 'username')}
              type="text"
              className="form-control text-black"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
            <div
              id="emailHelp"
              className={`form-text text-${
                formError.userError ? 'danger' : 'white'
              }`}
            >
              {formError.userError ? `${formError.userError}` : `Ваш ник`}
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
              onChange={(e) => onChangeInput(e, 'password')}
              type="password"
              className="form-control text-black"
              id="exampleInputPassword1"
            ></input>
            <div id="emailHelp" className="form-text text-white">
              {formError.passwordError
                ? `Убедитесь что ввели более 4х символов`
                : `Пароль должен содержать более 4х символов`}
            </div>
          </div>
          <button type="submit" className="btn btn-primary text-white">
            Login
          </button>
        </form>
      )}
    </>
  )
}

export default Login
