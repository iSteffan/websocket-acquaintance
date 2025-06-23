import { WebSocketClient } from '@/components/WebSocketClient/WebSocketClient';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Next.js WebSocket Demo</h1>
      <WebSocketClient />
    </main>
  );
}
