import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './layout/Users/Main/Main';
import Login from './Page/Auth/Login';
import Home from './Page/Home';
import Team from './components/Users/Team/Team';
import Testimonial from './components/Users/Testimonial/Testimonial';
import Contact from './components/Users/Contact/Contact';
import Reservation from './components/Users/Reservation/Reservation';
import About from './components/Users/About/About';
import Service from './components/Users/Service/Service';
import Menu from './components/Users/Menu/Menu';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} >
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Reservation />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
