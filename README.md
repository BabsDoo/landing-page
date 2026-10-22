# Lucas Ramos Melo — Consultoria

Site estático desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## Requisitos

- Node.js 20.19+ ou 22.12+
- Corepack (incluído nas versões atuais do Node.js)

## Desenvolvimento local

```bash
corepack pnpm install
corepack pnpm dev
```

O Vite inicia o site em `http://localhost:5173`.

## Build de produção

```bash
corepack pnpm build
corepack pnpm preview
```

O build estático é gerado em `artifacts/lucas-advisory/dist`.

## Deploy na Vercel

A configuração de [vercel.json](vercel.json) define o comando de build, a pasta de saída e o fallback para as rotas da SPA. O formulário React envia os dados ao Formspree configurado no site. Se necessário, `VITE_FORM_ENDPOINT` pode substituir o endpoint padrão no ambiente local ou na Vercel.