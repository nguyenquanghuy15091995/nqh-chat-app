import firebase from 'firebase';
import { 
  pushMessageList, 
  setMessageList, 
  setUserListInRoom, 
  setMessLoading, 
  setTotalUser, 
  setTotalMess,
  setTotalMessRT,
  setTotalUserRT,
  setUserListRT,
  setMessListRT,
} from 'features/chat/roomSlice';

export function breakStringLine(str) {
  return str.split("\n") || [];
}

export function disconnectAllMess(currRoom) {
  firebase.database().ref(`/messages/${currRoom.rId}/userList`).off();
  firebase.database().ref(`/messages/${currRoom.rId}/totalUser`).off();
  firebase.database().ref(`/messages/${currRoom.rId}/totalMess`).off();
  firebase.database().ref(`/messages/${currRoom.rId}/messageList`).off();
}

export function connDBMessUserList(currRoom, userListInRoom, dispatch) {
  const dbUserRef = firebase.database().ref(`/messages/${currRoom.rId}/userList`);
  dbUserRef.on('value', snapUser => {
    if (snapUser.exists()) {
      const userListTemp = snapUser.val();
      dispatch(setUserListInRoom(Object.values(userListTemp)));
      dispatch(setUserListRT(true));
    } else if (userListInRoom.length > 0) {
      dispatch(setUserListInRoom([]));
    }
  });
}

export function connDBGetTotalUserRealTime(currRoom, dispatch) {
  const dbTotalUserRef = firebase.database().ref(`/messages/${currRoom.rId}`).child('totalUser');
  dbTotalUserRef.on('value', snapTotalUser => {
    if (snapTotalUser.exists()) {
      dispatch(setTotalUser(snapTotalUser.val()));
      dispatch(setTotalUserRT(true));
    } else {
      dispatch(setTotalUser(0));
    }
  })
}

export function connDBMessUserExists(currRoom, mainUser, dispatch) {
  const dbUserRef = firebase.database().ref(`/messages/${currRoom.rId}/userList`);
  firebase.database().ref(`/messages/${currRoom.rId}/`).child('totalUser').once('value', snapTotalUser => {
    if (snapTotalUser.exists()) {
      const totalUser = snapTotalUser.val();
      dbUserRef.orderByChild('email').equalTo(`${mainUser.email}`).once('value', (snap) => {
        if (snap.exists() === false) {
          const newUser = { ...mainUser, id: mainUser.uid };
          firebase.database().ref(`/messages/${currRoom.rId}/userList/${totalUser}`).set(newUser);
          firebase.database().ref(`/messages/${currRoom.rId}/totalUser`).set(totalUser + 1);
        }
      });
    }
    connDBGetTotalUserRealTime(currRoom, dispatch);
  });
}

export function connDBGetTotalMessRealTime(currRoom, dispatch) {
  const dbTotalMessRef = firebase.database().ref(`/messages/${currRoom.rId}`).child('totalMess');
  dbTotalMessRef.on('value', snapTotalMess => {
    if (snapTotalMess.exists()) {
      dispatch(setTotalMess(snapTotalMess.val()));
      dispatch(setTotalMessRT(true));
    } else {
      dispatch(setTotalMess(0));
    }
  })
}

export function connDBTrackMessageListRealTime(currRoom, totalMess, userList, mainUser, messageList, dispatch) {
  const dbMessageRef = firebase.database().ref(`/messages/${currRoom.rId}/messageList`);
  if (userList.length > 0) {
    const indexStart = totalMess - 22 <= 0 ? 0 : totalMess - 22;
    dbMessageRef.orderByKey().startAt(`${indexStart}`).get().then(snapMess => {
      if (snapMess.exists()) {
        const messListTemp = snapMess.val();
        const newMessList = [];
        let count = indexStart;
        messListTemp.forEach(mess => {
          let filterUser = userList.find(user => user.email === mess.email);
          const newMess = {
            keyIndex: count,
            ...filterUser,
            ...mess,
            textAlign: mess.email === mainUser.email ? 'right' : 'left'
          };
          if (count < totalMess - 1) {
            newMessList.push(newMess);
          }
          count++;
        });
        dispatch(setMessageList(newMessList));
        trackLastMessage(dbMessageRef, totalMess, userList, mainUser, dispatch);
      } else if (messageList.length > 0) {
        dispatch(setMessageList([]));
      }
    });
  }

}

function trackLastMessage(dbMessageRef, totalMess, userList, mainUser, dispatch) {
  dbMessageRef.orderByKey().startAt(`${totalMess - 1}`).on('child_added', snapMess => {
    if (snapMess.exists()) {
      const messTemp = snapMess.val();
      const filterUser = userList.find(user => user.email === messTemp.email);
      const newMess = {
        ...filterUser,
        ...messTemp,
        textAlign: messTemp.email === mainUser.email ? 'right' : 'left'
      };
      dispatch(pushMessageList(newMess));
      dispatch(setMessLoading(false));
      dispatch(setMessListRT(true));
    }
  });
}