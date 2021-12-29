const originalData = require('./data');
const util = require('util');

const { normalize, schema } = require('normalizr');

// SCHEMA
const usersSchema = new schema.Entity("users")
const commentsSchema = new schema.Entity("comments", {
    commenter: usersSchema
})
const aritclesChema = new schema.Entity('articules', {
    author: usersSchema,
    comments: [commentsSchema]
})
const postSchema = new schema.Entity('posts', {
    posts: [aritclesChema]
})

const normalizePost = normalize(originalData, postSchema);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

print(normalizePost)

console.log(JSON.stringify(normalizePost).length)
console.log(JSON.stringify(originalData).length)
