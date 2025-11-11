const http = require('http');
const fetch = require('node-fetch'); // Debes instalarlo más adelante con 'npm install node-fetch'
const cheerio = require('cheerio'); // Debes instalarlo con 'npm install cheerio'

const URL = 'https://es.wikipedia.org/wiki/JavaScript'; // Ejemplo de web para extraer datos

function getInfo(callback) {
  fetch(URL)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      // Ejemplo: extraer títulos de secciones principales
      const titulos = [];
      $('h2 .mw-headline').each((i, el) => titulos.push($(el).text()));
      callback(titulos);
    })
    .catch(() => callback(['Error al obtener los datos']));
}

const server = http.createServer((req, res) => {
  getInfo(data => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });
});

server.listen(3000, () => console.log('Servidor de scraping listo en puerto 3000'));
