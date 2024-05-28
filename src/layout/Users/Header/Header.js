import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import BreadcrumbNav from '../../../components/Users/BreadcrumbNav/BreadcrumbNav';
import Navbar from '../../../components/NavMenu/Navbar/Navbar';

const Header = ({ title }) => {
  const location = useLocation();

  // Determine if the current page is the home page
  const isHomePage = location.pathname === '/';
 
  return (
    <div className="container-xxl position-relative p-0">
      <Navbar />
      {!isHomePage && (
        <BreadcrumbNav title={title} breadcrumbItems={title} />
      )}
    </div>
  );
};

export default Header;