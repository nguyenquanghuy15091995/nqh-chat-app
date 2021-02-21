import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { selectCurrRoom, selectTotalMess } from './roomSlice';
import { selectUser } from 'features/auth/authSlice';
import { SendButton } from 'components/CustomButton';


function ChatForm() {
  const currRoom = useSelector(selectCurrRoom);
  const mainUser = useSelector(selectUser);
  const totalMess = useSelector(selectTotalMess);
  const [mulTextValue, setMulTextValue] = useState({ textValue: '' });

  useEffect(() => {
    if (mulTextValue.textValue.split(' ')[0] === '\n') {
      setMulTextValue({
        ...mulTextValue,
        textValue: '',
      });
    }
  }, [mulTextValue.textValue])

  const handleMulTextValue = (event) => {
    setMulTextValue({
      ...mulTextValue,
      textValue: event.target.value,
    });
  }

  const handleEnter = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleSend();
    }
  }

  const handleSend = () => {
    if (mulTextValue.textValue.trim() !== '') {
      const messListRef = firebase.database().ref(`/messages/${currRoom.rId}/messageList`);
      const messId = messListRef.push().key;
      let today = new Date();
      let dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
      let mm = today.getMonth() + 1 < 10 ? `0${today.getMonth()}` : today.getMonth();
      let yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      const updateData = {
        id: messId,
        email: mainUser.email,
        dateSent: today,
        contentText: mulTextValue.textValue.trim(),
        isVisible: true
      };

      const newTotalMess = totalMess;
      firebase.database().ref(`/messages/${currRoom.rId}/messageList/${newTotalMess}`).set(updateData);
      firebase.database().ref(`/messages/${currRoom.rId}/totalMess`).set(newTotalMess + 1);
    }
    if (mulTextValue.textValue !== '') {
      setMulTextValue({
        ...mulTextValue,
        textValue: '',
      });
    }
  }

  return (
    <Form>
      <InputGroup className="mb-3" style={{
        boxShadow: '1px 3px 2px #e6e5ea',
        backgroundColor: '#fff',
        borderRadius: '0 0 10px 10px',
        padding: 5,
      }}>
        <FormControl
          id="txtarea-message-01"
          as="textarea"
          placeholder={Object.keys(currRoom).length === 0 ? '' : 'Type a message here...'}
          aria-label="text-content"
          aria-describedby="basic-addon2"
          rows={4}
          style={{ resize: 'none', boxShadow: 'none', backgroundColor: 'transparent', border: 'none' }}
          value={mulTextValue.textValue}
          onChange={handleMulTextValue}
          onKeyDown={handleEnter}
          disabled={Object.keys(currRoom).length === 0}
        />
        <InputGroup.Append>
          <SendButton
            type="button"
            disabled={mulTextValue.textValue.trim() === ''}
            color="#4463ff"
            onClick={handleSend}
          />
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default ChatForm;