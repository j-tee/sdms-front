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
  const itemsToCheck = ['admin', 'government', 'employee', 'system_admin', 'datalogique_admin', 'datalogique_staff'];
  const systemAdminItems = ['system_admin', 'datalogique_admin', 'datalogique_staff']
  const isValid = UserSession.validateToken();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast, setShowToast } = useContext(ToastContext);
  // console.log('isLoginModalOpen========', isLoginModalOpen);
  const handleLoginClick = () => {
    console.log('handleLoginClick called========', isLoginModalOpen);
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
      <Link to="/schools">SCHOOLS</Link>
    )
  }
  const accessControl = () => {
    return (
      isValid ? 
      <>
      <Link to="/register-school">REGISTER SCHOOL</Link>
      <Link to="#" onClick={handleLogoutClick}>LOGOUT</Link>
      </>  :
          <Link to="#" onClick={handleLoginClick}>LOGIN</Link>
    )
  }
  const navItems = () => {
    return (roles && itemsToCheck.some(item => roles.includes(item)) ? (
      <>
      {publicMenus()}
        {/* <Link to="/dashboard">FIND A SCHOOL</Link>
        <Link to="/stocks">EVENTS</Link>
        <Link to="/setup">SIGN UP</Link>
        <Link to="/feeding">LOGIN</Link>
        <Link to="/sorting">CONTACT US</Link>
        <Link to="/weighing">ABOUT US</Link> */}
        {roles && systemAdminItems.some(item => roles.includes(item)) ? (<Link to="/subscriptions">SUBSCRIPTIONS</Link>) : ('')}
        <Link to="/finances">BOOK KEEPING</Link>
        <Link to="/settings">SETTINGS</Link>
        <Link to="support">SUPPORT</Link>
        <Link to="/about">ABOUT</Link>
        {accessControl()}
      </>
    ) : (
      <>
      {publicMenus()}
        <Link to="/stocks">EVENTS</Link>
        <Link to="#" onClick={handleRegisterUser}>SIGNUP</Link>
        {accessControl()}
        <Link to="/sorting">CONTACT US</Link>
        <Link to="/weighing">ABOUT US</Link>
      </>
    ))
  }
  return (
    <header className="header_section">
      <div className="container">
        <Navbar className='navbar d-flex justify-content-between' expand="lg">
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
        </Navbar>
      </div>
      <Login isLoginModalOpen={isLoginModalOpen} onRequestClose={() => closeLoginModal()} />
      <Register
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
      />
    </header>

  )
}

export default Header
