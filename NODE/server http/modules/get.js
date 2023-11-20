function get (req, res) {
    res.write("hello");
}

function about (req, res) {
    res.write("Informazioni sull'applicazione\n");
}

export {get, about};