# KURIO — Entrega técnica (demonstração)

## Rodar

```powershell
npm.cmd install
npx.cmd msw init public --save
npm.cmd run dev
```

## Validar

```powershell
npm.cmd run typecheck
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
npm.cmd audit
```

## Implementado
- React, TypeScript, Tailwind, TanStack Router; catálogo, busca, filtros, ordenação e paginação.
- Axios + TanStack Query consumindo endpoints mockados pelo MSW: `GET /api/nfts`, `GET /api/nfts/:id`, `POST /api/orders/preview` (este último disponível para integração futura).
- Estados de carregamento e fallback local caso o mock worker não esteja ativo.
- Carrinho com cupom KURIO10, persistência local, checkout demonstrativo, login/cadastro local, favoritos e perfil.
- Testes básicos Playwright de catálogo, pesquisa, carrinho e navegação; precisam ser executados e conferidos no ambiente de entrega.

## Limitações conhecidas
- Nenhum pagamento ou transação de blockchain real é executado.
- Senhas e contas demonstrativas em localStorage **não são seguras para produção**.
- MSW é um mock de API no navegador, não um backend de verdade.
- Atualizações em tempo real via Socket.IO, cobertura E2E completa, auditoria Lighthouse, shadcn/ui e deploy público **não foram concluídos** nesta versão.
- NFTs e criadores são fictícios; algumas imagens são reutilizadas.
- Verificar responsividade manualmente contra Figma e corrigir divergências.
- Não incluir `node_modules`, `dist`, `.env` ou segredos no Git.
