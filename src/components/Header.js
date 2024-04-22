import React, { useContext } from 'react';
import '../styles/header.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();
    const onClickLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/')
    }

    return <header className="header">
        <ul className='header-menu'>
            {!isLoggedIn ? (<Link tag={Link} to={'/'}>
                <li><button className='main-btn'>Explore</button></li>
            </Link>) : (<Link tag={Link} to={'/profile'}>
                <li><button className='main-btn'>My Profile</button></li>
            </Link>
            )}
            {!isLoggedIn ? (<Link tag={Link} to={'/register'}>
                <li><button className='main-btn'>Register</button></li>
            </Link>) : (<Link tag={Link} to={'/home'}>
                <li><button className='main-btn'>Home</button></li>
            </Link>)}
            {!isLoggedIn ? (<Link tag={Link} to={'/login'}>
                <li><button className='main-btn'>Login</button></li>
            </Link>) : (<li><button className='main-btn' onClick={onClickLogout}>Logout</button></li>)
            }
            
            
        </ul>
        
    </header>
}

export default Header;