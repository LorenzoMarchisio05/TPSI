const http = require('http');

const getEndpoints = Object.freeze({
    "/" : get,
    "/about": about,
});

const postEndpoints = Object.freeze({
    "/api": api,
});

const endpoints = Object.freeze({
    "GET": getEndpoints,
    "POST": postEndpoints,
});

const port = 3000;
const server = http.createServer((req, res) => {
    const header = {
        'Content-Type': 'text/plain',
    };
    res.writeHead(200, header);

    // Handle
    const { url, method } = req;
    console.log("requested: " + url);

    getter = endpoints[method];

    if(!getter) {
        res.writeHead(404, header);
        res.end("Metodo non gestito");
    }

    const handler = getter[url];

    if(!handler) {
        res.writeHead(404, header);
        res.end("Pagina non trovata");
    }

    handler(req, res);

    res.end("");
});

server.listen(port, () => console.log("server listening on port " + port));

// GET

function get(req, res) {
    res.write("hello");
}

function about(req, res) {
    res.write("Informazioni sull'applicazione\n");
}

// POST

function api(req, res) {
    let body = '';
    req.on('data', (data) => body += data);
    req.on('end', () => res.end(`dati ricevuti: ${body}`));
}