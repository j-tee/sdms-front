import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
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
import SystemAdmin from './components/SystemAdmin';

const useChromeSelectDropdownFix = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const userAgent = window.navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent) && !/OPR/.test(userAgent);
    if (!isChrome) {
      return;
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'SELECT') {
        document.body.classList.add('chrome-select-open');
      }
    };

    const handleFocusOut = () => {
      window.requestAnimationFrame(() => {
        const activeElement = document.activeElement as HTMLElement | null;
        if (!activeElement || activeElement.tagName !== 'SELECT') {
          document.body.classList.remove('chrome-select-open');
        }
      });
    };

    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('focusout', handleFocusOut, true);

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('focusout', handleFocusOut, true);
      document.body.classList.remove('chrome-select-open');
    };
  }, []);
};

function App() {
  useChromeSelectDropdownFix();

  return (
    <div className="hero_area">
      <ToastProvider>       
        <Toast />
        <AuthProvider>
          <Routes>
            <Route caseSensitive path="/" element={<Home />} />
            <Route path="/system-admin" element={<SystemAdmin />} />
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
        <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;
