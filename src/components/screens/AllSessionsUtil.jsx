import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const AllSessions = ({ userId }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/allSession/${userId}`);
        setSessions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, [userId]);


  return (
    <div>
      <h2>User Sessions</h2>

      <div className="session-cards">
        {sessions.map((session) => (
          <Card key={session._id} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>Session ID: {session._id}</Card.Title>
              <Card.Text>Start Timestamp: {session.startTimestamp}</Card.Text>
              <Card.Text>End Timestamp: {session.endTimestamp}</Card.Text>
              <Card.Text>
                Coordinates Covered:
                <ul>
                  {session.coordinatesCovered.map((coord, index) => (
                    <li key={index}>
                      Latitude: {coord.latitude}, Longitude: {coord.longitude}
                    </li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllSessions;
