# Login-And-Reg-with-PSQL

Este projeto implementa um sistema de login e registro utilizando PostgreSQL como banco de dados. Ele inclui funcionalidades de autenticação, registro de novos usuários e verificação de permissões com tokens.

## Funcionalidades

- Registro de novos usuários com validação de dados
- Autenticação de usuários utilizando tokens armazenados no `localStorage`
- Autorização baseada em tokens (JWT) para acessar rotas protegidas
- Redirecionamento automático para login quando o token é inválido ou expirado
- Sistema de logout que invalida o token do usuário

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JSON Web Token (JWT)
- **Frontend:** HTML, JavaScript (ES6)
