'use strict';

const consultarUsuario = require('usuario/function/consultar-usuario.js');

/**
 * =======================================================================
 * API de consultar todos los usuarios
 */
module.exports.list = (event, context, callback) => {
    consultarUsuario(event, (error, result) => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(result),
        };

        context.success(response);
    });
};