import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Card, Col } from 'react-bootstrap';
import ChatForm from './ChatForm';
import {
  selectCurrRoom,
  setUserListInRoom,
  selectMessageList,
  setMessageList,
  selectUserListInRoom,
  selectTotalMess,
  setTotalMess,
  setTotalUser,
  selectTotalUser,
  selectMessLoading,
  resetConnRealTime,
  selectConnRealTime,
} from './roomSlice';
import { selectUser } from 'features/auth/authSlice';
import {
  connDBMessUserList,
  connDBGetTotalMessRealTime,
  connDBTrackMessageListRealTime,
  breakStringLine,
  connDBMessUserExists,
} from './handles/handleMessage';
import Spinner from 'components/Spinner';

function MessagesView() {
  const preRoomId = useRef(null);
  const currRoom = useSelector(selectCurrRoom);
  const messageList = useSelector(selectMessageList);
  const mainUser = useSelector(selectUser);
  const userListInRoom = useSelector(selectUserListInRoom);
  const totalMess = useSelector(selectTotalMess);
  const totalUser = useSelector(selectTotalUser);
  const messLoading = useSelector(selectMessLoading);
  const connRT = useSelector(selectConnRealTime);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connRT.totalUser && currRoom.rId && preRoomId.current !== currRoom.rId) {
      connDBMessUserExists(currRoom, mainUser, dispatch);
    }
  }, [currRoom.rId]);

  useEffect(() => {
    if (!connRT.userList) {
      connDBMessUserList(currRoom, userListInRoom, dispatch);
    }
  }, [totalUser]);

  useEffect(() => {
    if (!connRT.totalMess) {
      connDBGetTotalMessRealTime(currRoom, dispatch);
    }
  }, [userListInRoom.length]);

  useEffect(() => {
    if (currRoom.rId && preRoomId.current !== currRoom.rId) {
      preRoomId.current = currRoom.rId;
    }
    if (!connRT.messList) {
      connDBTrackMessageListRealTime(currRoom, totalMess, userListInRoom, mainUser, messageList, dispatch);
    }

  }, [totalMess, connRT.messList]);

  useEffect(() => {
    if (messageList.length > 0 && connRT.messList) {
      const mvContainerDOM = document.getElementById('mv-container-01');
      if (mvContainerDOM && messageList[messageList.length - 1].email === mainUser.email) {
        mvContainerDOM.scrollTop = mvContainerDOM.scrollHeight;
      }
    }
  }, [messageList.length, connRT.messList]);

  useEffect(() => {
    return () => {
      dispatch(setUserListInRoom([]));
      dispatch(setMessageList([]));
      dispatch(setTotalMess(0));
      dispatch(setTotalUser(0));
      dispatch(resetConnRealTime());
    }
  }, []);

  return messLoading ? (<Col sm="7" md="8" className="mv-loading-container"><Spinner /></Col>) : (
    <Col sm="7" md="8" className="message-view-container">
      <div className="mv-content--container">
        <div className="mv-top">
          <div className="mv-top__name">{currRoom.rName}</div>
          <div className="mv-top__description">{currRoom.description}</div>
        </div>
        <div id="mv-container-01" className="mv-box">
          <ListGroup className="mv-box__message">
            {messageList.map((mess, index) => {
              return mess.isVisible ? (
                <ListGroup.Item key={index} className={`mv-box__message--item ${mess.textAlign}`}>
                  <Card className={`card-inside ${mess.textAlign}`}>
                    <Card.Subtitle className="mb-2 card-inside__username">{mess.name}</Card.Subtitle>
                    <ListGroup.Item
                      active={mess.textAlign === 'right'}
                      className={`card-inside__mess-text ${mess.textAlign}`}
                    >
                      {breakStringLine(mess.contentText).map((str, index) => <div key={index} className="card-inside__mess-text--line">{str}</div>)}
                    </ListGroup.Item>
                  </Card>
                </ListGroup.Item>
              ) : '';
            })}
          </ListGroup>
        </div>
      </div>
      <ChatForm />
    </Col>
  );
}

export default MessagesView;