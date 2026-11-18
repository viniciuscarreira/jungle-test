import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Radio } from 'lucide-react';
import { Button } from './ui/button';

/** Optional realtime demo: local Socket.IO server, no connection required for checkout. */
export default function RealtimeStatus() {
  const [connected, setConnected] = useState(false);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  useEffect(() => {
    // On Vercel, configure VITE_SOCKET_URL for an independently hosted Socket.IO server.
    const url = import.meta.env.VITE_SOCKET_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');
    if (!url) return;
    const client = io(url, { reconnectionAttempts: 3, timeout: 1500, autoConnect: true });
    setSocket(client);
    client.on('connect', () => setConnected(true));
    client.on('disconnect', () => setConnected(false));
    client.on('connect_error', () => setConnected(false));
    client.on('market:visitors', (data: { count: number }) => setVisitors(data.count));
    return () => { client.disconnect(); };
  }, []);
  return <div aria-label="Status em tempo real" style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',padding:'8px 0',fontSize:12}}>
    <Radio size={15} aria-hidden="true" />
    <span aria-live="polite">{connected ? `Mercado ao vivo · ${visitors ?? 1} conectado(s)` : 'Mercado em modo demonstração'}</span>
    <Button type="button" variant="outline" size="sm" disabled={!connected} onClick={() => socket?.emit('market:interest', { nftId: 'featured' })} aria-label="Enviar interesse em destaque">Interesse ao vivo</Button>
  </div>;
}
