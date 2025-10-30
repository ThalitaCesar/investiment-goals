# Investment Goals API

API RESTful para gerenciar metas de investimento, permitindo criar, listar, atualizar e deletar metas. O projeto utiliza **Fastify**, **TypeScript**, **Prisma** e **PostgreSQL**, com validação de dados tipada via **Zod** e documentação automática via **Swagger**.

## Funcionalidades

- CRUD completo de metas de investimento
- Validação de entrada de dados (nome, meses e valor)
- Cálculo automático de alocação do valor entre os meses
- Filtros por nome e mês na listagem
- Documentação automática com Swagger (/docs)

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Docker
- Zod (validação e tipagem)
- Swagger / OpenAPI (documentação)

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ e npm

## Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/investment-goals.git
cd investment-goals
````

2. Inicie o Docker (PostgreSQL):

```bash
docker-compose up -d
```

3. Instale as dependências do projeto:

```bash
npm install --legacy-peer-deps
```

4. Configure o arquivo `.env` (exemplo):

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/investment_goals
```

5. Execute as migrations do Prisma e popule o banco:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

6. Inicie a API em modo desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

## Endpoints

### Criar meta de investimento

```
POST /investment-goals
```

**Body:**

```json
{
  "name": "Viagem Japão",
  "months": ["january", "february", "march"],
  "value": 9000
}
```

**Resposta 201:**

```json
{
  "id": "uuid",
  "name": "Viagem Japão",
  "months": ["january", "february", "march"],
  "value": 9000,
  "createdAt": "2025-10-30T00:00:00.000Z",
  "allocations": [3000, 3000, 3000]
}
```

### Listar metas

```
GET /investment-goals
```

**Query parameters opcionais:** `name`, `month`

**Resposta 200:**

```json
[
  {
    "id": "uuid",
    "name": "Viagem Japão",
    "months": ["january", "february", "march"],
    "value": 9000,
    "createdAt": "2025-10-30T00:00:00.000Z",
    "allocations": [3000, 3000, 3000]
  }
]
```

### Listar meta por ID

```
GET /investment-goals/:id
```

**Resposta 200:** mesma estrutura da criação.

### Atualizar meta

```
PUT /investment-goals/:id
```

**Body:** parcial ou completo

```json
{
  "name": "Viagem Japão 2026",
  "months": ["january", "february", "march", "april"]
}
```

**Resposta 200:** com alocação recalculada.

### Deletar meta

```
DELETE /investment-goals/:id
```

**Resposta 204:** sem conteúdo.

## Documentação Swagger

A documentação completa está disponível em:

```
http://localhost:3333/docs
```

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: descrição'`)
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

MIT License
