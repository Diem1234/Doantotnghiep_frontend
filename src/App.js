import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './layout/Users/Main/Main';
import About from './components/page/Users/About';
import Service from './components/page/Users/Service';
import Menu from './components/page/Users/Menu';
import Booking from './components/page/Users/Booking';
import Team from './components/page/Users/Team';
import Testimonial from './components/page/Users/Testimonial';
import Contact from './components/page/Users/Contact';
import Login from './Page/Auth/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
