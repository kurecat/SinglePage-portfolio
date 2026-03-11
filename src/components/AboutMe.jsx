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
  gap: 60px; /* 섹션 간 간격 확대 */
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

// 🔥 핵심 가치관 영역 스타일 추가
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
    threshold: 0.1, // 애니메이션 발동 기준점 살짝 조정
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
            "복잡한 제조 공정을 <strong>직관적인 웹 UI</strong>로 풀어냅니다."
          </p>
          <p style={{ margin: 0 }}>
            안녕하세요, <span className="highlight">MES(생산관리시스템) 도메인 특화 프론트엔드 개발자 정동균</span>입니다.
            반도체 및 디스플레이 등 산업 현장의 대용량 데이터를 다루고, 사용자 친화적인 웹 솔루션을 구축한 경험이 있습니다.
          </p>
        </Description>

        {/* 🔥 핵심 가치관 영역 추가 */}
        <ValuesContainer
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ValueBox variants={itemVariants}>
            <h3>🎯 User-Centric UI</h3>
            <p>작업자가 현장에서 마주하는 복잡한 데이터들을 빠르고 정확하게 인지할 수 있도록, 렌더링 성능과 직관적인 화면 설계에 집중합니다.</p>
          </ValueBox>
          <ValueBox variants={itemVariants}>
            <h3>💡 Domain Knowledge</h3>
            <p>단순한 화면 구성을 넘어 BOM, POP 등 제조업 핵심 프로세스를 이해하고, 이를 바탕으로 백엔드 및 현장 설비와 유기적으로 통신하는 코드를 작성합니다.</p>
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