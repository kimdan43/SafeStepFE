import styled from 'styled-components';
import NotificationItem from './NotificationItem';

/* 추후 실제 API 데이터로 교체 가능 */
const DEFAULT_NOTIFICATIONS = [
  { id: 1, text: '[15:43] ooo님의 100m 전방에 위험구간이 있습니다.' },
  { id: 2, text: '[15:45] ooo님의 50m 전방에 위험구간이 있습니다.' },
  { id: 3, text: '[16:11] ooo님이 어린이 보호 구역을 떠났습니다.' },
  { id: 4, text: '[16:40] ooo님이 위험 구간에 진입하셨습니다.' },
];

const NotificationCard = ({ notifications = DEFAULT_NOTIFICATIONS }) => (
  <CardWrapper>
    <CardTitle>알림</CardTitle>
    <ItemList>
      {notifications.map((item) => (
        <NotificationItem key={item.id} text={item.text} />
      ))}
    </ItemList>
  </CardWrapper>
);

export default NotificationCard;

const CardWrapper = styled.div`
  background: rgba(120, 255, 79, 0.2);
  border-radius: 15px;
  padding: 18px 16px 20px;
`;

const CardTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: #1e104e;
  margin: 0 0 14px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
