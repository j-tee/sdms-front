import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Information from './components/Information';
import { ToastProvider } from './utility/ToastContext';

function App() {
  return (
    <div className="hero_area">
      <ToastProvider>
      <Header />
      <Routes>
        <Route caseSensitive path="/" element={<Home />} />
      </Routes>
      <Information />
      <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;
