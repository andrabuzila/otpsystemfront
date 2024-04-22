import Eye from '../assets/eye.png'
import '../styles/register.scss';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { postRequest } from '../api/httpUtils';
import { errorNotify } from '../components/NotificationSystem'

const Login = () => {
    const [passType, setPassType] = useState('password') 

    const onEyePassClicked = () => {
        if (passType === 'password') 
            setPassType('text')
        else
            setPassType('password')
    }
    const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigate = useNavigate();
    const params = {
      Email: emailValue,
      Password: passwordValue,
    };
  
    useEffect(() => {
      if (isLoggedIn || isLoggedIn === null) {
        navigate('/');
      }
      
    }, [isLoggedIn]);
  
    const onEmailChanged = (value) => {
      setEmailValue(value.target.value);
    };
  
    const onPasswordChanged = (value) => {
      setPasswordValue(value.target.value);
    };
  
    const saveToLocalStorage = (value) => {
      localStorage.setItem('token', value);
    };

    const onLoginClicked = async () => {
        try{
            const isUserRegistered = await postRequest(
                `/User/CheckIfUserExist`,
                params
              );
            if (isUserRegistered.data){
                console.log(isUserRegistered.data)
                saveToLocalStorage(isUserRegistered.data);
                setIsLoggedIn(true);
                return navigate('/profile');
            }
        }catch (error){
            errorNotify(error.response.data)
        }
        
    }

    return(
        <div className="register-page">
            <div className='register'>
                <div className="register-inside">
                    <div className='register-left'>
                        <p className='register-left-inside'>View your bank account</p>
                        <p className='register-left-text'>Please register in order to use our application. It takes only 3 simple steps.</p>
                    </div> 
                    <div className='register-right'>
                        <h2 className='register-title'>Login</h2>
                        <h3 className='login-info'>If you don’t have already an account please go to Register or click on the link <a href={'/register'}>Create an account</a> </h3>
                        <div>
                            <label className='register-label'>Email</label>
                            <input type='text' 
                                onChange={(value) => onEmailChanged(value)}
                                value={emailValue}></input>
                            <label className='register-label'>Password</label>
                            <div className='input-btn-container'>
                                <input type={passType} 
                                    onChange={(value) => onPasswordChanged(value)}
                                    value={passwordValue}></input>
                                <button className='btn-eye' onClick={onEyePassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            
                            <button className='register-btn' onClick={onLoginClicked}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>)
}

export default Login;