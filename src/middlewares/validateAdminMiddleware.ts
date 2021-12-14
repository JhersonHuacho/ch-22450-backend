import { Request, Response, NextFunction } from 'express';

function crearErrorNoEsAdmin(ruta: string, metodo: string) {
  const error = {
    error: -1,
    description: ''
  }
  if (ruta && metodo) {
    error.description = `ruta '${ruta}' metodo '${metodo}' no autorizado`
  } else {
    error.description = 'no autorizado'
  }
  return error
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;

  if (!isAdmin) {
    res.json(crearErrorNoEsAdmin(req.url, req.method))
  } else {
    next()
  }
}

export default isAdmin;