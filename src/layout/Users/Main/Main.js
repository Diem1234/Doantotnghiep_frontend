import React from "react";
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
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();

  // Extract relevant information from the router context
  const { pathname } = location;
  let title = '';
  switch (pathname) {
    case '/':
      title = 'Home';
      break;
    case '/about':
      title = 'About Us';
      break;
    case '/service':
    title = 'Service';
    break;
    case '/menu':
      title = 'Food Menu';
      break;
    case '/booking':
      title = 'Booking';
      break;
    case '/team':
        title = 'Our Team';
        break;
    case '/testimoial':
        title = 'Testimonial'
        break;
    case '/contact':
        title = 'Contact Us'
        break;
    // Add more cases for other routes
    default:
      title = 'Page';
  }
  return (
    <div className="container-xxl bg-white p-0">
      {/* <Spinner /> */}
      <Header title={title} />
      <main>
        <Outlet/>
      </main>
      <Team/>
      <Footer />
      <Hero/>
    </div>
  );
};

export default Main;
