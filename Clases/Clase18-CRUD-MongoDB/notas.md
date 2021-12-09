$ show databases
$ use coder_"
$ db.createCollection("users")
$ db.users.stats()
$ db.users.storageSize()
$ db.users.totalIndexSize()
$ db.users.insertOne({ nombre: "Francisco" })
$ db.users.find()
$ db.users.insert({ nombre: "Jherson", edad: 23 })
$ db.users.insert([ {nombre: "Maria", edad: 24}, {nombre: "Jorge", edad: 38}, {nombre: "Rodri", edad: 25} ])
$ db.users.find()
$  db.users.insertOne({nombre: "Leo", edad: 25, date: ISODate()})
$ db.users.find().pretty()
$ db.users.findOne()
$ db.users.find({ nombre: "Maria" })
$ db.users.find({ nombre: "Maria", edad: 24 })

$ db.users.count()
$ db.users.count({ nombre: "Maria" })

$ db.users.find({$and: [{nombre: "Jorge"},{edad: 38}]})
$ db.users.find({$or: [{nombre: "Jorge"},{edad: 25}]})

$ db.users.find({"edad":{$lt:25}})     => Edad menor a 25
$ db.users.find({"edad": {$gt: 20}})   => edad mayor a 20
$ db.users.find({"edad": {$gte: 25}})  => mayor o igual

$ db.users.find({}, {nombre: 1})
$ db.users.find({}, {nombre: 1, edad: 1})

$ db.users.find().limit(2)

$ db.users.find().sort({ nombre: 1 })
$ db.users.find().sort({ nombre: -1 })

$ db.users.find().skip(2)

$ db.users.update({ "_id" : ObjectId("61ab9e6eab1db81ad76cc860") }, { nombre: "Celedonia" })
$ db.users.update({ "_id" : ObjectId("61ab9e6eab1db81ad76cc861") }, {$set: {nombre: "Gustavo"}})
$ db.users.updateOne({ "_id" : ObjectId("61ab9e6eab1db81ad76cc861") }, {$set: {nombre: "Gustavo"}})
$ db.users.updateMany({ edad: 25 }, { $set: {edad: 80} })

$ db.users.deleteOne({ nombre: "Celedonia" })
$ db.users.deleteMany({ nombre: "Celedonia" })
$ db.users.deleteMany({}) => Borra todo

$ 



