import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

// --- Styled Components ---
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  /* 스크롤 위치에 따라 배경색을 다르게 적용하여 가독성을 높입니다 */
  background: ${({ $isScrolled }) =>
    $isScrolled ? "rgba(18, 18, 18, 0.9)" : "transparent"};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(10px)" : "none"};
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${({ $isScrolled }) =>
    $isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  span {
    color: #646cff;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1.1rem;
  font-weight: 500;
  color: #cccccc;
  cursor: pointer;
  transition: color 0.3s ease;

  /* react-scroll에서 활성화된 메뉴에 'active' 클래스를 붙여줍니다 */
  .active {
    color: #646cff;
    font-weight: bold;
  }

  &:hover {
    color: #ffffff;
  }
`;

// --- 메인 컴포넌트 ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // 화면 스크롤을 감지하여 내비바 배경 스타일을 변경하는 로직
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav $isScrolled={isScrolled}>
      <NavContainer>
        {/* 로고 클릭 시 맨 위(Hero)로 이동 */}
        <Logo>
          <Link to="hero" smooth={true} duration={500}>
            Dev<span>.</span>Portfolio
          </Link>
        </Logo>

        <NavLinks>
          <NavItem>
            <Link
              activeClass="active"
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              offset={0}
            >
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link
              activeClass="active"
              to="skills"
              spy={true}
              smooth={true}
              duration={500}
              offset={0}
            >
              Skills
            </Link>
          </NavItem>
          <NavItem>
            <Link
              activeClass="active"
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
              offset={0}
            >
              Projects
            </Link>
          </NavItem>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
