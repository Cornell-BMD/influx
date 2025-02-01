const express = require('express');
const app = express();
const PORT = 3000;

// Example messages data
const messages = [
  { id: '1', sender: 'Dr. Lila Millington', date: '11/04/2023', subject: 'Appointment Summary' },
  { id: '2', sender: 'Dr. Lila Millington', date: '11/02/2023', subject: 'Updated Dosage (11/02)' },
  { id: '3', sender: 'Dr. Lila Millington', date: '10/31/2023', subject: 'Appointment Summary' },
  { id: '4', sender: 'Dr. Lila Millington', date: '10/28/2023', subject: 'Updated Dosage Today (10/28)' },
  { id: '5', sender: 'Dr. Lila Millington', date: '10/28/2023', subject: 'Appointment Summary' },
  { id: '6', sender: 'Dr. Lila Millington', date: '10/26/2023', subject: 'Please replace the pod correctly' },
  { id: '7', sender: 'Dr. Lila Millington', date: '10/22/2023', subject: 'Appointment Summary' },
  { id: '8', sender: 'Dr. Lila Millington', date: '10/19/2023', subject: 'Updated Dosage (10/19)' },
  { id: '9', sender: 'Dr. Lila Millington', date: '10/19/2023', subject: 'Appointment Summary' },
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
