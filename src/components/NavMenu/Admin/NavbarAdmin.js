import React, { useEffect } from 'react'
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
                <NavLink  className="dropend list-group-item list-group-item-action dropdown-toggle" data-bs-toggle="dropdown">
                    Quản lý nguyên liệu
                    </NavLink>
                    <ul className="dropdown-menu">
                        <li>
                            <NavLink to="/dashboard/admin/add_ingredient" className="dropdown-item">
                            Thêm nguyên liệu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/admin/ingredient" className="dropdown-item">
                            Danh sách nguyên liệu
                            </NavLink>
                        </li>
                    </ul>
          
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
                    Profile
                </NavLink>
            </div>
        </div>  
    </div>
  );
}

export default NavbarAdmin