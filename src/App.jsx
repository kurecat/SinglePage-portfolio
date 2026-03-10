import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact"; // 추가된 부분
import AboutMe from "./components/AboutMe";

function App() {
  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <HeroSection />
        <AboutMe />
        <Skills />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}

export default App;
