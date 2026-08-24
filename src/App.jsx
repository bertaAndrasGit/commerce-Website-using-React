
import AuthProvider from "./context/AuthContext";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";
import ProductDetails from "./pages/ProductDetails";



function App() {

  


  return (
    <AuthProvider>
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/products/:id" element={<ProductDetails/>}></Route>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
