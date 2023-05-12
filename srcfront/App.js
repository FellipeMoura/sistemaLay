import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Home from './components/a_pages/Home'
//import Pacientes from './components/a_pages/Pacientes'
import Container from './components/c_layouts/Container'
import Navbar from './components/c_layouts/Navbar'
//import Footer from './components/c_layouts/Footer'
import Record from './components/a_pages/Record'
import { useState } from 'react'
import Login from './components/a_pages/Login'
import { RequireAuth } from './components/e_contexts/Auth/RequireAuth'
// <Route exact path ="/pacientes" element={<Pacientes />}></Route>

//<Route exact path ='/login' element={ <Login login={login} setIsLogin={setIsLogin} setLogin={setLogin} /> }></Route>
function App() {
  return (
    <Router>
      <Container customClass="min-height">
        <Routes>         
          <Route exact path ='/' element={ <RequireAuth><Home /></RequireAuth>  }></Route>
          <Route exact path ="/prontuario/:iduser/:idrecord/:page" element={<RequireAuth><Record /></RequireAuth>}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;