# Proteção do checkout (demonstração)

- Visitantes podem navegar e adicionar NFTs ao carrinho.
- Ao tentar finalizar sem sessão, são levados ao modal de login na página inicial.
- Após login/cadastro, retornam ao carrinho com os itens preservados.
- As rotas `/pagamento` e `/confirmacao` exigem sessão.
- A confirmação só mostra pedidos demonstrativos vinculados ao e-mail da sessão atual.
- Nenhuma transação blockchain é realizada.

**Limite de segurança:** a autenticação e o pedido são mantidos em `localStorage`, manipulável pelo navegador. Isso não é proteção de backend nem deve ser usado para pagamentos reais.
