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
import NavbarAdmin from './components/NavMenu/Admin/NavbarAdmin';
import DashboardAdmin from './components/Dashboard/DashboardAdmin';
import DashboardUsers from './components/Dashboard/DashboardUsers';
import Categories from './Page/Admin/CategoryManager/Categories';
import Register from './Page/Auth/Register';
import Ingredients from './Page/Admin/IngredientManager/Ingredients';
import Foods from './Page/Admin/FoodManager/Foods';
import AddIngredient from './Page/Admin/IngredientManager/AddIngredient';
import FoodDetail from './Page/Users/Food/FoodDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/foodDetail/:id" element={<FoodDetail />} />
          <Route path="/booking" element={<Reservation />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard/admin" element={<DashboardAdmin />} >
             <Route path="/dashboard/admin/category" element={<Categories />} />
             <Route path="/dashboard/admin/ingredient" element={<Ingredients />} />
             <Route path="/dashboard/admin/add_ingredient" element={<AddIngredient />} />
             <Route path="/dashboard/admin/food" element={<Foods />} />
          </Route>
          <Route path="/dashboard/user" element={<DashboardUsers />} >

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
