# Voxline Call Manager

Este projeto foi desenvolvido como parte do Projeto de Extensão III do curso de Engenharia de Software pelo Centro Universitário UniAmérica Descomplica. O PEX tem como objetivo conectar os conhecimentos acadêmicos com as necessidades reais de instituições, ONGs e comunidades, por meio da análise crítica de problemas, identificação de fatores-chave e proposição de soluções tecnológicas aplicáveis.

Neste contexto, foi realizado um diagnóstico detalhado em parceria com a Prefeitura de Palmital, resultando no desenvolvimento de um protótipo funcional para gestão de chamadas telefônicas, com foco na melhoria do atendimento à população na área da saúde.

Este projeto também é desenvolvido pelo PEX em parceria com a Prefeitura Municipal de Palmital.

## Finalidade do Projeto

Desenvolver um sistema capaz de interagir com a central telefônica, permitindo a gestão das chamadas, geração de relatórios, integração com outros sistemas e acompanhamento das operações em tempo real.

### Objetivos Detalhados

- Coletar ligações telefônicas da central telefônica via API CDR Output da Grandstream.
- Processar e armazenar esses dados pelo máximo de período possível.
- Sistema com acesso a telefonistas e usuários para verificar seus registros telefônicos, com auditoria, logs, permissão de acesso por nível, segurança, agenda telefônica integrada e todos os CRUD necessários.
- Geração de relatórios personalizados e completos (detalhes adicionais estarão nos próximos cards).

---

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS