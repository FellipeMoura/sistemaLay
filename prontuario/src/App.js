import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/a_pages/Home'
import Container from './components/c_layouts/Container'
import Record from './components/a_pages/Record'
import Login from './components/a_pages/Login'
import { AuthProvider } from './components/e_contexts/AuthContext'
import Lancamentos from './components/a_pages/Lancamentos'
function App() {
  return (

    <Router>
      <Container customClass="min-height">
        <AuthProvider>
          <Routes>
            <Route exact path='/home' element={<Home />}></Route>
            <Route exact path='/control/:page' element={<Lancamentos />}></Route>
            <Route exact path='/login' element={<Login />}></Route>        
            <Route exact path="/prontuario/:iduser/:idrecord/:page" element={<Record />}></Route>
          </Routes>
          </AuthProvider>
      </Container>
    </Router>



  );
}

export default App;