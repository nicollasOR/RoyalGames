
#  RoyalGames

_RoyalGames_ é uma aplicação que simula um **e-commerce de jogos e consoles**, permitindo gerenciar um catálogo de produtos pela API que realizamos.

O projeto foi desenvolvido com foco em **boas práticas de arquitetura, organização de código e metodologias ágeis**, simulando um ambiente real de desenvolvimento de software.

---

## Objetivo do Projeto

O objetivo da **RoyalGames** é criar uma API capaz de gerenciar um catálogo de jogos e consoles, permitindo operações como:

- Cadastro de produtos
- Listagem de jogos e consoles
- Atualização de informações
- Remoção de produtos
- Autenticação de administrador

A aplicação foi construída apenas como **API**, sendo testada e documentada através do **Swagger**.

---

## Arquitetura

O projeto utiliza **DDD (Domain Driven Design)** para organizar o domínio da aplicação e separar responsabilidades entre as camadas do sistema e deixar o banco de dados cada vez mais protegidos com o uso de repositories e services e,

Isso permite:

- Melhor organização do código
- Maior escalabilidade
- Facilidade de manutenção
- Separação clara entre regras de negócio e infraestrutura

---

## Tecnologias Utilizadas

As principais tecnologias utilizadas no projeto foram:

- **C#**
- **.NET 8.0.23**
- **SQL Server **
- **JWT (JSON Web Token)** – autenticação do administrador
- **Swagger** – documentação e testes da API

---

##  Autenticação

A aplicação utiliza **JWT (JSON Web Token)** para autenticação de administradores.

Com isso:

- Apenas usuários autenticados podem acessar rotas administrativas
- As requisições protegidas exigem um **token válido** com um tempo limite de expiração. 

---

##  Metodologia de Desenvolvimento

Durante o desenvolvimento do projeto utilizamos **metodologias ágeis**, aplicando o **Kanban** para organização das tarefas.

No Trello foram organizadas colunas como:

- To Do
- Doing
- Done

Isso ajudou no **controle de tarefas, organização do fluxo de desenvolvimento e acompanhamento do progresso do projeto**.

---

## Testes da API

Como o projeto consiste apenas em uma **API**, os testes foram realizados utilizando o **Swagger**, que permite:

- Visualizar todas as rotas disponíveis
- Testar endpoints diretamente no navegador
- Ver exemplos de requisições e respostas

---

##  Estrutura das pastas do Projeto

A estrutura do projeto segue conceitos de **DDD**, separando responsabilidades em diferentes camadas, como por exemplo:

```
RoyalGames
 ├── Domain
 ├── Application
 ├── Infrastructure
 ├── Controllers
 └── Configurations
```