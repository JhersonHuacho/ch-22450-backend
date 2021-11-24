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
var ContenedorCarrito = /** @class */ (function () {
    function ContenedorCarrito(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.listProducts = [];
        this.listCarritos = [];
    }
    ContenedorCarrito.prototype.getProductosPorCarrito = function (paramIdCarrito) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, listaProductosCarritos, listaCarritos, carrito, productos, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) {
                            console.log('El archivo no existe');
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: 'El archivo no existe'
                                    });
                                })];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' })];
                    case 2:
                        contentFile = _a.sent();
                        listaProductosCarritos = [];
                        // console.log('contentFile', contentFile);
                        if (contentFile === '') {
                            console.log('getAll() => No hay datos para mostrar');
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: 'El archivo existe, pero no hay registros'
                                    });
                                })];
                        }
                        else {
                            listaProductosCarritos = JSON.parse(contentFile);
                        }
                        listaCarritos = listaProductosCarritos[0].carritos;
                        carrito = listaCarritos.find(function (carrito) { return carrito.id === paramIdCarrito; });
                        if (carrito === undefined || carrito === null) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: "No hay ningun carrito con el ID " + paramIdCarrito
                                    });
                                })];
                        }
                        productos = carrito.productos;
                        if (productos.length === 0) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: "No existen productos del carrito con ID " + paramIdCarrito
                                    });
                                })];
                        }
                        return [2 /*return*/, {
                                status: 1,
                                message: "Se obtuvieron los correctamente los productos del carrito con ID " + paramIdCarrito,
                                dataProducts: productos
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'ERROR: Hubo un error al obtener los datos'
                                });
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorCarrito.prototype.saveCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, carritos, tiempoTranscurrido, hoy, carrito, contentFile, listaProductosCarritos, arrayCarritosProductos, data, data, arrayCarritos, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        carritos = [];
                        tiempoTranscurrido = Date.now();
                        hoy = new Date(tiempoTranscurrido);
                        carrito = {
                            id: 0,
                            timestamp: hoy.toLocaleString(),
                            productos: []
                        };
                        if (!fileExists) return [3 /*break*/, 7];
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        listaProductosCarritos = [];
                        if (!(contentFile === "")) return [3 /*break*/, 4];
                        console.log("contentFile", contentFile);
                        carrito.id = 1;
                        arrayCarritosProductos = [
                            {
                                carritos: [
                                    carrito
                                ]
                            },
                            {
                                productos: []
                            }
                        ];
                        data = JSON.stringify(arrayCarritosProductos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        listaProductosCarritos = JSON.parse(contentFile);
                        carritos = listaProductosCarritos[0].carritos;
                        carrito.id = carritos.length + 1;
                        // this.listCarritos = carritos;
                        // this.listCarritos.push(carrito);
                        carritos.push(carrito);
                        listaProductosCarritos[0].carritos = carritos;
                        data = JSON.stringify(listaProductosCarritos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        carrito.id = 1;
                        arrayCarritos = [
                            {
                                carritos: [
                                    carrito
                                ]
                            },
                            {
                                productos: []
                            }
                        ];
                        data = JSON.stringify(arrayCarritos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 8:
                        _a.sent();
                        console.log("save() => El producto se guardo correctamente. Id ==> " + carrito.id);
                        _a.label = 9;
                    case 9: return [2 /*return*/, {
                            status: 1,
                            message: 'El carrito se guardo correctamente',
                            dataCarritoId: carrito.id
                        }];
                    case 10:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'Hubo un error al guardar el carrito'
                                });
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorCarrito.prototype.saveProductoAlCarrito = function (paramIdCarrito, paramProducto) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, nuevoProducto, contentFile, listaProductosCarritos, carritos, carrito_1, productos, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        filePath = "./" + this.nombreArchivo + ".json";
                        return [4 /*yield*/, fs_1.default.promises.stat(filePath).then(function () { return true; }).catch(function () { return false; })];
                    case 1:
                        fileExists = _a.sent();
                        nuevoProducto = __assign({}, paramProducto);
                        if (!fileExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        listaProductosCarritos = JSON.parse(contentFile);
                        carritos = listaProductosCarritos[0].carritos;
                        carrito_1 = carritos.find(function (carrito) { return carrito.id === paramIdCarrito; });
                        if (carrito_1 === undefined || carrito_1 === null) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve({
                                        status: -1,
                                        message: "El carrito con ID " + paramIdCarrito + " no existe."
                                    });
                                })];
                        }
                        productos = carrito_1.productos;
                        nuevoProducto.id = productos.length + 1;
                        productos.push(nuevoProducto);
                        carrito_1.productos = productos;
                        listaProductosCarritos[0].carritos = carritos.map(function (pCarrito) {
                            return pCarrito.id === paramIdCarrito ? carrito_1 : pCarrito;
                        });
                        data = JSON.stringify(listaProductosCarritos, null, 2);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, data, { encoding: "utf-8" })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 1,
                                message: "El producto fue agregado correctamente al carrito con ID " + paramIdCarrito,
                                dataProduct: nuevoProducto
                            }];
                    case 4: return [2 /*return*/, new Promise(function (resolve) {
                            resolve({
                                status: -1,
                                message: 'El archivo no existe.'
                            });
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve({
                                    status: -2,
                                    message: 'Hubo un error al agregar el producto al carrito.'
                                });
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorCarrito.prototype.deleteCarritoPorId = function (paramCarritoId) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, listaCarritosProductos, carritos, carrito, newCarritos, error_4;
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
                                    message: 'El archivo no existe'
                                }];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        listaCarritosProductos = JSON.parse(contentFile);
                        carritos = listaCarritosProductos[0].carritos;
                        carrito = carritos.find(function (carrito) { return carrito.id === paramCarritoId; });
                        if (carrito === undefined || carrito === null) {
                            return [2 /*return*/, {
                                    status: -1,
                                    message: "El carrito con ID " + paramCarritoId + " no existe."
                                }];
                        }
                        newCarritos = carritos.filter(function (carrito) { return carrito.id !== paramCarritoId; });
                        listaCarritosProductos[0].carritos = newCarritos;
                        fs_1.default.promises.writeFile(filePath, JSON.stringify(listaCarritosProductos, null, 2), { encoding: "utf-8" });
                        console.log("deleteCarritoPorId() => se elimino el carrito con el  ID " + paramCarritoId + " correctamente");
                        return [2 /*return*/, {
                                status: 1,
                                message: "Se elimino el carrito correctamente"
                            }];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, {
                                status: -2,
                                message: 'Hubo un error al eliminar el carrito'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorCarrito.prototype.deleteProductoDelCarrito = function (paramCarritoId, paramProductoId) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, fileExists, contentFile, listaCarritosProductos, carritos, carrito_2, productos, newProductos, error_5;
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
                                    message: 'El archivo no existe'
                                }];
                        }
                        return [4 /*yield*/, fs_1.default.promises.readFile(filePath, { encoding: "utf-8" })];
                    case 2:
                        contentFile = _a.sent();
                        listaCarritosProductos = JSON.parse(contentFile);
                        carritos = listaCarritosProductos[0].carritos;
                        carrito_2 = carritos.find(function (carrito) { return carrito.id === paramCarritoId; });
                        if (carrito_2 === undefined || carrito_2 === null) {
                            return [2 /*return*/, {
                                    status: -1,
                                    message: "El carrito con ID " + paramCarritoId + " no existe."
                                }];
                        }
                        productos = carrito_2.productos;
                        newProductos = productos.filter(function (producto) { return producto.id !== paramProductoId; });
                        carrito_2.productos = newProductos;
                        listaCarritosProductos[0].carritos = carritos.map(function (pCarrito) {
                            return pCarrito.id === paramCarritoId ? carrito_2 : pCarrito;
                        });
                        fs_1.default.promises.writeFile(filePath, JSON.stringify(listaCarritosProductos, null, 2), { encoding: "utf-8" });
                        console.log("deleteProductoDelCarrito() => se elimino el carrito con el  ID " + paramCarritoId + " correctamente");
                        return [2 /*return*/, {
                                status: 1,
                                message: "El producto se elimino correctamente del carrito con ID " + paramCarritoId
                            }];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2 /*return*/, {
                                status: -2,
                                message: 'Hubo un error al eliminar el producto del carrito'
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ContenedorCarrito;
}());
exports.default = ContenedorCarrito;
//# sourceMappingURL=Carrito.js.map