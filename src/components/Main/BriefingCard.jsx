import styled from 'styled-components';

const BriefingCard = () => (
  <CardWrapper>
    <Title>AI 보행 위험 브리핑</Title>
    <ContentBox>
      <ContentText>
        오늘 오후 6시 이후에는 한국외대 정문 앞 횡단보도와 버스정류장 주변의 보행 위험도가
        높습니다. 야간 사고 이력이 있는 구간이므로 밝은 길을 이용하고, 횡단 전 좌우를 확인해
        주세요
      </ContentText>
    </ContentBox>
  </CardWrapper>
);

export default BriefingCard;

const CardWrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 10;
  background: #fff;
  border-radius: 10px;
  padding: 12px 14px 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin: 0 0 10px;
`;

const ContentBox = styled.div`
  background: #d3ffa1;
  border-radius: 8px;
  padding: 12px 14px;
`;

const ContentText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #222;
  margin: 0;
  line-height: 1.65;
  word-break: keep-all;
`;
