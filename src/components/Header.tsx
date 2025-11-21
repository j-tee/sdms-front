import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserSession from "../utility/userSession";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { UserModel } from "../models/userModel";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../utility/AuthContext";
import { logoutUser } from "../redux/slices/authSlice";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import "./Header.css";

const Header = () => {
  const {
    user = {} as UserModel,
    isLoggedIn,
    isLoading,
  } = useSelector((state: RootState) => state.auth ?? {});
  const [roles, setRoles] = useState(UserSession.getroles());
  const { openLoginModal, isLoginModalOpen, closeLoginModal } = useAuth();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const gesRoles = ["supervisor", "staff", "director", "admin"];
  const schoolRoles = [
    "admin",
    "employee",
    "staff",
    "secretary",
    "parent",
    "student",
    "owner",
    "principal",
    "vice_principal",
    "bursar",
    "librarian",
    "counselor",
    "nurse",
    "security",
    "driver",
    "cleaner",
    "cook",
    "gardener",
    "watchman",
    "storekeeper",
    "other",
  ];
  const systemAdminRoles = ["system_admin", "admin", "staff"];
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
    dispatch(logoutUser())
      .then((response: any) => {
        setShowToast(true);
        if (response.meta.requestStatus === "fulfilled") {
          showToastify("User logged out successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        if (response.meta.requestStatus === "rejected") {
          showToastify(
            `User log out action failed ${response.payload.error}`,
            "error"
          );
          localStorage.clear();
        }
      })
      .catch((error) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        showToastify("User log out action failed " + error, "error");
      });
  };
  const commomMenu = () => {
    return (
      <>
        <Link to="/schools" className="nav-link-modern">Schools</Link>
        <Link to="support" className="nav-link-modern">Support</Link>
        <Link to="/about" className="nav-link-modern">About</Link>
        <Link to="/sorting" className="nav-link-modern">Contact</Link>
        {!isValid && (
          <Link to="#" onClick={handleRegisterUser} className="nav-link-modern btn-signup">
            Sign Up
          </Link>
        )}
        {accessControl()}
      </>
    );
  };
  const systemAdminMenu = () => {
    return (
      <>
        <Link to="/system-admin" className="nav-link-modern">System Admin</Link>
        <Link to="/subscriptions" className="nav-link-modern">Subscriptions</Link>
        {commomMenu()}
      </>
    );
  };
  const parentMenu = () => {
    return (
      <>
        <Link to="/my-wards" className="nav-link-modern">My Wards</Link>
        <Link to="/subscriptions" className="nav-link-modern">My Subscriptions</Link>
        {commomMenu()}
      </>
    );
  };
  const schoolAdminMenu = () => {
    return (
      <>
        <Link to="/subjects" className="nav-link-modern">My Schools</Link>
        <Link to="/lessons" className="nav-link-modern">Lessons</Link>
        <Link to="/assessments" className="nav-link-modern">Assessments</Link>
        <Link to="/report-evaluations" className="nav-link-modern">Reports</Link>
        {commomMenu()}
      </>
    );
  };
  const teacherMenu = () => {
    return (
      <>
        {/* <Link to="/subjects">SUBJECTS</Link>
        <Link to="/lessons">LESSONS</Link>
        <Link to="/assessments">ASSESSMENTS</Link>
        <Link to="/report-evaluations">REPORTS / EVALUATIONS</Link> */}
        {commomMenu()}
      </>
    );
  };
  const schoolMenus = () => {
    return (
      <>
        <Link to="/subscriptions" className="nav-link-modern">Subscriptions</Link>
        {commomMenu()}
      </>
    );
  };
  const accessControl = () => {
    return isValid ? (
      <>
        <Link to="#" onClick={handleLogoutClick} className="nav-link-modern btn-logout">
          Logout
        </Link>
      </>
    ) : (
      <Link to="#" onClick={handleLoginClick} className="nav-link-modern btn-login">
        Login
      </Link>
    );
  };
  const navItems = () => {
    switch (userInfo.userCategory) {
      case "Company":
        return systemAdminMenu();
      case "Staff":
        return (
          roles &&
          schoolRoles.some((item) => roles.includes(item)) && (
            <>{teacherMenu()}</>
          )
        );
      case "Owner":
        return (
          roles &&
          schoolRoles.some((item) => roles.includes(item)) && (
            <>
              <Link to="/register-school" className="nav-link-modern">Register School</Link>
              {schoolMenus()}
            </>
          )
        );
      case "Parent":
        return parentMenu();
      default:
        return commomMenu();
    }
  };

  return (
    <Navbar
      className="navbar-modern"
      fixed="top"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="brand-modern">
          <div className="brand-logo-wrapper">
            <img src={logo} alt="Academia Logo" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Alpha Logique</span>
            <span className="brand-tagline">School Management</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="modern-navbar-nav" className="navbar-toggler-modern">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="modern-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {navItems()}
          </Nav>
        </Navbar.Collapse>
      </Container>
      
      <Login
        isLoginModalOpen={isLoginModalOpen}
        onRequestClose={() => closeLoginModal()}
      />
      <Register
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
      />
    </Navbar>
  );
};

export default Header;
