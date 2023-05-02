import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Home from './components/a_pages/Home'
//import Pacientes from './components/a_pages/Pacientes'
import Container from './components/c_layouts/Container'
import Navbar from './components/c_layouts/Navbar'
//import Footer from './components/c_layouts/Footer'
import Record from './components/a_pages/Record'
import Resumo from './components/a_pages/Resumo'
// <Route exact path ="/pacientes" element={<Pacientes />}></Route>
function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path ="/" element={<Home />}></Route>       
          <Route exact path ="/prontuario/:iduser/:idrecord/:page" element={<Record />}></Route>
          <Route exact path ="/resumo" element={<Resumo/>}></Route>         
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
