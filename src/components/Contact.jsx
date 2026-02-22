import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- Styled Components ---
const Section = styled.section`
  padding: 100px 20px 50px;
  background-color: #1a1a1a; /* Skills 섹션과 같은 톤으로 통일감 부여 */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #646cff;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaaaaa;
  margin-bottom: 50px;
  max-width: 600px;
  line-height: 1.6;
`;

const ContactCard = styled(motion.div)`
  background: #242424;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #333;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #646cff;
    transform: translateY(-3px);
  }
`;

const FooterText = styled.p`
  margin-top: 80px;
  color: #555555;
  font-size: 0.9rem;
`;

// --- Framer Motion 설정 ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Section id="contact">
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </Title>

      <Subtitle
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        새로운 프로젝트 제안이나 개발 관련 이야기는 언제나 환영합니다. <br />
        아래 버튼을 통해 편하게 연락해 주세요!
      </Subtitle>

      <ContactCard
        ref={ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* href의 mailto: 뒤에 실제 이메일 주소를 적어주세요 */}
        <ContactButton href="ochant777@gmail.com">
          📧 이메일 보내기
        </ContactButton>

        {/* href에 실제 GitHub 주소를 적어주세요 */}
        <ContactButton
          href="https://github.com/kurecat"
          target="_blank"
          rel="noopener noreferrer"
        >
          💻 GitHub 방문하기
        </ContactButton>

        {/* <ContactButton
          href="https://blog.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          📝 기술 블로그
        </ContactButton> */}
      </ContactCard>

      <FooterText>
        © {new Date().getFullYear()} 정동균. All rights reserved. <br />
        Built with React & Styled-components.
      </FooterText>
    </Section>
  );
};

export default Contact;
