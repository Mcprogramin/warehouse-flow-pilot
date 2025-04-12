const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors'); // For handling CORS in API requests
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Store MQTT client globally
let mqttClient = null;

// POST endpoint to connect to MQTT broker
app.post('/connect', (req, res) => {
  const { host, port, username, password, topic } = req.body;

  // Validate required fields
  if (!host || !port || !topic) {
    return res.status(400).json({ message: "Missing required fields: host, port, or topic" });
  }

  // Disconnect existing client if any
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
  }

  // Create new MQTT client
  mqttClient = mqtt.connect(`mqtt://${host}:${port}`, {
    username: username || undefined,
    password: password || undefined,
  });

  mqttClient.on('connect', () => {
    console.log('MQTT connection established');
    mqttClient.subscribe(topic, (err) => {
      if (!err) {
        res.json({ message: `Connected and subscribed to topic: ${topic}` });
      } else {
        res.status(500).json({ message: 'Failed to subscribe to topic' });
      }
    });
  });

  mqttClient.on('error', (err) => {
    console.error('MQTT connection error:', err);
    res.status(500).json({ message: 'MQTT connection error' });
  });

  mqttClient.on('message', (topic, message) => {
    console.log(`Message received on topic ${topic}: ${message.toString()}`);
  });
});

// POST endpoint to disconnect from MQTT broker
app.post('/disconnect', (req, res) => {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
    res.json({ message: 'Disconnected from MQTT broker' });
  } else {
    res.status(400).json({ message: 'No active MQTT connection' });
  }
});

// POST endpoint to publish a message
app.post('/publish', (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ message: "Missing required fields: topic or message" });
  }

  if (mqttClient) {
    mqttClient.publish(topic, message, (err) => {
      if (!err) {
        res.json({ message: `Message published to topic: ${topic}` });
      } else {
        res.status(500).json({ message: 'Failed to publish message' });
      }
    });
  } else {
    res.status(400).json({ message: 'No active MQTT connection' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('API listening on port 3001');
});