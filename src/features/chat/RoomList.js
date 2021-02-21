import PropTypes from 'prop-types';
import { ListGroup, Card } from 'react-bootstrap';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrRoom, selectCurrRoom, setRoomList, selectRoomList, selectRoomListSearchStr } from './roomSlice';
import { disconnectAllMess } from './handles/handleMessage';
import RoomPasswordModal from './RoomPasswordModal';
import KeyIcon from 'assets/KeyIcon';

function RoomList(props) {
  const [passModalShow, setPassModalShow] = useState(false);
  const [roomTemp, setRoomTemp] = useState({ list: [], currRoom: {} });
  const dispatch = useDispatch();
  const currRoom = useSelector(selectCurrRoom);
  const roomList = useSelector(selectRoomList);
  const searchStr = useSelector(selectRoomListSearchStr);
  const { handleMessRender } = props;

  useEffect(() => {
    const rooms = firebase.database().ref().child('rooms');
    rooms.on('value', snap => {
      if (snap.exists()) {
        const newRoomTemp = {
          ...roomTemp,
          list: [...Object.values(snap.val())]
        };
        setRoomTemp(newRoomTemp);
        dispatch(setRoomList(newRoomTemp.list));
      }
    });
    return () => {
      disconnectAllMess(currRoom);
      rooms.off()
      setPassModalShow(false);
    };
  }, []);

  useEffect(() => {
    const newList = handleFilterRoomList();
    setRoomTemp({
      ...roomTemp,
      list: newList,
    });
  }, [searchStr]);

  const handleFilterRoomList = () => {
    if (roomList.length > 0 && searchStr !== '') {
      const filterList = roomList.filter(room => room.rName.search(searchStr) >= 0);
      return filterList ? filterList : [];
    }
    return roomList;
  }

  const handleRoomClick = (currentRoom) => {
    if (currentRoom.rId !== currRoom.rId) {
      if (currentRoom.password === '') {
        disconnectAllMess(currRoom);
        dispatch(setCurrRoom(currentRoom));
        handleMessRender();
      } else {
        const newRoomTemp = {
          ...roomTemp,
          currRoom: currentRoom,
        };
        setRoomTemp(newRoomTemp);
        setPassModalShow(true);
      }
    }
  }

  const handlePasswordModalClose = () => {
    setPassModalShow(false);
  }

  const handlePasswordSubmit = () => {
    if (roomTemp.currRoom.rId !== currRoom.rId) {
      disconnectAllMess(currRoom);
      handleMessRender();
      dispatch(setCurrRoom(roomTemp.currRoom));
      setPassModalShow(false);
    }
  }

  return (
    <ListGroup as="ul">
      {roomTemp.list.map((room) => {
        return (
          <ListGroup.Item
            className="rlist-item"
            action as="li"
            key={room.rId}
            active={room.rId === currRoom.rId}
            onClick={() => handleRoomClick(room)}
          >
            <Card.Body style={{ padding: 0 }}>
              <Card.Title style={{ fontSize: 'inherit' }}>
                {room.rName}
                {room.password !== '' ? <div className="rlist-item__icon" ><KeyIcon size={12} color="#292a30" /></div> : ''}
              </Card.Title>
              <Card.Text>{room.description}</Card.Text>
            </Card.Body>

          </ListGroup.Item>
        );
      })}
      <RoomPasswordModal
        show={passModalShow}
        backdrop="static"
        onHide={handlePasswordModalClose}
        handleSubmit={handlePasswordSubmit}
        room={roomTemp.currRoom}
      />
    </ListGroup>
  );
}

RoomList.propsTypes ={
  handleMessRender: PropTypes.func,
};

export default RoomList;