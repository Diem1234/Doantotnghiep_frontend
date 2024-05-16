import React from "react";
import Navbar from "../../../components/Users/Navbar/Navbar";
import Menu from './../../../components/Users/Menu/Menu';
import Footer from './../../../layout/Users/Footer/Footer';
import Hero from './../../../components/Users/Hero/Hero';
import BreadcrumbNav from "../../../components/Users/BreadcrumbNav/BreadcrumbNav";

const index = () => {
  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl position-relative p-0">
        <Navbar />
        <BreadcrumbNav title="Food Menu" breadcrumbItems="Menu"/>
      </div>
      <Menu />
      <Footer />
      <Hero />
    </div>
  );
};

export default index;
