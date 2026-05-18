import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppHeader from '../components/Main/AppHeader';
import MapSection from '../components/Main/MapSection';
import BriefingCard from '../components/Main/BriefingCard';
import DangerAlertBanner from '../components/Main/DangerAlertBanner';
import BottomNavigation from '../components/Main/BottomNavigation';
import { apiGetDangerZones, apiGetBriefing, getSavedCoords } from '../api/api';

const Main = () => {
  const [briefingText, setBriefingText] = useState('');
  const [zones, setZones] = useState([]);
  // lazy init: localStorage를 마운트 시 한 번만 읽음
  const [{ lat, lng }] = useState(() => getSavedCoords());

  useEffect(() => {
    apiGetBriefing(lat, lng)
      .then((res) => setBriefingText(res?.data?.briefingText || ''))
      .catch(() => {});

    if (localStorage.getItem('accessToken')) {
      apiGetDangerZones(lat, lng)
        .then((res) => setZones(res?.data?.zones || []))
        .catch(() => {});
    }
  }, [lat, lng]);

  return (
    <PageWrapper>
      <AppHeader showSignup />
      <MapArea>
        <MapSection zones={zones} lat={lat} lng={lng} />
        <BriefingCard text={briefingText} />
        <DangerAlertBanner zones={zones} lat={lat} lng={lng} />
      </MapArea>
      <BottomNavigation activePath="/" />
    </PageWrapper>
  );
};

export default Main;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 780px;

  @media (max-width: 480px) {
    min-height: 100vh;
  }
`;

const MapArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 380px;
`;
