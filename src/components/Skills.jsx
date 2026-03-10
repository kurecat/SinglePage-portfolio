import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- 데이터 정의 ---
const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML/CSS", "JavaScript", "React"],
  },
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "C#"],
  },
  {
    title: "Database & Architecture",
    skills: ["Database Design", "MES Systems", "UI Components"],
  },
];

// --- Styled Components ---
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background-color: #121212; /* Hero 섹션보다 살짝 밝은 톤으로 구분감 부여 */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #646cff;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  width: 100%;
  max-width: 1000px;
`;

const CategoryCard = styled(motion.div)`
  background: #242424;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const SkillItem = styled(motion.li)`
  background: #333;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

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
      staggerChildren: 0.2, // 자식 요소들이 0.2초 간격으로 순차적 등장
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- 메인 컴포넌트 ---
const Skills = () => {
  // 화면에 요소가 20% 이상 보일 때만 애니메이션 트리거
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Section id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Tech Stack
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
