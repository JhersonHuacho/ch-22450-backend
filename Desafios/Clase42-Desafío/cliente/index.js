import axios from "axios";

const url = "http://localhost:3001/api/productos";

const getProducts = async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

getProducts();

const postProduct = async () => {
    try {
        const response = axios.post(url, {
            title: "Televisor 01",
            price: 50,
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

postProduct();
getProducts();

const putProduct = async () => {
    try {
        const response = axios.put(url, {
            id: '623f4efb6fe0c84f42b58ffc',
            title: "Televisor 03",
            price: 50,
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

putProduct();
getProducts();

const deleteProduct = async () => {
    try {
        const id = "623f4efb6fe0c84f42b58ffc";
        const urlFull = `${url}/${id}`;
        const response = axios.delete(urlFull);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

deleteProduct();
getProducts();