const { normalize, schema } = require('normalizr');
const { obj: originalData, objEmpresa } = require('./data');
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


// NORMALIZACIÓN EMPRESA
const gerenteSchema = new schema.Entity('gerente');
const encargadoSchema = new schema.Entity('encargado');
const empleadosSchema = new schema.Entity('empleados');

const empresaSchema = new schema.Entity('empresa', {
    gerente: gerenteSchema,
    encargado: encargadoSchema,
    empleados: [empleadosSchema]
});

const normalizeEmpresa = normalize(originalData, empresaSchema);

print(normalizeEmpresa)
print(originalData)

console.log("Original", Object.keys(originalData).length)
console.log("normalizeEmpresa", Object.keys(normalizeEmpresa).length)