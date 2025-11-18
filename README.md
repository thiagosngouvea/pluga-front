# Pluga Challenge Front

Catálogo de ferramentas integradas à Pluga. Busca, visualiza detalhes e mantém histórico das últimas 3 visualizadas.

## Stack

- Next.js 16 (App Router)
- TypeScript
- React 19
- Tailwind CSS + DaisyUI
- Jest + React Testing Library

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`

```bash
npm run build    # build de produção
npm test         # testes
```

## Estrutura

```
src/
├── app/                    # Next.js App Router
├── features/apps/          # Feature principal
│   ├── components/         # AppCard, AppGrid, AppModal, SearchBar, Pagination
│   ├── context/            # AppContext (estado global)
│   ├── hooks/              # useApps, useAppGrid, useAppPagination, useAppSearch
│   ├── services/           # API e localStorage
│   └── types/              # Tipos TypeScript
└── shared/                 # Componentes e utils compartilhados
```

## Funcionalidades

- Lista de apps da API da Pluga
- Busca em tempo real (com debounce)
- Paginação (12 itens por página)
- Modal com detalhes ao clicar
- Histórico das últimas 3 visualizadas (localStorage)
- Loading states e tratamento de erros

## Testes

Testes com Jest e React Testing Library cobrindo componentes principais e lógica de negócio.
