import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import { Container, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SignIn from 'features/auth/SignIn';
import RoomView from 'features/chat/RoomView';
import AccountButton from 'features/auth/AccountButton';
import SecureRoute from 'components/SecureRoute';
import { setToken, setUser, setIsAdmin } from 'features/auth/authSlice';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const config = {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};
firebase.initializeApp(config);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        localStorage.removeItem('ca_token');
        return;
      }
      const currUser = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      }
      firebase.database().ref('/admins').get().then(snapAdmin => {
        if (snapAdmin.exists()) {
          const admins = Object.values(snapAdmin.val());
          const isAdmin = admins.findIndex(a => a.email === user.email) >= 0;
          dispatch(setIsAdmin(isAdmin));
        }
      });
      dispatch(setUser(currUser));
      const token = await user.getIdToken();
      localStorage.setItem('ca_token', token);
      dispatch(setToken(token));
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="app">
      <Container fluid="md">
        <Navbar fixed="top" bg="dark" variant="dark">
          <Container fluid="md">
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ minHeight: 35 }}>
                <AccountButton />
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>

        </Navbar>
        <Switch>
          <Redirect exact from="/" to="/rooms" />
          <Route path="/sign-in" component={SignIn} />
          <SecureRoute path="/rooms"><RoomView /></SecureRoute>
        </Switch>
      </Container>

    </div>
  );
}

export default App;
