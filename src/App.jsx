import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FamilyPage from "./pages/FamilyPage";
import Mypage from "./pages/Mypage";
import RiskDetails from "./pages/RiskDetails";
import SignupCss from "./pages/signup.css"
import GlobalStyle from "./style/Globalstyle";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <MobileContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/family" element={<FamilyPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/risk-details" element={<RiskDetails />} />
          <Route path="/signup" element={<SignupCss />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileContainer>
    </BrowserRouter>
  );
}

export default App;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
`;
