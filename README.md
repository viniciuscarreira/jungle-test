
# KURIO — Marketplace de NFTs

Aplicação demonstrativa de marketplace de NFTs desenvolvida para o desafio técnico de **Frontend Developer da Jungle Gaming**.

A interface inclui descoberta de NFTs, catálogo com pesquisa e filtros, detalhes dos ativos, favoritos, carrinho, cadastro e login, checkout simulado, perfil e carteiras.

**Importante:** não são realizadas transações financeiras reais nem operações em blockchain.

## Links do projeto

- **Aplicação online:** https://jungle-test-phi.vercel.app/
- **Repositório GitHub:** https://github.com/viniciuscarreira/jungle-test
- **Relatório Lighthouse Desktop:** [Visualizar](./reports/lighthouse-desktop.html)
- **Relatório Lighthouse Mobile:** [Visualizar](./reports/lighthouse-mobile.html)

## Tecnologias utilizadas

- React
- TypeScript
- Vite 8
- Tailwind CSS
- TanStack Router
- TanStack Query
- Axios
- Mock Service Worker (MSW)
- Socket.IO (demonstração local)
- shadcn/ui (integração parcial)
- Playwright
- Vercel

## Execução local

### Pré-requisitos

- Node.js compatível com Vite 8
- npm

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/viniciuscarreira/jungle-test.git
cd jungle-test
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente:

http://localhost:5173

No Windows/PowerShell, utilize `npm.cmd` caso a política de execução bloqueie o comando `npm`.

O MSW intercepta as requisições `/api/*` no navegador.

Caso seja necessário regenerar o service worker:

```bash
npx msw init public --save
```

## Comandos disponíveis

```bash
npm run dev          # Ambiente de desenvolvimento
npm run typecheck    # Verificação TypeScript
npm run lint         # Análise estática com Oxlint
npm run build        # Build de produção
npm run preview      # Pré-visualização do build
npm run test:e2e     # Testes Playwright desktop e mobile
npm run test:e2e:ui  # Interface dos testes Playwright
npm run realtime     # Servidor Socket.IO demonstrativo
```

O servidor Socket.IO é executado separadamente no ambiente local e não está hospedado na Vercel.

## Funcionalidades implementadas

### Marketplace

- Listagem de NFTs.
- Pesquisa de ativos.
- Filtros por categoria, rede e preço.
- Ordenação dos resultados.
- Página de detalhes dos NFTs.
- Favoritos.
- Carrinho de compras.
- Cupom demonstrativo de desconto.

### Autenticação demonstrativa

- Cadastro de usuário.
- Login e logout.
- Persistência de sessão no `localStorage`.
- Proteção do fluxo de checkout.

### Checkout

- Revisão dos itens selecionados.
- Aplicação do cupom `KURIO10`.
- Preenchimento de dados demonstrativos de pagamento.
- Validação básica do pedido.
- Confirmação de compra simulada.

### Outras funcionalidades

- Páginas de perfil e carteiras.
- API simulada utilizando MSW.
- Componentes de interface com integração parcial de shadcn/ui.
- Demonstração local de Socket.IO.
- Testes automatizados em desktop e mobile.

## Demonstração e credenciais

Não existe uma conta predefinida.

Para testar o sistema, crie uma conta pela interface utilizando:

- Nome.
- E-mail fictício.
- Senha de pelo menos oito caracteres.

A sessão demonstrativa é armazenada no `localStorage`.

**Atenção:** utilize apenas dados fictícios. A autenticação não é um sistema de produção.

### Fluxo sugerido para avaliação

1. Acesse a aplicação online.
2. Abra o catálogo de NFTs.
3. Pesquise ou filtre um ativo.
4. Entre na página de detalhes.
5. Clique em **COMPRAR**.
6. No carrinho, aplique o cupom `KURIO10`.
7. Faça cadastro ou login quando solicitado.
8. Preencha os dados fictícios de pagamento.
9. Conclua a compra simulada.
10. Confira a confirmação do pedido.

## API simulada

A aplicação utiliza Mock Service Worker (MSW) para interceptar requisições HTTP no navegador.

| Método | Endpoint | Comportamento |
|---|---|---|
| GET | `/api/nfts` | Lista NFTs com pesquisa, filtros e ordenação |
| GET | `/api/nfts/:id` | Retorna detalhes do NFT ou erro 404 |
| POST | `/api/orders/preview` | Valida o pedido e retorna erro 400 para carrinho vazio |

### Parâmetros disponíveis

O endpoint `/api/nfts` aceita:

- `search`
- `category`
- `network`
- `maxPrice`
- `sort`

Para simular um erro transitório no catálogo, utilize:

```text
/api/nfts?simulateError=true
```

Essa simulação depende de o MSW estar ativo.

Não existe seleção centralizada de cenários nem redefinição global dos dados. Para limpar os dados persistidos, remova os dados locais do site no navegador.

## Testes automatizados

O projeto utiliza Playwright para testes end-to-end em desktop e mobile.

Execute:

```bash
npm run test:e2e
```

Se os navegadores ainda não estiverem instalados:

```bash
npx playwright install chromium
```

### Testar a aplicação publicada

No PowerShell:

```powershell
$env:TEST_BASE_URL="https://jungle-test-phi.vercel.app"
npm.cmd run test:e2e
Remove-Item Env:TEST_BASE_URL
```

Na última execução local validada, os **16 testes E2E passaram**.

## Resultados Lighthouse

Foram realizadas auditorias Lighthouse na aplicação publicada na Vercel.

| Categoria | Desktop | Mobile |
|---|---:|---:|
| Performance | 100 | 88 |
| Acessibilidade | 95 | 95 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |

Os resultados podem variar conforme o dispositivo, a rede e o ambiente de execução.

### Relatórios completos

- [Lighthouse Desktop](./reports/lighthouse-desktop.html)
- [Lighthouse Mobile](./reports/lighthouse-mobile.html)

## Arquitetura

A aplicação foi desenvolvida com React e TypeScript, utilizando Vite como ferramenta de desenvolvimento e build.

A navegação utiliza TanStack Router. As requisições e o gerenciamento de dados assíncronos utilizam Axios, TanStack Query e MSW.

O fluxo demonstrativo de autenticação e compra utiliza persistência local no navegador.

Para detalhes adicionais sobre componentes, gerenciamento de estado, contratos e decisões técnicas, consulte:

[ARCHITECTURE.md](./ARCHITECTURE.md)

## Limitações conhecidas

Esta entrega é uma demonstração funcional, não uma plataforma comercial de NFTs.

As principais limitações são:

- Não há transações financeiras reais.
- Não existe integração com blockchain.
- A autenticação utiliza dados demonstrativos e armazenamento local.
- Os contratos REST de conta, carrinho e pedidos não estão integralmente implementados.
- O servidor Socket.IO funciona separadamente no ambiente local e não está publicado na Vercel.
- A integração de shadcn/ui é parcial.
- Os testes E2E não cobrem todos os cenários possíveis de falha.

## Publicação

A aplicação está publicada na Vercel:

https://jungle-test-phi.vercel.app/

### Configuração de build

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

O arquivo `vercel.json` contém a configuração para acesso direto e atualização das rotas da SPA.

---

**Projeto desenvolvido para o desafio técnico de Frontend Developer da Jungle Gaming.**