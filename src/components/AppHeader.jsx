import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../assets/logo.png';

const AppHeader = ({ showBack = false, showSignup = false }) => {
  const navigate = useNavigate();

  return (
    <Header>
      {showBack ? (
        <LeftBtn onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#fff" />
        </LeftBtn>
      ) : (
        <Slot />
      )}

      <Logo src={logoImg} alt="SafeStep AI" />

      {showSignup ? (
        <SignupBtn onClick={() => navigate('/signup')}>회원가입</SignupBtn>
      ) : (
        <Slot />
      )}
    </Header>
  );
};

export default AppHeader;

const Header = styled.header`
  background-color: #48a111;
  height: 52px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 20;
`;

const Slot = styled.div`
  width: 40px;
`;

const LeftBtn = styled.button`
  width: 40px;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 36px;
  object-fit: contain;
`;

const SignupBtn = styled.button`
  width: 40px;
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: right;
  white-space: nowrap;
  width: auto;
`;
