import Home from "./routes/home/home.component";
import { useDispatch } from "react-redux";
import Navigation from "./routes/navigation/navigation.component";
import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import { useEffect } from "react";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/use.action";
const  App = ()=> { 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkUserSession())
 },[])
  return (
    <Routes>
      <Route path="/" element={<Navigation />}> 
        <Route index element={<Home />}/>
        <Route path="shop/*" element={<Shop />}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
    
  );
}
export default App;
