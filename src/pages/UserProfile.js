
import { useState } from 'react';
import { getRequest } from '../api/httpUtils';
import { errorNotify } from '../components/NotificationSystem'
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
    const [userId, setUserId] = useState(0)

    const GetUserId = async () => {
        
        const decoded = jwtDecode(localStorage.getItem('token'));
        const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
        console.log(decoded)
        console.log(email)
        try {
          const userId = await getRequest(`/User/GetId/${email}`);
          console.log(userId.data)
          setUserId(userId.data);
        } catch (error) {
          errorNotify('Error! We can not specify the userId');
        }
        return userId;
      };

    return <div className="profile-page">
        <div className="generic-information">
            <h1>Hello user! Welcome to your profile.</h1>
            <button onClick={GetUserId}>GetId</button>
        </div>

        <div className="user-info">

        </div>
    </div>
}

export default UserProfile;