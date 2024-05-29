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
      title = 'Trang Chủ';
      break;
    case '/about':
      title = 'About Us';
      break;
    case '/service':
    title = 'Dịch Vụ';
    break;
    case '/menu':
      title = 'Menu Món Ăn';
      break;
    case '/booking':
      title = 'Đặt hẹn trước';
      break;
    case '/team':
        title = 'Danh mục';
        break;
    case '/testimoial':
        title = 'Testimonial'
        break;
    case '/contact':
        title = 'Liên Hệ'
        break;
    case '/dashboard/admin':
        title = 'Quản trị viên'
        break;
    case '/dashboard/user':
        title = 'Thông tin cá nhân'
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
      <Footer />
      <Hero/>
    </div>
  );
};

export default Main;
