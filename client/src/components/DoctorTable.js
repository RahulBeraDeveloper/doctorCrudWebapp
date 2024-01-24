// client/src/components/DoctorTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorTable = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:5000/api/doctors')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Doctor List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialization}</td>
              <td>
                {/* Add update, delete buttons here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
