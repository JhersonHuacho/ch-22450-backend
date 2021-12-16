"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritosDao = exports.productosDao = void 0;
var productosDao;
exports.productosDao = productosDao;
var carritosDao;
exports.carritosDao = carritosDao;
var PERS = 'mongodb';
// switch (process.env.PERS) {
switch (PERS) {
    case 'json':
        console.log('PERS => json');
        // const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo');
        // const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo');
        // productosDao = new ProductosDaoArchivo();
        // carritosDao = new CarritosDaoArchivo();
        // console.log('daos => index.ts => INICIO');
        Promise.resolve().then(function () { return __importStar(require('./productos/ProductosDaoArchivo')); }).then(function (moduleObject) {
            var ProductosDaoArchivo = moduleObject.default;
            exports.productosDao = productosDao = new ProductosDaoArchivo();
        });
        Promise.resolve().then(function () { return __importStar(require('./carritos/CarritosDaoArchivo')); }).then(function (moduleObject) {
            var CarritosDaoArchivo = moduleObject.default;
            exports.carritosDao = carritosDao = new CarritosDaoArchivo();
        });
        // console.log('daos => index.ts => FIN');
        break;
    case 'mongodb':
        console.log('PERS => mongodb');
        // const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
        // const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
        // productosDao = new ProductosDaoMongoDb()
        // carritosDao = new CarritosDaoMongoDb()
        Promise.resolve().then(function () { return __importStar(require('./productos/ProductosDaoMongoDB')); }).then(function (moduleObject) {
            var ProductosDaoMongoDB = moduleObject.default;
            exports.productosDao = productosDao = new ProductosDaoMongoDB();
        });
        Promise.resolve().then(function () { return __importStar(require('./carritos/CarritosDaoMongoDB')); }).then(function (moduleObject) {
            var CarritosDaoMongoDb = moduleObject.default;
            exports.carritosDao = carritosDao = new CarritosDaoMongoDb();
        });
        break;
    case 'firebase':
        // const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        // const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')
        // productosDao = new ProductosDaoFirebase()
        // carritosDao = new CarritosDaoFirebase()
        Promise.resolve().then(function () { return __importStar(require('./productos/ProductosDaoFirebase')); }).then(function (moduleObject) {
            var ProductosDaoFirebase = moduleObject.default;
            exports.productosDao = productosDao = new ProductosDaoFirebase();
        });
        Promise.resolve().then(function () { return __importStar(require('./carritos/CarritosDaoFirebase')); }).then(function (moduleObject) {
            var CarritosDaoFirebase = moduleObject.default;
            exports.carritosDao = carritosDao = new CarritosDaoFirebase();
        });
        break;
    default:
        break;
}
//# sourceMappingURL=index.js.map