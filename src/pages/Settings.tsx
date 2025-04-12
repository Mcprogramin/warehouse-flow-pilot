import React, { useState } from 'react';
import Paho from 'paho-mqtt';
import './style.css';

let client: Paho.MQTT.Client;

const MQTTDashboard: React.FC = () => {
  const [host, setHost] = useState('broker.emqx.io');
  const [port, setPort] = useState('8083');
  const [username, setUsername] = useState('emqx');
  const [password, setPassword] = useState('');
  const [subTopic, setSubTopic] = useState('#');
  const [pubTopic, setPubTopic] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const appendMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  const startConnect = () => {
    const clientID = 'clientID - ' + Math.floor(Math.random() * 100);
    appendMessage(`Connecting to ${host} on port ${port}`);
    appendMessage(`Using the client ID ${clientID}`);

    client = new Paho.Client(host, Number(port), clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
      onSuccess: onConnect,
      userName: username,
      password,
    });
  };

  const onConnect = () => {
    appendMessage(`Subscribing to topic ${subTopic}`);
    client.subscribe(subTopic);
  };

  const onConnectionLost = (responseObject: any) => {
    appendMessage('ERROR: Connection is lost.');
    if (responseObject.errorCode !== 0) {
      appendMessage(`ERROR: ${responseObject.errorMessage}`);
    }
  };

  const onMessageArrived = (message: Paho.MQTT.Message) => {
    console.log('OnMessageArrived:', message.payloadString);
    appendMessage(`Topic: ${message.destinationName} | Message: ${message.payloadString}`);
  };

  const startDisconnect = () => {
    client.disconnect();
    appendMessage('Disconnected.');
  };

  const publishMessage = () => {
    const msg = new Paho.Message(message);
    msg.destinationName = pubTopic;
    client.send(msg);
    appendMessage(`Message to topic ${pubTopic} is sent`);
  };

  return (
    <div className="wrapper">
      <h1 id="Main_heading">
        <b>High Voltages MQTT Dashboard</b>
      </h1>
      <br /><br />
      <form id="connection-information-form" onSubmit={(e) => e.preventDefault()}>
        <b>Hostname or IP Address and Port Number:</b>
        <input
          id="host"
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="broker address"
        />
        <input
          id="port"
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <br />

        <b>Username and Password:</b>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />

        <b>Subscription topic:</b>
        <input
          id="topic_s"
          type="text"
          value={subTopic}
          onChange={(e) => setSubTopic(e.target.value)}
        />
        <br /><br />

        <input type="button" onClick={startConnect} value="Connect" />
        <input type="button" onClick={startDisconnect} value="Disconnect" />
        <br /><br />

        <b>Publish Topic and Message:</b>
        <input
          id="topic_p"
          type="text"
          value={pubTopic}
          onChange={(e) => setPubTopic(e.target.value)}
          placeholder="Publish topic"
        />
        <input
          id="Message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <input type="button" onClick={publishMessage} value="Publish" />
      </form>

      <div id="messages">
        {messages.map((msg, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{ __html: msg }}></div>
        ))}
      </div>
    </div>
  );
};

export default MQTTDashboard;
