"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require('fs');
var fs_1 = __importDefault(require("fs"));
var ContenedorProducto = /** @class */ (function () {
    function ContenedorProducto(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.listProducts = [];
    }
    ContenedorProducto.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: 'El arcchivo json no existes'
                                    });
                                })];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' })];
                    case 2:
                        contentFile = _a.sent();
                        products = [];
                        console.log('contentFile', contentFile);
                        if (contentFile === '') {
                            console.log('getAll() => No hay datos para mostrar');
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: 'El archivo json existe, pero no tiene ningun registro.'
                                    });
                                })];
                        }
                        else {
                            products = JSON.parse(contentFile);
                            // console.log("getAll() => Mostrar todos los productos :\n" ,products);
                        }
                        // console.log('products', products);
                        // console.log('products[1]', products[1]);
                        if (products[1].productos.length === 0) {
                            return [2 /*return*/, {
                                    status: -1,
                                    message: 'No existen productos en el archivo JSON.',
                                    dataProducts: []
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    status: 1,
                                    message: 'Se obtuvo los productos correctamente.',
                                    dataProducts: products[1]
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'Hubo un error al obtener los productos.'
                                });
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorProducto.prototype.getById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, contentFile, products, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 1:
                        contentFile = _a.sent();
                        products = JSON.parse(contentFile);
                        // console.log('products', products);
                        // console.log('products[1]', products[1]);
                        // console.log('products[1].productos', products[1].productos);
                        this.listProducts = products[1].productos;
                        product = this.listProducts.find(function (product) { return product.id === productId; });
                        // console.log(`product`, product)
                        return [2 /*return*/, {
                                status: 1,
                                message: 'Se obtuvo el producto correctamente.',
                                dataProduct: product
                            }];
                }
            });
        });
    };
    ContenedorProducto.prototype.save = function (paramProducto) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, tiempoTranscurrido, hoy, productos, producto, contentFile, productosCarritos, arrayProductos, data, data, arrayProductos, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        tiempoTranscurrido = Date.now();
                        hoy = new Date(tiempoTranscurrido);
                        productos = [];
                        producto = __assign({}, paramProducto);
                        producto.timestamp = hoy.toLocaleString();
                        if (!fileExists) return [3 /*break*/, 7];
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        productosCarritos = [];
                        if (!(contentFile === "")) return [3 /*break*/, 4];
                        producto.id = 1;
                        arrayProductos = [
                            {
                                carritos: []
                            },
                            {
                                productos: [
                                    producto
                                ]
                            }
                        ];
                        data = JSON.stringify(arrayProductos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 3:
                        _a.sent();
                        console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
                        return [3 /*break*/, 6];
                    case 4:
                        productosCarritos = JSON.parse(contentFile);
                        productos = productosCarritos[1].productos;
                        producto.id = productos.length + 1;
                        productos.push(producto);
                        productosCarritos[1].productos = productos;
                        data = JSON.stringify(productosCarritos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 5:
                        _a.sent();
                        console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        producto.id = 1;
                        arrayProductos = [
                            {
                                carritos: []
                            },
                            {
                                productos: [
                                    producto
                                ]
                            }
                        ];
                        this.listProducts.push(producto);
                        data = JSON.stringify(arrayProductos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 8:
                        _a.sent();
                        console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
                        _a.label = 9;
                    case 9: return [2 /*return*/, {
                            status: 1,
                            message: 'Se guardo el producto correctamente.',
                            dataProduct: producto
                        }];
                    case 10:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'Hubo un error al guardar el producto.'
                                });
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorProducto.prototype.updateById = function (productParam, productParamId) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, productosCarritos, productos, newProducts, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) {
                            console.log("El archivo no existe");
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: 'El archivo JSON no existe'
                                    });
                                })];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        productosCarritos = JSON.parse(contentFile);
                        productos = productosCarritos[1].productos;
                        console.log("productos", productos);
                        newProducts = productos.map(function (product) {
                            return product.id === productParamId
                                ? {
                                    id: productParamId === undefined ? product.id : productParamId,
                                    timestamp: productParam.timestamp === undefined ? product.timestamp : productParam.timestamp,
                                    nombre: productParam.nombre === undefined ? product.nombre : productParam.nombre,
                                    descripcion: productParam.descripcion === undefined ? product.descripcion : productParam.descripcion,
                                    codigo: productParam.codigo === undefined ? product.codigo : productParam.codigo,
                                    url: productParam.url === undefined ? product.url : productParam.url,
                                    precio: productParam.precio === undefined ? product.precio : productParam.precio,
                                    stock: productParam.stock === undefined ? product.stock : productParam.stock,
                                }
                                : product;
                        });
                        // console.log("newProducts", newProducts);
                        productosCarritos[1].productos = newProducts;
                        fs_1.default.promises.writeFile(filePath, JSON.stringify(productosCarritos, null, 2), { encoding: "utf-8" });
                        return [2 /*return*/, {
                                status: 1,
                                message: 'El producto se actualizó correctamente.',
                                dataProduct: productParam
                            }];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'Hubo un error al actualizar el producto.'
                                });
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorProducto.prototype.deleteById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, productosCarritos, productos, newProducts, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) {
                            console.log("El archivo no existe");
                            return [2 /*return*/, {
                                    status: -1,
                                    message: 'El archivo JSON no existe.'
                                }];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        productosCarritos = JSON.parse(contentFile);
                        productos = productosCarritos[1].productos;
                        newProducts = productos.filter(function (product) { return product.id !== productId; });
                        productosCarritos[1].productos = newProducts;
                        fs_1.default.promises.writeFile(filePath, JSON.stringify(productosCarritos, null, 2), { encoding: "utf-8" });
                        console.log("deleteById() => se elimino el producto con el  ID " + productId + " correctamente");
                        return [2 /*return*/, {
                                status: -1,
                                message: 'El producto se elimino correctamente.'
                            }];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, {
                                status: -2,
                                message: 'Hubo un error al eliminar el producto.'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ContenedorProducto;
}());
exports.default = ContenedorProducto;
//# sourceMappingURL=Producto.js.map