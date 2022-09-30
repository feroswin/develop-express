import React, {useState} from 'react';
import Input from "../UI/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  return (
    <div className="login">
      <div className="login__header">Вход</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
      <button className="login-btn" onClick={()=> dispatch(login(email, password))}>Войти</button>
    </div>
  );
};

export default Login;