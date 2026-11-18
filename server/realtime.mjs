// Demo-only Socket.IO service. Run `npm run realtime` alongside Vite.
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const port = Number(process.env.SOCKET_PORT || 3001);
const httpServer = createServer((_req, res) => { res.writeHead(200, {'Content-Type':'text/plain'}); res.end('KURIO realtime demo'); });
const io = new Server(httpServer, { cors: { origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173','http://127.0.0.1:5173','http://localhost:4173','http://127.0.0.1:4173'] } });
let visitors = 0;
io.on('connection', socket => {
  visitors++;
  io.emit('market:visitors', { count: visitors });
  socket.emit('market:status', { message: 'Conectado ao mercado KURIO' });
  socket.on('market:interest', payload => {
    const nftId = String(payload?.nftId ?? '').slice(0, 40);
    if (nftId) io.emit('market:interest', { nftId, at: new Date().toISOString() });
  });
  socket.on('disconnect', () => { visitors = Math.max(0, visitors-1); io.emit('market:visitors', { count: visitors }); });
});
httpServer.listen(port, () => console.log(`KURIO Socket.IO demo listening on http://localhost:${port}`));
