import '../styles/register.scss';
import Eye from '../assets/eye.png';
import validator from 'validator';
import { useState, useEffect, useContext } from 'react';
import {getRequest, postRequest} from '../api/httpUtils'
import { useNavigate } from 'react-router-dom';
import {successNotify, errorNotify} from '../components/NotificationSystem'
import { jwtDecode } from "jwt-decode";
import { AppContext } from '../App';

const Register = () => {
    const { setIsLoggedIn } = useContext(AppContext);
    const [passType, setPassType] = useState('password') 
    const [OTP, setOTP] = useState("")
    const [confirmPassType, setConfirmPassType] = useState('password') 
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    }) 
    const [error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        wrongInputFormat: '',
    });
    const [passwordconfirmed, setPasswordconfirmed] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0); 
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [generateButtonEnabled, setGenerateButtonEnabled] = useState(true);
    const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      if(timeLeft !== 0)
        setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setSubmitButtonEnabled(false);
      setGenerateButtonEnabled(true);
    } else {
      setSubmitButtonEnabled(true);
      setGenerateButtonEnabled(false);
    }
  }, [timeLeft]);
    
    const onEyeConfirmPassClicked = () => {
        if (confirmPassType === 'password') 
          setConfirmPassType('text')
        else
          setConfirmPassType('password')
    }

    const onEyePassClicked = () => {
        if (passType === 'password') 
            setPassType('text')
        else
            setPassType('password')
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateInput(e);
    };

    const validateInput = (e) => {
        let { name, value } = e.target;
        setError((prev) => {
          const stateObj = { ...prev, [name]: '' };
    
          switch (name) {
            case 'email':
              if (!value) {
                stateObj[name] = 'Please enter email!';
              }
              break;
    
            case 'password':
              if (!value) {
                stateObj[name] = 'Please enter Password!';
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj['confirmPassword'] =
                  'Password and Confirm Password do not match!';
                setPasswordconfirmed(false);
              } else if (value !== OTP) {
                stateObj['password'] = 'Password must be equal to the OTP'

              } else if (
                !validator.isStrongPassword(value, {
                  minLength: 8,
                  minLowercase: 1,
                  minUppercase: 1,
                  minNumbers: 1,
                  minSymbols: 1,
                })
              ) {
                stateObj['password'] =
                  'Password must contain at least 8 characters, 1 lowercase character, 1 uppercase character, 1 number and 1 symbol!';
                setPasswordconfirmed(false);
              } else {
                stateObj['confirmPassword'] = input.confirmPassword
                  ? ''
                  : error.confirmPassword;
                setPasswordconfirmed(true);
              }
              break;
    
            case 'confirmPassword':
              if (!value) {
                stateObj[name] = 'Please enter Confirm Password!';
              } else if (input.password && value !== input.password) {
                stateObj[name] = 'Password and Confirm Password do not match!';
                setPasswordconfirmed(false);
              } else {
                setPasswordconfirmed(true);
              }
              break;
    
            default:
              break;
          }
          return stateObj;
        });
      };

    const saveToLocalStorage = (value) => {
      localStorage.setItem('token', value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postRequest('/User', {
                id: 0,
                email: input.email,
                passwordHash: input.password,
                salt: "salt",
                name: "name"
            })
            if (response.status === 200) {
                saveToLocalStorage(response.data);
                localStorage.setItem('isLoggedIn', true);
                setIsLoggedIn(true)
                navigate('/changePass', { replace: true });
            }
        } catch (err) {
            setError({ ...error, wrongInputFormat: err.response.data });
            errorNotify(err.response.data);
          }
    }

    const onGenerateClicked = async () => {
        try {
            const response = await getRequest('/User/GeneratePass');
            
            const decoded = jwtDecode(response.data.passToken);
            const pass = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash"]
            if (pass !== null && pass !== "") {
                
                try{
                    const valid = await postRequest(`/User/ValidatePass`, pass);
                    setOTP(pass);
                    setTimeLeft(seconds)
                    successNotify(`Your One-Time password is:     ${pass}`);
                    
                } catch (error) {
                    errorNotify(error.response.data);
                }
                
            } else {
                errorNotify('Invalid OTP');
            }
            
        } catch (error){
            errorNotify(error.response.data);
        }

    }

    const onSecondsChanged = (e) => {
      const inputValue = e.target.value;
    
      if (/^\d*$/.test(inputValue)) {
        setSeconds(inputValue);
      }
    }

    return (
        <div className="register-page">
            <div className='register'>
                <div className="register-inside">
                    <div className='register-left'>
                        <p className='register-left-inside'>Create an account</p>
                        <p className='register-left-text'>First, type in the corresponding field the number of seconds you need for registeration and then generate a one-time password. Introduce the password you receive in the notification. After the account is created you will have to change the one-time password with a personalized one. The one-time password will expire after the time you specified. </p>
                    </div>
                    <div className='register-right'>
                    <h2 className='register-title'>Register</h2>
                    <div className='seconds-and-generate-button'><input 
                          className='seconds-input'
                          type="text"
                          value={seconds} 
                          placeholder='Seconds'
                          onChange={onSecondsChanged}></input>
                    <button className="register-btn" onClick={onGenerateClicked} disabled={!generateButtonEnabled || seconds === ""}>Generate One-Time Password</button></div>
                    
                        {/* <form> */}
                        
                        <div>
                            <label className='register-label'>Email</label>
                            <input type='text' name='email' value={input.email} onChange={onInputChange} onBlur={validateInput}></input>
                            
                            <label className='register-label'>Password</label>
                            <div className='input-btn-container'>
                                <input type={passType} name='password' value={input.password} onChange={onInputChange} onBlur={validateInput}></input>
                                <button className='btn-eye' onClick={onEyePassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            
                            
                            <label className='register-label'>Confirm Password</label>
                            <div className='input-btn-container'>
                                <input type={confirmPassType} name='confirmPassword' value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput}></input>
                                <button className='btn-eye' onClick={onEyeConfirmPassClicked}><img className='eye-btn' src={Eye} alt="eye"/></button>
                            </div>
                            {error.email && (
                                <div className='error-div'>
                                    <span className='err'>{error.email}</span>
                                </div>
                            )}
                            {error.password && (
                                <div className='error-div'>
                                    <span className='err'>{error.password}</span>
                                </div>
                            )}
                            {error.confirmPassword && (
                                <div className='error-div'>
                                    <span className='err'>{error.confirmPassword}</span>
                                </div>
                            )}
    
                            <button className='register-btn' onClick={onSubmit} disabled={
                            !(
                                input.email &&
                                input.password &&
                                input.confirmPassword &&
                                passwordconfirmed && submitButtonEnabled
                            )
                            }>Register</button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
            
        </div>)
}

export default Register;