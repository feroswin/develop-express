const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

const defaultState = {
  currentUser: {},
  isAuth: false
}

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false
      }

    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      }
    default:
      return state
  }
}

export const setUser = user => ({type:SET_USER, payload: user})
export const setLogout = () => ({type:LOGOUT})