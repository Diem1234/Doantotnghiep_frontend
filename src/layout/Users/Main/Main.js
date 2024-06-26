import React, { useEffect } from "react";
import Spinner from "../../../components/Users/Spinner/Spinner";
import Service from "../../../components/Users/Service/Service";
import About from "../../../components/Users/About/About";
import Menu from "../../../components/Users/Menu/Menu";
import Reservation from "../../../components/Users/Reservation/Reservation";
import Team from "../../../components/Users/Team/Team";
import Testimonial from "../../../components/Users/Testimonial/Testimonial";
import Footer from "../Footer/Footer";
import Hero from "../../../components/Users/Hero/Hero";
import Header from "../Header/Header";
import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../../context/auth";

const Main = () => {

  return (
    <div className="container-xxl bg-white p-0">
      {/* <Spinner /> */}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Hero />
    </div>
  );
};

export default Main;
