//signup.jsx

import React, { useState } from "react";
import "./signup.css";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("어르신");
  
  const isSpecialUser = selectedType === "어르신" || selectedType === "어린이";
  const isProtector = selectedType === "보호자";

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    console.log("비밀번호:", password, "이름:", name, "이메일:", email, "사용자 유형:", selectedType); 
  };
  
  return (
    <div className="signup-wrapper">
      <div className="signup-page">
        <p className="signup-title">회원가입</p>
        <form className="signup-form-wrapper" onSubmit={handleSubmit}>
          <div className="signup-form">
            
            <div className="element-wrapper">
              <label className="signup-label" htmlFor="name">
                이름
              </label>
              <input
                id="name"
                type="text"
                className="signup-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="element-wrapper">
              <label className="signup-label" htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="element-wrapper">
              <label className="signup-label" htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className="signup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 1. 사용자 유형 선택 */}
            <div className="element-wrapper">
              <div className="input-group">
                <label>사용자 유형</label>
                <div className="relative">
                  <button type="button" onClick={() => setIsOpen(!isOpen)} className="select-box">
                    {selectedType}
                  </button>
                  {isOpen && (
                    <ul className="dropdown-menu">
                      {['어르신', '어린이', '보호자'].map(type => (
                        <li key={type} onClick={() => { setSelectedType(type); setIsOpen(false); }}>
                          {type}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* 2. 조건부 렌더링: 어르신 또는 어린이일 때만 보임 */}
            {isSpecialUser && (
              <div className="special-fields-animation"> 
                {/* 위치 정보 사용 동의 섹션 */}
                <div className="location-agreement-section">
                  <p>위치 정보 사용 동의 ⓘ</p>
                  <div className="info-box">
                    현재 위치를 기반으로 위험 구간 알림과 안전 경로 안내를 제공하기 위해 위치 권한이 필요합니다.
                    위치 정보는 서비스 제공 목적 외에는 사용되지 않습니다.
                  </div>
                  <div className="radio-group">
                    <label>
                      동의하기
                      <input type="radio" name="loc" />
                    </label>
                    <label>
                      거부하기
                      <input type="radio" name="loc" />
                    </label>
                  </div>
                </div>

                {/* 주 생활권 설정 섹션 */}
                <div className="address-setup-section">
                  <p>주 생활권 설정</p>
                  <div className="address-container">
                    <div className="input-group">
                      <input type="text" />
                      <span>시</span>
                    </div>
                    
                    <div className="input-group">
                      <input type="text" />
                      <span>군</span>
                    </div>
                    
                    <div className="input-group">
                      <input type="text" />
                      <span>구</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. 조건부 렌더링: 보호자일 때만 보임 */}
            {isProtector && (
              <div className="protector-fields-animation">
                <label className="signup-label" htmlFor="ward-email">
                  피보호자 이메일
                </label>
                <input type="text" name="ward-email" id="ward-email" className="signup-input" />
              </div>
            )}

          </div>

          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};   

export default SignUpForm;