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
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
mongoose_1.default.connect(config_1.config.mongodb.cnxStr, config_1.config.mongodb.options);
var ContenedorMongoDB = /** @class */ (function () {
    function ContenedorMongoDB(nameCollection, schema) {
        this._collection = mongoose_1.default.model(nameCollection, schema);
    }
    ContenedorMongoDB.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var documents, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("ContenedorMongoDB => getById  => id", id);
                        return [4 /*yield*/, this._collection.find({ _id: id.toString() })];
                    case 1:
                        documents = _a.sent();
                        console.log("ContenedorMongoDB => getById  => documents", documents);
                        if (documents.length === 0) {
                            throw new Error('Error al listar por id: no encontrado');
                        }
                        else {
                            return [2 /*return*/, documents];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        throw new Error("Error al listar por id: " + error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorMongoDB.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var documents, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._collection.find()];
                    case 1:
                        documents = _a.sent();
                        return [2 /*return*/, documents];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error', error_2);
                        throw new Error("Error al listar todo: " + error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorMongoDB.prototype.save = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var document_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("ContenedorMongoDB => save", obj);
                        return [4 /*yield*/, this._collection.create(obj)];
                    case 1:
                        document_1 = _a.sent();
                        return [2 /*return*/, document_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log('save => error', error_3);
                        throw new Error("Error al guardar: " + error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorMongoDB.prototype.update = function (objUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, n, nModified, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._collection.replaceOne({ '_id': objUpdate._id }, objUpdate)];
                    case 1:
                        _a = _b.sent(), n = _a.n, nModified = _a.nModified;
                        if (n == 0 || nModified == 0) {
                            throw new Error('Error al actualizar: no encontrado');
                        }
                        else {
                            return [2 /*return*/, objUpdate];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log('');
                        throw new Error("Error al borrar: " + error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorMongoDB.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var documentDelete, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._collection.findOneAndDelete({ _id: id })];
                    case 1:
                        documentDelete = _a.sent();
                        return [2 /*return*/, documentDelete];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Error al borrar: " + error_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContenedorMongoDB.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._collection.deleteMany({})];
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
    return ContenedorMongoDB;
}());
exports.default = ContenedorMongoDB;
//# sourceMappingURL=ContenedorMongoDB.js.map