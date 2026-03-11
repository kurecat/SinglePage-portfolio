import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-scroll";

// --- Styled Components 정의 ---

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  color: #ffffff;
  text-align: center;
  padding: 0 20px;
`;

const Content = styled.div`
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 20px;
  line-height: 1.3;

  .highlight {
    color: #646cff;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #aaaaaa;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;

  button {
    padding: 14px 28px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .primary-btn {
    background-color: #646cff;
    color: white;

    &:hover {
      background-color: #535bf2;
      transform: translateY(-2px);
    }
  }

  .secondary-btn {
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #ffffff;

    &:hover {
      background-color: #ffffff;
      color: #121212;
      transform: translateY(-2px);
    }
  }
`;

// --- 메인 컴포넌트 ---

const HeroSection = () => {
  return (
    <Section id="hero">
      <Content>
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          안녕하세요, <br />
          <span className="highlight">정동균</span>
          입니다.
        </Title>

        {/* 🔥 AboutMe 섹션과 이어지도록 포트폴리오의 핵심 메시지로 수정 */}
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          B2B 제조 솔루션(MES)부터 B2C 웹 플랫폼까지,<br />
          복잡한 데이터를 직관적인 UI로 풀어내며 매끄러운 사용자 경험을 설계합니다.
        </Description>

        <ButtonGroup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="projects" smooth={true} duration={500}>
            <button className="primary-btn">프로젝트 보기</button>
          </Link>
          
          <Link to="contact" smooth={true} duration={500}>
            <button className="secondary-btn">연락하기</button>
          </Link>
        </ButtonGroup>
      </Content>
    </Section>
  );
};

export default HeroSection;