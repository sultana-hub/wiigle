import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
// import Cart from '../components/cart/Cart'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import Cart from '../pages/Cart'
import GetAllPets from '../pages/GetAllPets'
import Products from '../pages/products/Products'
import Profile from '../pages/Profile'
import SingleProd from '../pages/products/Single/SingleProd'
import VetService from '../pages/VetService'
import PetDetails from '../pages/PetDetails'


const Routing = () => {

  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="signup" element={<SignUp/>} />
           <Route path="login" element={<LogIn />} /> 
           <Route path="profile" element={<Profile/>} /> 
           <Route path="cart" element={<Cart/>} />
          <Route path="pet" element={<GetAllPets />} />
          <Route path="pet_details" element={<PetDetails />} />
           <Route path="product" element={<Products />} />
           <Route path="product/single/:id" element={<SingleProd />} />
           <Route path="vet" element={<VetService/>} /> 
        </Routes>
       
        <Footer/>
      </Router>
    </div>
  )


}

export default Routing