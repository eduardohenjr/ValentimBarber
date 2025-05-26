# Agendamento de Clientes - Backend

Este projeto é uma aplicação backend para gerenciamento de agendamentos de clientes. Ele foi desenvolvido utilizando Node.js e TypeScript, e utiliza o framework Express para a criação de APIs.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **controllers/**: Contém os controladores que gerenciam a lógica de negócios.
    - `clientesController.ts`: Controlador para operações relacionadas aos clientes.
  - **models/**: Contém os modelos que definem a estrutura dos dados.
    - `cliente.ts`: Modelo que representa um cliente.
  - **routes/**: Contém as definições das rotas da API.
    - `clientesRoutes.ts`: Configuração das rotas para operações de clientes.
  - **types/**: Contém definições de tipos e interfaces.
    - `index.ts`: Interfaces que definem a estrutura dos dados manipulados.
  - `app.ts`: Ponto de entrada da aplicação, onde o servidor é configurado.

## Dependências

As dependências do projeto estão listadas no arquivo `package.json`. Para instalar as dependências, execute:

```
npm install
```

## Execução

Para iniciar o servidor, utilize o seguinte comando:

```
npm start
```

O servidor estará disponível em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License.