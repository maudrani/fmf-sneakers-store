import React from "react";
import Navbar from "./components/modules/navbar";
import Hero from "./components/modules/hero";
import About from "./components/modules/about";
import Contact from "./components/modules/contact";
import Footer from "./components/modules/footer";
import Store from "./components/store/store";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Store />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
