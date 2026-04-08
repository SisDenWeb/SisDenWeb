# SisDenWeb - Sistema de Notificação de Dengue

Sistema web para gerenciamento de casos de dengue, desenvolvido com **Vanilla JavaScript**, **Firebase** (Auth + Firestore) e **Tailwind CSS**.

---

## Sobre o Projeto

O SisDenWeb é uma aplicação para notificação, acompanhamento e análise de casos de dengue. Permite que:


---

## Tecnologias Utilizadas

- **Frontend**: Vanilla JavaScript (ES6+), Tailwind CSS
- **Backend**: Firebase Authentication + Firestore
- **Mapa**: MapLibre GL JS
- **Arquitetura**: Feature-based + Store Pattern
- **Padrões**: Repository Pattern, Custom Events, Component Renderer (`data-component`)

---

## Estrutura de Pastas

```bash
source/
├── html/
│   ├── admin/                  # Páginas do administrador
│   ├── funcionario/            # Páginas do funcionário
│   ├── paciente/               # Páginas do paciente (futuro)
│   └── components/             # Componentes reutilizáveis
│
└── scripts/
    └── features/
        ├── auth/               # Autenticação
        ├── caso/               # Gestão de casos (principal)
        ├── funcionario/        # Gestão de funcionarios ( apenas admin )
        └── core/               # Stores e configurações compartilhadas
