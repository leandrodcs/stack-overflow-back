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