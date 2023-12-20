import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Navbar } from './Components/Navbar';
import ImgGenerator from './Components/ImgGenerator';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/generate' element={<ImgGenerator/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
