import React, { useState } from 'react'
import logo from '../images/logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserSession from '../utility/userSession';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserModel } from '../models/userModel';
import Login from './Login';
import Register from './Register';

const Header = () => {
  const { user = {} as UserModel, isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth ?? {});
  const [userObject, setUserObject] = useState<UserModel>(user);
  const [roles, setRoles] = useState(UserSession.getroles());
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const itemsToCheck = ['admin', 'school_owner', 'government', 'employee', 'system_admin', 'datalogique_admin', 'datalogique_staff'];
  const systemAdminItems = ['system_admin', 'datalogique_admin', 'datalogique_staff']
  
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

   
  const handleRegisterUser = () => {
    setRegisterModalOpen(true);
  };
  
  const navItems = () => {
    return (roles && itemsToCheck.some(item => roles.includes(item)) ? (
      <>
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
      </>
    ) : (
      <>
       <Link to="/dashboard">FIND A SCHOOL</Link>
        <Link to="/stocks">EVENTS</Link>
        <Link to="#" onClick={handleRegisterUser}>SUBSCRIBE</Link>
        <Link to="/sorting">CONTACT US</Link>
        <Link to="/weighing">ABOUT US</Link>
        <Link to="#" onClick={handleLoginClick}>LOGIN</Link>
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
      <Login
        isOpen={loginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
        setLoginModalOpen={setLoginModalOpen}
      />
       <Register
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
      />
    </header>
    
  )
}

export default Header
