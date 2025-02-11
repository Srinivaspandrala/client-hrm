import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    MdKeyboardDoubleArrowRight,
    MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import {
    FaUser,
    FaClock,
    FaCalendarCheck,
    FaMoneyBill,
    FaBuilding,
    FaChevronUp,
    FaChevronDown,
} from "react-icons/fa";
import './index.css'; // Ensure proper styling is provided

const Sidebar = ({ onToggle = () => {} }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
    const username = Cookies.get('fullname'); // Fetch username from cookies if stored

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
        onToggle(!isExpanded);
    };

    const menuItems = [
        {
            title: 'Attendance',
            icon: <FaClock />,
            section: 'attendance',
            subItems: [
                { label: 'Attendance Logs', path: '/attendancelogs' },
                { label: 'Attendance Requests', path: '/attendancerequest' },
                { label: 'Timings', path: '/timings' },
            ],
        },
        {
            title: 'Leave',
            icon: <FaCalendarCheck />,
            section: 'leave',
            subItems: [
                { label: 'Casual Leave', path: '/casualleave' },
                { label: 'Paid Leave', path: '/paidleave' },
                { label: 'Unpaid Leave', path: '/unpaidleave' },
            ],
        },
        {
            title: 'Finances',
            icon: <FaMoneyBill />,
            section: 'finances',
            subItems: [
                { label: 'Summary', path: '/financesummary' },
                { label: 'Salary Slip', path: '/salaryslip' },
            ],
        },
        {
            title: 'Organisation',
            icon: <FaBuilding />,
            section: 'organisation',
            subItems: [
                { label: 'Documents', path: '/documents' },
                { label: 'Employees', path: '/employees' },
            ],
        },
    ];

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div
                className="toggle-icon"
                onClick={handleToggleSidebar}
            >
                {isExpanded ? (
                    <MdOutlineKeyboardDoubleArrowLeft size={29} />
                ) : (
                    <MdKeyboardDoubleArrowRight size={29} />
                )}
            </div>

            <div className="user-section">
                <FaUser className="user-logo" />
                {isExpanded && <h4 className="username">{username || 'User'}</h4>}
            </div>
            {isExpanded && <p className="user-role">SOFTWARE ENGINEER</p>}

            {menuItems.map((item, index) => (
                <div key={index} className="menu-section">
                    <div
                        className="sidebar-item"
                        onClick={() => toggleSection(item.section)}
                    >
                        {item.icon}
                        {isExpanded && <span>{item.title}</span>}
                        {expandedSections[item.section] ? (
                            <FaChevronUp className="dropdown-icon" />
                        ) : (
                            <FaChevronDown className="dropdown-icon" />
                        )}
                    </div>
                    {expandedSections[item.section] && isExpanded && (
                        <ul className="dropdown-content">
                            {item.subItems.map((subItem, subIndex) => (
                                <li
                                    key={subIndex}
                                    className="sidebar-subitem"
                                    onClick={() => handleNavigation(subItem.path)}
                                >
                                    {subItem.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
