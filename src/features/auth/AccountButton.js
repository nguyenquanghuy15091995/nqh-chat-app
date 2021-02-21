import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { selectUser, signOut } from './authSlice';
import { useEffect, useState } from 'react';

function AccountButton() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSignOut, setIsSignOut] = useState(null);

  useEffect(() => {
    if (isSignOut === false) {
      dispatch(signOut());
    }
    if (isSignOut) {
      setTimeout(() => {
        history.push('/sign-in');
        localStorage.removeItem('ca_token');
        setIsSignOut(null);
      }, 200);
    }
  }, [isSignOut]);

  useEffect(() => {
    if (isSignOut === false && !user.uid && history.location.pathname !== '/sign-in') {
      setIsSignOut(true);
    }
  }, [user.uid]);

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      setIsSignOut(false);
    }).catch(error => {

    });
  }

  return user.name ? (
    <div
      className="auth-top-action"
    >Signed in as: <a className="auth-top-action__username">{user.name}</a>,
      <a onClick={handleSignOut} className="auth-top-action__sign-out">Sign out</a>
    </div>
  ) : '';
}

export default AccountButton;