import React from "react";
import Navbar from "./components/modules/navbar";
import Hero from "./components/modules/hero";
import About from "./components/modules/about";
import Contact from "./components/modules/contact";
import Store from "./components/store/store";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Store />
      <Contact />
    </div>
  );
}

export default App;
