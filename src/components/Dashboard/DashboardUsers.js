import React, { useEffect } from 'react'

import NavbarUser from '../NavMenu/Users/NavbarUser'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth';

const DashboardUsers = () => {
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        if (!auth.user) { 
          window.location.href = '/login';
        }
    }, [auth, setAuth]);
  return (
    <div>
        <div className='container-fluid m-3 p-3 mt-5'>
            <div className='row mt-2'>
                <div className='col-md-3'>
                    <NavbarUser/>
                </div>
                <div className='col-md-9'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardUsers