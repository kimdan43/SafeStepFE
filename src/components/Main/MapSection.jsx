import styled from 'styled-components';

const MapSection = () => (
  <MapWrapper>
    <MapBackground />
    <HazardCenter>
      <RiskRing $size={210} $alpha={0.06} />
      <RiskRing $size={160} $alpha={0.13} />
      <RiskRing $size={108} $alpha={0.24} />
      <RiskRing $size={64}  $alpha={0.42} />
      <Pin />
    </HazardCenter>
  </MapWrapper>
);

export default MapSection;

const MapWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const MapBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dde8d5;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.18) 1px, transparent 1px),
    linear-gradient(rgba(170, 195, 160, 0.35) 2px, transparent 2px),
    linear-gradient(90deg, rgba(170, 195, 160, 0.35) 2px, transparent 2px);
  background-size: 22px 22px, 22px 22px, 110px 110px, 110px 110px;
`;

const HazardCenter = styled.div`
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RiskRing = styled.div`
  position: absolute;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: rgba(255, 0, 0, ${(p) => p.$alpha});
`;

/* Classic teardrop pin: rotated square with partial border-radius */
const Pin = styled.div`
  position: relative;
  z-index: 10;
  width: 36px;
  height: 36px;
  background: #ff0000;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  border: 2px solid #cc0000;
  filter: drop-shadow(0 3px 7px rgba(0, 0, 0, 0.45));

  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: #ff8080;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
