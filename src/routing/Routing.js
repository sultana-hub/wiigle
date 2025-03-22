import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { Suspense, lazy } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import LogIn from '../pages/users/LogIn'
import SignUp from '../pages/users/SignUp'
import Cart from '../pages/cart/Cart'
import GetAllPets from '../pages/pets/GetAllPets'
import Products from '../pages/products/Products'
import Profile from '../pages/users/Profile'
import SingleProd from '../pages/products/Single/SingleProd'
import VetService from '../pages/vetServices/VetService'
import PetDetails from '../pages/pets/petDetails/PetDetails'
import Adopt from '../pages/pets/petDetails/adopt/Adopt'
import Admin from '../pages/admin/Admin'
import AboutUs from '../pages/ui/AboutUs'
// import ErrorPage from '../pages/ErrorPage'
import ProtectedRoute from './isAuth'
import NotFound from '../pages/ui/NotFound'
import GeneralCheckUp from '../pages/vetServices/generalCheckUp/GeneralCheckUp'
import Vaccination from '../pages/vetServices/vaccine/Vaccination'
import Grooming from '../pages/vetServices/grooming/Grooming'
import Emergency from '../pages/vetServices/emergency/Emergency'
import TakeAppointment from '../pages/vetServices/TakeAppoinment'
import DeliveryStatus from '../pages/cart/DeliveryStatus'
import OrderHistory from '../pages/cart/OrderHistory'
import UploadPets from '../pages/pets/UploadPets'
import UploadPetDetails from '../pages/pets/petDetails/uploadDetails/UploadPetDetails'
import UploadProducts from '../pages/products/UploadProducts'
import EditSingle from '../pages/products/Single/EditSingle'
const ErrorPage=lazy(()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>resolve(import('../pages/ui/ErrorPage')))
  },2000)
})

const Routing = () => {

  return (
    <div>
      <Router>
        <Header />
        <Suspense fallback={
          <h3>
            ...Loading
          </h3>
        }>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="product" element={<Products />} />
          <Route path="pet_details" element={<PetDetails />} />
          <Route path="pet" element={<GetAllPets />} />
          <Route path="vet" element={<VetService />} />
          <Route path="general-checkup" element={<GeneralCheckUp/>}/>
          <Route path="vaccine" element={<Vaccination/>}/>
          <Route path="grooming" element={<Grooming/>}/>
          <Route path="emergency" element={<Emergency/>}/>
          <Route path="about" element={<AboutUs/>}/>
          {/* protected route */}
          <Route element={<ProtectedRoute/>}/>
          <Route path="vet-service" element={<TakeAppointment/>}/>
          <Route path="product/single/:id" element={<SingleProd />} />
          <Route path="product/edit/:id" element={<EditSingle />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="delivery" element={<DeliveryStatus />} />
          <Route path="user-order" element={<OrderHistory />} />
          <Route path="admin" element={<Admin />} />
          <Route path="pet_details/adopt/:id" element={<Adopt />} />
          {/* pet upload */}
          <Route path="pet_upload" element={<UploadPets />} />
          <Route path="pet_upload_details" element={<UploadPetDetails/>} />
          <Route path="products_upload" element={<UploadProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
        <Footer />
      </Router>
    </div>
  )


}

export default Routing