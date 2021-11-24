"use strict";
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
var express_1 = require("express");
var Carrito_1 = __importDefault(require("../utilitario/Carrito"));
var router = (0, express_1.Router)();
var objCarrito = new Carrito_1.default('db');
router.get('/:id/productos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id === undefined ? -1 : parseInt(req.params.id);
                return [4 /*yield*/, objCarrito.getProductosPorCarrito(id)];
            case 1:
                response = _a.sent();
                if (response.status === 1) {
                    res.json({
                        message: response.message,
                        data: response.dataProducts,
                        status: 'OK'
                    });
                }
                else {
                    res.json({
                        message: response.message,
                        data: [],
                        status: response.status === -1 ? 'Validación' : 'ERROR'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, objCarrito.saveCarrito()];
            case 1:
                response = _a.sent();
                if (response.status === 1) {
                    res.json({
                        message: response.message,
                        data: {
                            idCarrito: response.dataCarritoId
                        },
                        status: 'OK'
                    });
                }
                else {
                    res.json({
                        message: response.message,
                        data: {
                            idCarrito: response.dataCarritoId
                        },
                        status: 'OK'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/:id/productos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
                return [4 /*yield*/, objCarrito.saveProductoAlCarrito(idCarrito, req.body)];
            case 1:
                response = _a.sent();
                if (response.status === 1) {
                    res.json({
                        message: response.message,
                        data: response.dataProduct,
                        status: 'OK'
                    });
                }
                else {
                    res.json({
                        message: response.message,
                        data: [],
                        status: 'ERROR'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
                return [4 /*yield*/, objCarrito.deleteCarritoPorId(idCarrito)];
            case 1:
                response = _a.sent();
                if (response.status === 1) {
                    res.json({
                        message: response.message,
                        data: [],
                        status: 'OK'
                    });
                }
                else {
                    res.json({
                        message: response.message,
                        data: [],
                        status: 'ERROR'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
router.delete('/:id/productos/:id_prod', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCarrito, idProducto, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
                idProducto = req.params.id_prod === undefined ? -1 : parseInt(req.params.id_prod);
                return [4 /*yield*/, objCarrito.deleteProductoDelCarrito(idCarrito, idProducto)];
            case 1:
                response = _a.sent();
                if (response.status === 1) {
                    res.json({
                        message: response.message,
                        data: [],
                        status: 'OK'
                    });
                }
                else {
                    res.json({
                        message: response.message,
                        data: [],
                        status: 'ERROR'
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=carritos.js.map