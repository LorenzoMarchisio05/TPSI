const get = (req, res) =>  {
    res.write("hello");
}

const about = (req, res) => {
    res.write("Informazioni sull'applicazione\n");
}

export {get, about};