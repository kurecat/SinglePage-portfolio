import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// --- Styled Components ---
const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #646cff;
  color: #ffffff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #535bf2;
  }

  /* 모바일 화면에서는 버튼 크기와 위치를 살짝 조절 */
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 화면 스크롤 위치를 감지하는 함수
  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤을 300px 이상 내리면 버튼이 나타남
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 맨 위로 부드럽게 올라가는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // AnimatePresence를 통해 버튼이 생기고 사라질 때 애니메이션 적용
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          whileHover={{ y: -5 }} // 마우스 올렸을 때 살짝 위로 뜨는 효과
          whileTap={{ scale: 0.9 }} // 클릭했을 때 살짝 눌리는 효과
          aria-label="Scroll to top"
        >
          {/* 위로 향하는 화살표 SVG 아이콘 */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </ScrollButton>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;