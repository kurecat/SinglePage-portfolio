import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact"; 
import AboutMe from "./components/AboutMe";
import ScrollToTop from "./components/ScrollToTop"; // 🔥 스크롤 버튼 임포트 추가

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
      
      {/* 🔥 화면 최상단으로 가는 버튼 추가 */}
      <ScrollToTop />
    </div>
  );
}

export default App;