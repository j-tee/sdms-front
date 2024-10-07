import React, { useContext, useState } from 'react'
import logo from '../images/logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSession from '../utility/userSession';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { UserModel } from '../models/userModel';
import Login from './Login';
import Register from './Register';
import { useAuth } from '../utility/AuthContext';
import { logoutUser } from '../redux/slices/authSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const Header = () => {
  const { user = {} as UserModel, isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth ?? {});
  const [roles, setRoles] = useState(UserSession.getroles());
  const { openLoginModal, isLoginModalOpen, closeLoginModal } = useAuth();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const itemsToCheck = ['admin', 'government', 'employee','teacher','parent', 'system_admin', 'datalogique_admin', 'datalogique_staff'];
  const systemAdminItems = ['system_admin', 'datalogique_admin', 'datalogique_staff']
  const isValid = UserSession.validateToken();
  const userInfo = UserSession.getUserInfo();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast, setShowToast } = useContext(ToastContext);
  const handleLoginClick = () => {
    openLoginModal();
  };


  const handleRegisterUser = () => {
    setRegisterModalOpen(true);
  };
  const handleLogoutClick = () => {
    dispatch(logoutUser()).then((response: any) => {
      setShowToast(true);
      if (response.meta.requestStatus === 'fulfilled') {
        showToastify('User logged out successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      if (response.meta.requestStatus === 'rejected') {
        showToastify(`User log out action failed ${response.payload.error}`, 'error');
        localStorage.clear();
      }
    }).catch((error) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      showToastify('User log out action failed ' + error, 'error');
    });;
  };
  const publicMenus = () => {
    return (
      <>
        <Link to="/my-wards">MY WARDS</Link>
        <Link to="/schools">SCHOOLS</Link>
        <Link to="/subscriptions">SUBSCRIPTIONS</Link>
      </>
    )
  }
  const accessControl = () => {
    return (
      isValid ?
        <>
          <Link to="/register-school">REGISTER SCHOOL</Link>
          <Link to="#" onClick={handleLogoutClick}>LOGOUT</Link>
        </> :
        <Link to="#" onClick={handleLoginClick}>LOGIN</Link>
    )
  }
  const navItems = () => {
    return (roles && itemsToCheck.some(item => roles.includes(item)) ? (
      <>
        {publicMenus()}
        {roles && systemAdminItems.some(item => roles.includes(item)) ? (<Link to="/subscriptions">SUBSCRIPTIONS</Link>) : ('')}
        <Link to="support">SUPPORT</Link>
        <Link to="/about">ABOUT</Link>
        {accessControl()}
      </>
    ) : (
      <>
        {publicMenus()}
        <Link to="/sorting">CONTACT US</Link>
        <Link to="/weighing">ABOUT US</Link>
        <Link to="#" onClick={handleRegisterUser}>SIGNUP</Link>
        {accessControl()}
      </>
    ))
  }
  return (
    // <header className="header_section">
    <Navbar className='navbar header_section d-flex justify-content-between mb-4 pb-4' fixed='top' expand="lg">
      <Navbar.Brand href="/"><img src={logo} alt="Academia Logo" />
        <span>
          Data Logique
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex ml-auto flex-column flex-lg-row align-items-center gap-4 ">
          {navItems()}
        </Nav>
      </Navbar.Collapse>
      <Login isLoginModalOpen={isLoginModalOpen} onRequestClose={() => closeLoginModal()} />
      <Register
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
      />
    </Navbar>

    // </header>

  )
}

export default Header
