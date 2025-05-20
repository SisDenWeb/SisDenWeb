# SisDenWeb

**SisDenWeb** é um sistema web completo para **notificação, gestão e acompanhamento de casos de dengue**, inspirado nos formulários oficiais do SUS. Ele oferece uma interface moderna e responsiva para administradores cadastrarem funcionários e registrarem fichas clínicas completas, com persistência local dos dados.

## Funcionalidades

- **Cadastro de funcionários** com geração de credenciais automáticas.
- **Notificação de casos** com formulário completo (baseado na ficha oficial do SUS).
- **Preenchimento dinâmico de fichas** com suporte a:
  - Dados clínicos
  - Exames laboratoriais
  - Sinais de alarme e dengue grave
  - Conclusão e evolução do caso
- **Armazenamento local (LocalStorage)** simulando persistência.
- Interface **totalmente responsiva**, adaptada para desktop e mobile.
- Interface intuitiva com design limpo usando **Tailwind CSS**.

## Tecnologias

- **HTML5 / CSS3**
- **JavaScript (Vanilla)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **LocalStorage** para simular banco de dados local

## Estrutura do Projeto

```
SisDenWeb/
├── Source
│   ├── html
│   │   ├── index.html
│   │   ├── admin
│   │   │   ├── admin-cases.html      
│   │   │   └── admin-management.html
│   │   ├── caso-component
│   │   │   └── caso.html
│   │   └── employer
│   │       └── employer-cases.html
│   └── script
│       ├── admin_mobile.js
│       ├── admin-management.js
│       ├── casos.js
│       ├── data_handler.js
│       └── login.js
├── index.html
├── LICENSE
└── README.md
```

## Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/SisDenWeb.git
   cd SisDenWeb
   ```

2. Abra o arquivo `index.html` no navegador.

> **Não requer back-end** — o sistema roda 100% localmente via navegador.

## Extensões Futuras

- Integração com banco de dados real (Firebase ou API REST)
- Autenticação segura (JWT)
- Download/exportação de fichas em PDF
- Dashboard de estatísticas

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b minha-funcionalidade`
3. Commit suas mudanças: `git commit -m "Minha melhoria"`
4. Push: `git push origin minha-funcionalidade`
5. Abra um Pull Request

## Desenvolvido por

Este projeto foi criado como parte do trabalho de conclusão da disciplina de Projeto Integrador da **UNIVESP**.

## Licença

MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
