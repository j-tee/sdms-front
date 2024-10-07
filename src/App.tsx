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
import Schools from './components/School';
import BranchList from './components/BranchList';
import Calendar from './components/Calendar';
import Organisation from './components/Organisation';
import Enrolment from './components/Enrolment';
import StaffCard from './components/StaffCard';
import Academics from './components/Academics';
import MyWardCard from './components/MyWardCard';
import ResetPasswordComponent from './components/ResetPasswordComponent';
import Email from './components/Email';
import Finance from './components/Finance';
import Subscription from './components/Subscription';

function App() {
  return (
    <div className="hero_area">
      <ToastProvider>       
        <Toast />
        <AuthProvider>
          <Routes>
            <Route caseSensitive path="/" element={<Home />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/register-school" element={<RegisterSchool />} />
            <Route path="/my-wards" element={<MyWardCard />} />
            <Route path="/finance/:schoolId/:branchId" element={<Finance />} />
            <Route path="/schools/" element={<Schools />} />
            <Route path="/subscriptions/" element={<Subscription />} />
            <Route path="/branches/:schoolId" element={<BranchList />} />
            <Route path="/calendar/:schoolId/:branchId" element={<Calendar />} />
            <Route path="/staff/:schoolId/:branchId" element={<StaffCard />} />
            <Route path="/academics/:schoolId/:branchId" element={<Academics />} />
            <Route path="/enrolments/:schoolId/:branchId" element={<Enrolment />} />
            <Route path="/organisation-structures/:schoolId/:branchId" element={<Organisation />} />
            <Route path="/resetPassword/:resetPasswordToken" element={<ResetPasswordComponent />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </AuthProvider>
        <Information />
        <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;
