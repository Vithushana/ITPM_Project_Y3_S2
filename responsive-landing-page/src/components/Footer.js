import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <LogoSection>
          <LogoImage src={logo} alt="Home-Zone" />
          <Description>
            HomeStock simplifies inventory management by helping you
            track groceries, household essentials, and supplies
            effortlessly, reducing waste and saving time.
          </Description>
          <SocialLinksContainer>
            <SocialIconLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialIconLink>
            <SocialIconLink href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </SocialIconLink>
            <SocialIconLink href="https://instagram.com" target="_blank" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIconLink>
            <SocialIconLink href="https://whatsapp.com" target="_blank" aria-label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </SocialIconLink>
          </SocialLinksContainer>
        </LogoSection>
        <FooterLinks>
          <Column>
            <ColumnTitle>Company</ColumnTitle>
            <Link href="#">About Us</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Privacy Policy</Link>
          </Column>
          <Column>
            <ColumnTitle>Services</ColumnTitle>
            <Link href="#">Grocery Tracking</Link>
            <Link href="#">Date Reminders</Link>
            <Link href="#">Automated Shopping Lists</Link>
          </Column>
          <Column>
            <ColumnTitle>Resources</ColumnTitle>
            <Link href="#">Blogs</Link>
            <Link href="#">Inventory Tips</Link>
            <Link href="#">Help Center</Link>
          </Column>
          <Column>
            <ColumnTitle>Features</ColumnTitle>
            <Link href="#">Smart Pantry Insights</Link>
            <Link href="#">Budget & Expense Tracking</Link>
            <Link href="#">Shopping List Generator</Link>
          </Column>
        </FooterLinks>
      </FooterTop>
      <FooterBottom>
        <Credits>
          Designed & Developed with ♻️ by <span>Home-Zone</span>
        </Credits>
        <Copyright>© 2025 Home-Zone. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #fff;
  width: 100%;
  position: relative; /* Changed from absolute to relative to stay in document flow */
  color: #6b7280;
  padding: 2rem 0; /* Added proper padding instead of auto */
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px; /* Added max-width to control container */
  margin: 0 auto; /* Center the content */
  padding: 0 2rem; /* Added consistent padding */

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 40%; /* Prevent logo section from growing too wide */

  @media (max-width: 768px) {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  max-width: 300px;
  margin: 1rem 0;

  @media (max-width: 768px) {
    max-width: 150px; 
  }
`;

const Description = styled.p`
  margin: 0 0 1rem 0; /* Simplified margins, removed unnecessary sides */
  padding-left: 0; /* Ensure no left padding pushes it right */
  font-size: 1rem;
  color: #000;
  line-height: 1.5;
  text-align: left; /* Explicitly set to left */

  @media (max-width: 768px) {
    text-align: center; /* Center on mobile if preferred */
    br {
      display: none;
    }
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem; /* Better spacing control */
  margin: 1rem 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIconLink = styled.a`
  font-size: 1.5rem;
  color: rgb(43, 83, 141);
  transition: color 0.3s;

  &:hover {
    color: #0077b5; /* LinkedIn */
  }

  &:nth-child(2):hover {
    color: #1877f2; /* Facebook */
  }

  &:nth-child(3):hover {
    color: #e4405f; /* Instagram */
  }

  &:nth-child(4):hover {
    color: #25d366; /* WhatsApp */
  }
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Changed to grid for better control */
  gap: 2rem;
  max-width: 60%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid on mobile */
    gap: 1rem;
    max-width: 100%;
    margin-top: 2rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
`;

const Link = styled.a`
  font-size: 1rem;
  color: #000;
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.3s;

  &:hover {
    color: rgb(43, 83, 141);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
  padding: 1rem 2rem;
  border-top: 1px solid rgb(43, 83, 141);
  background-color: rgb(43, 83, 141);
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const Credits = styled.p`
  font-size: 1rem;
  margin: 0;

  span {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 1rem;
  margin: 0;
`;