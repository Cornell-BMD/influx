const express = require('express');
const app = express();
const PORT = 3000;

// Example messages data
const messages = [
  { phsycian_id: '1', sent: '11/04/2023', subject: 'Appointment Summary',body: 'please reset the device before 10am', name : 'John Doe' },
  { phsycian_id: '1', sent: '11/04/2023', subject: 'Upcoming Appointment',body: 'please reset the device before 10am', name : 'John Doe' },
  { phsycian_id: '1', sent: '11/04/2023', subject: 'Availability',body: 'please reset the device before 10am. If you need sny guidance, please do not hesitate to call me or ny of my assistants. You know we always have your back', name : 'John Doe' },
  { phsycian_id: '1', sent: '11/04/2023', subject: 'Appointment Summary',body: 'please reset the device before 10am', name : 'John Doe' },
];

// Middleware to parse JSON requests
app.use(express.json());

// Define the `/messages` endpoint
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
