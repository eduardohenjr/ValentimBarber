# Agendamento de Clientes

Este projeto é uma aplicação para agendamento de clientes, composta por um backend em TypeScript utilizando Express e um frontend em React.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: `backend` e `frontend`.

### Backend

O backend é responsável por gerenciar as operações relacionadas aos clientes, incluindo a criação, leitura, atualização e exclusão de informações. A estrutura do backend é a seguinte:

- `src/app.ts`: Ponto de entrada da aplicação, configura o servidor Express e define as rotas.
- `src/controllers/clientesController.ts`: Controlador que gerencia as operações dos clientes.
- `src/models/cliente.ts`: Modelo que define a estrutura dos dados do cliente.
- `src/routes/clientesRoutes.ts`: Configuração das rotas relacionadas aos clientes.
- `src/types/index.ts`: Definições de tipos e interfaces utilizadas no backend.

### Frontend

O frontend é a interface do usuário da aplicação, construída com React. A estrutura do frontend é a seguinte:

- `src/App.tsx`: Componente principal que configura as rotas e renderiza os componentes.
- `src/components/ClienteForm.tsx`: Componente para adicionar ou editar informações de clientes.
- `src/pages/Home.tsx`: Página inicial que exibe a lista de clientes e um botão para adicionar novos clientes.
- `src/types/index.ts`: Definições de tipos e interfaces utilizadas no frontend.

## Como Executar o Projeto

### Backend

1. Navegue até a pasta `backend`.
2. Instale as dependências com o comando:
   ```
   npm install
   ```
3. Inicie o servidor com o comando:
   ```
   npm start
   ```

### Frontend

1. Navegue até a pasta `frontend`.
2. Instale as dependências com o comando:
   ```
   npm install
   ```
3. Inicie a aplicação com o comando:
   ```
   npm start
   ```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License.