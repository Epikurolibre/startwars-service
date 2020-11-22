const https = require('https');

/**
 * API Buscar planeta
 */
module.exports.handler = (event, context, callback) => {

    // Identificador de planeta
    const id = event.params.id;

    // Validación
    if (typeof id !== 'string') {
        console.error('Error de validación');
        callback(new Error('No se puede ingresar un id de tipo caracter.'));
        return;
    }

    const params = {
        host: "http://swapi.py4e.com",
        path: "/api/planets/" + id,
        method: 'GET'
    };

    const req = https.request(params, function(res) {
        let data = '';
        console.log('STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            console.log("DONE");
            console.log(JSON.parse(data));
        });
    });

    const replaceKeys = {
        name: "nombre",
        rotation_period: "periodo_rotacion",
        orbital_period: "periodo_orbital",
        diameter: "diametro",
        climate: "clima",
        gravity: "gravedad",
        terrain: "terreno",
        surface_water: "superficie_acuosa",
        population: "poblacion",
        residents: "residentes",
        films: "peliculas",
        created: "creado",
        edited: "editado",
        url: "itemName"
    };

    changeKeyObjects(req, replaceKeys);

    req.end();
};

// Cambiar nombre de campos
const changeKeyObjects = (arr, replaceKeys) => {
    return arr.map(item => {
        const newItem = {};
        Object.keys(item).forEach(key => {
            newItem[replaceKeys[key]] = item[[key]];
        });
        return newItem;
    });
};

