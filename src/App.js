import Receitas from './pages/usuariosmain/receitas';
import CriarUsuario from './pages/usuariosmain/criarUsuario';
import SigIn from './pages/usuariosmain/sigIn/sigIn';
import ReceitaDetalhes from './pages/receitasdetelhes';
import UserDetail from './pages/userdetail';
import './App.css';
import { Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<SigIn/>}/>
        <Route path="/createUser" element={<CriarUsuario/>}/>
        <Route path='/Receitas' element={<Receitas/>}/>
        <Route path='/receita/:id' element={<ReceitaDetalhes/>} />
        <Route path='/userdetail' element={<UserDetail/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
