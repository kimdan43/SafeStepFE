import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppHeader from '../components/Main/AppHeader';
import BottomNavigation from '../components/Main/BottomNavigation';
import { apiLogin } from '../api/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요');
      return;
    }
    setLoading(true);
    try {
      const res = await apiLogin(email, password);
      if (res?.data?.accessToken) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken || '');
        localStorage.setItem('userType', res.data.userType || '');
        navigate('/');
      } else {
        alert(res?.message || '이메일 또는 비밀번호가 일치하지 않습니다');
      }
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
        <LoginBox>
          <LoginTitle>로그인</LoginTitle>
          <Label>이메일</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </LoginBox>
        <Spacer />
        <LoginButton onClick={handleLogin} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </LoginButton>
      </Content>
      <BottomNavigation activePath="/login" />
    </PageWrapper>
  );
}

export default Login;

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
  background: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px 20px;
  overflow-y: auto;
`;

const LoginBox = styled.section`
  width: 100%;
  max-width: 300px;
  border: 2px solid #48a111;
  background: #ececec;
  padding: 20px 16px 6px;
  border-radius: 15px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin: 0 0 22px;
  font-size: 30px;
  font-weight: 700;
  color: #111;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 0 10px;
  outline: none;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    border-color: #48a111;
  }
`;

const Spacer = styled.div`
  flex: 1;
  min-height: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 300px;
  height: 52px;
  background: #48a111;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Pretendard', sans-serif;
  cursor: pointer;
  margin-bottom: 16px;
  flex-shrink: 0;
  opacity: ${(p) => (p.disabled ? 0.6 : 1)};
`;
