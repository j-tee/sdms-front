import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Core
import './App.css';

// Shared - Contexts
import { ToastProvider, Toast } from '@shared/contexts';
import { AuthProvider } from '@shared/contexts';

// Shared - Layout
import { Footer } from '@shared/layout';

// Pages
import HomePage from '@pages/HomePage';
import SystemAdminPage from '@pages/SystemAdminPage';
import ConfirmationPage from '@pages/ConfirmationPage';
import RegisterSchoolPage from '@pages/RegisterSchoolPage';
import MyWardsPage from '@pages/MyWardsPage';
import FinancePage from '@pages/FinancePage';
import SchoolsPage from '@pages/SchoolsPage';
import SubscriptionsPage from '@pages/SubscriptionsPage';
import BranchesPage from '@pages/BranchesPage';
import CalendarPage from '@pages/CalendarPage';
import StaffPage from '@pages/StaffPage';
import AcademicsPage from '@pages/AcademicsPage';
import EnrolmentsPage from '@pages/EnrolmentsPage';
import OrganizationPage from '@pages/OrganizationPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import EmailPage from '@pages/EmailPage';
import InformationPage from '@pages/InformationPage';

function App() {
  return (
    <div className="hero_area">
      <ToastProvider>       
        <Toast />
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/register-school" element={<RegisterSchoolPage />} />
            <Route path="/resetPassword/:resetPasswordToken" element={<ResetPasswordPage />} />
            
            {/* Admin Routes */}
            <Route path="/system-admin" element={<SystemAdminPage />} />
            
            {/* Parent Routes */}
            <Route path="/my-wards" element={<MyWardsPage />} />
            
            {/* School Management Routes */}
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/branches/:schoolId" element={<BranchesPage />} />
            
            {/* School Operations Routes */}
            <Route path="/calendar/:schoolId/:branchId" element={<CalendarPage />} />
            <Route path="/staff/:schoolId/:branchId" element={<StaffPage />} />
            <Route path="/academics/:schoolId/:branchId" element={<AcademicsPage />} />
            <Route path="/enrolments/:schoolId/:branchId" element={<EnrolmentsPage />} />
            <Route path="/organization-structures/:schoolId/:branchId" element={<OrganizationPage />} />
            <Route path="/finance/:schoolId/:branchId" element={<FinancePage />} />
            
            {/* Other Routes */}
            <Route path="/email" element={<EmailPage />} />
          </Routes>
        </AuthProvider>
        <InformationPage />
        <Footer />
      </ToastProvider>
    </div>
  );
}

export default App;
