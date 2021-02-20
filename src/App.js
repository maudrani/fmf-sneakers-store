import React, { Suspense } from "react";
import CartProvider from "./components/context/cart-context";
import { lazy } from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/basics/loader.js";

const Landing = lazy(() => import("./components/pages/landing"));
const Store = lazy(() => import("./components/pages/store"));
const ProductPage = lazy(() => import("./components/pages/product-page"));
const Cart = lazy(() => import("./components/pages/cart"));
const Admin = lazy(() => import("./components/pages/admin"));
const NotFound = lazy(() => import("./components/pages/404"));
const Contact = lazy(() => import("./components/modules/contact"));
const Footer = lazy(() => import("./components/modules/footer"));

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/store" component={Store} />
            <Route path="/cart" component={Cart} />
            <Route path="/sneaker:(.*)">
              <ProductPage />
            </Route>
            <Route path="/admin" component={Admin} />
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
