# Arquitetura — KURIO

## Visão geral

- **React + TypeScript + Vite**: aplicação SPA.
- **TanStack Router**: rotas `/`, `/nft/$id`, `/carrinho`, `/pagamento`, `/confirmacao`, `/perfil` e `/carteiras`. Páginas privadas são protegidas no cliente.
- **TanStack Query + Axios**: leitura remota simulada do catálogo e detalhe; cache de consulta com `staleTime` de 30 segundos e um retry.
- **MSW**: interceptação de `/api/*` em desenvolvimento e na versão demonstrativa publicada; os handlers ficam em `src/mocks/handlers.ts`.
- **Context API**: sessão (`AuthContext`), carrinho (`CartContext`) e favoritos (`FavoritesContext`).
- **CSS + Tailwind**: estilos e responsividade da interface.
- **Playwright**: cenários E2E para desktop Chromium e emulação mobile.

## Fluxos e persistência

O catálogo consulta `GET /api/nfts` com parâmetros de busca e filtros; detalhes usam `GET /api/nfts/:id`. O carrinho e o cupom ficam no armazenamento local. O usuário pode adicionar itens como visitante; o acesso a pagamento, perfil, carteiras e confirmação exige sessão demonstrativa. Após login, o carrinho é preservado.

Cadastro, login e troca de senha são demonstrativos no navegador: as senhas não são guardadas em texto simples, mas os dados e a sessão permanecem no dispositivo. **Essa implementação não fornece isolamento, autorização ou proteção de dados de produção.** Não use credenciais reais.

O checkout cria um recibo demonstrativo local, não uma transação on-chain. O pedido contém uma cópia dos itens e valores calculados no momento da compra. A confirmação verifica a sessão e a conta proprietária. Pagamentos, redes e carteiras são simulações.

## Contratos REST existentes

- `GET /api/nfts`: `{ items: NFT[], total: number }`, com filtros por `search`, `category`, `network`, `maxPrice` e `sort` (`new`, `popular`, `all`).
- `GET /api/nfts/:id`: retorna `NFT` ou HTTP 404 `{ message }`.
- `POST /api/orders/preview`: aceita `{ items: [...] }`, retorna uma prévia demonstrativa ou HTTP 400.

As definições de NFT estão em `src/data/nfts.ts`, o cliente HTTP em `src/api/client.ts`, e os mocks em `src/mocks/handlers.ts`.

## Estado assíncrono e erros

O Query Client usa `staleTime: 30_000` e `retry: 1`. O catálogo possui estados de carregamento e erro e botão para tentar novamente. Há um fallback local no catálogo quando o worker não está disponível; **isso é um desvio conhecido** da exigência de mocks exclusivamente na camada de rede. Não existe reconciliação de dados via Socket.IO.

## UX e acessibilidade

Os principais fluxos possuem labels e feedback textual. Há navegação por rotas, estados vazios e layouts responsivos. Ainda são necessárias auditorias formais de foco de diálogos, acessibilidade e regressão visual contra o Figma, inclusive nos viewports 390, 768 e 1440 px.

## Limitações conhecidas frente ao desafio

1. Socket.IO (`nft.updated` e `order.updated`) e reconciliação após reconexão não foram implementados.
2. shadcn/ui não está integrado; componentes atuais são personalizados.
3. Cadastro, sessão, favoritos, carrinho, perfil, carteiras e pedidos não utilizam a cobertura REST/MSW integral solicitada.
4. Não há idempotência de pedido nem simulação abrangente de timeout, recusa, expiração e alteração concorrente de preço.
5. A precisão de ETH usa números JavaScript; para um sistema real seria necessário usar strings decimais e aritmética decimal exata.
6. Busca, filtros, ordenação e paginação não são inteiramente sincronizados com a URL.
7. Os testes E2E cobrem cenários principais, mas não todos os casos de falha, Socket.IO e regressão visual exigidos.
8. Não foram produzidos relatórios Lighthouse com as medições repetidas requeridas.

Estas limitações são declaradas para não representar funcionalidades incompletas como implementadas. Não existe integração real com blockchain, pagamentos ou provedores de carteiras.
