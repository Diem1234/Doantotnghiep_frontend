import React from "react";
import Navbar from "../../../components/Users/Navbar/Navbar";
import Footer from './../../../layout/Users/Footer/Footer';
import Hero from './../../../components/Users/Hero/Hero';
import Contact from './../../../components/Users/Contact/Contact';
import BreadcrumbNav from "../../../components/Users/BreadcrumbNav/BreadcrumbNav";

const index = () => {
  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl position-relative p-0">
        <Navbar />
        <BreadcrumbNav title="Contact Us" breadcrumbItems="Contact"/>
      </div>
      <Contact />
      <Footer />
      <Hero />
    </div>
  );
};

export default index;
