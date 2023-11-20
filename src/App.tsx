import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Information from './components/Information';
import { ToastProvider } from './utility/ToastContext';
import Toast from './utility/Toastify';
import Confirmation from './components/Confirmation';
import { AuthProvider } from './utility/AuthContext';
import RegisterSchool from './components/RegisterSchool';

function App() {
  return (
    <div className="hero_area">
      <ToastProvider>       
        <Toast />
        <AuthProvider>
        <Header />
          <Routes>
            <Route caseSensitive path="/" element={<Home />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/register-school" element={<RegisterSchool />} />
          </Routes>
        </AuthProvider>
        <Information />
        <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;
