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
var fs_1 = __importDefault(require("fs"));
var config_1 = require("../config");
var ContenedorArchivo = /** @class */ (function () {
    function ContenedorArchivo(nombreArchivo) {
        this._nombreArchivo = "" + nombreArchivo;
        this._filePath = config_1.config.fileSystem.path + "/" + this._nombreArchivo;
        console.log('this._filePath', this._filePath);
        console.log('config.fileSystem', config_1.config.fileSystem);
    }
    ContenedorArchivo.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var objs, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        objs = _a.sent();
                        result = objs.find(function (obj) { return obj.id === id; });
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        throw new Error("Error al guardar: " + error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorArchivo.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentFile, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(this._filePath, { encoding: 'utf-8' })];
                    case 1:
                        contentFile = _a.sent();
                        return [2 /*return*/, JSON.parse(contentFile)];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorArchivo.prototype.save = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var objs, newId, newObj, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        objs = _a.sent();
                        newId = void 0;
                        if (objs.length === 0) {
                            newId = 0;
                        }
                        else {
                            newId = objs[objs.length - 1].id + 1;
                        }
                        newObj = __assign(__assign({}, obj), { id: newId });
                        objs.push(newObj);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this._filePath, JSON.stringify(objs), { encoding: "utf-8" })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newObj];
                    case 3:
                        error_3 = _a.sent();
                        console.log('save => error', error_3);
                        throw new Error("Error al guardar: " + error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorArchivo.prototype.update = function (objUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var objs, index, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        objs = _a.sent();
                        index = objs.findIndex(function (obj) { return obj.id === objUpdate.id; });
                        if (!(index === -1)) return [3 /*break*/, 2];
                        throw new Error("Error al actualizar: no se encontr\u00F3 el id " + objUpdate.id);
                    case 2:
                        objs[index] = objUpdate;
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this._filePath, JSON.stringify(objs, null, 2), { encoding: "utf-8" })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.log('');
                        throw new Error("Error al borrar: " + error_4);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorArchivo.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var objs, index, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        objs = _a.sent();
                        index = objs.findIndex(function (obj) { return obj.id === id; });
                        if (index === -1) {
                            throw new Error("Error al actualizar: no se encontr\u00F3 el id " + id);
                        }
                        objs.splice(index, 1);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this._filePath, JSON.stringify(objs, null, 2), { encoding: "utf-8" })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Error al borrar: " + error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorArchivo.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this._filePath, JSON.stringify([], null, 2), { encoding: "utf-8" })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error("Error al borrar todo: " + error_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContenedorArchivo;
}());
exports.default = ContenedorArchivo;
//# sourceMappingURL=ContenedorArchivo.js.map