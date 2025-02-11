import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import './index.css';
import { FaTrash, FaPlusCircle, FaTimesCircle, FaCalendarDay, FaClock, FaTag } from 'react-icons/fa'; // Import Font Awesome 5 icons

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date()),
    getDay,
    locales
});

const eventTypes = {
    Meeting: '#1E90FF',
    Birthday: '#FF4500',
    Holiday: '#32CD32',
    Conference: '#8A2BE2',
    Workshop: '#FFD700',
    Sports: '#FF6347',
    Music: '#FF69B4',
    Other: '#A9A9A9'
};

const MyCalendar = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        type: ''
    });

    // Fetch Events from Backend
    const fetchEvents = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();

            if (response.ok) {
                const mappedEvents = data.events.map((event) => ({
                    id: event.EventsID,
                    title: event.title,
                    start: new Date(`${event.Date}T${event.StartTime}`),
                    end: new Date(`${event.Date}T${event.EndTime}`),
                    color: eventTypes[event.eventType] || eventTypes.Other
                }));

                setEvents(mappedEvents);
            } else {
                alert('Error fetching events: ' + data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('There was an error fetching the events.');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const calendarElement = document.querySelector('.calendar-render');
        if (calendarElement) {
            calendarElement.classList.add('show');
        }
    }, []);

    // Handle Input Change in Form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    // Add Event to Backend
    const handleAddEvent = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime || !newEvent.type) {
            alert('Please fill in all fields.');
            return;
        }

        const formattedEvent = {
            title: newEvent.title,
            date: newEvent.date,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            eventType: newEvent.type
        };

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedEvent)
            });

            const data = await response.json();

            if (response.ok) {
                const newCalendarEvent = {
                    id: data.eventId,
                    title: newEvent.title,
                    start: new Date(`${newEvent.date}T${newEvent.startTime}`),
                    end: new Date(`${newEvent.date}T${newEvent.endTime}`),
                    color: eventTypes[newEvent.type]
                };

                setEvents([...events, newCalendarEvent]);
                setShowForm(false);
                setNewEvent({ title: '', date: '', startTime: '', endTime: '', type: '' });
            } else {
                alert('Error adding event: ' + data.message);
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert('There was an error adding the event.');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) {
            alert('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setEvents(events.filter(event => event.id !== eventId));
                alert('Event deleted successfully!');
            } else {
                const data = await response.json();
                alert('Error deleting event: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('There was an error deleting the event.');
        }
    };

    // Event Styling
    const eventStyleGetter = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                borderRadius: '8px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                padding: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        };
    };

    const customEventRenderer = ({ event }) => {
        return (
            <div className="calendar-event">
                {event.title}
                <FaTrash
                    className="delete-icon"
                    onClick={() => handleDeleteEvent(event.id)}
                />
            </div>
        );
    };

    const handleDateClick = (date) => {
        setNewEvent((prevEvent) => ({
            ...prevEvent,
            date: format(date, 'yyyy-MM-dd')
        }));
        setShowForm(true);
    };

    return (
        <div className='Calendar-siderBar'>
            <div style={{ padding: '20px' }} className='calendar-render'>
                <div className="calendar-header">
                    <h1>Calendar</h1>
                    <FaPlusCircle className="add-event-icon" onClick={() => setShowForm(true)} />
                </div>

                {showForm && (
                    <div className="event-form-overlay">
                        <div className="event-form">
                            <FaTimesCircle className="close-event-icon" onClick={() => setShowForm(false)} />
                            <h2>Add Event</h2>
                            <div className="form-grid">
                                <div className="form-field">
                                    <FaPlusCircle className="input-icon" />
                                    <input
                                        type="text"
                                        name="title"
                                        value={newEvent.title}
                                        onChange={handleInputChange}
                                        placeholder="Event Title"
                                        className="styled-input"
                                    />
                                </div>
                                <div className="form-field">
                                    <FaCalendarDay className="input-icon" />
                                    <input
                                        type="date"
                                        name="date"
                                        value={newEvent.date}
                                        onChange={handleInputChange}
                                        className="styled-input"
                                    />
                                </div>
                                <div className="form-field">
                                    <FaClock className="input-icon" />
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={newEvent.startTime}
                                        onChange={handleInputChange}
                                        className="styled-input"
                                    />
                                </div>
                                <div className="form-field">
                                    <FaClock className="input-icon" />
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={newEvent.endTime}
                                        onChange={handleInputChange}
                                        className="styled-input"
                                    />
                                </div>
                                <div className="form-field">
                                    <FaTag className="input-icon" />
                                    <select
                                        name="type"
                                        value={newEvent.type}
                                        onChange={handleInputChange}
                                        className="styled-select"
                                    >
                                        <option value="">Select Type</option>
                                        {Object.keys(eventTypes).map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button className="add-event-btn" onClick={handleAddEvent}>
                                    <FaPlusCircle className="btn-icon" />
                                    Add Event
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                    eventPropGetter={eventStyleGetter}
                    components={{ event: customEventRenderer }}
                    selectable
                    onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
                />
            </div>
        </div>
    );
};

export default MyCalendar;
