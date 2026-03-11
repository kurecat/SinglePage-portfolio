import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- 데이터 정의 (교육 과정 및 이미지 기반 최적화) ---
// AJAX / JSON "PL/SQL" "MyBatis / JDBC"
const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "HTML5 / CSS3", "Axios"],
  },
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "C#", "REST API", "JSON Web Token"],
  },
  {
    title: "Database",
    skills: ["OracleDB", "MySQL", "MongoDB"],
  },
  // {
  //   // 🔥 이 포트폴리오의 가장 큰 차별점인 도메인 지식 강조
  //   title: "MES Domain Knowledge", 
  //   skills: ["스마트 팩토리", "BOM / MRP 설계", "공정/실적 관리 (POP)", "설비 연동 (PLC)", "KPI 대시보드"],
  // },
  {
    title: "Tools & Collaboration",
    skills: ["Git / GitHub", "Figma", "Notion.so"],
  },
];

// --- Styled Components ---
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background-color: #121212; /* AboutMe 섹션(#1a1a1a)과 대비되도록 어두운 톤 적용 */
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
  justify-content: center; /* 카드가 5개일 때 하단 2개가 예쁘게 가운데 정렬되도록 설정 */
`;

const CategoryCard = styled(motion.div)`
  background: #1e1e1e;
  padding: 30px 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid #2a2a2a;
  transition: all 0.3s ease;

  &:hover {
    border-color: #646cff;
    transform: translateY(-5px);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 25px;
  text-align: center;
  color: #ffffff;
  padding-bottom: 15px;
  border-bottom: 2px solid #333;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const SkillItem = styled(motion.li)`
  background: #2a2a2a;
  color: #cccccc;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: #646cff;
    color: white;
    transform: translateY(-3px);
  }
`;

// --- Framer Motion 애니메이션 설정 ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // 자식 요소들이 0.15초 간격으로 순차적 등장
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- 메인 컴포넌트 ---
const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Tech Stack & Domain
      </SectionTitle>

      <GridContainer
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {skillCategories.map((category, index) => (
          <CategoryCard key={index} variants={itemVariants}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <SkillList>
              {category.skills.map((skill, idx) => (
                <SkillItem key={idx}>{skill}</SkillItem>
              ))}
            </SkillList>
          </CategoryCard>
        ))}
      </GridContainer>
    </Section>
  );
};

export default Skills;