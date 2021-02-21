import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { selectUser } from 'features/auth/authSlice';
import Spinner from 'components/Spinner';

function WelcomeScreen() {
  const currUser = useSelector(selectUser);

  return (
    <div className="wcs-container wcs-userinfo">
      {currUser.uid ? (
        <div className="wcs-userinfo">
          <div className="wcs-userinfo__avatar">
            <div className="wcs-userinfo__avatar--grow">
              <Image src={currUser.photoUrl} width={100} height={100} roundedCircle alt="User Avatar" />
            </div>
          </div>
          <div className="wcs-userinfo__text">
            <div className="wcs-userinfo__text--welcome wcs-text">Welcome!</div>
            <div className="wcs-userinfo__text--name wcs-text">{currUser.name}</div>
          </div>
          <div className="wcs-userinfo__tut wcs-text">Choose your room and have a nice conversation.</div>
        </div>
      ) : <Spinner />}
    </div>
  );
}

export default WelcomeScreen;