# OpenAI React Chat Web Application

This project provides a web frontend for the OpenAI chat api. This project is for developers or advanced users that are familiar with [OpenAI Chat GPT](https://chat.openai.com/) but want to customize the web interface.

## Goals
* Provide the same features as [OpenAI Chat GPT](https://chat.openai.com/) with some elements of the [OpenAI Playground](https://platform.openai.com/playground), but not go beyond that.
* Use a modern web stack of React, Tailwind CSS, and Typescript.

## Features
* Code completion:
![Code completion screenshot](/code_completion_screenshot.png?raw=true)

## Requirements

* [Node.JS](https://nodejs.dev/en/)
* [npm](https://www.npmjs.com/)
* [OpenAI API Account](https://openai.com/blog/openai-api)

## Setup

1. Clone the repository.
```
git clone https://github.com/elebitzero/openai-react-chat.git
```
2. Edit [env.json](src/env.json) and change 'your-api-key-here' to your [OpenAI Key](https://platform.openai.com/account/api-keys)
3. Build & Run the web server
```
npm install
npm start
```
The local website [http://localhost:3000/](http://localhost:3000/) should open in your browser.

## Contributions

All contributions are welcome. Feel free to open an issue or create a pull request.
