"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function crearErrorNoEsAdmin(ruta, metodo) {
    var error = {
        error: -1,
        description: ''
    };
    if (ruta && metodo) {
        error.description = "ruta '" + ruta + "' metodo '" + metodo + "' no autorizado";
    }
    else {
        error.description = 'no autorizado';
    }
    return error;
}
function isAdmin(req, res, next) {
    var objQuery = req.query;
    var isAdmin = Object.keys(objQuery).length === 0
        ? false
        : objQuery.admin === 'true' ? true : false;
    if (!isAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method));
    }
    else {
        next();
    }
}
exports.default = isAdmin;
//# sourceMappingURL=validateAdminMiddleware.js.map