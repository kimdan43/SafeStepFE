import { useState } from "react";
import styled from "styled-components";
import { BiLogIn, BiMap, BiUserCircle } from "react-icons/bi";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "test@test.com" && password === "1234") {
      alert("로그인 성공!");
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다");
    }
  };

  return (
    <Phone>
      <TopBar>
        <BackButton>←</BackButton>
        <Logo>SafeStep AI</Logo>
      </TopBar>

      <LoginPage>
        <LoginBox>
          <LoginTitle>로그인</LoginTitle>

          <Label>이메일</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginBox>

        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginPage>

      <BottomNav>
  <NavItem>
    <BiLogIn />
    <span>로그인</span>
  </NavItem>

  <NavItem>
    <BiMap />
    <span>지도</span>
  </NavItem>

  <NavItem>
    <BiUserCircle />
    <span>보호자</span>
  </NavItem>
</BottomNav>
    </Phone>
  );
}

export default Login;

const Phone = styled.div`
  width: 402px;
  height: 100vh;
  margin: 0 auto;
  background: #ececec;
  position: relative;
  overflow: hidden;
  font-family: "Pretendard", sans-serif;
`;

const TopBar = styled.header`
  width: 402px;
  height: 50px;
  background: #48a111;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: white;
`;

const BackButton = styled.button`
  border: none;
  background: white;
  width: 28px;
  height: 22px;
  border-radius: 4px;
  margin-right: 6px;
  cursor: pointer;
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

const LoginPage = styled.main`
  padding-top: 20px;
`;

const LoginBox = styled.section`
  width: 220px;
  margin: 0 auto;
  border: 2px solid #48a111;
  background: #ececec;
  padding: 16px 10px;
  border-radius: 15px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 700;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 14px;
  padding: 0 10px;
  outline: none;
  font-size: 18px;

  &:focus {
    border-color: #48a111;
  }
`;

const LoginButton = styled.button`
  width: 220px;
  height: 40px;
  background: #48a111;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  display: block;
  margin: 307px auto 0;
`;

const BottomNav = styled.nav`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  background: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  width: 33.3%;
  height: 100%;
  text-align: center;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  svg {
    font-size: 25px;
    color: #48a111;
  }
`;