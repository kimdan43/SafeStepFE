import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiInfo } from 'react-icons/fi';
import AppHeader from '../components/Main/AppHeader';
import BottomNavigation from '../components/Main/BottomNavigation';
import { apiSignup, apiLogin, apiSetLivingArea, apiProtecteeLink, USER_TYPE_MAP, LIVING_AREAS, saveCoords } from '../api/api';

const USER_TYPES = ['어르신', '어린이', '보호자'];

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('어르신');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationConsent, setLocationConsent] = useState('동의하기');
  const [selectedArea, setSelectedArea] = useState(LIVING_AREAS[0]);
  const [guardianEmail, setGuardianEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isLocationUser = userType === '어르신' || userType === '어린이';
  const isGuardian = userType === '보호자';

  const handleSignUp = async () => {
    if (!name || !password || !email) {
      alert('이름, 비밀번호, 이메일을 입력해 주세요');
      return;
    }
    setLoading(true);
    try {
      // 1. 회원가입
      const signupRes = await apiSignup({
        email,
        password,
        name,
        userType: USER_TYPE_MAP[userType],
      });

      if (!signupRes?.data?.userId) {
        alert(signupRes?.message || '회원가입에 실패했습니다');
        return;
      }

      // 2. 로그인 → 토큰 획득
      const loginRes = await apiLogin(email, password);
      if (loginRes?.data?.accessToken) {
        localStorage.setItem('accessToken', loginRes.data.accessToken);
        localStorage.setItem('refreshToken', loginRes.data.refreshToken || '');
        localStorage.setItem('userType', loginRes.data.userType || '');
      } else {
        alert('로그인에 실패했습니다. 다시 시도해 주세요');
        navigate('/login');
        return;
      }

      // 3. 추가 설정
      if (isLocationUser) {
        await apiSetLivingArea(selectedArea.city, selectedArea.district).catch(() => {});
        saveCoords(selectedArea.lat, selectedArea.lng);
      }
      if (isGuardian && guardianEmail) {
        await apiProtecteeLink(guardianEmail).catch(() => {});
      }

      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch {
      alert('서버 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <AppHeader showBack />
      <Content>
        <FormCard>
          <FormTitle>회원가입</FormTitle>

          <Label>이름</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Label>비밀번호</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Label>이메일</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>사용자 유형</Label>
          <DropdownWrapper>
            <DropdownTrigger onClick={() => setDropdownOpen((o) => !o)}>
              <span>{userType}</span>
              <FiChevronDown size={18} color="#555" />
            </DropdownTrigger>
            {dropdownOpen && (
              <DropdownList>
                {USER_TYPES.map((type) => (
                  <DropdownOption
                    key={type}
                    $active={type === userType}
                    onClick={() => { setUserType(type); setDropdownOpen(false); }}
                  >
                    {type}
                  </DropdownOption>
                ))}
              </DropdownList>
            )}
          </DropdownWrapper>

          {isLocationUser && (
            <>
              <SectionLabel>
                위치 정보 사용 동의&nbsp;<FiInfo size={14} color="#666" />
              </SectionLabel>
              <DescBox>
                현재 위치를 기반으로 위험 구간 알림과 안전 경로 안내를 제공하기 위해
                위치 권한이 필요합니다. 위치정보는 서비스 제공 목적 외에는 사용되지 않습니다.
              </DescBox>
              <RadioRow>
                <RadioLabel>
                  <input type="radio" name="locationConsent" value="동의하기"
                    checked={locationConsent === '동의하기'}
                    onChange={() => setLocationConsent('동의하기')} />
                  동의하기
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="locationConsent" value="거부하기"
                    checked={locationConsent === '거부하기'}
                    onChange={() => setLocationConsent('거부하기')} />
                  거부하기
                </RadioLabel>
              </RadioRow>

              <Label>주 생활권 설정</Label>
              <AreaSelect
                value={selectedArea.label}
                onChange={(e) =>
                  setSelectedArea(LIVING_AREAS.find((a) => a.label === e.target.value))
                }
              >
                {LIVING_AREAS.map((area) => (
                  <option key={area.label} value={area.label}>
                    {area.label}
                  </option>
                ))}
              </AreaSelect>
            </>
          )}

          {isGuardian && (
            <>
              <Label>피보호자 이메일</Label>
              <Input
                value={guardianEmail}
                onChange={(e) => setGuardianEmail(e.target.value)}
                placeholder="피보호자 이메일"
              />
            </>
          )}
        </FormCard>

        <Spacer />
        <SignUpButton onClick={handleSignUp} disabled={loading}>
          {loading ? '처리 중...' : '회원가입'}
        </SignUpButton>
      </Content>
      <BottomNavigation activePath="/signup" />
    </PageWrapper>
  );
};

export default SignUp;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 780px;

  @media (max-width: 480px) {
    min-height: 100vh;
  }
`;

const Content = styled.main`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 16px;
`;

const FormCard = styled.div`
  border: 2px solid #48a111;
  border-radius: 14px;
  padding: 22px 18px 18px;
  background: #fff;
`;

const FormTitle = styled.h1`
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  color: #111;
  margin: 0 0 20px;
`;

const Label = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin: 14px 0 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1.5px solid #b8dfa0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 15px;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #48a111;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.button`
  width: 100%;
  height: 38px;
  border: 1.5px solid #b8dfa0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 15px;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #222;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  border: 1.5px solid #b8dfa0;
  border-radius: 8px;
  background: #fff;
  z-index: 30;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DropdownOption = styled.li`
  padding: 11px 14px;
  font-size: 15px;
  font-family: 'Pretendard', sans-serif;
  background: ${(p) => (p.$active ? '#d3ffa1' : '#fff')};
  cursor: pointer;

  &:hover {
    background: #e8ffd4;
  }
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin: 14px 0 8px;
`;

const DescBox = styled.div`
  background: #f2f2f2;
  border-radius: 7px;
  padding: 10px 12px;
  font-size: 12px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const RadioRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 4px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  cursor: pointer;

  input[type='radio'] {
    accent-color: #48a111;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const AreaSelect = styled.select`
  width: 100%;
  height: 40px;
  border: 1.5px solid #b8dfa0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  background: #fff;
  outline: none;
  cursor: pointer;
  color: #222;

  &:focus {
    border-color: #48a111;
  }
`;

const Spacer = styled.div`
  flex: 1;
  min-height: 16px;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 52px;
  background: #c8ef90;
  color: #111;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  flex-shrink: 0;
  margin-bottom: 4px;
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
`;
