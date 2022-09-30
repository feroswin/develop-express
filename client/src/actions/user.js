import axios from "axios";
import {setUser} from "../reducers/userReducer";


export const registration =  async (first_name, last_name, email, password, phone) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/registration', {
      first_name,
      last_name,
      email,
      password,
      phone
    })
    alert(response.data.message);
  } catch (e) {
    alert(e)
  }
}


export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
    } catch (e) {
      alert(e)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/auth', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
    } catch (e) {
      localStorage.removeItem('token')
    }
  }
}

// export const logout = () => {
//   return dispatch => {
//     try {
//       dispatch(setLogout())
//     } catch (e) {
//       alert(e)
//     }
//   }
// }