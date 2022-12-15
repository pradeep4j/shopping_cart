import React from "react";
import Navbar from "./components/navbar/Navbar";
//auth user
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import Allusers from "./components/auth/Allusers";
import Confirmuser from "./components/auth/Confirmuser";
import Useredit from "./components/auth/Useredit";
//customers created by auth user
//import Customer from "./components/customer/Customer";
//product components for admin user
import Createproducts from './components/products/Createproducts';
import Listproducts from './components/products/Listproducts';
import Home from "./components/Home";
import Modals from "./components/Modals";

//product components for normal users
import Productlisting from "./components/cart/Productlisting";
import Producttocarts from "./components/cart/Producttocarts";
import Cartpage from './components/cart/Cartpage';
import Shipping from './components/cart/Shipping';
import Payment from './components/cart/Payment';
import Placeorder from './components/cart/Placeorder';
import Orderlistpage from './components/cart/Orderlistpage';
//
import Orderproduct from './components/cart/Orderproduct';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <Navbar />
          <Routes>
              <Route exact path="/" element={<Productlisting />} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Allusers /></PrivateRoute>} /> 
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
              <Route path="/sign-up" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/user-profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/userEditFromAdminId/:id" element={<PrivateRoute><Useredit /></PrivateRoute>} />
              <Route path="/createproduct" element={<PrivateRoute><Createproducts /></PrivateRoute>} />
              <Route path="/listproduct" element={<PrivateRoute><Listproducts /></PrivateRoute>} />
              <Route path="/producttocart/:id" element={<Producttocarts />} />
              <Route path="/cart/:id" element={<Cartpage />} />
              <Route path="/placeorder" element={<PrivateRoute><Placeorder /></PrivateRoute>} />
              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><Productlisting /></PrivateRoute>} />
              <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
              <Route path='/order/:id' element={<PrivateRoute><Orderproduct /></PrivateRoute>} />
              <Route path='/orderpage' element={<PrivateRoute><Orderlistpage /></PrivateRoute>} />
              <Route path='/modal' element={<PrivateRoute><Modals /></PrivateRoute>} />
              <Route path='/user/confirm/:token' element={<Confirmuser />} />
          </Routes>
          <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
          />
    </Router>
  );
}

export default App;
