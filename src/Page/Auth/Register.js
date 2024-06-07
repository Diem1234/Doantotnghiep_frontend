import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { FaQuestion } from "react-icons/fa";
import axiosClient from '../../libraries/axiosClient';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {

    try {
      const response = await axiosClient.post('api/v1/auth/register', {
        email,
        password
      })
      console.log(response.data)
      // Handle successful registration, e.g., redirect to login page
      alert('Registration successful! You can now log in.')
      // Redirect the user to the login page
      window.location.href = '/login'
  

    } catch (error) {
      console.error(error)
      // Handle registration error, e.g., display an error message
    }
  }

  return (
    <div className="bg-forgot min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow card2 p-5">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className='text-center text-white mb-3'>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleRegister}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
