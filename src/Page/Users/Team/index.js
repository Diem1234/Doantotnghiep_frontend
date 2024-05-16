import React from "react";
import Navbar from "../../../components/Users/Navbar/Navbar";
import Hero from './../../../components/Users/Hero/Hero';
import Team from './../../../components/Users/Team/Team';
import Footer from './../../../layout/Users/Footer/Footer';
import BreadcrumbNav from "../../../components/Users/BreadcrumbNav/BreadcrumbNav";

const index = () => {
  return (
    <div class="container-xxl bg-white p-0">
      <div class="container-xxl position-relative p-0">
        <Navbar />
        <BreadcrumbNav title="Our Team" breadcrumbItems="Team"/>
      </div>
      <Team />
      <Footer />
      <Hero />
    </div>
  );
};

export default index;
