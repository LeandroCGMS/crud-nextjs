# 🚀 Fullstack Next.js CRUD App

Uma aplicação moderna e responsiva construída com **Next.js (App Router)**, projetada para funcionar de forma integrada e otimizada tanto em **navegadores web** (desktop e mobile) quanto em **aplicativos móveis** (como WebView, PWA ou consumo de API).

---

## 📌 Sobre o Projeto

Este projeto consiste em um sistema completo de **CRUD** (Create, Read, Update, Delete) desenvolvido com arquitetura focada em performance, acessibilidade e flexibilidade multi-plataforma.

### 🎯 Principais Objetivos
* **Multiplataforma:** Interface responsiva adaptada para telas de dispositivos móveis e desktops.
* **API Unificada:** Estrutura pronta para servir dados via API Routes/Server Actions tanto para o frontend web quanto para apps mobile nativos/híbridos.
* **Segurança e Validação:** Integração com serviços de verificação (como reCAPTCHA) e validações robustas de formulários.
* **Interface Moderna:** Componentização modular com ícones e estados de carregamento otimizados.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Client Components)
* **Linguagem:** JavaScript / TypeScript
* **Biblioteca UI:** React
* **Ícones:** [React Icons](https://react-icons.github.io/react-icons/)
* **Segurança:** Google reCAPTCHA v3 (`react-google-recaptcha-v3`)
* **Estilização:** CSS Modules / Tailwind CSS

---

## 📱 Suporte Web & Mobile

O projeto foi projetado desde o início para suportar ecossistemas web e mobile:

1. **Navegadores Web (Desktop & Mobile):** Layouts fluidos e responsivos com suporte a toque e teclado.
2. **Aplicativos Mobile (PWA / WebView):** Estrutura preparada para execução empacotada em React Native (WebView), Capacitor ou como Progressive Web App (PWA).
3. **API Endpoints:** Rotas otimizadas para consumo de dados em aplicativos mobile nativos.

---

## 📂 Estrutura de Pastas

```text
.
├── app/
│   ├── api/                  # Endpoints da API (utilizados por Web e Mobile)
│   ├── components/           # Componentes reutilizáveis
│   │   ├── screens/          # Telas e fluxos principais (ex: CreateComponent)
│   │   └── utils/            # Utilitários, auxiliares e centralizadores de ícones
│   ├── favicon.ico           # Ícone da aplicação
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal da aplicação
│   └── page.tsx              # Página inicial
├── public/                   # Arquivos estáticos e imagens
├── next.config.mjs           # Configurações do Next.js
├── package.json              # Dependências do projeto
└── README.md                 # Documentação do projeto