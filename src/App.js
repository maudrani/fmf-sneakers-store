import React from "react";
import Landing from "./components/pages/landing";
import Store from "./components/pages/store";
import Checkout from "./components/pages/checkout";
import CartProvider from "./components/context/cart-context";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/store" exact component={Store} />
          <Route path="/checkout" exact component={Checkout} />
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
