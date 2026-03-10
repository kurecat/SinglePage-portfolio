import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";

// --- Styled Components ---
const Section = styled.section`
  padding: 100px 20px 50px;
  background-color: #121212;
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

const FormContainer = styled(motion.div)`
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #646cff;
  color: #ffffff;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #535bf2;
    transform: translateY(-3px);
  }

  &:disabled {
    background: #555555;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #aaaaaa;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  font-size: 0.95rem;
  color: ${(props) => (props.$isError ? "#ff4d4f" : "#4caf50")};
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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("전송 중입니다...");
    setIsError(false);

    // 🔥여기에 3단계에서 발급받을 키값들을 넣게 됩니다.
    emailjs
      .sendForm(
        "service_m1xev7q", // 서비스 ID
        "template_v9fgid4", // 템플릿 ID
        form.current,
        "Q9OYA0eRRYLMeTQQI" // 퍼블릭 키
      )
      .then(
        (result) => {
          setIsSubmitting(false);
          setStatusMessage("성공적으로 전송되었습니다! 확인 후 답변 드리겠습니다.");
          e.target.reset(); // 폼 초기화
          
          setTimeout(() => {
            setStatusMessage("");
          }, 5000);
        },
        (error) => {
          setIsSubmitting(false);
          setIsError(true);
          setStatusMessage("전송에 실패했습니다. 이메일(ochant777@gmail.com)로 직접 연락 부탁드립니다.");
        }
      );
  };

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
        아래 폼을 통해 메시지를 남겨주시면 빠르게 회신 드리겠습니다!
      </Subtitle>

      <FormContainer
        ref={ref}
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <StyledForm ref={form} onSubmit={sendEmail}>
          <Input type="text" name="user_name" placeholder="성함 / 회사명" required />
          <Input type="email" name="user_email" placeholder="회신받으실 이메일 주소" required />
          <TextArea name="message" placeholder="메시지 내용을 입력해 주세요." required />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "전송 중..." : "🚀 메시지 보내기"}
          </SubmitButton>
        </StyledForm>
        
        {statusMessage && (
          <StatusMessage $isError={isError}>{statusMessage}</StatusMessage>
        )}

        <LinkButton
          href="https://github.com/kurecat"
          target="_blank"
          rel="noopener noreferrer"
        >
          💻 GitHub 방문하기
        </LinkButton>
      </FormContainer>

      <FooterText>
        © {new Date().getFullYear()} 정동균. All rights reserved. <br />
        Built with React & Styled-components.
      </FooterText>
    </Section>
  );
};

export default Contact;