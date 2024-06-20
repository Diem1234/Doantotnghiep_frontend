import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/auth';


const Navbar = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      window.localStorage.removeItem("token");
    
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
            <a href="" className="navbar-brand p-0">
                <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Bếp Việt</h1>
                {/* <!-- <img src="img/logo.png" alt="Logo"> --> */}
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0 pe-4">
                    <Link to="/" className="nav-item nav-link">Trang Chủ</Link>
                    <Link to="/menu" className="nav-item nav-link">Menu</Link>
                    <div className="nav-item dropdown">
                        <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Trang</Link>
                        <div className="dropdown-menu m-0">
                            <Link to="/booking" className="dropdown-item">Đặt hẹn trước</Link>
                            <Link to="/team" className="dropdown-item">Danh mục</Link>
                            <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                        </div>
                    </div>
                    <Link to="/contact" className="nav-item nav-link">Liên hệ</Link>
                    {!auth.user ? (
                        <>
                          <li className="nav-item">
                            <NavLink to="/register" className="nav-link">
                              Đăng Ký
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/login" className="nav-link">
                              Đăng nhập
                            </NavLink>
                          </li>
                        </>
                        ) : (
                          <>
                            <li className="nav-item dropdown">
                              <NavLink
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                {auth?.user?.name}
                                <i className="fa-regular fa-user"></i>
                                {/* <FaCaretDown /> */}
                              </NavLink>
                              <ul className="dropdown-menu">
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
                                    Đăng Xuất
                                  </NavLink>
                                </li>
                              </ul>
                            </li>
                          </>
                        )}
                      
                </div>
                <NavLink to="/suggestions" className="btn btn-primary py-2 px-4">Gợi ý món ăn</NavLink>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
