import React, { Suspense } from "react";
import CartProvider from "./components/context/cart-context";
import { lazy } from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/basics/loader.js";
import PrivateRoute from './components/pages/private-route'

const Landing = lazy(() => import("./components/pages/landing"));
const Store = lazy(() => import("./components/pages/store"));
const Categories = lazy(() => import("./components/pages/styled-store"));
const ProductPage = lazy(() => import("./components/pages/product-page"));
const Cart = lazy(() => import("./components/pages/cart"));
const Admin = lazy(() => import("./components/pages/admin"));
const NotFound = lazy(() => import("./components/pages/404"));
const Contact = lazy(() => import("./components/modules/contact"));
const Footer = lazy(() => import("./components/modules/footer"));
const Login = lazy(() => import("./components/pages/login"));


function App() {

  return (
    <CartProvider>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/categories" component={Categories} />
            <Route path="/store" component={Store} />
            <Route path="/cart" component={Cart} />
            <Route path="/sneaker:(.*)" component={ProductPage} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <div className="page">
          <Contact />
          <Footer />
        </div>
      </Suspense>
    </CartProvider>
  );
}

export default App;
