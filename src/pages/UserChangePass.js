import Eye from '../assets/eye.png'
import '../styles/register.scss';
import { useState } from 'react'

const UserChangePass = () => {
    const [passType, setPassType] = useState('password') 

    const onEyePassClicked = () => {

    }

    const onChangeClicked = () => {

    }

    return(
        <div className="register-page">
            <div className='register'>
                    <div className='register-right'>
                        <h2 className='register-title'>Change Password</h2>
                        <h3 className='login-info'>You have to change your one-time password before you can proceed to your account.</h3>
                        <div>
                        <label className='register-label'>Current Password</label>
                            <div className='input-btn-container'>
                                <input type={passType}></input>
                                <button className='btn-eye' onClick={onEyePassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            <label className='register-label'>New Password</label>
                            <div className='input-btn-container'>
                                <input type={passType}></input>
                                <button className='btn-eye' onClick={onEyePassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            <label className='register-label'>Confirm New Password</label>
                            <div className='input-btn-container'>
                                <input type={passType}></input>
                                <button className='btn-eye' onClick={onEyePassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            
                            <button className='register-btn' onClick={onChangeClicked}>Change</button>
                        </div>
                    </div>
            </div>
            
        </div>)
}

export default UserChangePass;