import { WebSocketServer } from 'ws';
import { NextApiRequest, NextApiResponse } from 'next';

let wss: WebSocketServer | null = null;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const server = res.socket?.server;
  const server = (res.socket as any).server;

  if (server && !server.wss) {
    console.log('🔌 Створюємо WebSocket сервер...');
    const wssInstance = new WebSocketServer({ server });
    server.wss = wssInstance;

    wssInstance.on('connection', ws => {
      console.log('🟢 Клієнт підʼєднався');
      ws.send('Привіт від сервера!');

      ws.on('message', message => {
        console.log('📨 Повідомлення від клієнта:', message.toString());
        ws.send(`Echo: ${message}`);
      });
    });
  }

  res.end();
}
