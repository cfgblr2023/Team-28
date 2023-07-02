import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const AllSessions = ({ userId }) => {
  const [initialPoint, setInitialPoint] = useState({
    longitude:72.09,
    latitude:23.98
  });
  const limeOptions = { color: 'lime' }
  const [destinationPoint, setDestinationPoint] = useState({
    longitude:72.09,
    latitude:23.98
  });
  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/allSession/${userId}`,
        {
          method: "GET",
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (!initialPoint) {
      setInitialPoint({ latitude: lat, longitude: lng });
    } else if (initialPoint && !destinationPoint) {
      setDestinationPoint({ latitude: lat, longitude: lng });
    } else {
      setInitialPoint({ latitude: lat, longitude: lng });
      setDestinationPoint(null);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div>
            <h1 className="text-center mb-4">User Sessions</h1>

            <div className="session-cards">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Session ID: 64a09a6b24355c4914703e59</Card.Title>
                  <Card.Text>Start Timestamp: "23:00"</Card.Text>
                  <Card.Text>End Timestamp: "23:50"</Card.Text>
                  <Card.Text>
                    Coordinates Covered:
                    <ul>
                      <li>Latitude: 34, Longitude: 46.80</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Session ID: 64a09a6b24355c4914703e5a</Card.Title>
                  <Card.Text>Start Timestamp: "13:00"</Card.Text>
                  <Card.Text>End Timestamp: "43:50"</Card.Text>
                  <Card.Text>
                    Coordinates Covered:
                    <ul>
                      <li>Latitude: 54, Longitude: 16.40</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
                <Card.Body>
                  <MapContainer
                    center={[initialPoint?.latitude, initialPoint.longitude]}
                    zoom={13}
                    style={{ height: "300px", width: "100%" }}
                  >
                    {/* <MapEvents /> */}
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[initialPoint?.latitude, initialPoint.longitude]}
                    >
                      <Popup>Your Location</Popup>
                    </Marker>
                    <Polyline pathOptions={limeOptions} positions={polyline} />
                    {initialPoint && (
                      <Marker
                        position={[
                          initialPoint.latitude,
                          initialPoint.longitude,
                        ]}
                      />
                    )}
                    {destinationPoint && (
                      <Marker
                        position={[
                          destinationPoint.latitude,
                          destinationPoint.longitude,
                        ]}
                      />
                    )}
                    {initialPoint && destinationPoint && (
                      <Polyline
                        positions={[
                          [initialPoint.latitude, initialPoint.longitude],
                          [
                            destinationPoint.latitude,
                            destinationPoint.longitude,
                          ],
                        ]}
                        color="red"
                      />
                    )}
                  </MapContainer>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Session ID: 64a09a6b24355c4914703e59</Card.Title>
                  <Card.Text>Start Timestamp: "23:00"</Card.Text>
                  <Card.Text>End Timestamp: "23:50"</Card.Text>
                  <Card.Text>
                    Coordinates Covered:
                    <ul>
                      <li>Latitude: 34, Longitude: 46.80</li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllSessions;
