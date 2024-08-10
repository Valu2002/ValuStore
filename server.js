const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/jocuri' && req.method === 'GET') {
    // Citirea listei de jocuri
    const filePath = path.join(__dirname, 'recente.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading recente.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.url === '/jocuri' && req.method === 'POST') {
    // Crearea unui nou joc
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const newGame = JSON.parse(body);
        const createdGame = createGame(newGame);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdGame));
      } catch (error) {
        res.writeHead(400);
        res.end('Invalid JSON data');
      }
    });
  } else if (req.url.startsWith('/jocuri/') && req.method === 'GET') {
    // Citirea unui joc specific folosind ID-ul
    const id = req.url.split('/')[2]; // obține ID-ul din URL
    const game = findGameById(id);
    if (game) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(game));
    } else {
      res.writeHead(404);
      res.end('Game not found');
    }
  } else if (req.url.startsWith('/jocuri/') && req.method === 'PUT') {
    // Actualizarea unui joc existent
    const id = req.url.split('/')[2]; // obține ID-ul din URL
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const updatedGame = JSON.parse(body);
        const game = updateGame(id, updatedGame);
        if (game) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(game));
        } else {
          res.writeHead(404);
          res.end('Game not found');
        }
      } catch (error) {
        res.writeHead(400);
        res.end('Invalid JSON data');
      }
    });
  } else if (req.url.startsWith('/jocuri/') && req.method === 'DELETE') {
    // Ștergerea unui joc existent
    const id = req.url.split('/')[2]; // obține ID-ul din URL
    const deletedGame = deleteGame(id);
    if (deletedGame) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedGame));
    } else {
      res.writeHead(404);
      res.end('Game not found');
    }
  } else {
    res.writeHead(404);
    res.end('Route not found');
  }
});

const games = [
  { id: 1, name: 'God of War', platform: 'PlayStation' },
  { id: 2, name: 'Dead Space', platform: 'Xbox' },
  { id: 3, name: 'Horizon Forbidden West', platform: 'PlayStation' },
  { id: 4, name: 'Resident Evil 4', platform: 'Xbox' },
  { id: 5, name: 'Dead Island 2', platform: 'Xbox' },
  { id: 6, name: 'Hogwarts Legacy', platform: 'PlayStation' }
];

// Implementează funcțiile pentru operațiile CRUD

function findGameById(id) {
  return games.find((game) => game.id === Number(id));
}

function createGame(newGame) {
  const id = games.length + 1;
  const game = { id, ...newGame };
  games.push(game);
  return game;
}

function updateGame(id, updatedGame) {
  const gameIndex = games.findIndex((game) => game.id === Number(id));
  if (gameIndex !== -1) {
    games[gameIndex] = { id: Number(id), ...updatedGame };
    return games[gameIndex];
  }
  return null;
}

function deleteGame(id) {
  const gameIndex = games.findIndex((game) => game.id === Number(id));
  if (gameIndex !== -1) {
    const deletedGame = games[gameIndex];
    games.splice(gameIndex, 1);
    return deletedGame;
  }
  return null;
}

const port = 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

