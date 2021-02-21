import { Redirect, Route } from 'react-router-dom';

function SecureRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('ca_token') ? (children) : (
          <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
        )}
    />
  );
}

export default SecureRoute;