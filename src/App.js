import React, { Suspense, useRef, useState } from "react";
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

function App() {
  const containerRef = useRef(null);
  const [showContact, setShowContact] = useState(false);

  return (
    <CartProvider>
      <Suspense fallback={<Loader transparent={false} />}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
          }}
          watch={
            [
              //...all the dependencies you want to watch to update the scroll
            ]
          }
          containerRef={containerRef}
        >
          <div
            data-scroll-container
            id="App"
            ref={containerRef}
            style={{ transition: "0s" }}
          >
            <Router>
              <Switch>
                <Route path="/" exact>
                  <Landing setShowContact={setShowContact} />
                </Route>
                <Route path="/categories">
                  <Categories setShowContact={setShowContact} />
                </Route>
                <Route path="/store/:page?/:search?">
                  <Store setShowContact={setShowContact} />
                </Route>
                <Route path="/cart">
                  <Cart setShowContact={setShowContact} />
                </Route>
                {/*  <Route path="/artists" component={Artists} /> */}
                <Route path="/sneaker:(.*)">
                  <ProductPage setShowContact={setShowContact} />
                </Route>
                <PrivateRoute path="/admin" >
                    <Admin setShowContact={setShowContact} />
                </PrivateRoute>
                <Route path="/login" component={Login} />
                <Route component={NotFound} >
                  <NotFound setShowContact={setShowContact} />
                </Route>
              </Switch>
              <div className="page" data-scroll-section>
                {showContact && <Contact />}
                <Footer />
              </div>
            </Router>
          </div>
        </LocomotiveScrollProvider>
      </Suspense>
    </CartProvider>
  );
}

export default App;
