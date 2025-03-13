import React, { useEffect, useState } from 'react';
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
import SystemAdmin from './components/SystemAdmin';
import { Container } from 'react-bootstrap';
import UserSession from './utility/userSession';
import { UserModel } from './models/userModel';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';
import { Envelope, Phone, PhoneFill, TelephoneForward, TelephoneForwardFill } from 'react-bootstrap-icons';

function App() {
  const [user, setUser] = useState<UserModel | null>(null);
  // const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const userData = JSON.parse(sessionStorage.getItem('user') || 'null');
  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    } else if (!userData) {
      setUser(null);
    }
  }, [user, userData]);
  return (
    <div className="hero_area">
      <ToastProvider>
        <Toast />
        <AuthProvider>
          <Header />
          <Container
            fluid
            className="pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
            style={{
              borderBottom: '0.05rem solid #90953B',
              marginTop: '5rem',
              color: 'black',
              backgroundColor: 'white',
              fontStyle: 'italic',
              padding: '10px',
            }}
          >
            {/* Contact Section */}
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <span className="me-3">Contacts:</span>
              <span>
                <TelephoneForward className="me-2" />
                +233 (0)506534737
              </span>
              <span className="ms-sm-4 mt-sm-0">
                <Envelope className="me-2" />
                alphalogiquetechnologies@gmail.com
              </span>
            </div>

            {/* User Welcome Message */}
            <div className="mt-md-0">
              {user?.username && <>Welcome! {user.username}</>}
            </div>
          </Container>


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
        <Information />
        <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;