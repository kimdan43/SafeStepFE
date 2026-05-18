import styled from 'styled-components';
import AppHeader from '../components/Main/AppHeader';
import NotificationCard from '../components/FamilyPage/NotificationCard';
import BottomNavigation from '../components/Main/BottomNavigation';

export default function FamilyPage() {
  return (
    <PageWrapper>
      <AppHeader showBack />
      <Content>
        <Greeting>안녕하세요, 보호자 님!</Greeting>
        <NotificationCard />
      </Content>
      <BottomNavigation activePath="/family" />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 780px;

  @media (max-width: 480px) {
    min-height: 100vh;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 28px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const Greeting = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #1e104e;
  margin: 0;
  line-height: 1.3;
  word-break: keep-all;
`;
