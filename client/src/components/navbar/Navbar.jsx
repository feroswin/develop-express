import React from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "../../reducers/userReducer";

const Navbar = () => {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__header">
          ExpressJS
        </div>
        {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
        {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
        {isAuth && <div className="navbar__registration" onClick={() => dispatch(setLogout())}>Выйти</div>}
      </div>
    </div>
  );
};

export default Navbar;