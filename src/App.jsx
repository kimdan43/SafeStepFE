import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FamilyPage from "./pages/FamilyPage";
import Mypage from "./pages/Mypage";
import RiskDetails from "./pages/RiskDetails";

import GlobalStyle from "./style/Globalstyle";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <PageCenter>
        <MobileContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/family" element={<FamilyPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/risk-details" element={<RiskDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MobileContainer>
      </PageCenter>
    </BrowserRouter>
  );
}

export default App;

/* 브라우저 전체: 진한 회색 배경 + 중앙 정렬 */
const PageCenter = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  box-sizing: border-box;

  /* 모바일 실기기에서는 패딩 없이 꽉 채움 */
  @media (max-width: 480px) {
    padding: 0;
    align-items: stretch;
  }
`;

/* 앱 컨테이너: 폰 프레임처럼 보이도록 */
const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 780px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 36px rgba(0, 0, 0, 0.45);

  @media (max-width: 480px) {
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
`;
