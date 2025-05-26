<<<<<<< HEAD
# Agendamento de Clientes

Este projeto é uma aplicação para agendamento de clientes, que inclui um backend em TypeScript utilizando Express e um frontend em React. O objetivo é permitir o gerenciamento de informações de clientes, incluindo a criação, leitura, atualização e exclusão de dados.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: `backend` e `frontend`.

### Backend

O backend é responsável por gerenciar a lógica de negócios e a comunicação com o banco de dados. Ele é construído com as seguintes características:

- **Tecnologia**: TypeScript, Express
- **Estrutura**:
  - `src/app.ts`: Ponto de entrada da aplicação, configura o servidor e as rotas.
  - `src/controllers/clientesController.ts`: Controlador que gerencia as operações relacionadas aos clientes.
  - `src/models/cliente.ts`: Modelo que define a estrutura dos dados do cliente.
  - `src/routes/clientesRoutes.ts`: Configuração das rotas para as operações de clientes.
  - `src/types/index.ts`: Definições de tipos e interfaces utilizadas no backend.

### Frontend

O frontend é a interface do usuário da aplicação, construída com React. Ele permite que os usuários interajam com o sistema de agendamento. As principais características incluem:

- **Tecnologia**: React, TypeScript
- **Estrutura**:
  - `src/App.tsx`: Componente principal que configura as rotas e renderiza os componentes.
  - `src/components/ClienteForm.tsx`: Formulário para adicionar ou editar informações de clientes.
  - `src/pages/Home.tsx`: Página inicial que exibe a lista de clientes e opções para adicionar novos clientes.
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

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License.
=======
# ValentimBarber
ValentimBarber é um site elaborado para controle de agendamento de clientes feito para um autônomo. Desenvolvido com React, este site permite que os clientes consigam agendar e ter o controle visual de horários.
>>>>>>> 7286e2ff52dd4b87ba3fca4e848e6b054e767b39
