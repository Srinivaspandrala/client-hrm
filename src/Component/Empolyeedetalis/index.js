import React, { useState } from 'react';
import './index.css';

const EmployeeDetails = ({ employee, password, setPassword }) => (
  <>
    <section id="employee-details" className="card">
      <h2>Employee Details</h2>
      <p><strong>Name: </strong>{employee.name}</p>
      <p><strong>Email: </strong>{employee.email}</p>
      <p><strong>Gender: </strong>{employee.gender}</p>
      <p><strong>Birth Date: </strong>{employee.birthDate}</p>
    </section>

    <section id="change-password" className="card">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={password.oldPassword}
        onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password.newPassword}
        onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
      />
      <input
        type="password"
        placeholder="Re-enter Password"
        value={password.reenterPassword}
        onChange={(e) => setPassword({ ...password, reenterPassword: e.target.value })}
      />
      <button>Update Password</button>
    </section>

    <section id="contact-information" className="card">
      <h2>Contact Information</h2>
      <p><strong>Address: </strong>{employee.address}</p>
      <p><strong>Mobile: </strong>{employee.mobile}</p>
      <p><strong>Email: </strong>abc@gmail.com</p>
    </section>

    <section id="exit-details" className="card">
      <h2>Exit Details</h2>
      <img src={employee.photo} alt="Employee" className="employee-photo" />
      <p><strong>EMP ID: </strong>{employee.empId}</p>
      <p><strong>First Name: </strong>{employee.firstName}</p>
      <p><strong>Last Name: </strong>{employee.lastName}</p>
      <p><strong>Start Date: </strong>{employee.startDate}</p>
      <p><strong>Tenure: </strong>{employee.tenure}</p>
      <p><strong>Status: </strong>{employee.status}</p>
    </section>

    <section id="organizational-chart" className="card">
      <h2>Organizational Chart</h2>
      <div className="org-chart">
        <div className="org-node">CEO</div>
        <div className="org-branch">
          <div className="org-node">Manager</div>
          <div className="org-branch">
            <div className="org-node">Team Lead</div>
            <div className="org-branch">
              <div className="org-node">Developer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const App = () => {
  const [employee] = useState({
    name: 'Rohith Sai Gollamudi',
    email: 'rohithsai@gollamudigroup.com',
    gender: 'Male',
    birthDate: '21-01-1998',
    address: 'Plot no XYZ, ABC Apartment, City',
    mobile: '9999999999',
    empId: '1241',
    firstName: 'Rohith Sai',
    lastName: 'Gollamudi',
    startDate: '3 Nov 2021',
    tenure: '18 Months',
    status: 'Active',
    photo: 'https://via.placeholder.com/150' 
  });

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    reenterPassword: ''
  });

  return (
    <div className="container">
      <div className="sidebar card-sidebar">
        <ul>
          <li><a href="#employee-details">Employee Details</a></li>
          <li><a href="#change-password">Change Password</a></li>
          <li><a href="#contact-information">Contact Information</a></li>
          <li><a href="#exit-details">Exit Details</a></li>
          <li><a href="#organizational-chart">Organizational Chart</a></li>
        </ul>
      </div>

      <div className="content">
        <EmployeeDetails employee={employee} password={password} setPassword={setPassword} />
      </div>
    </div>
  );
};

export default App;
