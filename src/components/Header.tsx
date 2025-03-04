import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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

const Header = () => {
  const {
    user = {} as UserModel,
    isLoggedIn,
    isLoading,
  } = useSelector((state: RootState) => state.auth ?? {});
  const [roles, setRoles] = useState(UserSession.getroles());
  const { openLoginModal, isLoginModalOpen, closeLoginModal } = useAuth();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (isLoggedIn) {
      setRoles(UserSession.getroles());
    }
  }, [isLoggedIn]);
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
          // window.location.reload();
          setTimeout(() => {
            // window.location.reload();
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            navigate("/");
          }, 1000);
        }
        if (response.meta.requestStatus === "rejected") {
          showToastify(
            `User log out action failed ${response.payload.error}`,
            "error"
          );
          sessionStorage.clear();
        }
      })
      .catch((error) => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        showToastify("User log out action failed " + error, "error");
      });
  };
  const commomMenu = () => {
    return (
      <>
        <Link to="/schools">SCHOOLS</Link>
        <Link to="support">SUPPORT</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/sorting">CONTACT US</Link>
        {!isValid && (
          <Link to="#" onClick={handleRegisterUser}>
            SIGNUP
          </Link>
        )}
        {accessControl()}
      </>
    );
  };
  const systemAdminMenu = () => {
    return (
      <>
        <Link to="/system-admin">SYSTEM ADMIN</Link>
        <Link to="/subscriptions">SUBSCRIPTIONS</Link>
        {commomMenu()}
      </>
    );
  };
  // const welcomeMessage = () => {
  //   return (
  //     <>
  //       <Container className="text-center pt-3">
  //         Welcome: {userInfo.username}
  //       </Container>
  //     </>
  //   );
  // }
  const parentMenu = () => {
    return (
      <>
        <Link to="/my-wards">MY WARDS</Link>
        {/* <Link to="/subscriptions">MY SUBSCRIPTIONS</Link> */}
        {commomMenu()}
      </>
    );
  };
  const schoolAdminMenu = () => {
    return (
      <>
        <Link to="/subjects">MY SCHOOLS</Link>
        <Link to="/lessons">LESSONS</Link>
        <Link to="/assessments">ASSESSMENTS</Link>
        <Link to="/report-evaluations">REPORTS / EVALUATIONS</Link>
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
        <Link to="/subscriptions">SUBSCRIPTIONS</Link>
        {commomMenu()}
      </>
    );
  };
  const accessControl = () => {
    return isValid ? (
      <>
        <Link to="#" onClick={handleLogoutClick}>
          LOGOUT
        </Link>
      </>
    ) : (
      <Link to="#" onClick={handleLoginClick}>
        LOGIN
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
              <Link to="/register-school">REGISTER SCHOOL</Link>
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
    // <header className="header_section">
    <>
      <Navbar
        className="navbar header_section d-flex justify-content-between mb-4 pb-4"
        fixed="top"
        expand="lg"
      >
        <Navbar.Brand href="/">
          <img src={logo} alt="Academia Logo" />
          <span>Alpha Logique</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex ml-auto flex-column flex-lg-row align-items-center gap-4 ">
            {navItems()}
          </Nav>
        </Navbar.Collapse>
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
      {/* {welcomeMessage()} */}
      
    </>

    // </header>
  );
};

export default Header;
