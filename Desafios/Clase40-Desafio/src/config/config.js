const Config = {
  mongo: {
    name: "/myFirstDatabase",
    collection: "productos",
    hostLocal: "mongodb://localhost:27017",
    host: "mongodb+srv://fhuacho:fhuacho123@cluster0.n8bnc.mongodb.net",
    projection: { __v: 0 },
    dbMongoUrl: process.env.DB_MONGO_URL
  }
}

module.exports = { Config };