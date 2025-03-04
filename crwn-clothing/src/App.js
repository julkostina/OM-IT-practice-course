import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <div>
      <h1>I am the navigation bar</h1>
    </div>
    <Outlet/>
    </div>
  );
};
const Shop = () => {
  return (
    <div>
      <h1>Hi, I am the shop page!</h1>
    </div>
  );
};
const  App = ()=> {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}> 
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />}/>
      </Route>

    </Routes>
    
  );
}
export default App;
