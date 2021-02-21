import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { ModalButton } from 'components/CustomButton';
import { connDBAddNewRoom } from './handles/handleRoom';


function RoomAddModal(props) {
  const { onHide, ...other } = props;
  const [room, setRoom] = useState({ rName: '', description: '', password: '' });
  const [errors, setErrors] = useState({ rNameError: '' });

  const handleName = (event) => {
    setRoom({
      ...room,
      rName: event.target.value,
    });
    if (errors.rNameError !== '') { setErrors({ ...errors, rNameError: '' }); }
  }

  const handleDescription = (event) => {
    setRoom({ ...room, description: event.target.value, });
  }

  const handlePassword = (event) => {
    setRoom({ ...room, password: event.target.value, });
  }

  const handleClose = () => {
    onHide();
    setRoom({ rName: '', description: '', password: '' });
    setErrors({ rNameError: '', });
  }

  const handleSubmitAdd = () => {
    connDBAddNewRoom(room);
    handleClose();
  }

  return (
    <Modal
      {...other}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formRoomName">
          <Form.Label>Room name *</Form.Label>
          <Form.Control type="text" placeholder="Enter room name" value={room.rName} onChange={handleName} />
          <Form.Text className="text-muted">Optional</Form.Text>
        </Form.Group>
        <Form.Group controlId="formRoomDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={room.description} onChange={handleDescription} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={room.password} onChange={handlePassword} />
          <Form.Text className="text-muted">Optional</Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton
          disabled={room.rName === ''}
          backgroundColor="#4463ff"
          color="#fff"
          onClick={handleSubmitAdd}
        >OK</ModalButton>
        <ModalButton
          backgroundColor="#fff"
          color="#4463ff"
          onClick={handleClose}
        >Close</ModalButton>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomAddModal;