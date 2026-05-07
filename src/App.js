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
import logo from './mylogo.jpeg';
import ChatBotComponent from "./components/ChatBotComponent";
import { useState, useEffect } from "react";
import BookingComponent from "./components/BookingComponent";
import TermsComponent from "./components/TermsComponent";

function App() {
  const whatsappUrl = `https://wa.me/254748309616?text=${encodeURIComponent("Hello Orient Travellers! 👋 I visited your website and I'm interested in booking a trip. Could you please help me with travel packages, pricing, and availability? Thank you!")}`;
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="App">
          <NavbarComponent logo={logo}/>
          <header className="App-header">
            <h1>Orient Travel || Stress Free</h1>
          </header>
          <Routes>
            <Route path='/signup' element={<SignUpComponent/>} />
            <Route path='/signin' element={<SignInComponent/>} />
            <Route path='/' element={<GetProductComponent/>} />
            <Route path='/addproduct' element={<AddProductComponent/>} />
            <Route path='/makepayment' element={<MakeProductComponent/>} />
            <Route path="/booking" element={<BookingComponent/>} />
            <Route path="/terms" element={<TermsComponent />} />
          </Routes>
        </div>

        {/* WhatsApp Button */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={whatsappStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{width:"22px",height:"22px"}} fill="white">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.648 4.804 1.781 6.818L2 30l7.363-1.762A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.89-1.607l-.422-.25-4.37 1.045 1.076-4.256-.276-.437A11.6 11.6 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.29-8.68c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.893 1.118-1.094 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.913-2.381-.2-.344-.021-.53.15-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.603-.086-.172-.777-1.874-1.065-2.566-.28-.674-.566-.583-.777-.594l-.66-.011c-.23 0-.603.086-.919.43-.316.344-1.208 1.18-1.208 2.877s1.237 3.336 1.409 3.566c.172.23 2.435 3.717 5.899 5.212.824.356 1.467.569 1.969.728.827.263 1.58.226 2.175.137.663-.099 2.036-.832 2.323-1.635.287-.803.287-1.491.2-1.635-.086-.143-.316-.23-.66-.402z"/>
          </svg>
          <span style={{color:"white", fontWeight:"700", fontSize:"14px"}}>How can we help you?</span>
        </a>
      </div>

      {/* ChatBot outside container so Bootstrap doesn't interfere */}
      <ChatBotComponent />

    </BrowserRouter>
  );
}

const whatsappStyle = {
  position: "fixed",
  bottom: "100px",
  left: "24px",
  zIndex: 9998,
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#25D366",
  textDecoration: "none",
  padding: "12px 20px",
  borderRadius: "28px",
  boxShadow: "0 4px 16px rgba(37,211,102,0.5)",
};

export default App;