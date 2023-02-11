import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Pages/Home';
import Createpost from './Pages/Createpost';
import Posts from './Components/Posts';
import Postpage from './Pages/Postpage';
import Editpost from './Pages/Editpost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='home' element={<Home/>}>
          <Route path='' element={<Posts/>}/>
          <Route path='create' element={<Createpost/>}/>
          <Route path='postpage/:postid' element={<Postpage/>}/>
          <Route path='editpost/:postid' element={<Editpost/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
