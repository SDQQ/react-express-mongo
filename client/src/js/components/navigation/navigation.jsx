import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './navigation.scss'

const Navigation = () => {
  return (
    <nav className="nav nav-pills nav-fill flex-column row-8">
      <ul className="nav nav-pills nav-justify">
        <li className="nav-item mx-5">
          <NavLink to="/" exact className="nav-link text-white">
            Домашная
          </NavLink>
        </li>
        <li className="nav-item mx-5">
          <NavLink to="/posts" exact className="nav-link text-white">
            Посты
          </NavLink>
        </li>
        <li className="nav-item mx-5">
          <NavLink to="/register" exact className="nav-link text-white">
            Регистрация
          </NavLink>
        </li>
        <li className="nav-item mx-5">
          <NavLink to="/login" exact className="nav-link text-white">
            Логин
          </NavLink>
        </li>
        {/*<li className="nav-item mx-5">*/}
        {/*  <NavLink to="/test" exact className="nav-link text-white">*/}
        {/*    Test*/}
        {/*  </NavLink>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
};

export default Navigation;
