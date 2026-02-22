import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- 프로젝트 데이터 정의 ---
const projectData = [
  {
    id: 1,
    title: "반도체 공정 MES 시스템 구축",
    period: "2023.08 - 2024.02",
    description:
      "반도체 제조 라인의 생산 효율성을 극대화하고 실시간 데이터를 추적하기 위한 통합 시스템 설계 및 개발",
    role: "Full-stack Development",
    techStack: ["Java", "Spring Boot", "React", "Database Design"],
  },
  {
    id: 2,
    title: "디스플레이 제조 MES 고도화",
    period: "2024.03 - 2024.09",
    description:
      "디스플레이 생산 공정의 데이터 모니터링 강화 및 사용자 친화적인 UI 컴포넌트 최적화",
    role: "Frontend & UI Design",
    techStack: ["C#", "JavaScript", "HTML/CSS", "UI Components"],
  },
  {
    id: 3,
    title: "자동차 부품 생산 관리 시스템",
    period: "2024.10 - 현재",
    description:
      "자동차 부품 공장의 실시간 공정 모니터링 및 대용량 데이터베이스 아키텍처 설계",
    role: "Backend Architecture",
    techStack: ["Java", "Spring Boot", "SQL", "MES Systems"],
  },
];

// --- Styled Components ---
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background-color: #121212; /* Hero 섹션과 동일한 배경색으로 교차 배치 */
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
`;

const Card = styled(motion.div)`
  background: #1e1e1e;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 1px solid #2a2a2a;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  /* Hover 시 테두리 빛나는 효과 */
  &:hover {
    border-color: #646cff;
    box-shadow: 0 10px 30px rgba(100, 108, 255, 0.15);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const ProjectPeriod = styled.span`
  font-size: 0.85rem;
  color: #888888;
  margin-bottom: 20px;
  display: block;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.6;
  flex-grow: 1; /* 설명 영역이 남은 공간을 차지하도록 설정 */
  margin-bottom: 25px;
`;

const RoleBadge = styled.div`
  display: inline-block;
  background: rgba(100, 108, 255, 0.1);
  color: #646cff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 15px;
  width: fit-content;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechItem = styled.span`
  background: #2a2a2a;
  color: #aaaaaa;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

// --- Framer Motion 설정 ---
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    y: -10,
    transition: { duration: 0.3 },
  },
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Project Experience
      </SectionTitle>

      <GridContainer ref={ref}>
        {projectData.map((project, index) => (
          <Card
            key={project.id}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"
            // 카드마다 등장 시간을 조금씩 다르게(delay) 설정
            transition={{ delay: index * 0.2 }}
          >
            <RoleBadge>{project.role}</RoleBadge>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectPeriod>{project.period}</ProjectPeriod>
            <ProjectDescription>{project.description}</ProjectDescription>

            <TechList>
              {project.techStack.map((tech, idx) => (
                <TechItem key={idx}>{tech}</TechItem>
              ))}
            </TechList>
          </Card>
        ))}
      </GridContainer>
    </Section>
  );
};

export default Projects;
