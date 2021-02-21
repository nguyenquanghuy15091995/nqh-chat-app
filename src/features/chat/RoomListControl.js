import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { AddButton, SearchButton } from 'components/CustomButton';
import { selectIsAdmin } from 'features/auth/authSlice';
import { selectRoomListSearchStr, setRoomListSearchStr } from './roomSlice';
import RoomAddModal from './RoomAddModal';

function RoomListControl() {
  const [addModalShow, setAddModalShow] = useState(false);
  const searchText = useSelector(selectRoomListSearchStr);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  let searchTyping = useRef(null);
  const handleSearchChange = (event) => {
    if (event.keyCode !== 220) {
      if (searchTyping.current) {
        clearTimeout(searchTyping.current);
      }
      searchTyping.current = setTimeout(() => {
        dispatch(setRoomListSearchStr(event.target.value));
      }, 500);
    }
  }

  const handleNewRoomClick = () => {
    setAddModalShow(true);
  }

  const handleAddModalClose = () => {
    setAddModalShow(false);
  }

  return (
    <div className="rlist-ctrl">
      <div className="rlist-ctrl__title">
        <div style={{ width: '100%' }}>Chat App</div>
        {isAdmin ? (<AddButton
          fullWidth
          color="#4463ff"
          onClick={handleNewRoomClick}
        >New Room</AddButton>) : ''}

      </div>
      <div className="rlist-ctrl__search">
        <InputGroup className="mb-3" style={{ backgroundColor: '#e6e5ea', borderRadius: 10, padding: 5 }}>
          <FormControl
            placeholder="Search"
            aria-label="text-search"
            aria-describedby="basic-addon3"
            onChange={handleSearchChange}
            style={{ boxShadow: 'none', backgroundColor: 'transparent', border: 'none', marginBottom: 2 }}
          />
          <InputGroup.Append>
            <SearchButton
              disabled={searchText.trim() === ''}
              color="#292a30"
            />
          </InputGroup.Append>
        </InputGroup>
      </div>
      <RoomAddModal
        show={addModalShow}
        backdrop="static"
        onHide={handleAddModalClose}
      />
    </div>
  );
}

export default RoomListControl;