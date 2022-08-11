
const { Schema, model } = require('mongoose');

const PlacaShema = Schema({
    codigo: {
        type: String,
        require: true,
        unique:true
    },
    placa: {
        type: String,
        require: true
    },
    tipovehiculo: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    ano: {
        type: String,
        require: true
    },
    chasis: {
        type: String,
        require: true
    },
    fechaEmision: {
        type: String,
        require: true
    },
    fechaExpiracion: {
        type: String,
        require: true
    },
    razonSocialImportador: {
        type: String,
        require: true
    },
    rncCedulaImportador: {
        type: String,
        require: true
    },
    razonSocialComprador: {
        type: String,
        require: true
    },
    rncCedulaComprador: {
        type: String,
        require: true
    },
    creatorPlaca: {
        type: String,
        require: true
    },
});

module.exports= model('Placa', PlacaShema);