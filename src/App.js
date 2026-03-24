
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpComponent from './components/SignUpComponent';
import SignInComponent from './components/SignInComponent';
import GetProductComponent from './components/GetProductComponent';
import AddProductComponent from './components/AddProductComponent';
import MakeProductComponent from './components/MakePaymentComponent';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import NavbarComponent from './components/NavbarComponent';


function App() {
  return (
    <BrowserRouter>
    <div className="container-fluid">
      <div className="App">
      <NavbarComponent/>
      <header className="App-header">
        <h1>Orient Travel || Stress Free </h1>
        
      </header>
      
      <Routes>
        <Route path='/signup' element={<SignUpComponent/>} />
        <Route path='/signin' element={<SignInComponent/>} />
        <Route path='/' element={<GetProductComponent/>} />
        <Route path='/addproduct' element={<AddProductComponent/>} />
        <Route path='/makepayment' element={<MakeProductComponent/>} />
      </Routes>
    </div>

    </div>
    
    </BrowserRouter>
  );
}

export default App;
