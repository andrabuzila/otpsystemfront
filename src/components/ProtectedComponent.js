import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Navigate } from 'react-router-dom';
import { PAGES_URL } from '../constants/urlConstants';
import { getRequest } from '../api/httpUtils';
import { errorNotify } from './notification/NotificationSystem';

const ProtectedComponent = ({ children }) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(null);
  const { isLoggedIn, userId } =
    useContext(AppContext);

  const verifyRegistration = async () => {
    try {
      if (userId) {
        const response = await getRequest(
          `User/VerifyUserAlreadyRegistered/${userId}`
        );
        setAlreadyRegistered(response.data);
      }
    } catch (err) {
      errorNotify(err);
    }
  };

  useEffect(() => {
    (async () => await verifyRegistration())();
    // eslint-disable-next-line
  }, [userId]);

  if (alreadyRegistered !== null) {
    if (!firstStepFinished || !secondStepFinished || alreadyRegistered) {
      if (isLoggedIn !== null) {
        if (isLoggedIn === false) {
          return <Navigate to={PAGES_URL.Home} />;
        }
      } else {
        return <Navigate to={PAGES_URL.Home} />;
      }
    }
    return children;
  }
};
export default ProtectedComponent;