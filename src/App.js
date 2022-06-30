import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout  from "./routes/checkout/checkout.component";
 
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} /> 
        {/* for nested routing, '*' is wildcard character which allows to nested routing for shop component. so 'shop/' is the parent for all the nested route inside the shop component. Here says, whatever the parameter value(*) for shop, render the <Shop/> component. (further routes can find inside the component) */}
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
