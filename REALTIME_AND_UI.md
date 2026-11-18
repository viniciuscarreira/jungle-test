# Socket.IO + shadcn/ui — implementação demonstrativa

## Executar localmente

Em um terminal: `npm install` e `npm run realtime` (porta 3001). Em outro: `npm run dev` (porta 5173).

O componente `RealtimeStatus` conecta com Socket.IO, exibe a quantidade de conexões e emite o evento `market:interest`. O servidor em `server/realtime.mjs` transmite `market:visitors` e `market:interest`.

**Produção/Vercel:** o servidor Socket.IO não roda em funções serverless da Vercel. Para tempo real em produção, hospede `server/realtime.mjs` em serviço Node persistente e configure `VITE_SOCKET_URL` no build. Sem isso, a interface exibe honestamente o modo demonstração e o checkout segue funcionando.

## Kit UI

`src/components/ui/button.tsx` usa o padrão shadcn/ui (Radix Slot, class-variance-authority e `cn` com clsx/tailwind-merge). O botão está integrado no painel de tempo real, com variantes e estados desabilitados. É uma adoção parcial do kit, não uma migração completa das telas.

## APIs simuladas

MSW cobre catálogo, detalhe, prévia de pedido e endpoints demonstrativos de autenticação/pedidos. Os fluxos de login/checkout existentes ainda usam o estado local; os novos endpoints são demonstrativos, não autenticação segura.
