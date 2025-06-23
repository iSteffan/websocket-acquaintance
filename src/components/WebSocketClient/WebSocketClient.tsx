'use client';

import { useEffect, useRef, useState } from 'react';

export const WebSocketClient = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Пінг до API-ендпоінта, щоб сервер WebSocket ініціалізувався
    fetch('/api/socket');

    const socket = new WebSocket(`ws://${window.location.host}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ Підключено до WebSocket');
      socket.send('Клієнт каже: Привіт!');
    };

    socket.onmessage = event => {
      setMessages(prev => [...prev, event.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Повідомлення від сервера:</h2>
      <ul className="list-disc pl-4">
        {messages.map((msg, idx) => (
          <li key={idx}>👉 {msg}</li>
        ))}
      </ul>
    </div>
  );
};
