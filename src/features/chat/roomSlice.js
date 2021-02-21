import { createSlice } from '@reduxjs/toolkit';
import { disconnectAllMess } from './handles/handleMessage';

export const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rList: [],
    rListSearchStr: '',
    currRoom: {},
    userList: [],
    messageList: [],
    totalMess: 0,
    totalUser: 0,
    messLoading: true,
    connRealTime: {
      messList: false,
      userList: false,
      totalMess: false,
      totalUser: false,
    },
  },
  reducers: {
    setRoomList: (state, action) => {
      state.rList = action.payload;
    },
    setRoomListSearchStr: (state, action) => {
      state.rListSearchStr = action.payload;
    },
    setCurrRoom: (state, action) => {
      disconnectAllMess(action.payload);
      if (action.payload.rId !== state.currRoom.rId) {
        state.currRoom = action.payload;
        state.messLoading = true;
      }
    },
    setUserListInRoom: (state, action) => {
      state.userList = action.payload;
    },
    pushUserInRoom: (state, action) => {
      state.userList.push(action.payload);
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    pushMessageList: (state, action) => {
      state.messageList.push(action.payload);
    },
    setTotalMess: (state, action) => {
      state.totalMess = action.payload;
    },
    setTotalUser: (state, action) => {
      state.totalUser = action.payload;
    },
    setMessLoading: (state, action) => {
      if (state.messLoading !== action.payload) {
        state.messLoading = action.payload;
      }
    },
    resetConnRealTime: (state) => {
      state.connRealTime = {
        messList: false,
        userList: false,
        totalMess: false,
        totalUser: false,
      };
    },
    setMessListRT: (state, action) => {
      state.connRealTime.messList = action.payload;
    }, 
    setUserListRT: (state, action) => {
      state.connRealTime.userList = action.payload;
    },
    setTotalMessRT: (state, action) => {
      state.connRealTime.totalMess = action.payload;
    },
    setTotalUserRT: (state, action) => {
      state.connRealTime.totalUser = action.payload;
    },
  }
});

export const {
  setRoomList,
  setRoomListSearchStr,
  setCurrRoom,
  setUserListInRoom,
  setMessageList,
  pushMessageList,
  setTotalMess,
  setTotalUser,
  pushUserInRoom,
  setMessLoading,
  resetConnRealTime,
  setMessListRT,
  setUserListRT,
  setTotalMessRT,
  setTotalUserRT
} = roomSlice.actions;

export const selectRoomList = state => state.rooms.rList;

export const selectRoomListSearchStr = state => state.rooms.rListSearchStr;

export const selectCurrRoom = state => state.rooms.currRoom;

export const selectUserListInRoom = state => state.rooms.userList;

export const selectMessageList = state => state.rooms.messageList;

export const selectTotalMess = state => state.rooms.totalMess;

export const selectTotalUser = state => state.rooms.totalUser;

export const selectMessLoading = state => state.rooms.messLoading;

export const selectConnRealTime = state => state.rooms.connRealTime;

export default roomSlice.reducer;