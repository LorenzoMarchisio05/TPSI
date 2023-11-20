import { get, about } from './get.js';
import { api } from './post.js';

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

export { endpoints };