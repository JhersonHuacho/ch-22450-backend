"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var productos_1 = __importDefault(require("./routers/productos"));
var carritos_1 = __importDefault(require("./routers/carritos"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
// Body parsing Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/productos', productos_1.default);
app.use('/api/carrito', carritos_1.default);
app.listen(port, function () {
    console.log("Server run http://localhost:" + port);
});
//# sourceMappingURL=index.js.map