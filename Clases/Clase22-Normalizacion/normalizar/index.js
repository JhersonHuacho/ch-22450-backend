const { normalize, schema } = require('normalizr');
const originalData = require('./data');
const util = require('util');

// NORMALIZACIÓN
const authorSchema = new schema.Entity('authors');
const commentSchema = new schema.Entity('comments', {
    commenter: authorSchema
});

const postSchema = new schema.Entity('posts', {
    author: authorSchema,
    comments: [commentSchema]
});

const normalizeBlog = normalize(originalData, postSchema);

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}
console.log('OBJETO ORIGINAL ' + Object.keys(originalData).length);
print(originalData);

console.log('OBJETO NORMALIZADO ' + Object.keys(normalizeBlog).length);
print(normalizeBlog);