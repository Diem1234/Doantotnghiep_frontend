import React from 'react'
import NavbarAdmin from '../NavMenu/Admin/NavbarAdmin'
import { Outlet } from 'react-router-dom'

const DashboardAdmin = () => {
  return (
    <div>
        <div className='container-fluid m-3 p-3 mt-5'>
            <div className='row mt-2'>
                <div className='col-md-2'>
                    <NavbarAdmin/>
                </div>
                <div className='col-md-10'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardAdmin