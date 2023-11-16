const api = (req, res) => {
    let body = '';
    req.on('data', (data) => body += data);
    req.on('end', () => res.end(`dati ricevuti: ${body}`));
}

export { api };