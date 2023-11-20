import http from 'http';
import { endpoints } from './modules/endpoints.js';

const port = 3000;

const server = http.createServer();

server.on("request", (req, res) => {
    const header = {
        'Content-Type': 'text/plain',
    };

    // Handle
    const { url, method } = req;
    console.log("requested: " + url);

    const getter = endpoints[method];

    if(!getter) {
        res.writeHead(404, header);
        res.end("Metodo non gestito");
    }

    const handler = getter[url];

    if(!handler) {
        res.writeHead(404, header);
        res.end("Pagina non trovata");
    }

    res.writeHead(200, header);
    handler(req, res);

    res.end("");
});

server.listen(port, () => console.log("server listening on port " + port));