import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import RoomListControl from './RoomListControl';
import RoomList from './RoomList';
import MessagesView from './MessagesView';
import WelcomeScreen from './WelcomeScreen';

function RoomView() {
  const [messState, setMessState] = useState({
    isRender: null,
  });

  const handleMessRender = () => {
    setMessState({ ...messState, isRender: !messState.isRender });
  }

  useEffect(() => {
    if (messState.isRender === false) {
      setTimeout(() => {
        setMessState({ ...messState, isRender: true });
      }, 500);
    }
  }, [messState.isRender]);

  return (
    <Row style={{ height: '100%' }}>
      <Col sm="5" md="4" >
        <RoomListControl />
        <div className="list-container">
          <RoomList handleMessRender={handleMessRender} />
        </div>
      </Col>
      {messState.isRender === null ? (
        <Col sm="7" md="8">
          <WelcomeScreen />
        </Col>
      ) : (messState.isRender ? (<MessagesView />) : '')}
    </Row>
  );
}

export default RoomView;