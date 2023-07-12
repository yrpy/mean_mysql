import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Index';
import { Routes, Route } from 'react-router-dom'
import Add from './components/add/Index';
import Home from './components/home/Index';
import Update from './components/update/Index';


function App() {
  return (
    <div className="container">
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
    </div>
  );
}

export default App;
