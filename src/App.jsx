import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Quiz from "./Pages/Quiz.jsx";
import Home from "./Pages/Home.jsx";
import Admin from "./Pages/Admin.jsx"
import Lead from "./Pages/lead.jsx";
import Admin2 from "./Pages/buzzer.jsx";

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Home" element={<Home/> }/>
          <Route path="/Quiz" element={ <Quiz/> } />
          <Route path="/aAdmin" element={ <Admin/> } />
          <Route path="/leaderboard" element={ <Admin2/> } />
          <Route path="/lead" element={ <Lead/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}