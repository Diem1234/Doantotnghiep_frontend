import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../../context/auth';

const Navbar = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");}
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
            <a href="" className="navbar-brand p-0">
                <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
                {/* <!-- <img src="img/logo.png" alt="Logo"> --> */}
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0 pe-4">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    <Link to="/service" className="nav-item nav-link">Service</Link>
                    <Link to="/menu" className="nav-item nav-link">Menu</Link>
                    <div className="nav-item dropdown">
                        <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                        <div className="dropdown-menu m-0">
                            <Link to="/booking" className="dropdown-item">Booking</Link>
                            <Link to="/team" className="dropdown-item">Our Team</Link>
                            <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                        </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                    {!auth.user ? (
                        <>
                          <li className="nav-item">
                            <NavLink to="/register" className="nav-link">
                              Register
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/login" className="nav-link">
                              Login
                            </NavLink>
                          </li>
                        </>
                        ) : (
                          <>
                            <li class="nav-item dropdown">
                              <NavLink
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                {auth?.user?.name}
                                <i class="fa-regular fa-user"></i>
                                {/* <FaCaretDown /> */}
                              </NavLink>
                              <ul class="dropdown-menu">
                                <li>
                                  <NavLink
                                    to={`/dashboard/${
                                      auth?.user?.role === "admin" ? "admin" : "user"
                                    }`}
                                    className="dropdown-item"
                                  >
                                    Dashboard
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    onClick={handleLogout}
                                    to="/login"
                                    className="dropdown-item"
                                  >
                                    Logout
                                  </NavLink>
                                </li>
                              </ul>
                            </li>
                          </>
                        )}
                      
                </div>
                <a href="" className="btn btn-primary py-2 px-4">Book A Table</a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
