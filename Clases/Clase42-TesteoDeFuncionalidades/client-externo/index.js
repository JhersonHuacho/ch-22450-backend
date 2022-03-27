//const axios = require("axios");
//const got = require("got");
import axios from "axios";
import got from "got";

const url = "https://jsonplaceholder.typicode.com/todos/1";

axios.get(url)
    .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err);
    })

const getUser = async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

getUser();

const getUserByGot = async () => {
    try {
        const response = await got(url);
        console.log(JSON.parse(response.body));
    } catch (error) {
        console.log(error);
    }
}

getUserByGot();