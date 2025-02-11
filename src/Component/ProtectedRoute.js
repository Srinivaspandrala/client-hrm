import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Cookies.get('token');

    if (!isAuthenticated) {
        Cookies.remove('token');
        Cookies.remove('username');
        alert('Your session has expired. Please log in again.');
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
