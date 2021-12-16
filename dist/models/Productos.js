"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
var mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
});
//# sourceMappingURL=Productos.js.map