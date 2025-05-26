import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./page/Home"
import {Toaster} from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./page/AllProducts";
import ProductCategory from "./page/ProductCategory";
import ProductDetails from "./page/ProductDetails";
import Cart from "./page/Cart";
import AddAddress from "./page/AddAddress";
import MyOrders from "./page/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./page/seller/SellerLayout";
import AddProduct from "./page/seller/AddProduct";
import ProductList from "./page/seller/ProductList";
import Orders from "./page/seller/Orders";
import Loading from "./components/Loading";
import ContactPage from "./components/ContactName";
function App() {
 
  const isSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller}=useAppContext();
  return (
    
    <div className="text-default min-h-screen text-gray-700 bg-white">
      
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}

      
      <Toaster/>

      <div className={`${ isSellerPath ? "":   " px-6 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path="/products/:category" element={<ProductCategory/>}/>
        <Route path="/products/:category/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/add-address" element={<AddAddress/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/loader" element={<Loading/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
          <Route index element={isSeller ? <AddProduct/> : null}/>
          <Route path="product-list" element={<ProductList/>}/>
          <Route path="orders" element={<Orders/>}/>
        </Route>
        
      </Routes>
      </div>
      {! isSellerPath && <Footer/>}
          </div>
)}

export default App
