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
  gap: 50px;
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

const InfoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

const InfoCard = styled(motion.div)`
  background: #242424;
  padding: 25px 20px;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  /* 🔥 추가된 부분: 카드 높이가 달라져도 내부 요소들을 완벽하게 정중앙에 배치 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 120px; /* 카드의 최소 높이를 주어 시각적 안정감 부여 */

  transition: all 0.3s ease;

  &:hover {
    border-color: #646cff;
    transform: translateY(-5px);
  }
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  color: #646cff;
  margin: 0 0 10px 0; /* 🔥 위쪽 마진을 없애서 밸런스 조정 */
`;

const InfoValue = styled.p`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 500;
  margin: 0; /* 🔥 p 태그의 기본 마진을 없애서 완벽한 가운데 정렬 유도 */
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
    threshold: 0.2,
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
          <p style={{ margin: 0 }}>
            안녕하세요! 복잡한 데이터를 직관적인 UI로 풀어내는 것을 즐기는 <strong>프론트엔드 개발자 정동균</strong>입니다.
          </p>
          <br />
          <p style={{ margin: 0 }}>
            국비지원 교육 과정과 실무 프로젝트를 통해 <span className="highlight">반도체, 디스플레이 등 다양한 산업군의 MES(생산관리시스템)</span>을 구축하며, 대용량 데이터 처리와 상태 관리에 대한 깊은 이해도를 쌓았습니다.
          </p>
          <p style={{ margin: "10px 0 0 0" }}>
            항상 <strong>사용자 경험(UX)</strong>을 최우선으로 생각하며, 안정적이고 유지보수가 용이한 코드를 작성하기 위해 끊임없이 고민하고 학습합니다.
          </p>
        </Description>

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