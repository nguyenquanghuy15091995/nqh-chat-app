import { Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { ModalButton } from 'components/CustomButton';

function RoomPasswordModal(props) {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { handleSubmit, room, onHide, ...other } = props;
  const handleClose = () => {
    onHide();
    setPassword('');
    setError('');
  }
  const handleOK = () => {
    if (room.password === password) {
      handleSubmit();
      setPassword('');
      setError('');
    } else {
      setError('Wrong Password!');
    }
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    if (error !== '') {
      setError('');
    }
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
        <Modal.Title id="contained-modal-title-vcenter">
          {room.rName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{room.description}</p>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="password"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={password}
            onChange={handlePasswordInput}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                handleOK();
              }
            }}
          />
        </InputGroup>
        {error === '' || <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <ModalButton backgroundColor="#4463ff" color="#fff" onClick={handleOK}>OK</ModalButton>
        <ModalButton backgroundColor="#fff" color="#4463ff" onClick={handleClose}>Close</ModalButton>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomPasswordModal;