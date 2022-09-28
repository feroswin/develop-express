import React, {useState} from 'react';
import './registration.css'
import Input from "../UI/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  function fetchRegistration () {
    return registration(firstName, lastName, email, password, phone)
  }

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <Input value={firstName} setValue={setFirstName} type="text" placeholder="Введите имя"/>
      <Input value={lastName} setValue={setLastName} type="text" placeholder="Введите фамилию"/>
      <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
      <Input value={phone} setValue={setPhone} type="text" placeholder="+7(999)-999-99-99"/>
      <button className="registration_btn" onClick={fetchRegistration}>Зарегистрироваться</button>
    </div>
  );
};

export default Registration;