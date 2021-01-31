import React from "react";
import Landing from "./components/pages/landing";
import Store from "./components/pages/store";
import Navbar from "./components/modules/navbar";
import Contact from "./components/modules/contact";
import Footer from "./components/modules/footer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/store" exact component={Store} />
      </Switch>
      <Contact />
      <Footer />
    </Router>
  );
}

export default App;
