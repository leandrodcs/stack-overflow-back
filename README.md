# API - Overflow Fullstack Developer

This API mimics the enviroment of stack overflow, where users can look for and answer questions.

## Technologies

The following tools and frameworks were used in the construction of the project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'>
</p>


## About

Anybody can post a question to be answer, but only registered users can answer them, there can only be one answer per questions and all of the questions can be rated by anyone, registered or not. Questions need to be posted with at least one tag, in order to facilitate to future visitors to find the types of questions that they may be looking for.

## Routes
<details>
    <summary><strong>POST</strong> /questions</summary>

* This route can be used to upload your question, it expects a body like below, and will return the id of the questions just created.

* NOTE: separating the tags by ", " is important for future referencing. All questions need at least one tag.

```json
{
    "question": "Uki ta contecendo?",
    "student": "Zoru",
    "class": "T3",
    "tags": "typescript, vida, javascript, java?"
}
```

```json
{
    "id": 123456
}
```
</details>

<details>
    <summary><strong>POST</strong> /questions/:id</summary>

* This route can be used to answer questions, you need to inform the id of the question via parameter, send a body with your answer and the "Authorization" header must contain a valid token for a registered user

    ```json
    {
        "answer": "To make jest run non-stop use the command npx jest --watch"
    }
    ```
</details>

<details>
    <summary><strong>GET</strong> /questions/:id</summary>

* This route is intended to find the desired question informed via it's id on the parameter of the route. Two responses are possible, for an unaswered and an answered question.

    ```json
    {
        "question": "Uki ta contecendo?",
        "student": "Zoru",
        "class": "T3",
        "tags": "typescript, vida, javascript, java?",
        "answered": false,
        "submitedAt": "01/01/2021 10:12"
    }
    ```

    ```json
    {
        "question": "Uki ta contecendo?",
        "student": "Zoru",
        "class": "T3",
        "tags": "typescript, vida, javascript, java?",
        "answered": true,
        "submitedAt": "01/01/2021 10:12",
        "answeredAt": "02/01/2021 10:30",
        "answeredBy": "Vegeta",
        "answer": "É mais de 8 miiiil!" 
    }
    ```
</details>

<details>
    <summary><strong>GET</strong> /questions</summary>

* This route is used to get all of the unaswered questions on the database.

    ```json
    [
        {
            "question": "Uki ta contecendo?",
            "student": "Zoru",
            "class": "T3",
            "tags": "typescript, vida, javascript, java?",
            "answered": false,
            "submitedAt": "01/01/2021 10:12"
        },
        {
            "question": "Uki ta contecendo?",
            "student": "Zoru",
            "class": "T3",
            "tags": "typescript, vida, javascript, java?",
            "answered": false,
            "submitedAt": "01/01/2021 10:12"
        },
    ]
    ```
</details>

<details>
    <summary><strong>POST</strong> /users</summary>

* This route is used to register new users. It returs a response containing a token that can be used to answer questions.

    ```json
    {
        "name": "Vegeta",
        "class": "T3" 
    }
    ```

    ```json
    {
        "token": "54d889f9-ca22-42b2-928c-0ae1ddb9ebff"
    }
    ```
</details>

<details>
    <summary><strong>PUT</strong> /questions/:id/up-vote</summary>

* This route can be used to upvote a question.

    ```json
    "A pontuação da pergunta de id 2 mudou de 28 para 29"
    ```
</details>

<details>
    <summary><strong>PUT</strong> /questions/:id/down-vote</summary>

* This route can be used to downvote a question.

    ```json
    "A pontuação da pergunta de id 2 mudou de 28 para 27"
    ```
</details>


<details>
    <summary><strong>GET</strong> /ranking</summary>

* This route can be used to get up to the ten best ranked users, the ranking varies accordingly to the amout of points the user has. Points are calculated by suming the scores of all answered questions.

    ```json
    [
        {
            "name": "Vovo Juju",
            "answers": 8001,
            "points": 8001
        },
        {
            "name": "Vegeta",
            "answers": 12,
            "points": 12
        }
    ]
    ```
</details>

## Installation

1. Clone the this repo
```sh
git clone https://github.com/leandrodcs/stack-overflow-back.git
```
2. Install NPM packages
```sh
npm install
```
6. Create a database using the command below via postgres
```sh
CREATE DATABASE overflow
```
7. Inside the created database, create tables using the dump included in the back-end repo <a href="https://github.com/leandrodcs/stack-overflow-back/blob/main/dump.sql">here</a>.

8. Connect to the created database using the .env.example included in the back-end repo <a href="https://github.com/leandrodcs/stack-overflow-back/blob/main/.env.example">here</a>, to make it easy, name your .env file like so ".env.dev".

## Running

1. On the repo run the server connected to the database you just created using the following command.
```sh
npm run dev
```

## Developer

* [Leandro D. C. Schmidt ](https://github.com/leandrodcs)
