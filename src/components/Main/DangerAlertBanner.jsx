import styled from 'styled-components';
import { PiSiren } from 'react-icons/pi';

const ALERTS = [
  '100m 전방에 사고 다발 구간',
  '50m 전방에 사고 다발 구간',
];

const DangerAlertBanner = () => (
  <BannerList>
    {ALERTS.map((text) => (
      <BannerItem key={text}>
        <PiSiren size={26} color="#ff0000" />
        <BannerText>{text}</BannerText>
      </BannerItem>
    ))}
  </BannerList>
);

export default DangerAlertBanner;

const BannerList = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BannerItem = styled.div`
  background: #fef2a6;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BannerText = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #ff0000;
  line-height: 1.2;
  word-break: keep-all;
`;
