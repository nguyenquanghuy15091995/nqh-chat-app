import firebase from 'firebase';

export function connDBAddNewRoom(room) {
  const fdb = firebase.database();
  fdb.ref('/totalRoom').get().then(snapTotalRoom => {
    if (snapTotalRoom.exists()) {
      const totalRoom = snapTotalRoom.val();
      const newRoomId = fdb.ref('rooms').push().key;
      const currUser = firebase.auth().currentUser;
      const newRoom = {
        ...room,
        rId: newRoomId,
        masterEmail: currUser.email,

      };
      const roomMess = {
        messageList: [{
          contentText: '',
          dateSent: '',
          email: '',
          id: 'temp',
          isVisible: false
        }],
        totalMess: 1,
        totalUser: 1,
        userList: [
          {
            uid: currUser.uid,
            email: currUser.email,
            name: currUser.displayName,
            photoUrl: currUser.photoURL,
            status: '',
          }
        ]
      };
      fdb.ref(`/rooms/${totalRoom}`).set(newRoom);
      fdb.ref(`/totalRoom`).set(totalRoom + 1);
      fdb.ref(`/messages/${newRoomId}`).set(roomMess);
    }
  })
}