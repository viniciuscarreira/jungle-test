# Autenticação demonstrativa — KURIO V4

- Cadastro e login com validação e sessão persistida em `localStorage`.
- As senhas não são armazenadas em texto puro: há hash SHA-256 com salt local. **Isso não equivale a autenticação segura de produção.** O armazenamento e a verificação no próprio navegador são manipuláveis pelo usuário.
- Não há backend, tokens, OAuth, recuperação de senha ou carteira real. Botões sociais permanecem desabilitados.
- Perfil e Carteiras exigem uma sessão demonstrativa; o menu Sair encerra a sessão.
- Para testar: crie uma conta, atualize a página, abra Perfil, saia e tente acessar `/perfil` diretamente.
- Os dados de perfil e carteira ainda são demonstrativos e podem permanecer no navegador após logout; não use dados pessoais reais.


## Versão 5
- Alterar senha em Perfil: exige senha atual correta, nova senha com pelo menos 8 caracteres e confirmação igual. A senha nova passa a valer no próximo login.
- Favoritos: salvos por e-mail da conta no localStorage deste navegador, disponíveis na Lista de interesse do Perfil. Favoritar exige login.
- Este mecanismo é uma simulação local, **não é autenticação segura de produção**. Os dados não sincronizam entre dispositivos e podem ser apagados ao limpar o armazenamento do navegador.
