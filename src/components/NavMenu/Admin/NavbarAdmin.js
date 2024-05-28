import React from 'react'
import { NavLink } from 'react-router-dom';

const NavbarAdmin = () => {
  return (
    <div>
     <div className='text-center'>
            <div className="list-group ">
                <h6>Tài khoản cá nhân</h6>
                <NavLink to="/dashboard/admin/category" className="list-group-item list-group-item-action">
                    Quản lý danh mục
                </NavLink>
                <NavLink to="/dashboard/admin/food" className="list-group-item list-group-item-action">
                    Quản lý món ăn
                </NavLink>
                <NavLink to="/dashboard/admin/ingredient" className="list-group-item list-group-item-action">
                    Quản lý nguyên liệu
                </NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
                    Profile
                </NavLink>
            </div>
        </div>  
    </div>
  );
}

export default NavbarAdmin