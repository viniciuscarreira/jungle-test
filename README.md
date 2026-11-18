# KURIO — Marketplace de NFTs

Aplicação demonstrativa de marketplace de NFTs para o desafio de Frontend Developer da Jungle Gaming. A interface inclui descoberta de NFTs, catálogo com filtros, detalhe, favoritos, carrinho, cadastro/login, checkout simulado, perfil e carteiras. **Não são realizadas transações reais nem conexões blockchain.**

## Execução local

Requisitos: Node.js compatível com Vite 8 e npm. No Windows/PowerShell, use `npm.cmd` caso a política de execução bloqueie `npm`.

```bash
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite (normalmente `http://localhost:5173`). O MSW intercepta as chamadas `/api/*` no navegador. Para gerar novamente o service worker: `npx msw init public --save`.

## Comandos

```bash
npm run dev         # desenvolvimento
npm run typecheck   # TypeScript
npm run lint        # Oxlint
npm run build       # build de produção
npm run preview     # visualização do build
npm run test:e2e    # Playwright, desktop e mobile
npm run test:e2e:ui # interface do Playwright
```

Para executar os testes contra um deploy, configure `TEST_BASE_URL`:

```powershell
$env:TEST_BASE_URL="https://jungle-test-phi.vercel.app"
npm.cmd run test:e2e
Remove-Item Env:TEST_BASE_URL
```

Se os navegadores do Playwright não estiverem instalados: `npx playwright install chromium`.

## Demonstração e credenciais

Crie uma conta pela interface com **nome, e-mail fictício e senha de pelo menos oito caracteres**. Não há conta predefinida. A sessão demonstrativa é persistida no `localStorage`. Use credenciais fictícias: esta implementação **não é um sistema de autenticação de produção**.

Fluxo sugerido: abra o catálogo, pesquise um NFT, entre no detalhe, clique em **COMPRAR**, aplique `KURIO10` no carrinho, faça cadastro/login quando solicitado, preencha os dados do pagamento e conclua a compra simulada. O pedido fica associado à conta usada na simulação.

## API simulada

O MSW intercepta as requisições HTTP no browser:

| Método | Endpoint | Comportamento |
|---|---|---|
| GET | `/api/nfts` | Listagem com `search`, `category`, `network`, `maxPrice`, `sort` |
| GET | `/api/nfts/:id` | Detalhe por ID ou erro 404 |
| POST | `/api/orders/preview` | Validação demonstrativa de itens, erro 400 para carrinho vazio |

Para testar erro transitório no catálogo, consulte `/api/nfts?simulateError=true` enquanto o MSW estiver ativo. Não há seleção centralizada de cenários nem reset global; para limpar dados locais, apague os dados do site no navegador. O cupom demonstrativo válido é `KURIO10`.

## Arquitetura e limitações

Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para o detalhamento de componentes, estado, contratos e lacunas frente ao enunciado. **Esta entrega é uma demonstração parcial do desafio**, não um sistema financeiro ou blockchain real. Entre as pendências estão contratos REST completos de conta/carrinho/pedidos, sincronização via Socket.IO, integração efetiva de shadcn/ui, auditorias Lighthouse com relatórios e cobertura E2E integral dos cenários de falha.

## Publicação

O build estático é gerado em `dist/`. Em Vercel, configure o projeto como Vite, comando de build `npm run build` e diretório de saída `dist`. O arquivo `vercel.json` permite refresh e acesso direto às rotas da SPA.
