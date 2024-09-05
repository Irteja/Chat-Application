const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();

client.on('connectFailed', (error) => {
    console.error('Connection Error: ' + error.toString());
});

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('error', (error) => {
        console.error('Connection Error: ' + error.toString());
    });
    connection.on('close', () => {
        console.log('Connection Closed');
    });
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log('Received: ' + message.utf8Data);
        }
    });

    // Send test message
    connection.sendUTF('Hello, WebSocket Server!');
});

client.connect('ws://localhost:5000', 'echo-protocol');
