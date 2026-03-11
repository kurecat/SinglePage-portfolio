import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- 🌟 메인 프로젝트 데이터 ---
const mainProjects = [
  {
    id: 1,
    title: "반도체 패키징 공정 MES",
    period: "2026.01.15 - 2026.02.10",
    teamSize: "5명", // 🔥 작업 인원 추가
    description: "지능화된 생산관리 솔루션(MES-WEB)으로, 반도체 패키징 공정의 데이터 추적 및 생산 관리를 돕는 통합 웹 서비스 구축",
    detailedDescription: "이 프로젝트는 반도체 패키징 공정에서 발생하는 수많은 데이터를 실시간으로 모니터링하고 제어하기 위해 기획되었습니다. 프론트엔드 메인 개발자로서 React를 활용해 재사용 가능한 UI 컴포넌트를 설계하였고, 대용량 데이터 렌더링 최적화에 집중했습니다. 백엔드(Spring Boot, JPA)와의 원활한 API 통신 구조를 설계하여 안정적인 서비스를 구현했습니다.",
    role: "Main: FrontEnd | Sub: BackEnd",
    tools: "IntelliJ, VS Code, Figma",
    techStack: ["React", "Axios", "Java", "C#", "Spring Boot", "JPA", "JWT", "MySQL"],
    localVideoPath: `${import.meta.env.BASE_URL}videos/MES.mp4`, 
    githubUrl: "https://github.com/kurecat/mes_final_project_total", 
    localPdfPath: `${import.meta.env.BASE_URL}docs/MES.pdf`,
  },
  {
    id: 2,
    title: "가전제품 구독 서비스",
    period: "2025.12.10 - 2025.12.26",
    teamSize: "4명", // 🔥 작업 인원 추가
    description: "사용자 맞춤형 가전제품 대여 및 구독 내역을 관리하고 결제 흐름을 지원하는 웹 플랫폼 개발",
    detailedDescription: "사용자가 원하는 가전제품을 쉽게 찾아 구독하고, 관리자는 구독 현황 및 결제 내역을 파악할 수 있는 서비스입니다. 사용자 친화적인 대시보드 UI를 구성하고, Spring Security와 JWT를 활용한 로그인/인증 로직을 프론트엔드단에서 매끄럽게 처리하는 경험을 쌓았습니다.",
    role: "Main: FrontEnd | Sub: BackEnd",
    tools: "IntelliJ, VS Code, Figma",
    techStack: ["React", "Axios", "JavaScript", "Java", "Spring Boot", "Spring Security", "JPA", "MySQL"],
    localVideoPath: "", 
    githubUrl: "https://github.com/qdpnok/nurim", 
    localPdfPath: `${import.meta.env.BASE_URL}docs/NURIM.pdf`,
  },
];

const miniProjects = [
  {
    id: 3,
    title: "미니 프로젝트 예시",
    period: "2025.09 - 2025.10",
    teamSize: "1명 (개인)", // 🔥 미니 프로젝트 인원 추가
    description: "학습 목적으로 진행한 간단한 토이 프로젝트입니다.",
    detailedDescription: "React의 상태 관리와 styled-components의 활용법을 익히기 위해 진행한 개인 프로젝트입니다. 간단한 CRUD 기능을 구현했습니다.",
    role: "FrontEnd Development",
    tools: "VS Code",
    techStack: ["React", "JavaScript", "HTML/CSS"],
    localVideoPath: "", 
    githubUrl: "https://github.com/kurecat/mini-project",
    presentationUrl: "",
  }
];

// --- Styled Components ---
const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #646cff;
`;

const SectionSubtitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 40px;
  color: #aaaaaa;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
  justify-content: center;
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
  transition: all 0.3s ease;

  &:hover {
    border-color: #646cff;
    box-shadow: 0 10px 30px rgba(100, 108, 255, 0.15);
  }
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

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const ProjectInfoGroup = styled.div`
  margin-bottom: 20px;
`;

const ProjectInfoText = styled.span`
  font-size: 0.85rem;
  color: #888888;
  display: block;
  margin-bottom: 5px;

  strong { color: #aaaaaa; font-weight: 500; }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 25px;
  word-break: keep-all;
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

const DropdownButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 2px solid #333;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #646cff;
    background: rgba(100, 108, 255, 0.1);
  }

  .icon {
    transition: transform 0.3s ease;
    &.open { transform: rotate(180deg); }
  }
`;

// --- 모달창 Styled Components ---
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 16px;
  width: 100%;
  max-width: 850px; 
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  &::-webkit-scrollbar-thumb:hover { background: #646cff; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #aaaaaa;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
  line-height: 1;
  z-index: 10;

  &:hover { color: #ffffff; }
`;

const VideoContainer = styled.div`
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    max-height: 450px;
    object-fit: contain;
  }
`;

const PdfContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 600px; 
  border-radius: 8px;
  border: 1px solid #333;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #ffffff; 
  }
`;

const SectionSubHeading = styled.h4`
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 30px;
  margin-bottom: 15px;
  border-left: 4px solid #646cff;
  padding-left: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const ModalDetailedText = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  line-height: 1.8;
  margin-bottom: 30px;
  word-break: keep-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  a, button {
    display: inline-block;
    padding: 12px 24px;
    background: #333;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s;

    &:hover { background: #646cff; transform: translateY(-2px); }
  }
  .primary {
    background: #646cff;
    &:hover { background: #535bf2; }
  }
`;

// --- Framer Motion 설정 ---
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { y: -10, transition: { duration: 0.3 } },
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.3 } },
};

const accordionVariants = {
  hidden: { height: 0, opacity: 0, overflow: "hidden" },
  visible: { height: "auto", opacity: 1, overflow: "hidden", transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { height: 0, opacity: 0, overflow: "hidden", transition: { duration: 0.4, ease: "easeInOut" } }
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMiniOpen, setIsMiniOpen] = useState(false);
  
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      setShowPdf(false);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  return (
    <Section id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Project Experience
      </SectionTitle>
      
      <SectionSubtitle
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Main Projects
      </SectionSubtitle>

      <GridContainer ref={ref}>
        {mainProjects.map((project, index) => (
          <Card
            key={project.id}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"
            transition={{ delay: index * 0.2 }}
            onClick={() => setSelectedProject(project)}
          >
            <RoleBadge>{project.role}</RoleBadge>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectInfoGroup>
              <ProjectInfoText><strong>🗓 Period:</strong> {project.period}</ProjectInfoText>
              <ProjectInfoText><strong>👥Team:</strong> {project.teamSize}</ProjectInfoText>
              <ProjectInfoText><strong>🛠 Tools:</strong> {project.tools}</ProjectInfoText>
            </ProjectInfoGroup>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechList>
              {project.techStack.map((tech, idx) => (
                <TechItem key={idx}>{tech}</TechItem>
              ))}
            </TechList>
          </Card>
        ))}
      </GridContainer>

      {/* <DropdownButton onClick={() => setIsMiniOpen(!isMiniOpen)}>
        Mini Projects
        <span className={`icon ${isMiniOpen ? "open" : ""}`}>▼</span>
      </DropdownButton> */}

      <AnimatePresence>
        {isMiniOpen && (
          <motion.div
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <GridContainer style={{ paddingTop: "10px", paddingBottom: "30px" }}>
              {miniProjects.map((project, index) => (
                <Card
                  key={project.id}
                  whileHover="hover"
                  variants={cardVariants}
                  onClick={() => setSelectedProject(project)}
                >
                  <RoleBadge>{project.role}</RoleBadge>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectInfoGroup>
                    <ProjectInfoText><strong>🗓 Period:</strong> {project.period}</ProjectInfoText>
                    {/* 🔥 미니 프로젝트 카드 UI에 팀 사이즈 추가 */}
                    <ProjectInfoText><strong>👥 Team:</strong> {project.teamSize}</ProjectInfoText>
                    <ProjectInfoText><strong>🛠 Tools:</strong> {project.tools}</ProjectInfoText>
                  </ProjectInfoGroup>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechList>
                    {project.techStack.map((tech, idx) => (
                      <TechItem key={idx}>{tech}</TechItem>
                    ))}
                  </TechList>
                </Card>
              ))}
            </GridContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
              
              {/* 상단: 시연 영상 */}
              {selectedProject.localVideoPath && (
                <VideoContainer>
                  <video 
                    src={selectedProject.localVideoPath} 
                    controls 
                    autoPlay 
                    muted 
                    playsInline 
                  >
                    해당 브라우저는 영상을 지원하지 않습니다.
                  </video>
                </VideoContainer>
              )}

              <ModalTitle>{selectedProject.title}</ModalTitle>
              
              <ProjectInfoGroup>
                <ProjectInfoText><strong>🗓 Period:</strong> {selectedProject.period}</ProjectInfoText>
                {/* 🔥 모달창 내부 UI에 팀 사이즈 추가 */}
                <ProjectInfoText><strong>👥 Team:</strong> {selectedProject.teamSize}</ProjectInfoText>
                <ProjectInfoText><strong>🛠 Tools:</strong> {selectedProject.tools}</ProjectInfoText>
                <ProjectInfoText><strong>🎯 Role:</strong> {selectedProject.role}</ProjectInfoText>
              </ProjectInfoGroup>

              <SectionSubHeading>프로젝트 상세 소개</SectionSubHeading>
              <ModalDetailedText>{selectedProject.detailedDescription}</ModalDetailedText>

              {/* 하단: 링크 버튼 그룹 */}
              <ButtonGroup>
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="primary">
                    💻 GitHub 코드 보기
                  </a>
                )}
                
                {selectedProject.localPdfPath && (
                  <button onClick={() => setShowPdf(!showPdf)}>
                    {showPdf ? "📄 발표 자료 닫기" : "📄 발표 자료 보기"}
                  </button>
                )}
              </ButtonGroup>

              {/* 최하단: PDF 뷰어 영역 */}
              <AnimatePresence>
                {selectedProject.localPdfPath && showPdf && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: "hidden" }}
                  >
                    <SectionSubHeading>📄 발표 자료</SectionSubHeading>
                    <PdfContainer>
                      <iframe 
                        src={`${selectedProject.localPdfPath}#view=FitH`} 
                        title={`${selectedProject.title} 발표자료`}
                      />
                    </PdfContainer>
                  </motion.div>
                )}
              </AnimatePresence>

            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;