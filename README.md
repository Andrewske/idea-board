# Idea Board

Idea Board is a portfolio project built using Vite, React, Typescript, and SCSS. The project is inspired by Trello and allows users to create new ideas, edit existing ideas, or delete them. Each idea is represented as a tile on the board that displays a title, description, and created/updated time. The title and description are editable inline and the description text has a max length of 140 characters. Additionally, there is a button on the tile that allows for it to be deleted.

## Features

- Create, edit, and delete ideas
- Inline editing for titles and descriptions
- Character countdown for description text
- Sort ideas by creation date or alphabetically
- Responsive design

## Getting Started

To get started, you can clone the project and npm install to install the dependencies. Then, run npm run dev to start the development server on http://localhost:3000.

You can also check out the deployed project at https://idea-board-green.vercel.app/.

## Usage

To create a new idea, click the "+" button in the top middle corner of the board. The title field will be focused, prompting the user to begin typing. To edit an existing idea, click on the title or description and start typing. To delete an idea, click the "x" button in the top right corner of the tile.

To sort ideas by creation date or alphabetically, click the corresponding button in the top left corner of the board.

You can tab through to access text areas and the submit button

Ctrl+Enter will submit a new item

## Testing

The project includes a suite of tests that can be run using yarn test. These tests cover the functionality of creating, editing, and deleting ideas, as well as sorting by date and alphabetically.

## Persistence

Idea Board uses the localStorage API to persist the current state when the page is refreshed. This means that any ideas that have been created or edited will still be present when the page is reopened.

## Credits

This project was built by Kevin Andrews as a portfolio project
