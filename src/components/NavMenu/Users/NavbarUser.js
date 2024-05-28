import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarUser = () => {
  return (
    <div>
        <div className='text-center'>
            <div className="list-group">
                <h4>Tài khoản cá nhân</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                    Hồ sơ cá nhân
                </NavLink>
                <NavLink to="/dashboard/user/repassword" className="list-group-item list-group-item-action">
                    Đổi mật khẩu
                </NavLink>
                <NavLink to="/dashboard/user/goiy" className="list-group-item list-group-item-action">
                    Gợi ý
                </NavLink>
            </div>
        </div>  
        
    </div>
  )
}

export default NavbarUser