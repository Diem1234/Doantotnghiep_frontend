import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import "../../styles/buttonlogin.css";

import { useAuth } from "../../context/auth";
import axiosClient from "../../libraries/axiosClient";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate("");
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("api/v1/auth/login", {
        email,
        password,
      });
      const data = response.data;
      console.log(data.token);
  
      if (data && data.token) {
        // Set user info and token in AuthContext
        setAuth({
          user: data.user,
          token: data.token,
        });
  
        // Save user info and token in localStorage
        localStorage.setItem("token", JSON.stringify(data.token));
        alert("Login success!");
        navigate(location.state?.from || "/");
      } else {
        alert("Invalid response data");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  

  return (
    <div className="bg-login min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center ">
          <CCol md={8}>
            <CCardGroup className="shadow ">
              <CCard className="p-4 pt-5 pb-5 shadow">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-center text-primary">Đăng Nhập</h1>
                    <p className="text-medium-emphasis">
                      Nhập vào tài khoản của bạn
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" className="px-4 buttonlg">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">
                          <CButton color="link" className="px-0">
                            Quên mật khẩu?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 shadow card1 pt-5 pb-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h1 className="text-white">Bếp Việt</h1>
                    <p>
                     Bếp Việt mang đến nguồn cảm hứng vô tận để bạn khám phá và trải nghiệm nền ẩm thực đa dạng và độc đáo của Việt Nam.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3 "
                        active
                        tabIndex={-1}
                      >
                        Đăng Ký 
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
