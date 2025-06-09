# Voxline Call Manager

O Voxline Call Manager é uma solução web completa para gestão de chamadas telefônicas, desenvolvida para atender instituições públicas e privadas que necessitam de controle, auditoria e análise de ligações em centrais telefônicas. O sistema foi idealizado no contexto do Projeto de Extensão III do curso de Engenharia de Software do Centro Universitário UniAmérica Descomplica, em parceria com a Prefeitura Municipal de Palmital.

## Finalidade do Projeto

O objetivo do Voxline Call Manager é proporcionar uma plataforma robusta para:

- Coletar e armazenar registros de chamadas (CDR) de centrais Grandstream via API.
- Gerenciar usuários, ramais e permissões de acesso.
- Auditar operações e manter logs detalhados.
- Gerar relatórios customizados e dashboards interativos.
- Integrar com outros sistemas e realizar backup seguro dos dados.

## Funcionalidades Principais

- **Dashboard**: Visão geral de métricas, notificações e estatísticas de chamadas.
- **Gestão de Chamadas**: Consulta, filtro e análise de todas as ligações recebidas, realizadas e perdidas.
- **Relatórios Avançados**: Relatórios por período, departamento, ramal, tempo de atendimento, horários de pico, chamadas perdidas, entre outros.
- **Gestão de Ramais**: Cadastro, edição, exclusão e busca de ramais, setores e responsáveis.
- **Gestão de Usuários**: Controle de acesso por níveis (Telefonista, Supervisor, Administrador), cadastro, edição, exclusão e auditoria de usuários.
- **Notificações**: Histórico e painel de notificações do sistema.
- **Backup**: Backup manual e automático dos dados do sistema.
- **Autenticação e Segurança**: Login, registro, recuperação de senha, aceite de LGPD, controle de sessão e logs de acesso.
- **Interface Responsiva**: Layout moderno, responsivo e acessível.

## Estrutura de Navegação

- **/ (Dashboard)**: Visão geral do sistema.
- **/calls**: Listagem e filtros de chamadas.
- **/reports**: Relatórios e exportação de dados.
- **/extensions**: Gerenciamento de ramais.
- **/users**: Gerenciamento de usuários.
- **/notifications-history**: Histórico de notificações.
- **/backup**: Gerenciamento de backups.
- **/login, /register, /forgot-password**: Fluxos de autenticação.

## Tecnologias Utilizadas

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) e [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/) para navegação
- [React Query](https://tanstack.com/query/latest) para gerenciamento de dados
- [Lucide Icons](https://lucide.dev/) para ícones
- [Zod](https://zod.dev/) para validação

## Como Executar Localmente

1. **Clone o repositório:**
   ```powershell
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```
2. **Instale as dependências:**
   ```powershell
   npm install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```powershell
   npm run dev
   ```
4. **Acesse:**
   Abra [http://localhost:8080](http://localhost:8080) no navegador.

## Build e Deploy

- Para gerar a versão de produção:
  ```powershell
  npm run build
  ```
- Os arquivos finais estarão na pasta `dist/`.
- O deploy pode ser feito em qualquer serviço de hospedagem de aplicações estáticas (Vercel, Netlify, etc).

## Requisitos

- Node.js 18+
- npm 9+

## Licença

Este projeto é de uso acadêmico e institucional, podendo ser adaptado conforme a necessidade da instituição parceira.

---

Desenvolvido por alunos do Centro Universitário UniAmérica Descomplica em parceria com a Prefeitura Municipal de Palmital.
