import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
// import Cart from '../components/cart/Cart'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import Cart from '../pages/Cart'
import GetAllPets from '../pages/pets/GetAllPets'
import Products from '../pages/products/Products'
import Profile from '../pages/Profile'
import SingleProd from '../pages/products/Single/SingleProd'
import VetService from '../pages/VetService'
import PetDetails from '../pages/pets/petDetails/PetDetails'
import Adopt from '../pages/pets/petDetails/adopt/Adopt'
import Admin from '../pages/pets/admin/Admin'
import ErrorPage from '../pages/ErrorPage'
import NotFound from '../pages/NotFound'


const Routing = () => {

  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="error"element={<ErrorPage/>}/>
          <Route path="signup" element={<SignUp/>} />
           <Route path="login" element={<LogIn />} /> 
           <Route path="profile" element={<Profile/>} /> 
           <Route path="cart" element={<Cart/>} />
          <Route path="pet" element={<GetAllPets />} />
          <Route path="admin" element={<Admin />} />
          <Route path="pet_details" element={<PetDetails />} />
          <Route path="pet_details/adopt/:id" element={<Adopt/>}/>
           <Route path="product" element={<Products />} />
           <Route path="product/single/:id" element={<SingleProd />} />
           <Route path="vet" element={<VetService/>} />
           <Route path="*" element={<NotFound/>}/> 
        </Routes>
       
        <Footer/>
      </Router>
    </div>
  )


}

export default Routing