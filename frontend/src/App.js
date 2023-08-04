import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/a_pages/Home'
//import Pacientes from './components/a_pages/Pacientes'
import Container from './components/c_layouts/Container'

//import Footer from './components/c_layouts/Footer'
import Record from './components/a_pages/Record'
import { useState } from 'react'
import Login from './components/a_pages/Login'
import { AuthProvider } from './components/e_contexts/AuthContext'
import Calendar from './calendar/a_pages/Calendar'
import Lancamentos from './components/a_pages/Lancamentos'
import EditA from './calendar/a_pages/EditA'
import { Sucess } from './calendar/a_pages/Sucess'
import { TesteColor } from './calendar/a_pages/TesteColor'



// <Route exact path ="/pacientes" element={<Pacientes />}></Route>

//<Route exact path ='/login' element={ <Login login={login} setIsLogin={setIsLogin} setLogin={setLogin} /> }></Route>
function App() {
  return (

    <Router>
      <Container customClass="min-height">
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/s' element={<Sucess />}></Route>
            <Route exact path='/teste' element={<TesteColor/>}></Route>
            <Route exact path='/control' element={<Lancamentos />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path="/prontuario/:iduser/:idrecord/:page" element={<Record />}></Route>

            <Route exact path='/calendar/:unidade/:user' element={<Calendar />}></Route>
            <Route exact path='/calendar/:unidade/:data/:user' element={<Calendar />}></Route>
            <Route exact path='/EditA/:unidade/:atendente/:user' element={<EditA />}></Route>
          </Routes>
          </AuthProvider>
      </Container>
    </Router>



  );
}

export default App;