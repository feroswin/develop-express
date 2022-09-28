import axios from "axios";


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