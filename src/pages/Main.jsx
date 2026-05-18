import styled from "styled-components";
import AppHeader from "../components/Main/AppHeader";
import MapSection from "../components/Main/MapSection";
import BriefingCard from "../components/Main/BriefingCard";
import DangerAlertBanner from "../components/Main/DangerAlertBanner";
import BottomNavigation from "../components/Main/BottomNavigation";

const Main = () => (
  <PageWrapper>
    <AppHeader showSignup />
    <MapArea>
      <MapSection />
      <BriefingCard />
      <DangerAlertBanner />
    </MapArea>
    <BottomNavigation activePath="/" />
  </PageWrapper>
);

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
