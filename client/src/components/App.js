import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./login/Login";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
