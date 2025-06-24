import { WebSocketServer } from 'ws';
import http from 'http';

const port = 3001;
const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('🟢 Клієнт підʼєднався');
  ws.send('Привіт з окремого сервера!');

  ws.on('message', message => {
    console.log('📨 Отримано повідомлення:', message.toString());
    ws.send(`Echo: ${message}`);
  });
});

server.listen(port, () => {
  console.log(`✅ WebSocket сервер працює на ws://localhost:${port}`);
});
