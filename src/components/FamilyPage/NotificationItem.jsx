import styled from 'styled-components';
import { LiaWindowCloseSolid } from 'react-icons/lia';

const NotificationItem = ({ text }) => (
  <ItemWrapper>
    <LiaWindowCloseSolid size={22} color="#333" />
    <ItemText>{text}</ItemText>
  </ItemWrapper>
);

export default NotificationItem;

const ItemWrapper = styled.div`
  background: #adff65;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const ItemText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #111;
  line-height: 1.5;
  word-break: keep-all;
`;
