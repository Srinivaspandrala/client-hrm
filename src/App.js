import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CalendarComponent from './Component/Calendar';
import AttendancePage from './Component/Attendance';
import LeaveForm from './Component/Leave';
import Sidebar from './Component/Sidebar';
import NavbarComponent from './Component/Navbar';
import Home from './Component/Home';
import LoginForm from './Component/LoginForm';
import RegisterForm from './Component/RegisterForm';
import Footer from './Component/Footer';
import ForgotPassword from './Component/ForgotPassword';
import Notification from './Component/Notification';
import AttendanceRequest from './Component/AttendanceRequest';
import AdvancedEmailForm from './Component/Emali/inboxindex';
import ProtectedRoute from './Component/ProtectedRoute';
import EmployeePage from './Component/Empolyeedetalis';
import './App.css';

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

const AppRoutes = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token && window.location.pathname !== '/register' && window.location.pathname !== '/forgotpassword') {
            Cookies.remove('username');
            Cookies.remove('token');
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div>

            <Routes>
                <Route path="/" element={<LoginForm /> }  />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/home" element={<ProtectedRoute><Sidebar/><NavbarComponent /><Home /> </ProtectedRoute>}/>
                <Route path="/calendar"element={<ProtectedRoute><Sidebar/><NavbarComponent /><CalendarComponent /></ProtectedRoute>}/>
                <Route path="/paidleave" element={<ProtectedRoute><Sidebar/><NavbarComponent /><LeaveForm /></ProtectedRoute>}/>
                <Route path="/unpaidleave" element={<ProtectedRoute><Sidebar/><NavbarComponent /><LeaveForm /></ProtectedRoute>}/>
                <Route path="/casualleave" element={<ProtectedRoute><Sidebar/><NavbarComponent /><LeaveForm /></ProtectedRoute>}/>
                <Route path="/attendancelogs" element={ <ProtectedRoute> <Sidebar/><NavbarComponent /> <AttendancePage /></ProtectedRoute>}/>
                <Route path="/notification" element={ <ProtectedRoute> <Sidebar/><NavbarComponent /> <Notification/></ProtectedRoute>}/>
                <Route path="/attendancerequest" element={<ProtectedRoute><Sidebar/><NavbarComponent /><AttendanceRequest/></ProtectedRoute>}/>
                <Route path="/emali" element={<ProtectedRoute><Sidebar/><NavbarComponent /><AdvancedEmailForm/></ProtectedRoute>}/>
                <Route path='/empolyeepage' element={<ProtectedRoute><EmployeePage/></ProtectedRoute>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
