import styled from 'styled-components';
import { PiSiren } from 'react-icons/pi';
import { calcDistance } from '../../api/api';

const DEFAULT_LAT = 37.3375;
const DEFAULT_LNG = 127.264;

const FALLBACK_ALERTS = ['100m 전방에 사고 다발 구간', '50m 전방에 사고 다발 구간'];

const DangerAlertBanner = ({ zones = [], lat = DEFAULT_LAT, lng = DEFAULT_LNG }) => {
  const alerts =
    zones.length > 0
      ? zones.slice(0, 2).map((z) => {
          const dist = calcDistance(lat, lng, z.latitude, z.longitude);
          const label = z.zoneName || '사고 다발 구간';
          return dist < 10 ? `반경 ${z.radius}m 내 ${label}` : `${dist}m 전방에 ${label}`;
        })
      : FALLBACK_ALERTS;

  return (
    <BannerList>
      {alerts.map((text) => (
        <BannerItem key={text}>
          <PiSiren size={26} color="#ff0000" />
          <BannerText>{text}</BannerText>
        </BannerItem>
      ))}
    </BannerList>
  );
};

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
