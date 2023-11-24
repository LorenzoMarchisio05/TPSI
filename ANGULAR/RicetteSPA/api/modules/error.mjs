export default function sendErrorMessage(res, message, status = 404) {
    const error = Object.freeze({
        message,
    })

    res.status(status).send(JSON.stringify(error));
}