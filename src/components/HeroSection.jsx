import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-scroll"; // 🔥 react-scroll 임포트 추가

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

// framer-motion과 styled-components 결합: styled(motion.태그명)
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
  /* Link 컴포넌트가 button을 감싸면서 발생할 수 있는 레이아웃 틀어짐 방지 */
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
        {/* 애니메이션 속성은 그대로 사용 가능합니다 */}
        <Title
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          안녕하세요, <br />
          <span className="highlight">정동균</span>
          입니다.
        </Title>

        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          반도체, 디스플레이, 자동차 산업을 아우르는 MES 시스템 구축 경험을
          바탕으로 <br />
          효율적이고 안정적인 웹 서비스를 만들어갑니다.
        </Description>

        <ButtonGroup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* 🔥 Link 컴포넌트로 버튼을 감싸서 클릭 시 해당 id로 스크롤 이동하게 설정 */}
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