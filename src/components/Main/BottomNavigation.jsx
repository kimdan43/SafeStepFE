import styled from 'styled-components';
import { BiLogIn } from 'react-icons/bi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = ({ activePath = '/' }) => {
  const navigate = useNavigate();
  const isMap = activePath === '/';
  const isGuardian = activePath === '/family';

  return (
    <NavBar>
      <NavItem onClick={() => navigate('/login')}>
        <BiLogIn size={26} color="#111" />
        <NavLabel>로그인</NavLabel>
      </NavItem>

      <NavItem onClick={() => navigate('/')}>
        <FaMapMarkerAlt size={26} color={isMap ? '#48a111' : '#111'} />
        <NavLabel $active={isMap}>지도</NavLabel>
      </NavItem>

      <NavItem onClick={() => navigate('/family')}>
        <CgProfile size={26} color={isGuardian ? '#48a111' : '#111'} />
        <GuardianRow>
          <GuardianLabel $active={isGuardian}>보호자</GuardianLabel>
          <Badge>4</Badge>
        </GuardianRow>
      </NavItem>
    </NavBar>
  );
};

export default BottomNavigation;

const NavBar = styled.nav`
  height: 70px;
  background: #fff;
  border-radius: 35px 35px 0 0;
  box-shadow: 0 -3px 14px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-shrink: 0;
  z-index: 20;
  padding: 0 8px;
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 8px 20px;
  cursor: pointer;
`;

const NavLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => (p.$active ? '#48a111' : '#111')};
`;

const GuardianRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuardianLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(p) => (p.$active ? '#48a111' : '#111')};
`;

const Badge = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #adff65;
  color: #ff0000;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
  line-height: 1;
`;
