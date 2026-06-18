# Catálogo de Filmes e Séries

Projeto backend em Node.js e Express para gerenciar um catálogo de filmes e séries.

## Como usar

1. Abra o terminal em `catalogo-filmes`
2. Instale dependências:

```powershell
npm install
```

3. Inicie o servidor:

```powershell
npm start
```

O servidor ficará disponível em `http://localhost:3000`.

---

## Rotas

### Rota de teste

- `GET /test`
- Resposta: `{ "message": "Rota de teste funcionando!" }`
- Não requer autenticação.

### Autenticação

#### `POST /auth/register`
- Body JSON:
  ```json
  {
    "name": "Seu Nome",
    "email": "email@teste.com",
    "password": "senha123"
  }
  ```
- Retorno: `token`
- Usar o token nas rotas protegidas.

#### `POST /auth/login`
- Body JSON:
  ```json
  {
    "email": "email@teste.com",
    "password": "senha123"
  }
  ```
- Retorno: `token`

### Rotas de títulos (protegidas)

Use o header:

```
Authorization: Bearer <token>
```

#### `GET /titles`
- Lista todos os filmes e séries.

#### `GET /titles/:id`
- Busca um título pelo `id`.

#### `POST /titles`
- Body JSON:
  ```json
  {
    "name": "Novo Título",
    "type": "movie",
    "genre": "Ação",
    "year": 2025,
    "description": "Descrição do título"
  }
  ```

#### `POST /titles/:id/poster`
- Envia imagem de poster para o título.
- Método: `POST`
- Body: `form-data`
  - key: `poster`
  - value: arquivo de imagem
- Requer Firebase Storage configurado.

---

## Configuração de ambiente

Em `.env` e preencha os valores:

```text
JWT_SECRET=segredo_super_forte
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\nFIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
```

Se não usar Firebase, os uploads de poster não vão funcionar.

---

## Observações

- Os dados são armazenados em memória. Reiniciar o servidor limpa os registros.
- O JWT é usado para proteger as rotas de catálogo.
- O projeto já implementa backend, REST API, auth JWT e upload para Firebase.
