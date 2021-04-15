import React, { Suspense, useRef } from "react";
import CartProvider from "./components/context/cart-context";
import { lazy } from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/basics/loader.js";
import PrivateRoute from "./components/pages/private-route";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

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
const Artists = lazy(() => import("./components/pages/artists"));

function App() {

  const containerRef = useRef(null);

  return (
    <CartProvider>
      <Suspense fallback={<Loader />}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
          }}
          watch={
            [
              //...all the dependencies you want to watch to update the scroll
            ]
          }
          containerRef={containerRef}
        >
          <div data-scroll-container id="App" ref={containerRef}>
            <Router>
              <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/categories" component={Categories} />
                <Route path="/store" component={Store} />
                <Route path="/cart" component={Cart} />
                <Route path="/artists" component={Artists} />
                <Route path="/sneaker:(.*)" component={ProductPage} />
                <PrivateRoute path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </Router>
            <div className="page" data-scroll-section>
              <Contact />
              <Footer />
            </div>
          </div>
        </LocomotiveScrollProvider>
      </Suspense>
    </CartProvider>
  );
}

export default App;
