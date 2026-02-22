import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact"; // 추가된 부분

function App() {
  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <HeroSection />
        <Skills />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}

export default App;
