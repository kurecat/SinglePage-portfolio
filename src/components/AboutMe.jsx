import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Styled Components ---
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #646cff;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
  gap: 60px;
`;

const Description = styled(motion.div)`
  font-size: 1.15rem;
  color: #cccccc;
  line-height: 1.8;
  text-align: center;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    color: #ffffff;
    font-weight: bold;
  }
  
  .highlight {
    color: #646cff;
    font-weight: bold;
  }
`;

const ValuesContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-top: 20px;
`;

const ValueBox = styled(motion.div)`
  flex: 1;
  min-width: 250px;
  background: rgba(100, 108, 255, 0.05);
  border-left: 4px solid #646cff;
  padding: 25px;
  border-radius: 0 12px 12px 0;
  text-align: left;
  
  h3 {
    color: #ffffff;
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    color: #aaaaaa;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    word-break: keep-all;
  }
`;

const InfoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const InfoCard = styled(motion.div)`
  background: #242424;
  padding: 25px 20px;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 120px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #646cff;
    transform: translateY(-5px);
    background: #2a2a2a;
  }
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  color: #646cff;
  margin: 0 0 10px 0;
`;

const InfoValue = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 500;
  margin: 0;
`;

// --- Framer Motion 애니메이션 설정 ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// --- 메인 컴포넌트 ---
const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section id="about">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        About Me
      </SectionTitle>

      <ContentWrapper ref={ref}>
        <Description
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p style={{ margin: 0, fontSize: "1.3rem", marginBottom: "15px" }}>
            "복잡한 데이터는 <strong>직관적</strong>으로, 사용자 경험은 <strong>매끄럽게</strong> 설계합니다."
          </p>
          <p style={{ margin: 0 }}>
            안녕하세요, <span className="highlight">B2B 제조 솔루션부터 B2C 웹 플랫폼까지 아우르는 프론트엔드 개발자 정동균</span>입니다.
            반도체 공정의 방대한 데이터를 다루는 MES 시스템과 결제 및 인증 흐름이 중요한 가전제품 구독 서비스를 구축하며, 
            유연하고 확장성 있는 프론트엔드 아키텍처를 끊임없이 고민해왔습니다.
          </p>
        </Description>

        {/* 🔥 메인 프로젝트 기반 핵심 가치관 영역 */}
        <ValuesContainer
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ValueBox variants={itemVariants}>
            <h3>📊 데이터 렌더링 최적화</h3>
            <p>반도체 MES 프로젝트를 진행하며 수많은 실시간 데이터를 지연 없이 렌더링하는 UI를 설계했습니다. 재사용 가능한 컴포넌트 구조를 통해 유지보수성을 높이고 화면 성능을 개선하는 데 집중합니다.</p>
          </ValueBox>
          <ValueBox variants={itemVariants}>
            <h3>🔒 안전하고 매끄러운 UX</h3>
            <p>가전제품 구독 서비스에서 JWT와 Spring Security를 활용한 프론트엔드 인증 로직을 구현했습니다. 복잡한 비즈니스 로직(결제, 구독) 속에서도 사용자가 길을 잃지 않는 직관적인 대시보드를 구축합니다.</p>
          </ValueBox>
        </ValuesContainer>

        <InfoGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <InfoCard variants={itemVariants}>
            <InfoLabel>Name</InfoLabel>
            <InfoValue>정동균</InfoValue>
          </InfoCard>
          
          <InfoCard variants={itemVariants}>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>충청남도 천안시</InfoValue>
          </InfoCard>

          <InfoCard variants={itemVariants}>
            <InfoLabel>Position</InfoLabel>
            <InfoValue>Frontend Developer</InfoValue>
          </InfoCard>
          
          <InfoCard variants={itemVariants}>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>ochant777@gmail.com</InfoValue>
          </InfoCard>
        </InfoGrid>
      </ContentWrapper>
    </Section>
  );
};

export default AboutMe;