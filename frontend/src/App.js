import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calendar from './calendar/a_pages/Calendar'
import EditA from './calendar/a_pages/EditA'
import { TesteColor } from './calendar/a_pages/TesteColor'
import CaixaPage from './caixa/a_pages/CaixaPage'
import Clientes from './calendar/a_pages/Clientes'

function App() {
  return (

    <Router>
          <Routes>
            <Route exact path='/teste' element={<TesteColor/>}></Route>
            <Route exact path='/calendar/:unidade/:user' element={<Calendar />}></Route>
            <Route exact path='/clientes/:unidade/:user' element={<Clientes />}></Route>
            
            <Route exact path='/calendar/:unidade/:data/:user' element={<Calendar />}></Route>
            <Route exact path='/EditA/:unidade/:user' element={<EditA />}></Route>
            <Route exact path='/caixaAdmin/:unidade/:user' element={<CaixaPage admin={true}/>}></Route>
            <Route exact path='/caixa/:unidade/:user' element={<CaixaPage admin={false}/>}></Route>
          </Routes>

    </Router>



  );
}

export default App;