import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import UserChangePass from './pages/UserChangePass';
import UserProfile from './pages/UserProfile';

const AppRoutes = () => {
    return [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        },
        {
            path: "/changePass",
            element: <UserChangePass/>
        },
        {
            path: "/profile",
            element: <UserProfile/>
        }
    ]
} 
export default AppRoutes;