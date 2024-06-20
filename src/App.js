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
import AddFood from './Page/Admin/FoodManager/AddFood';
import OutPage from './Page/Out';
import Members from './Page/Admin/MemberManager/Members';
import MenuFood from './Page/Users/Food/MenuFood';
import ProfileManager from './Page/Profile/ProfieManager';
import AddMembers from './Page/Profile/AddMembers';
import FoodSuggestions from './Page/Suggestions/FoodSuggestions';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main />} >
          <Route path="/" element={<Home />} />
          <Route path="/suggestions" element={<FoodSuggestions />} />
          <Route path="/menu" element={<MenuFood />} />
          <Route path="/menu/:categoryId" element={<MenuFood />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/out" element={<OutPage />} />
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
             <Route path="/dashboard/admin/addfood" element={<AddFood />} />
             <Route path="/dashboard/admin/member" element={<Members />} />
             <Route path="/dashboard/admin/profile" element={<ProfileManager />} />
             <Route path="/dashboard/admin/addmember" element={<AddMembers />} />
          </Route>
          <Route path="/dashboard/user" element={<DashboardUsers />} >
            <Route path="/dashboard/user/profile" element={<ProfileManager />} />
            <Route path="/dashboard/user/addmember" element={<AddMembers />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
