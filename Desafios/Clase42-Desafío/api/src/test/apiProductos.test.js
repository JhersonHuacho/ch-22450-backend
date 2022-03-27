const request = require("supertest")("http://localhost:3001");
const expect = require("chai").expect;

describe("API - GET - /api/productos", () => {
  it("GET - Debería devolver un 200", async () => {
    let response = await request.get("/api/productos");
    expect(response.status).to.eql(200);
  })

  it("POST - Debería devolver un 201", async () => {
    let response = await request
      .post("/api/productos")
      .send({
        title: "Televisor 10",
        price: 50,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      });
    expect(response.status).to.eql(201);
  })

  it("PUT - Debería devolver un 200", async () => {
    let productos = await request.get("/api/productos");
    const producto = productos.body[productos.body.length - 1];
    let response = await request.
      put("/api/productos")
      .send({
        id: producto._id,
        title: producto.title,
        price: 100,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      });
    expect(response.status).to.eql(200);
  })

  it("DELETE - Debería devolver un 200", async () => {
    let productos = await request.get("/api/productos");
    const producto = productos.body[productos.body.length - 1];
    const urlFull = `/api/productos/${producto._id}`;
    let response = await request.delete(urlFull);
    expect(response.status).to.eql(200);
  })
})
